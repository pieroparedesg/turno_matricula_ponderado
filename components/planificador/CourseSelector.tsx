"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import type { HorariosData } from "./types"

interface CourseSelectorProps {
  horariosData: HorariosData
  selectedColor: string
  onColorChange: (color: string) => void
  onAdd: (plan: string, career: string, cycle: string, subject: string, section: string) => string | null
  onClear: () => void
}

export default function CourseSelector({
  horariosData,
  selectedColor,
  onColorChange,
  onAdd,
  onClear,
}: CourseSelectorProps) {
  const [plan, setPlan] = useState("")
  const [career, setCareer] = useState("")
  const [cycle, setCycle] = useState("")
  const [subject, setSubject] = useState("")
  const [section, setSection] = useState("")
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null)

  const plans = useMemo(() => Object.keys(horariosData), [horariosData])

  const careers = useMemo(() => {
    if (!plan || !horariosData[plan]) return []
    return Object.keys(horariosData[plan])
  }, [horariosData, plan])

  const cycles = useMemo(() => {
    if (!plan || !career || !horariosData[plan]?.[career]) return []
    return Object.keys(horariosData[plan][career])
  }, [horariosData, plan, career])

  const subjects = useMemo(() => {
    if (!plan || !career || !cycle) return []
    const courses = horariosData[plan]?.[career]?.[cycle]
    if (!courses) return []
    const set = new Set<string>()
    courses.forEach((c) => {
      const name = c.Asignatura.match(/-(.+)/)?.[1]?.trim()
      if (name) set.add(name)
    })
    return Array.from(set)
  }, [horariosData, plan, career, cycle])

  const sections = useMemo(() => {
    if (!plan || !career || !cycle || !subject) return []
    const courses = horariosData[plan]?.[career]?.[cycle]
    if (!courses) return []
    const set = new Set<string>()
    courses.forEach((c) => {
      const name = c.Asignatura.match(/-(.+)/)?.[1]?.trim()
      if (name === subject) set.add(c["Sec."])
    })
    return Array.from(set)
  }, [horariosData, plan, career, cycle, subject])

  const teacher = useMemo(() => {
    if (!plan || !career || !cycle || !subject || !section) return "---"
    const courses = horariosData[plan]?.[career]?.[cycle]
    if (!courses) return "---"
    for (const c of courses) {
      const name = c.Asignatura.match(/-(.+)/)?.[1]?.trim()
      if (name === subject && c["Sec."] === section) {
        const docente = c.Docente
        if (!docente || docente === "--") return "Sin docente"
        const dashIdx = docente.indexOf(" - ")
        return dashIdx !== -1 ? docente.substring(dashIdx + 3).trim() : docente
      }
    }
    return "Sin docente"
  }, [horariosData, plan, career, cycle, subject, section])

  useEffect(() => { setCareer(""); setCycle(""); setSubject(""); setSection("") }, [plan])
  useEffect(() => { setCycle(""); setSubject(""); setSection("") }, [career])
  useEffect(() => { setSubject(""); setSection("") }, [cycle])
  useEffect(() => { setSection("") }, [subject])

  useEffect(() => {
    if (sections.length > 0 && !section) setSection(sections[0])
  }, [sections, section])

  const handleAdd = () => {
    setMessage(null)
    const err = onAdd(plan, career, cycle, subject, section)
    if (err) {
      setMessage({ type: "error", text: err })
    } else {
      setMessage({ type: "success", text: `${subject} - Sección ${section} agregado correctamente` })
    }
    setTimeout(() => setMessage(null), 4000)
  }

  const canAdd = plan && career && cycle && subject && section

  const selectClass =
    "w-full h-11 px-3 rounded-md border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#b20000] focus:border-[#b20000] transition-colors"

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-[#b20000] rounded-full flex items-center justify-center shadow">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Seleccionar Curso</h3>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Plan de estudios</label>
        <select className={selectClass} value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="">---</option>
          {plans.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Carrera</label>
        <select className={selectClass} value={career} onChange={(e) => setCareer(e.target.value)} disabled={!plan}>
          <option value="">---</option>
          {careers.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo</label>
        <select className={selectClass} value={cycle} onChange={(e) => setCycle(e.target.value)} disabled={!career}>
          <option value="">---</option>
          {cycles.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Asignatura</label>
        <select className={selectClass} value={subject} onChange={(e) => setSubject(e.target.value)} disabled={!cycle}>
          <option value="">---</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sección</label>
        <select className={selectClass} value={section} onChange={(e) => setSection(e.target.value)} disabled={!subject}>
          {sections.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Docente</label>
        <div className="w-full h-11 px-3 flex items-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-sm">
          {teacher}
        </div>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Color del curso</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-12 h-10 rounded cursor-pointer border border-gray-300"
        />
      </div>


      <div className="flex gap-3">
        <Button
          onClick={handleAdd}
          disabled={!canAdd}
          className="flex-1 bg-[#b20000] hover:bg-[#8a0000] disabled:bg-gray-300 text-white font-semibold h-12 text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Agregar Horario
        </Button>
        <Button
          onClick={onClear}
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 h-12 text-base"
        >
          Limpiar Todo
        </Button>
      </div>


      {message && (
        <div
          className={`rounded-md p-3 text-sm font-medium ${
            message.type === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-green-50 text-green-800 border border-green-200"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
