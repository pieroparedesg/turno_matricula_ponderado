"use client"

import { motion } from "framer-motion"
import { MessageCircle, Facebook, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 transform rotate-45 relative">
                <div className="absolute inset-1 bg-white transform -rotate-45"></div>
              </div>
              <span className="font-bold">CÓDIGO FISIANO</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-red-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="flex items-center justify-center md:justify-end space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">codigofisiano@gmail.com</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-sm text-gray-400">Desarrollado por Código Fisiano</p>
        </motion.div>
      </div>
    </footer>
  )
}
