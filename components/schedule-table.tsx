"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

const scheduleData = [
  { turn: 1, time: "5am a 7am", grade: "17 a 19" },
  { turn: 2, time: "7am a 9am", grade: "16 a 19" },
  { turn: 3, time: "9am a 11am", grade: "15 a 19" },
  { turn: 4, time: "11am a 13am", grade: "14 a 19" },
  { turn: 5, time: "13am a 15am", grade: "13 a 19" },
  { turn: 6, time: "15am a 17am", grade: "12 a 19" },
  { turn: 7, time: "17am a 19am", grade: "11 a 19" },
  { turn: 8, time: "19am a 21am", grade: "10 a 19" },
  { turn: 9, time: "21am a 23am", grade: "0 a 19" },
]

export default function ScheduleTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">04 y 05 de Agosto</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Turno</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Horario</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Ponderado</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, index) => (
              <motion.tr
                key={row.turn}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="text-center py-3 px-4 font-medium">{row.turn}</td>
                <td className="text-center py-3 px-4 text-gray-600">{row.time}</td>
                <td className="text-center py-3 px-4 text-gray-600">{row.grade}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
