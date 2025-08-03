"use client"

import { motion } from "framer-motion"
import { MessageCircle, Facebook, Instagram, Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo Section - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Image
              src="/assets/images/logo-complete.jpeg"
              alt="Código Fisiano"
              width={120}
              height={120}
              className="w-30 h-30 object-contain"
            />
          </motion.div>

          {/* Social Media Section - Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="font-semibold mb-4 text-lg">Síguenos</h4>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://whatsapp.com/channel/0029VbAWQNK1dAwBhP4q961q"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-green-400 hover:text-green-300 transition-colors duration-300"
              >
                <MessageCircle className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/codigofisiano"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <Facebook className="w-7 h-7" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/codigofisiano_unmsm/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                <Instagram className="w-7 h-7" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Section - Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h4 className="font-semibold mb-4 text-lg">Contacto</h4>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5 text-[#b20000]" />
              <span className="text-gray-300">codigofisiano@gmail.com</span>
            </div>
          </motion.div>
        </div>

        {/* Copyright - Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-8 pt-8 text-right"
        >
          <p className="text-gray-400">Desarrollado por Piero Paredes y Landry Bardales</p>
        </motion.div>
      </div>
    </footer>
  )
}
