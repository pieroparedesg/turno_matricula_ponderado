"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

const scheduleData = [
  { turn: 1, time: "6 am a 8 am", grade: "17 a 19" },
  { turn: 2, time: "8 am a 10 am", grade: "16 a 19" },
  { turn: 3, time: "10 am a 12 pm", grade: "15 a 19" },
  { turn: 4, time: "12 pm a 2 pm", grade: "14 a 19" },
  { turn: 5, time: "2 pm a 4 pm", grade: "13 a 19" },
  { turn: 6, time: "4 pm a 6 pm", grade: "12 a 19" },
  { turn: 7, time: "6 pm a 8 pm", grade: "11 a 19" },
  { turn: 8, time: "8 pm a 10 pm", grade: "10 a 19" },
  { turn: 9, time: "10 pm a 11:59 pm", grade: "0 a 19" },
]

export default function ScheduleTable() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="w-16 h-16 bg-[#b20000] rounded-full flex items-center justify-center shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-2xl font-bold text-gray-800"
        >
          Matricula de estudiantes REGULARES: 10 de Agosto
        </motion.h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-[#b20000]">
              <th className="text-center py-4 px-4 font-bold text-gray-800 text-lg">Turno</th>
              <th className="text-center py-4 px-4 font-bold text-gray-800 text-lg">Horario</th>
              <th className="text-center py-4 px-4 font-bold text-gray-800 text-lg">Ponderado</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, index) => (
              <motion.tr
                key={row.turn}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index + 1 }}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="text-center py-4 px-4 font-semibold text-lg text-gray-800">{row.turn}</td>
                <td className="text-center py-4 px-4 text-gray-600 font-medium">{row.time}</td>
                <td className="text-center py-4 px-4 text-gray-600 font-medium">{row.grade}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
