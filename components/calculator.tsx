"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CalculatorProps {
  onCalculate: (turn: number) => void
  calculatedTurn: number | null
}

const turnSchedules = {
  1: { range: "17 a 19", time: "5am a 7am" },
  2: { range: "16 a 19", time: "7am a 9am" },
  3: { range: "15 a 19", time: "9am a 11am" },
  4: { range: "14 a 19", time: "11am a 13am" },
  5: { range: "13 a 19", time: "13am a 15am" },
  6: { range: "12 a 19", time: "15am a 17am" },
  7: { range: "11 a 19", time: "17am a 19am" },
  8: { range: "10 a 19", time: "19am a 21am" },
  9: { range: "0 a 19", time: "21am a 23am" },
}

function calculateTurn(average: number): number {
  if (average >= 17) return 1
  if (average >= 16) return 2
  if (average >= 15) return 3
  if (average >= 14) return 4
  if (average >= 13) return 5
  if (average >= 12) return 6
  if (average >= 11) return 7
  if (average >= 10) return 8
  return 9
}

export default function Calculator({ onCalculate, calculatedTurn }: CalculatorProps) {
  const [average, setAverage] = useState("")
  const [showResult, setShowResult] = useState(false)

  const handleCalculate = () => {
    const numAverage = Number.parseFloat(average)
    if (numAverage >= 0 && numAverage <= 19) {
      const turn = calculateTurn(numAverage)
      onCalculate(turn)
      setShowResult(true)
    }
  }

  const isValidInput = () => {
    const num = Number.parseFloat(average)
    return !isNaN(num) && num >= 0 && num <= 19
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="average" className="block text-sm font-medium text-gray-700 mb-2">
            Promedio ponderado
          </label>
          <Input
            id="average"
            type="number"
            min="0"
            max="19"
            step="0.01"
            value={average}
            onChange={(e) => setAverage(e.target.value)}
            placeholder="Ingresa tu promedio (0-19)"
            className="w-full"
          />
        </div>

        <Button
          onClick={handleCalculate}
          disabled={!isValidInput()}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3"
        >
          CALCULAR TURNO
        </Button>

        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-sm text-yellow-800">
            <strong>Importante:</strong> En caso de haber presentado algún problema con la matrícula web deben realizar
            su matrícula presencial el jueves 07 de Agosto en la Unidad de Matrícula de la FISI de 8:00 a.m. a 13:00
            p.m. y de 14:00 p.m. a 16:00 p.m.
          </AlertDescription>
        </Alert>

        <AnimatePresence>
          {showResult && calculatedTurn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-red-800 font-medium"
              >
                Pertenece al turno {calculatedTurn}, su horario de matrícula es desde las{" "}
                <span className="font-bold">
                  {turnSchedules[calculatedTurn as keyof typeof turnSchedules].time.split(" a ")[0]}
                </span>{" "}
                hasta las{" "}
                <span className="font-bold">
                  {turnSchedules[calculatedTurn as keyof typeof turnSchedules].time.split(" a ")[1]}
                </span>
                .
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
