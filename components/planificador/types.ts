export interface ScheduleBlock {
  Día: string
  Inicio: string
  Fin: string
  Horario: string
  Tipo: string
}

export interface Course {
  Asignatura: string
  "Créd.": string
  Docente: string
  Horarios: ScheduleBlock[]
  "Sec.": string
}

// Plan -> Carrera -> Ciclo -> Course[]
export type HorariosData = Record<string, Record<string, Record<string, Course[]>>>

export interface SelectedCourse {
  asig: string
  credits: number
  section: string
  color: string
  cells: CellPosition[]
}

export interface CellPosition {
  dayIndex: number
  hour: number
}

export interface CellData {
  courseName: string
  section: string
  color: string
}

export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const
export const HOURS = Array.from({ length: 14 }, (_, i) => i + 8) // 8:00 to 21:00
