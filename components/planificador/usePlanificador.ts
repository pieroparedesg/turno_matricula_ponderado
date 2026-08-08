"use client"

import { useState, useEffect, useCallback } from "react"
import type { HorariosData, SelectedCourse, CellData, CellPosition } from "./types"
import { DAYS } from "./types"

const LS_COURSES = "planificador_courses"
const LS_COLOR = "planificador_color"

export function usePlanificador() {
  const [horariosData, setHorariosData] = useState<HorariosData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCourses, setSelectedCourses] = useState<Record<string, SelectedCourse>>({})
  const [selectedColor, setSelectedColor] = useState("#90EE90")
  const [totalCredits, setTotalCredits] = useState(0)

  useEffect(() => {
    fetch("/data/Fisi.json")
      .then((res) => res.json())
      .then((data: HorariosData) => {
        setHorariosData(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Error al cargar los datos de horarios")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_COURSES)
      if (saved) {
        const parsed: Record<string, SelectedCourse> = JSON.parse(saved)
        setSelectedCourses(parsed)
        const credits = Object.values(parsed).reduce((sum, c) => sum + c.credits, 0)
        setTotalCredits(credits)
      }
      const savedColor = localStorage.getItem(LS_COLOR)
      if (savedColor) setSelectedColor(savedColor)
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_COURSES, JSON.stringify(selectedCourses))
  }, [selectedCourses])

  const updateColor = useCallback((color: string) => {
    setSelectedColor(color)
    localStorage.setItem(LS_COLOR, color)
  }, [])

  const getCellData = useCallback(
    (dayIndex: number, hour: number): CellData | null => {
      for (const course of Object.values(selectedCourses)) {
        if (course.cells.some((c) => c.dayIndex === dayIndex && c.hour === hour)) {
          return { courseName: course.asig, section: course.section, color: course.color }
        }
      }
      return null
    },
    [selectedCourses]
  )

  const addCourse = useCallback(
    (
      plan: string,
      career: string,
      cycle: string,
      subjectName: string,
      section: string
    ): string | null => {
      if (!horariosData) return "Datos no cargados"

      for (const course of Object.values(selectedCourses)) {
        if (course.asig === subjectName) {
          return "Este curso ya ha sido agregado"
        }
      }

      const coursesInCycle = horariosData[plan]?.[career]?.[cycle]
      if (!coursesInCycle) return "Ciclo no encontrado"

      const courseInfo = coursesInCycle.find((c) => {
        const name = c.Asignatura.match(/-(.+)/)?.[1]?.trim()
        return name === subjectName && c["Sec."] === section
      })

      if (!courseInfo || !courseInfo.Horarios) return "Curso no encontrado"

      const newCells: CellPosition[] = []

      for (const schedule of courseInfo.Horarios) {
        const dayName = schedule.Día.trim().toUpperCase()
        const dayIndex = DAYS.findIndex(
          (d) =>
            d.toUpperCase() === dayName ||
            d
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toUpperCase() === dayName
        )

        if (dayIndex === -1) return `Día no válido: ${schedule.Día}`

        const startHour = parseInt(schedule.Inicio.split(":")[0], 10)
        const endHour = parseInt(schedule.Fin.split(":")[0], 10)

        for (let hour = startHour; hour < endHour; hour++) {
          // Check conflict
          const existing = getCellData(dayIndex, hour)
          if (existing) {
            return `Conflicto de horarios: ${DAYS[dayIndex]} a las ${hour}:00 ya tiene ${existing.courseName}`
          }
          newCells.push({ dayIndex, hour })
        }
      }

      const credits = parseInt(courseInfo["Créd."], 10) || 0
      const courseKey = `${subjectName}-${section}`

      setSelectedCourses((prev) => ({
        ...prev,
        [courseKey]: {
          asig: subjectName,
          credits,
          section,
          color: selectedColor,
          cells: newCells,
        },
      }))
      setTotalCredits((prev) => prev + credits)

      return null
    },
    [horariosData, selectedCourses, selectedColor, getCellData]
  )

  const removeCourse = useCallback(
    (courseName: string, section: string) => {
      const courseKey = `${courseName}-${section}`
      const course = selectedCourses[courseKey]
      if (!course) return

      setSelectedCourses((prev) => {
        const next = { ...prev }
        delete next[courseKey]
        return next
      })
      setTotalCredits((prev) => prev - course.credits)
    },
    [selectedCourses]
  )

  const clearAll = useCallback(() => {
    setSelectedCourses({})
    setTotalCredits(0)
    localStorage.removeItem(LS_COURSES)
  }, [])

  const mergeExternalData = useCallback(
    (newData: HorariosData) => {
      if (!horariosData) return
      const merged: HorariosData = {}

      for (const plan in newData) {
        if (!merged[plan]) merged[plan] = {}
        for (const career in newData[plan]) {
          if (!merged[plan][career]) merged[plan][career] = {}
          for (const cycle in newData[plan][career]) {
            merged[plan][career][cycle] = [...(newData[plan][career][cycle] || [])]
          }
        }
      }

      for (const plan in horariosData) {
        if (!merged[plan]) merged[plan] = {}
        for (const career in horariosData[plan]) {
          if (newData[plan]?.[career]) continue
          if (!merged[plan][career]) merged[plan][career] = {}
          for (const cycle in horariosData[plan][career]) {
            merged[plan][career][cycle] = [...(horariosData[plan][career][cycle] || [])]
          }
        }
      }

      setHorariosData(merged)
      setSelectedCourses({})
      setTotalCredits(0)
    },
    [horariosData]
  )

  return {
    horariosData,
    loading,
    error,
    selectedCourses,
    selectedColor,
    totalCredits,
    updateColor,
    getCellData,
    addCourse,
    removeCourse,
    clearAll,
    mergeExternalData,
  }
}
