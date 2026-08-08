"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { HorariosData } from "./types"

interface PdfUploadProps {
  onMerge: (data: HorariosData) => void
}

export default function PdfUpload({ onMerge }: PdfUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  const handleSend = async () => {
    const file = inputRef.current?.files?.[0]
    if (!file) {
      alert("Por favor, sube un PDF primero")
      return
    }

    setSending(true)
    const formData = new FormData()
    formData.append("pdf", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        alert("Error al enviar el PDF. Código: " + res.status)
        return
      }

      const data = await res.json()
      if (data) {
        alert("PDF subido y procesado con éxito")
        onMerge(data)
        setFileName(null)
        if (inputRef.current) inputRef.current.value = ""
      }
    } catch {
      alert("Error de conexión con el servidor")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-3">
      <h3 className="text-lg font-bold text-gray-800">Otra facultad</h3>
      <p className="text-sm text-gray-600">
        Sube la Programación de Asignaturas (PDF del SUM) para agregar los horarios de otra carrera.
      </p>

      <div className="flex flex-wrap gap-3 items-center">
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium border border-gray-300 transition-colors">
          <Upload className="w-4 h-4" />
          {fileName || "Subir PDF"}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <Button
          onClick={handleSend}
          disabled={!fileName || sending}
          className="bg-[#b20000] hover:bg-[#8a0000] disabled:bg-gray-300 text-white font-medium"
        >
          {sending ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  )
}
