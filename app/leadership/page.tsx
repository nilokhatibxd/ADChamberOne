'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, Bell, Menu, X, User, Settings, UsersRound, LogOut
} from 'lucide-react'

export default function LeadershipDashboard() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Same Navigation Header */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo and Hamburger */}
            <div className="flex items-center">
              {/* Mobile Hamburger */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden mr-3 p-2"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                )}
              </button>
              
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#3c7bf6] rounded-xl md:rounded-2xl flex items-center justify-center p-2 md:p-3">
                  <img src="/logo.svg" alt="ADChamber Logo" className="w-6 h-6 md:w-8 md:h-8 brightness-0 invert" />
                </div>
                <span className="text-lg md:text-2xl font-semibold text-black font-[family-name:var(--font-poppins)] hidden sm:block">ADChamber One</span>
              </div>
            </div>

            {/* Center: Navigation - Desktop Only */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8">
              <button 
                onClick={() => router.push('/')}
                className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]"
              >
                Website
              </button>
              <button 
                onClick={() => router.push('/unified-portal')}
                className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]"
              >
                Unified Portal
              </button>
              <button 
                onClick={() => router.push('/admin-panel')}
                className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]"
              >
                Admin Panel
              </button>
              <button 
                onClick={() => router.push('/leadership')}
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors font-[family-name:var(--font-poppins)]"
              >
                Leadership
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Language Switcher - Desktop Only */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
                <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-full shadow-sm font-[family-name:var(--font-poppins)] transition-all">
                  EN
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-full font-[family-name:var(--font-poppins)] transition-all hover:bg-gray-50">
                  عربي
                </button>
              </div>

              {/* Search */}
              <button className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-600" strokeWidth={1.5} />
              </button>

              {/* Notification */}
              <button className="relative w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-600" strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <img src="/profile.jpg" alt="User" className="w-full h-full object-cover" />
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-2">
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                          <User className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm">Business Profile</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                          <UsersRound className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm">Manage My Team</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                          <Settings className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm">Settings</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-100 p-2">
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600">
                          <LogOut className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                <button 
                  onClick={() => {router.push('/'); setShowMobileMenu(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Website
                </button>
                <button 
                  onClick={() => {router.push('/unified-portal'); setShowMobileMenu(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Unified Portal
                </button>
                <button 
                  onClick={() => {router.push('/admin-panel'); setShowMobileMenu(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Admin Panel
                </button>
                <button 
                  onClick={() => {router.push('/leadership'); setShowMobileMenu(false)}}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Leadership
                </button>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-1 mx-4">
                    <button className="flex-1 px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-full shadow-sm font-[family-name:var(--font-poppins)] transition-all">
                      EN
                    </button>
                    <button className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-full font-[family-name:var(--font-poppins)] transition-all hover:bg-gray-50">
                      عربي
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Leadership Dashboard</h1>
        <p className="text-gray-600 mt-2 font-[family-name:var(--font-poppins)]">Executive overview and analytics</p>
      </main>
    </div>
  )
}