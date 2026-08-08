"use client"

import { useRef } from "react"
import { DAYS, HOURS } from "./types"
import type { CellData } from "./types"

interface ScheduleGridProps {
  getCellData: (dayIndex: number, hour: number) => CellData | null
  onRemove: (courseName: string, section: string) => void
  totalCredits: number
}

function colNumToLetter(colNum: number): string {
  let letter = ""
  while (colNum > 0) {
    colNum--
    letter = String.fromCharCode((colNum % 26) + 65) + letter
    colNum = Math.floor(colNum / 26)
  }
  return letter
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? "#1f2937" : "#ffffff"
}

export default function ScheduleGrid({ getCellData, onRemove, totalCredits }: ScheduleGridProps) {
  const tableRef = useRef<HTMLTableElement>(null)

  const handleExportImage = async () => {
    if (!tableRef.current) return
    const { toPng } = await import("html-to-image")
    const dataUrl = await toPng(tableRef.current, { backgroundColor: "#ffffff", quality: 1 })
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "horarios.png"
    link.click()
  }

  const handleExportExcel = async () => {
    if (!tableRef.current) return

    const cellColors: Record<string, string> = {}
    const cellTexts: Record<string, string> = {}

    for (let hi = 0; hi < HOURS.length; hi++) {
      for (let di = 0; di < DAYS.length; di++) {
        const data = getCellData(di, HOURS[hi])
        if (data) {
          const col = colNumToLetter(di + 2)
          const row = HOURS[hi] - 6
          const pos = `${col}${row}`
          cellColors[pos] = data.color
          cellTexts[pos] = `${data.courseName} - ${data.section}`
        }
      }
    }

    if (Object.keys(cellColors).length === 0) {
      alert("No hay cursos para exportar")
      return
    }

    try {
      const clone = tableRef.current.cloneNode(true) as HTMLTableElement
      clone.querySelectorAll("button").forEach((btn) => btn.remove())
      clone.querySelectorAll("td").forEach((td) => {
        const spans = td.querySelectorAll("span")
        if (spans.length >= 2) {
          const courseName = spans[0].textContent?.trim() || ""
          const sectionText = spans[1].textContent?.trim().replace("Sec. ", "") || ""
          td.innerHTML = ""
          td.textContent = `${courseName} - ${sectionText}`
        }
      })

      const XLSX = await import("xlsx")
      const wb = XLSX.utils.table_to_book(clone, { sheet: "Horarios" })
      const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "array" })

      const formData = new FormData()
      formData.append(
        "file",
        new Blob([excelFile], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "horarios_sin_colores.xlsx"
      )
      formData.append("cellColors", JSON.stringify(cellColors))
      formData.append("cellTexts", JSON.stringify(cellTexts))

      const response = await fetch("/api/excel", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "horarios_con_colores.xlsx"
      link.click()
    } catch {
      alert("Error al exportar a Excel. Intenta de nuevo.")
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#b20000] text-white px-5 py-2.5 rounded-lg font-bold text-lg shadow">
            {totalCredits}
          </div>
          <span className="text-gray-600 font-medium text-sm">créditos seleccionados</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportImage}
            className="px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            Exportar Imagen
          </button>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            Exportar Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-x-auto">
        <table ref={tableRef} className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="bg-[#b20000] text-white py-3 px-2 text-xs font-bold uppercase tracking-wide border border-[#8a0000]">
                Hora
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="bg-[#b20000] text-white py-3 px-2 text-xs font-bold uppercase tracking-wide border border-[#8a0000]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour} className="hover:bg-gray-50/50">
                <td className="py-2 px-2 text-xs font-medium text-gray-700 border border-gray-200 bg-gray-50 whitespace-nowrap text-center">
                  {hour}:00 - {hour + 1}:00
                </td>
                {DAYS.map((_, dayIndex) => {
                  const data = getCellData(dayIndex, hour)
                  return (
                    <td
                      key={dayIndex}
                      className="relative py-2 px-1 text-xs text-center border border-gray-200 group transition-colors"
                      style={data ? { backgroundColor: data.color, color: getContrastColor(data.color) } : undefined}
                    >
                      {data && (
                        <>
                          <span className="font-medium leading-tight block">
                            {data.courseName}
                          </span>
                          <span className="text-[10px] opacity-80">Sec. {data.section}</span>
                          <button
                            onClick={() => onRemove(data.courseName, data.section)}
                            className="absolute top-0.5 right-0.5 w-5 h-5 rounded bg-red-600 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                          >
                            X
                          </button>
                        </>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
