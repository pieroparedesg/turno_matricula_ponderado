"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  compact?: boolean
  credit?: string
}

export default function HeroSection({
  title = "Turno de Matrícula Web",
  subtitle = "Calcula el turno de matrícula en base a tu promedio ponderado",
  compact = false,
  credit,
}: HeroSectionProps) {
  return (
    <section className={`relative ${compact ? "min-h-[280px]" : "min-h-[500px]"} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0">
        <Image
          src="/assets/images/fisi2.jpg"
          alt="Estudiantes universitarios"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`hero-title ${compact ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl lg:text-7xl"} text-red-600 mb-4 leading-tight tracking-tight`}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl md:text-2xl text-white/90 font-light"
        >
          {subtitle}
        </motion.p>

        {credit && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-4 text-sm text-white/50 font-light"
          >
            {credit}
          </motion.p>
        )}
      </div>
    </section>
  )
}