'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, Bell, Crown, Shield, Star, 
  Building2, FileText, CreditCard, BarChart3, CheckCircle2,
  TrendingUp, Users, Package, Bot, Edit2, LogOut, Sparkles, Plus, ArrowUpRight, Award,
  User, Settings, UsersRound, ChevronLeft, ChevronRight, Calendar, MoreHorizontal, HeartHandshake, 
  Briefcase, BookOpen, Globe, GraduationCap, Menu, X
} from 'lucide-react'
import { chambersServices } from '@/lib/servicesFromScreenshot'

type MembershipTier = 'Essential' | 'Elite' | 'Elite Plus'

// AI Assistant Messages
const aiMessages = [
  "How can I help you apply for an ESG certificate today?",
  "Need assistance with trade license renewal?",
  "Looking for business matchmaking opportunities?",
  "Want to explore our advisory services?",
  "Ready to access market intelligence reports?",
  "Interested in joining our upcoming trade missions?",
  "How about scheduling a consultation with our experts?",
  "Would you like to register for chamber events?"
]

// Animated AI Message Component
function AnimatedAIMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % aiMessages.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="text-white text-sm font-[family-name:var(--font-poppins)]"
      >
        {aiMessages[currentMessageIndex]}
      </motion.p>
    </AnimatePresence>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// Function to get icon for each service
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

function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      })
      return () => controls.stop()
    }
  }, [value, duration, isInView])
  
  return <span ref={ref}>{displayValue}</span>
}

const tierConfig = {
  'Essential': {
    icon: Shield,
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    services: 8,
    gradient: 'from-gray-400 to-gray-600'
  },
  'Elite': {
    icon: Star,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    services: 15,
    gradient: 'from-blue-400 to-blue-600'
  },
  'Elite Plus': {
    icon: Crown,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    services: 19,
    gradient: 'from-purple-400 to-purple-600'
  }
}

