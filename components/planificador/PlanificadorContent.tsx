"use client"

import { motion } from "framer-motion"
import Header from "@/components/layout/Header"
import HeroSection from "@/components/sections/HeroSection"
import Footer from "@/components/layout/Footer"
import CourseSelector from "./CourseSelector"
import ScheduleGrid from "./ScheduleGrid"
import PdfUpload from "./PdfUpload"
import { usePlanificador } from "./usePlanificador"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function PlanificadorContent() {
  const {
    horariosData,
    loading,
    error,
    selectedColor,
    totalCredits,
    updateColor,
    getCellData,
    addCourse,
    removeCourse,
    clearAll,
    mergeExternalData,
  } = usePlanificador()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Cargando datos de horarios...</div>
      </div>
    )
  }

  if (error || !horariosData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-lg">{error || "Error al cargar datos"}</div>
      </div>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-gray-50">
      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HeroSection
          title="Planificador de Horarios"
          subtitle="Arma tu horario ideal seleccionando cursos y secciones"
          compact
        />
      </motion.div>

      <motion.div variants={itemVariants} className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
          <div className="space-y-6">
            <CourseSelector
              horariosData={horariosData}
              selectedColor={selectedColor}
              onColorChange={updateColor}
              onAdd={addCourse}
              onClear={clearAll}
            />
            <PdfUpload onMerge={mergeExternalData} />
          </div>

          <ScheduleGrid
            getCellData={getCellData}
            onRemove={removeCourse}
            totalCredits={totalCredits}
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  )
}
