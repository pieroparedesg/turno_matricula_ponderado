"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/assets/images/hero-background.jpeg')",
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >

          {/* Logo */}
          <img
            src="/assets/images/logo-symbol.png"
            alt="Logo Código Fisiano"
            className="mx-auto mb-6 w-24 md:w-32"
          />

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-500">
            Turno de Matrícula Web
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200">
            Calcula el turno de matrícula en base a tu promedio ponderado
          </p>

        </motion.div>

      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-gray-50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

    </div>
  )
}