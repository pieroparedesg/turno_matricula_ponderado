"use client"

import { motion } from "framer-motion"
import Header from "@/components/layout/Header"
import HeroSection from "@/components/sections/HeroSection"
import Footer from "@/components/layout/Footer"

const ciclos = [
  {
    ciclo: "I CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "II CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "III CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "IV CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "V CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "VI CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "VII CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "VIII CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "IX CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
  {
    ciclo: "X CICLO",
    recursos: [
      { titulo: "Recurso 1", descripcion: "Descripción del recurso 1", pdf: "#" },
      { titulo: "Recurso 2", descripcion: "Descripción del recurso 2", pdf: "#" },
      { titulo: "Recurso 3", descripcion: "Descripción del recurso 3", pdf: "#" },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <HeroSection
        title="Grupo Estudiantil Código Fisiano"
        subtitle="Recursos y herramientas para estudiantes de FISI — UNMSM"
      />

      {/* Recursos Académicos */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Recursos Académicos
          </h2>
          <div className="w-16 h-1 bg-[#b20000]"></div>
        </motion.div>

        <div className="space-y-12">
          {ciclos.map((ciclo, cicloIndex) => (
            <motion.div
              key={ciclo.ciclo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: cicloIndex * 0.05 }}
            >
              <h3 className="text-xl font-semibold text-[#b20000] mb-4 border-b border-gray-200 pb-2">
                {ciclo.ciclo}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ciclo.recursos.map((recurso, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-gray-400 mt-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>

                      <h4 className="font-semibold text-gray-800 leading-tight">
                        {recurso.titulo}
                      </h4>
                    </div>

                    <p className="text-sm text-gray-500 italic mb-4">
                      {recurso.descripcion}
                    </p>

                    <a
                      href={recurso.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded hover:border-[#b20000] hover:text-[#b20000] transition-colors duration-200"
                    >
                      Ver PDF
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}