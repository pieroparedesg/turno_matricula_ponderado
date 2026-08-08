"use client"

import { MessageCircle, Facebook, Instagram, Mail, Linkedin, Github } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/assets/images/logo-complete.jpeg"
              alt="Código Fisiano"
              width={120}
              height={120}
              className="w-28 h-28 object-contain rounded-lg"
            />
          </div>

          {/* Redes Código Fisiano */}
          <div className="text-center">
            <h4 className="font-semibold mb-4 text-lg">Síguenos</h4>
            <div className="flex justify-center space-x-5">
              <a
                href="https://whatsapp.com/channel/0029VbAWQNK1dAwBhP4q961q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 hover:scale-110 transition-all duration-300"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/codigofisiano"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/codigofisiano_unmsm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="text-center">
            <h4 className="font-semibold mb-4 text-lg">Contacto</h4>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5 text-[#b20000]" />
              <span className="text-gray-300">codigofisiano@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Créditos */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">Desarrollado por Código Fisiano</p>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/Tuturu.ico"
                alt="Ciclis"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-600"
              />
              <span className="text-gray-400 text-sm">Planificador por Ciclis (Edu Sánchez Gotea)</span>
              <a
                href="https://www.linkedin.com/in/edu-joseph-sanchez-gotea-a14492267/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Kalriot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
