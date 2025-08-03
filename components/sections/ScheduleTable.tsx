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
          04 y 05 de Agosto
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