export default function UnifiedPortal() {
  const router = useRouter()
  const [currentTier, setCurrentTier] = useState<MembershipTier>('Elite Plus')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [animatedValues, setAnimatedValues] = useState({
    servicesUsed: 0,
    daysUntilRenewal: 0
  })

  const membership = {
    id: '1',
    companyName: 'Falcon Technologies LLC',
    memberId: 'ADCCI-2024-0156',
    tier: currentTier,
    status: 'Active',
    validUntil: '2024-12-31',
    servicesUsedThisMonth: 12,
    daysUntilRenewal: 20
  }

  const getTierStyles = () => {
    switch(currentTier) {
      case 'Elite Plus':
        return 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
      case 'Elite':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  // Use services from Kareem's prototype screenshot - EXACT ADCCI services
  const availableServices = chambersServices
    .filter(service => service.platform === 'ADC') // Only show ADC platform services
    .slice(0, 12) // Show first 12 ADC services

  // Animate values on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        servicesUsed: membership.servicesUsedThisMonth,
        daysUntilRenewal: membership.daysUntilRenewal
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleAiAssistant = () => {
    setIsAiTyping(true)
    setAiResponse('')
    const fullResponse = `Based on your ${currentTier} membership, you have access to ${availableServices.length} premium services. Your most used services are Trade License Renewal and Certificate of Origin. Would you like me to help you with any specific service today?`
    
    let index = 0
    const interval = setInterval(() => {
      if (index < fullResponse.length) {
        setAiResponse(fullResponse.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsAiTyping(false)
      }
    }, 20)

    setTimeout(() => {
      clearInterval(interval)
      setIsAiTyping(false)
    }, 1500)
  }

  const TierIcon = tierConfig[currentTier].icon

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Premium Navigation Bar */}
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
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors font-[family-name:var(--font-poppins)]"
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
                className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]"
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
                    <img src="/profile.jpg" alt="Ahmed Abdullah" className="w-full h-full object-cover" />
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
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
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
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
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
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

      {/* Hero Section - Responsive Grid */}
      <section className="px-4 md:px-6 pt-4 md:pt-6">
        {/* Mobile: Welcome Section First */}
        <div className="block md:hidden mb-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-black rounded-[30px] overflow-hidden"
          >
            {/* BRIGHT VIBRANT blue light leak from bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#3c7bf6] via-[#3c7bf6]/70 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[40%] bg-[#3c7bf6] blur-[100px]" />

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-between min-h-[400px]">
              {/* Top Section */}
              <div>
                <h1 className="text-2xl font-light text-white mb-6">
                  Welcome back, <span className="font-normal">Ahmed</span>
                </h1>

                {/* Membership Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl p-4 cursor-pointer transition-transform duration-300 hover:scale-[1.02] mb-6"
                >
                  {/* Glass morphism background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3c7bf6]/20 to-[#2563eb]/20 rounded-2xl" />
                
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                          <Crown className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-white/60 text-[10px] font-light tracking-wider font-[family-name:var(--font-poppins)]">MEMBERSHIP</p>
                          <p className="text-white text-base font-light font-[family-name:var(--font-poppins)]">{currentTier}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-[11px] font-light backdrop-blur-sm border border-white/20 font-[family-name:var(--font-poppins)]">
                        Upgrade
                      </button>
                    </div>

                    {/* Middle Section - Company */}
                    <div className="py-2">
                      <p className="text-white text-lg font-light font-[family-name:var(--font-poppins)]">Falcon Technologies LLC</p>
                    </div>

                    {/* Bottom Section - Dates and Edit */}
                    <div className="flex items-end justify-between">
                      <div className="flex space-x-5">
                        <div>
                          <p className="text-white/50 text-[10px] font-light font-[family-name:var(--font-poppins)]">Member Since</p>
                          <p className="text-white/80 text-xs font-light font-[family-name:var(--font-poppins)]">1 Jan 2019</p>
                        </div>
                        <div>
                          <p className="text-white/50 text-[10px] font-light font-[family-name:var(--font-poppins)]">Valid Until</p>
                          <p className="text-white/80 text-xs font-light font-[family-name:var(--font-poppins)]">31 Dec 2024</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group">
                        <Edit2 className="w-3.5 h-3.5 text-white/60 group-hover:text-white" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* My Team Section - Bottom Aligned */}
              <div className="space-y-3">
                  <p className="text-white/80 text-sm font-medium mb-3">My Team</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Overlapping circles */}
                      <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                          <img src="/profile.jpg" alt="Team member" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">JD</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">SK</span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                          <Plus className="w-4 h-4 text-white" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-lg hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm border border-white/10">
                      Manage
                    </button>
                  </div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop: 4-Column Grid Layout */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {/* Column 1: Sidebar - Spans 2 Rows */}
          <div className="col-span-1 row-span-2">
            <div className="relative bg-black rounded-[40px] overflow-hidden h-full">
              {/* BRIGHT VIBRANT blue light leak from bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#3c7bf6] via-[#3c7bf6]/70 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[40%] bg-[#3c7bf6] blur-[100px]" />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                {/* Top Section */}
                <div>
                  <h1 className="text-3xl font-light text-white mb-8">
                    Welcome back, <span className="font-normal">Ahmed</span>
                  </h1>

                  {/* Membership Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-2xl p-5 cursor-pointer transition-transform duration-300 hover:scale-[1.02] mb-8"
                  >
                    {/* Glass morphism background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3c7bf6]/20 to-[#2563eb]/20 rounded-2xl" />
                  
                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Top Section */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                            <Crown className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-white/60 text-[10px] font-light tracking-wider font-[family-name:var(--font-poppins)]">MEMBERSHIP</p>
                            <p className="text-white text-base font-light font-[family-name:var(--font-poppins)]">{currentTier}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-[11px] font-light backdrop-blur-sm border border-white/20 font-[family-name:var(--font-poppins)]">
                          Upgrade
                        </button>
                      </div>

                      {/* Middle Section - Company */}
                      <div className="py-2">
                        <p className="text-white text-lg font-light font-[family-name:var(--font-poppins)]">Falcon Technologies LLC</p>
                      </div>

                      {/* Bottom Section - Dates and Edit */}
                      <div className="flex items-end justify-between">
                        <div className="flex space-x-5">
                          <div>
                            <p className="text-white/50 text-[10px] font-light font-[family-name:var(--font-poppins)]">Member Since</p>
                            <p className="text-white/80 text-xs font-light font-[family-name:var(--font-poppins)]">1 Jan 2019</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-[10px] font-light font-[family-name:var(--font-poppins)]">Valid Until</p>
                            <p className="text-white/80 text-xs font-light font-[family-name:var(--font-poppins)]">31 Dec 2024</p>
                          </div>
                        </div>
                        <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group">
                          <Edit2 className="w-3.5 h-3.5 text-white/60 group-hover:text-white" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* My Team Section - Bottom Aligned */}
                <div className="space-y-3">
                    <p className="text-white/80 text-sm font-medium mb-3">My Team</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {/* Overlapping circles */}
                        <div className="flex -space-x-3">
                          <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                            <img src="/profile.jpg" alt="Team member" className="w-full h-full object-cover" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/20 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">JD</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/20 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">SK</span>
                          </div>
                          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Plus className="w-4 h-4 text-white" strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-lg hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm border border-white/10">
                        Manage
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Column 2: Active Applications Stack */}
          <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-[40px] p-6 transition-all border border-gray-100 col-span-1 h-[280px]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900 text-sm font-[family-name:var(--font-poppins)]">Active Applications (3)</h3>
                <button className="w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors group">
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
                </button>
              </div>
              
              {/* Stacked Cards */}
              <div className="relative h-[170px]">
                {/* Card 3 - Back */}
                <div className="absolute left-8 right-8 top-0 bg-gradient-to-br from-black/20 to-[#1a3a6b]/20 rounded-[20px] h-[140px]" />
                
                {/* Card 2 - Middle */}
                <div className="absolute left-4 right-4 top-4 bg-gradient-to-br from-black/40 to-[#1a3a6b]/40 rounded-[20px] h-[140px]" />
                
                {/* Card 1 - Front (Main Card) */}
                <motion.div 
                  className="absolute left-0 right-0 top-8 bg-gradient-to-br from-black via-[#0a1929] to-[#1a3a6b] rounded-[20px] shadow-lg cursor-pointer h-[140px] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => router.push('/esg-chat')}
                >
                  {/* Blue Globe Background */}
                  <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-[#3c7bf6]/30 rounded-full blur-[80px]" />
                  
                  <div className="relative p-5 h-full flex flex-col justify-between z-10">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm font-[family-name:var(--font-poppins)]">ESG Certificate</p>
                            <p className="text-white/60 text-[11px]">Environmental Compliance</p>
                          </div>
                        </div>
                        <span className="text-[#fbbf24] text-xs font-medium">10%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-[10%] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button - Outline */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push('/esg-chat');
                      }}
                      className="w-full py-2 border border-white/30 hover:border-white/50 hover:bg-white/10 rounded-full text-white text-xs font-medium transition-all flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              </div>
          </motion.div>

          {/* Column 3: Recommended for You */}
          <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white rounded-[40px] p-6 border border-gray-100 h-[280px] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Recommended for You</h3>
                  <div className="flex gap-2">
                    <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <ChevronLeft className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </button>
                    <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                
                {/* Event Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-[family-name:var(--font-poppins)]">Networking</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">Chamber Business Summit 2024</h4>
                  <p className="text-xs text-gray-600 mb-3 font-[family-name:var(--font-poppins)]">Connect with industry leaders and explore new opportunities</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600 font-[family-name:var(--font-poppins)]">Dec 28, 2024</span>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium font-[family-name:var(--font-poppins)]">Register →</button>
                  </div>
                </div>
            </motion.div>
          </div>

          {/* Column 4: Transaction History - Spans 2 Rows */}
          <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-[40px] p-5 transition-all border border-gray-100 flex flex-col col-span-1 row-span-2"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 text-sm font-[family-name:var(--font-poppins)]">Recent Transactions</h3>
                <button className="w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors group">
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
                </button>
              </div>
              
              {/* Scrollable Transactions */}
              <div className="space-y-4 flex-1 overflow-y-auto pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent'}}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    width: 4px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background-color: #e5e7eb;
                    border-radius: 2px;
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background-color: #d1d5db;
                  }
                  div::-webkit-scrollbar-track {
                    background: transparent;
                  }
                `}</style>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Today</p>
                
                {/* Membership Renewal */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Membership Fees</p>
                      <p className="text-[10px] text-gray-400">Annual Renewal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-15,000</p>
                    <p className="text-[10px] text-gray-400">11:30 AM</p>
                  </div>
                </div>

                {/* Service Charge */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                      <p className="text-[10px] text-gray-400">ESG Certificate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-2,500</p>
                    <p className="text-[10px] text-gray-400">10:12 AM</p>
                  </div>
                </div>

                {/* Certificate of Origin */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <Award className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                      <p className="text-[10px] text-gray-400">Certificate of Origin</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-350</p>
                    <p className="text-[10px] text-gray-400">9:30 AM</p>
                  </div>
                </div>

                {/* Yesterday */}
                <p className="text-[10px] text-gray-400 uppercase tracking-wide pt-2">Yesterday</p>
                
                {/* Event Registration */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Event Registration</p>
                      <p className="text-[10px] text-gray-400">Trade Summit 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-500</p>
                    <p className="text-[10px] text-gray-400">4:45 PM</p>
                  </div>
                </div>

                {/* Refund */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Refund</p>
                      <p className="text-[10px] text-gray-400">Processing Fee</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">+150</p>
                    <p className="text-[10px] text-gray-400">2:15 PM</p>
                  </div>
                </div>

                {/* Last Week */}
                <p className="text-[10px] text-gray-400 uppercase tracking-wide pt-2">Last Week</p>
                
                {/* Trade License */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                      <p className="text-[10px] text-gray-400">Trade License Renewal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-1,200</p>
                    <p className="text-[10px] text-gray-400">Dec 5</p>
                  </div>
                </div>

                {/* Workshop */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Workshop Fee</p>
                      <p className="text-[10px] text-gray-400">Digital Marketing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-750</p>
                    <p className="text-[10px] text-gray-400">Dec 4</p>
                  </div>
                </div>

                {/* Business Matchmaking */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                      <p className="text-[10px] text-gray-400">Business Matchmaking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-450</p>
                    <p className="text-[10px] text-gray-400">Dec 3</p>
                  </div>
                </div>
              </div>
          </motion.div>

          {/* Second Row: Your Business Assistant */}
          <div className="col-span-2 bg-white rounded-[40px] p-6 shadow-card border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Your Business Assistant</h3>
                <button className="w-12 h-12 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors group">
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
                </button>
              </div>
              
              {/* Alert Banners */}
              <div className="space-y-3 mb-4">
                {/* ESG Certificate Alert */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Your ESG certificate is expiring in 5 days</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Chamber ESG Label</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Expires Dec 31</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push('/esg-chat?renewal=true')}
                    className="px-5 py-2 bg-gray-900 text-white rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 font-[family-name:var(--font-poppins)]"
                  >
                    <CreditCard className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Renew • 500 AED
                  </button>
                </div>

                {/* Trade Summit Alert */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Abu Dhabi Trade Summit 2025 - Early bird discount</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Networking Event</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Jan 15, 2025</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-5 py-2 bg-white text-blue-600 border border-blue-600 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 font-[family-name:var(--font-poppins)] whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Register
                  </button>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
                  <input
                    type="text"
                    placeholder="I'm looking to grow my business internationally..."
                    className="bg-transparent text-gray-700 placeholder-gray-400 text-sm flex-1 outline-none font-[family-name:var(--font-poppins)]"
                  />
                  <button className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>
                </div>
            </div>
          </div>
        </div>

        {/* Mobile: Your Business Assistant (Second) */}
        <div className="block md:hidden mb-4">
          <div className="bg-white rounded-[30px] p-5 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Your Business Assistant</h3>
              <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors group">
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Alert Banners */}
            <div className="space-y-3 mb-4">
              {/* ESG Certificate Alert */}
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-4.5 h-4.5 text-purple-600" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Your ESG certificate is expiring in 5 days</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Chamber ESG Label</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Expires Dec 31</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/esg-chat?renewal=true')}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-[family-name:var(--font-poppins)]"
                >
                  <CreditCard className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Renew • 500 AED
                </button>
              </div>

              {/* Trade Summit Alert */}
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-4.5 h-4.5 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Abu Dhabi Trade Summit 2025 - Early bird discount</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Networking Event</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">Jan 15, 2025</span>
                    </div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-[family-name:var(--font-poppins)]">
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Register
                </button>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
                <input
                  type="text"
                  placeholder="I'm looking to grow my business..."
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm flex-1 outline-none font-[family-name:var(--font-poppins)]"
                />
                <button className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Active Applications (Third) */}
        <div className="block md:hidden mb-4">
          <div className="bg-white rounded-[30px] p-5 transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-medium text-gray-900 text-sm font-[family-name:var(--font-poppins)]">Active Applications (3)</h3>
              <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors group">
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Stacked Cards */}
            <div className="relative h-[150px]">
              {/* Card 3 - Back */}
              <div className="absolute left-6 right-6 top-0 bg-gradient-to-br from-black/20 to-[#1a3a6b]/20 rounded-[18px] h-[120px]" />
              
              {/* Card 2 - Middle */}
              <div className="absolute left-3 right-3 top-3 bg-gradient-to-br from-black/40 to-[#1a3a6b]/40 rounded-[18px] h-[120px]" />
              
              {/* Card 1 - Front (Main Card) */}
              <motion.div 
                className="absolute left-0 right-0 top-6 bg-gradient-to-br from-black via-[#0a1929] to-[#1a3a6b] rounded-[18px] shadow-lg cursor-pointer h-[120px] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => router.push('/esg-application')}
              >
                {/* Blue Globe Background */}
                <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-[#3c7bf6]/30 rounded-full blur-[60px]" />
                
                <div className="relative p-4 h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <Award className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm font-[family-name:var(--font-poppins)]">ESG Certificate</p>
                          <p className="text-white/60 text-[10px]">Environmental Compliance</p>
                        </div>
                      </div>
                      <span className="text-[#fbbf24] text-xs font-medium">10%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[10%] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button - Outline */}
                  <button className="w-full py-1.5 border border-white/30 hover:border-white/50 hover:bg-white/10 rounded-full text-white text-xs font-medium transition-all flex items-center justify-center gap-2">
                    Continue
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile: Recommended for You (Fourth) */}
        <div className="block md:hidden mb-4">
          <div className="bg-white rounded-[30px] p-5 transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Recommended for You</h3>
              <div className="flex gap-2">
                <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </button>
                <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            
            {/* Event Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-[family-name:var(--font-poppins)]">Networking</span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">Chamber Business Summit 2024</h4>
              <p className="text-xs text-gray-600 mb-3 font-[family-name:var(--font-poppins)]">Connect with industry leaders and explore new opportunities</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                  <span className="text-xs text-gray-600 font-[family-name:var(--font-poppins)]">Dec 28, 2024</span>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium font-[family-name:var(--font-poppins)]">Register →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Full Width (Desktop) */}
      <div className="hidden md:block px-6 py-8">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)] mb-1">
            Services Tailored for You
          </h3>
          <p className="text-2xl font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
            Accelerate Your Business Growth
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 5))}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all ${carouselIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={carouselIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => setCarouselIndex(Math.min(availableServices.length - 5, carouselIndex + 5))}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all ${carouselIndex >= availableServices.length - 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={carouselIndex >= availableServices.length - 5}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-14">
            <motion.div 
              className="flex gap-4"
              animate={{ x: -carouselIndex * 252 }} // card width + gap
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {availableServices.map((service, index) => {
                const isNew = index === 0 || index === 4 || index === 8;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group bg-white border border-gray-100 rounded-[24px] p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-200 cursor-pointer flex flex-col h-[320px] min-w-[240px] w-[240px]"
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: Services Section (Fifth) */}
      <div className="block md:hidden px-4 mb-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)] mb-1">
            Services Tailored for You
          </h3>
          <p className="text-xl font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
            Accelerate Your Business Growth
          </p>
        </div>

        {/* Horizontal Scrolling Services */}
        <div className="overflow-x-auto pb-4" style={{scrollbarWidth: 'none'}}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-3 w-max">
            {availableServices.map((service, index) => {
              const isNew = index === 0 || index === 4 || index === 8;
              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-100 rounded-[20px] p-5 hover:shadow-xl hover:border-gray-200 transition-all cursor-pointer flex flex-col h-[280px] min-w-[220px] w-[220px]"
                >
                  {/* Top Section with Icon and Arrow */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                      {getServiceIcon(service.name)}
                    </div>
                    <button className="w-9 h-9 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-600" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 font-[family-name:var(--font-poppins)]">
                      {service.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-3 font-[family-name:var(--font-poppins)]">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Section with Timeline */}
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2"/>
                        </svg>
                        <span className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">
                          {service.processingTime}
                        </span>
                      </div>
                      {(service.isNew || isNew) && (
                        <span className="inline-flex px-2 py-0.5 bg-green-50 text-green-600 text-[10px] rounded-full font-medium border border-green-100">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Recent Transactions (Sixth/Last) */}
      <div className="block md:hidden px-4 mb-6">
        <div className="bg-white rounded-[30px] p-5 transition-all border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900 text-sm font-[family-name:var(--font-poppins)]">Recent Transactions</h3>
            <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors group">
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
            </button>
          </div>
          
          {/* Scrollable Transactions - Limited height for mobile */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2" style={{scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent'}}>
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 4px;
              }
              div::-webkit-scrollbar-thumb {
                background-color: #e5e7eb;
                border-radius: 2px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background-color: #d1d5db;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
            `}</style>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Today</p>
            
            {/* Membership Renewal */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Membership Fees</p>
                  <p className="text-[10px] text-gray-400">Annual Renewal</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-15,000</p>
                <p className="text-[10px] text-gray-400">11:30 AM</p>
              </div>
            </div>

            {/* Service Charge */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                  <p className="text-[10px] text-gray-400">ESG Certificate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-2,500</p>
                <p className="text-[10px] text-gray-400">10:12 AM</p>
              </div>
            </div>

            {/* Certificate of Origin */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                  <p className="text-[10px] text-gray-400">Certificate of Origin</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-350</p>
                <p className="text-[10px] text-gray-400">9:30 AM</p>
              </div>
            </div>

            {/* Yesterday */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wide pt-2">Yesterday</p>
            
            {/* Event Registration */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Event Registration</p>
                  <p className="text-[10px] text-gray-400">Trade Summit 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-500</p>
                <p className="text-[10px] text-gray-400">4:45 PM</p>
              </div>
            </div>

            {/* Refund */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Refund</p>
                  <p className="text-[10px] text-gray-400">Processing Fee</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">+150</p>
                <p className="text-[10px] text-gray-400">2:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}