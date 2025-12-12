'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Search, Bell, Menu, X, User, Settings, UsersRound, LogOut,
  Globe, Building2, Shield, Crown
} from 'lucide-react'

export default function SharedHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navItems = [
    { name: 'Website', path: '/', icon: Globe },
    { name: 'Unified Portal', path: '/unified-portal', icon: Building2 },
    { name: 'Admin Panel', path: '/admin-panel', icon: Shield },
    { name: 'Leadership', path: '/leadership', icon: Crown }
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo and Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 h-full">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-7 bg-[#003366] rounded-sm transform -skew-x-12" />
                    <div className="w-2 h-7 bg-[#0066cc] rounded-sm transform -skew-x-12" />
                    <div className="w-2 h-7 bg-[#003366] rounded-sm transform -skew-x-12" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-none font-[family-name:var(--font-poppins)]">
                      Abu Dhabi Chamber
                    </h1>
                    <p className="text-[10px] md:text-xs text-gray-500 font-[family-name:var(--font-poppins)]">
                      Digital Excellence Platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                    ${isActive 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
              <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-full shadow-sm font-[family-name:var(--font-poppins)] transition-all">
                EN
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-full font-[family-name:var(--font-poppins)] transition-all hover:bg-gray-50">
                عربي
              </button>
            </div>

            {/* Search Button */}
            <button className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-600" strokeWidth={1.5} />
            </button>

            {/* Notifications */}
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
                  <img src="/profile.jpg" alt="Ahmed Abdullah" className="w-full h-full object-cover" />
                </div>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-14 right-0 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                  >
                    <div className="px-3 pb-3 border-b border-gray-100">
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
                    <div className="px-3 pt-3">
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        router.push(item.path)
                        setShowMobileMenu(false)
                      }}
                      className={`
                        w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-all
                        ${isActive 
                          ? 'bg-gray-900 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  )
                })}
                
                <div className="pt-4 mt-4 border-t border-gray-200">
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
      </div>
    </nav>
  )
}