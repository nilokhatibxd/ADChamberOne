'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, Bell, Menu, X, User, Settings, UsersRound, LogOut,
  ChevronDown, TrendingUp, Users, Package, Sparkles, Plus, ArrowUpRight, Award,
  Briefcase, BookOpen, Globe, GraduationCap, FileText, Building2, BarChart3, 
  HeartHandshake, Shield, Crown
} from 'lucide-react'
import { chambersServices } from '@/lib/servicesFromScreenshot'

export default function Website() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [filteredServices, setFilteredServices] = useState<any[]>([])
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState('I am an Entrepreneur')

  const userPersonas = [
    'I am an Entrepreneur',
    'I am a Company', 
    'I am an International Business',
    'I am a Local Business'
  ]

  const searchSuggestions = [
    'Start a business in Abu Dhabi',
    'Grow my business operations', 
    'Scale to international markets'
  ]

  const suggestionMappings = {
    'start': ['Business Development Services', 'Business Enablement Advisory', 'Market Directory', 'Expert Library'],
    'grow': ['Chamber Boost', 'Chamber Business Matchmaking', 'Upskilling Programs', 'Data Hub'],
    'scale': ['Global Tenders Hub', 'Policy Advocacy', 'Flagship & Sectoral Reports', 'Chamber ESG Label']
  }

  // Function to get icon for each service - same as unified portal
  function getServiceIcon(serviceName: string) {
    const iconClass = "w-7 h-7 text-gray-600"
    
    switch(serviceName) {
      case 'Business Development Services':
        return <TrendingUp className={iconClass} strokeWidth={1.5} />
      case 'Business Enablement Advisory':
        return <Briefcase className={iconClass} strokeWidth={1.5} />
      case 'Chamber Boost':
        return <Sparkles className={iconClass} strokeWidth={1.5} />
      case 'Chamber Business Matchmaking':
        return <Users className={iconClass} strokeWidth={1.5} />
      case 'Chamber ESG Label':
        return <Award className={iconClass} strokeWidth={1.5} />
      case 'Data Hub':
        return <BarChart3 className={iconClass} strokeWidth={1.5} />
      case 'Expert Library':
        return <BookOpen className={iconClass} strokeWidth={1.5} />
      case 'Flagship & Sectoral Reports':
        return <FileText className={iconClass} strokeWidth={1.5} />
      case 'Global Tenders Hub':
        return <Globe className={iconClass} strokeWidth={1.5} />
      case 'Market Directory':
        return <Building2 className={iconClass} strokeWidth={1.5} />
      case 'Policy Advocacy':
        return <Shield className={iconClass} strokeWidth={1.5} />
      case 'Upskilling Programs':
        return <GraduationCap className={iconClass} strokeWidth={1.5} />
      default:
        return <FileText className={iconClass} strokeWidth={1.5} />
    }
  }

  // All available services
  const availableServices = chambersServices.filter(service => service.platform === 'ADC')

  // Animated text effect
  useEffect(() => {
    const currentSuggestion = searchSuggestions[currentSuggestionIndex]
    let currentCharIndex = 0
    
    const typeText = () => {
      if (currentCharIndex < currentSuggestion.length) {
        setDisplayText(currentSuggestion.slice(0, currentCharIndex + 1))
        currentCharIndex++
        setTimeout(typeText, 50)
      } else {
        setTimeout(() => {
          setIsTyping(false)
          setTimeout(() => {
            // Delete text
            const deleteText = () => {
              if (currentCharIndex > 0) {
                setDisplayText(currentSuggestion.slice(0, currentCharIndex - 1))
                currentCharIndex--
                setTimeout(deleteText, 30)
              } else {
                setCurrentSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length)
                setIsTyping(true)
              }
            }
            deleteText()
          }, 2000)
        }, 1000)
      }
    }

    if (isTyping) {
      typeText()
    }
  }, [currentSuggestionIndex, isTyping])

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return
    
    setHasSearched(true)
    
    // Filter services based on search query
    let filtered = []
    const queryLower = query.toLowerCase()
    
    if (queryLower.includes('start') || queryLower.includes('begin')) {
      filtered = availableServices.filter(service => 
        suggestionMappings.start.includes(service.name)
      )
    } else if (queryLower.includes('grow') || queryLower.includes('expand')) {
      filtered = availableServices.filter(service => 
        suggestionMappings.grow.includes(service.name)
      )
    } else if (queryLower.includes('scale') || queryLower.includes('international')) {
      filtered = availableServices.filter(service => 
        suggestionMappings.scale.includes(service.name)
      )
    } else {
      // Default search through all services
      filtered = availableServices.filter(service => 
        service.name.toLowerCase().includes(queryLower) ||
        service.description.toLowerCase().includes(queryLower)
      )
    }
    
    setFilteredServices(filtered.length > 0 ? filtered : availableServices.slice(0, 8))
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
  }

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
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors font-[family-name:var(--font-poppins)]"
              >
                Website
              </button>
              <button 
                onClick={() => router.push('/unified-portal')}
                className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]"
              >
                Unified Portal
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
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Website
                </button>
                <button 
                  onClick={() => {router.push('/unified-portal'); setShowMobileMenu(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Unified Portal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen">
        {/* Hero Section with Gradient Background */}
        <motion.div 
          className="relative bg-gradient-to-br from-black via-[#0a1929] to-[#1a3a6b] overflow-hidden"
          animate={{ 
            height: hasSearched ? '40vh' : '100vh'
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Blue Light Effect - Same as Unified Portal */}
          <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#3c7bf6] via-[#3c7bf6]/70 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[40%] bg-[#3c7bf6] blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center min-h-full px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Intro Text */}
              <motion.div 
                className="mb-8"
                animate={{ 
                  marginBottom: hasSearched ? '2rem' : '3rem'
                }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-2xl md:text-3xl font-light text-white mb-2 font-[family-name:var(--font-poppins)]">
                  Your gateway to Business Excellence in Abu Dhabi
                </h1>
              </motion.div>

              {/* Search Box */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] shadow-xl"
                animate={{ 
                  padding: hasSearched ? '1.5rem' : '2rem'
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Search Section */}
                <div className="max-w-2xl mx-auto">
                  {/* User Persona Dropdown */}
                  <div className="relative mb-4">
                    <button
                      onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
                      className="w-full flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors font-[family-name:var(--font-poppins)]"
                    >
                      <span className="text-sm">{selectedPersona}</span>
                      <ChevronDown className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    </button>
                    
                    <AnimatePresence>
                      {showPersonaDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                        >
                          {userPersonas.map((persona) => (
                            <button
                              key={persona}
                              onClick={() => {
                                setSelectedPersona(persona)
                                setShowPersonaDropdown(false)
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors font-[family-name:var(--font-poppins)]"
                            >
                              {persona}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={!searchQuery ? displayText + (isTyping ? '|' : '') : ''}
                      className="w-full bg-white rounded-full px-6 py-4 pr-14 text-gray-700 placeholder-gray-400 outline-none font-[family-name:var(--font-poppins)]"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                      onClick={() => handleSearch()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <Search className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Quick Action Buttons - Only show if not searched */}
                <AnimatePresence>
                  {!hasSearched && (
                    <motion.div 
                      initial={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.6 }}
                      className="mt-6 text-center"
                    >
                      <p className="text-xs text-white/60 mb-4 font-[family-name:var(--font-poppins)]">Or choose:</p>
                      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-sm font-light transition-all font-[family-name:var(--font-poppins)] backdrop-blur-sm hover:scale-105"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Services Section - Revealed after search */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="px-4 md:px-6 py-8"
            >
              <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)] mb-1">
                      Services for You
                    </h2>
                    <p className="text-2xl font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
                      {filteredServices.length} services found
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setSearchQuery('')
                        setFilteredServices(availableServices)
                      }}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-[family-name:var(--font-poppins)]"
                    >
                      View All Services
                    </button>
                    <button 
                      onClick={() => {
                        setHasSearched(false)
                        setSearchQuery('')
                        setFilteredServices([])
                      }}
                      className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-[family-name:var(--font-poppins)]"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredServices.map((service, index) => {
                    const isNew = index === 0 || index === 4 || index === 8;
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group bg-white border border-gray-100 rounded-[24px] p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-200 cursor-pointer flex flex-col h-[320px]"
                      >
                        {/* Top Section with Icon and Arrow */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
                            {getServiceIcon(service.name)}
                          </div>
                          <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                            <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Title and Description */}
                        <div className="flex-1 flex flex-col">
                          <h4 className="font-medium text-base text-gray-900 mb-3 line-clamp-2 font-[family-name:var(--font-poppins)]">
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-3 font-[family-name:var(--font-poppins)]">
                            {service.description}
                          </p>
                        </div>

                        {/* Bottom Section with Timeline */}
                        <div className="pt-4 mt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2"/>
                              </svg>
                              <span className="text-sm text-gray-500 font-[family-name:var(--font-poppins)]">
                                {service.processingTime}
                              </span>
                            </div>
                            {(service.isNew || isNew) && (
                              <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-600 text-[10px] rounded-full font-medium border border-green-100">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}