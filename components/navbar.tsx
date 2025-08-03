"use client"

import { motion } from "framer-motion"

const navItems = [
  { name: "INICIO", href: "#" },
  { name: "QUIÉNES SOMOS", href: "#" },
  { name: "FISIANOTECA", href: "#" },
  { name: "NOTICIAS", href: "#" },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 transform rotate-45 relative">
              <div className="absolute inset-1 bg-white transform -rotate-45"></div>
            </div>
            <span className="font-bold text-gray-800">CÓDIGO FISIANO</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 font-medium cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.1,
                  color: "#dc2626",
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
