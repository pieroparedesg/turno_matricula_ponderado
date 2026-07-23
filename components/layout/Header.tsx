"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const navItems = [
  { name: "INICIO", href: "/", internal: true },
  { name: "TURNO DE MATRÍCULA", href: "/turno", internal: true },
  { name: "PLANIFICADOR DE HORARIO", href: "https://kalriot.github.io/Planififcador-de-horarios_fisi/", internal: false },
  { name: "FISIANOTECA", href: "https://drive.google.com/drive/folders/1YJUzP6rZRGTUWPi21SfLbt7XlPPFSuBZ?usp=sharing", internal: false },
  { name: "NOTICIAS", href: "#", internal: false },
]

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Image
                src="/assets/images/logo-symbol.png"
                alt="Código Fisiano"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-800 leading-tight">CÓDIGO</span>
              <span className="font-bold text-xl text-[#b20000] leading-tight">FISIANO</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.span
                key={item.name}
                href={item.internal ? undefined : item.href}
                target={!item.internal ? "_blank" : undefined}
                rel={!item.internal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-gray-700 font-medium text-sm tracking-wide cursor-pointer relative hover:text-[#b20000] hover:scale-110"
              >
                {item.internal ? <Link href={item.href} className="hover:text-[#b20000]">{item.name}</Link> : item.name}
              </motion.span>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-[#b20000] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}