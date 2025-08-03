"use client"

import { motion } from "framer-motion"
import Header from "@/components/layout/Header"
import HeroSection from "@/components/sections/HeroSection"
import CalculatorSection from "@/components/sections/CalculatorSection"
import ScheduleTable from "@/components/sections/ScheduleTable"
import Footer from "@/components/layout/Footer"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function HomePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-gray-50">
      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HeroSection />
      </motion.div>

      <motion.div variants={itemVariants} className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <CalculatorSection />
          <ScheduleTable />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  )
}
