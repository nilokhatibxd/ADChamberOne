'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { 
  Search, Bell, Crown, Shield, Star, 
  Building2, FileText, CreditCard, BarChart3, CheckCircle2,
  TrendingUp, Users, Package, Bot, Edit2, LogOut, Sparkles, Plus, ArrowUpRight, Award,
  User, Settings, UsersRound
} from 'lucide-react'
import { availableServicesData } from '@/lib/servicesData'

type MembershipTier = 'Essential' | 'Elite' | 'Elite Plus'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
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
  const [currentTier, setCurrentTier] = useState<MembershipTier>('Elite Plus')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
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

  const availableServices = availableServicesData.filter(
    service => service.tiers.includes(currentTier)
  )

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
        <div className="px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3c7bf6] rounded-full flex items-center justify-center p-2">
                  <img src="/logo.svg" alt="ADChamber Logo" className="w-6 h-6 brightness-0 invert" />
                </div>
                <span className="text-lg font-medium text-black font-[family-name:var(--font-poppins)]">ADChamber One</span>
              </div>
            </div>

            {/* Center: Navigation */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-8">
              <button className="text-sm font-medium text-black hover:text-gray-600 transition-colors font-[family-name:var(--font-poppins)]">
                Dashboard
              </button>
              <button className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]">
                Services
              </button>
              <button className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]">
                Applications
              </button>
              <button className="text-sm font-normal text-gray-600 hover:text-black transition-colors font-[family-name:var(--font-poppins)]">
                Payments
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
                <span className="text-sm font-medium text-gray-700">EN</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-500">عربي</span>
              </button>

              {/* Search */}
              <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                <Search className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>

              {/* Notification */}
              <button className="relative w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
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
      </nav>

      {/* Hero Section with 4 Equal Columns */}
      <section className="px-6 pt-6">
        <div className="grid grid-cols-4 gap-5">
          {/* Column 1: Vertical Black Banner with Blue Glow */}
          <div className="relative bg-black rounded-[40px] overflow-hidden col-span-1">
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

            {/* Column 2 & 3: Active Applications Stack */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-[40px] p-6 transition-all border border-gray-100 col-span-2"
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
                    <button className="w-full py-2 border border-white/30 hover:border-white/50 hover:bg-white/10 rounded-full text-white text-xs font-medium transition-all flex items-center justify-center gap-2">
                      Continue
                      <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>


            {/* Column 4: Transaction History */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white rounded-[40px] p-5 transition-all border border-gray-100 flex flex-col col-span-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 text-sm font-[family-name:var(--font-poppins)]">Transactions</h3>
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
        </div>
      </section>

      {/* Main Content in Boxed Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Cards Row - 4 columns */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-600">Available Services</p>
              <Building2 className="w-4 h-4 text-[#3c7bf6]" />
            </div>
            <p className="text-2xl font-light font-[family-name:var(--font-poppins)]">
              <AnimatedCounter value={availableServices.length} />
            </p>
            <p className="text-xs text-gray-500 mt-1">+3 this month</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-600">Pending</p>
              <FileText className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-light font-[family-name:var(--font-poppins)]">
              <AnimatedCounter value={3} />
            </p>
            <p className="text-xs text-gray-500 mt-1">2 require action</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-600">Completed</p>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-light font-[family-name:var(--font-poppins)]">
              <AnimatedCounter value={47} />
            </p>
            <p className="text-xs text-gray-500 mt-1">This year</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-600">Savings</p>
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-light font-[family-name:var(--font-poppins)]">
              AED <AnimatedCounter value={8542} />
            </p>
            <p className="text-xs text-gray-500 mt-1">With discounts</p>
          </motion.div>
        </div>

        {/* Services Grid - 4 Columns */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4 font-[family-name:var(--font-poppins)]">
            Available Services ({availableServices.length})
          </h3>
        </div>

        <motion.div 
          className="grid grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {availableServices.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center",
                  service.color
                )}>
                  <service.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                {service.isPopular && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[9px] rounded-full font-medium">
                    Popular
                  </span>
                )}
              </div>
              <h4 className="font-medium text-xs text-gray-900 mb-1 line-clamp-2 font-[family-name:var(--font-poppins)]">
                {service.name}
              </h4>
              <p className="text-[10px] text-gray-500 mb-3 line-clamp-2">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{service.processingTime}</span>
                <button className="text-[10px] text-[#3c7bf6] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Apply →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating AI Assistant */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#3c7bf6] to-[#2563eb] rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center group transition-all"
      >
        <Bot className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </motion.button>
    </div>
  )
}