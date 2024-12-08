import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-700 bg-gradient-to-br from-zinc-800 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">AlgoPrep</h3>
            <p className="text-gray-400 text-sm">
              Helping developers master data structures and algorithms.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/problems" className="text-gray-400 hover:text-purple-400 text-sm">
                  Practice Problems
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-gray-400 hover:text-purple-400">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-purple-400">
                <Linkedin size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-purple-400">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} AlgoPrep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
