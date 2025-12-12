'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import { 
  Search, Bell, Crown, Shield, Star, 
  Building2, FileText, CreditCard, BarChart3, CheckCircle2,
  TrendingUp, Users, Package, Bot, Edit2, LogOut, Sparkles, Plus, ArrowUpRight, Award,
  User, Settings, UsersRound, ChevronLeft, ChevronRight, Calendar, MoreHorizontal, HeartHandshake, 
  Briefcase, BookOpen, Globe, GraduationCap, Menu, X
} from 'lucide-react'
import { chambersServices } from '@/lib/servicesFromScreenshot'

type MembershipTier = 'Essential' | 'Elite' | 'Elite Plus'

export default function UnifiedPortalMobile() {
  const [currentTier, setCurrentTier] = useState<MembershipTier>('Elite Plus')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  // Use services from Kareem's prototype screenshot - EXACT ADCCI services
  const availableServices = chambersServices
    .filter(service => service.platform === 'ADC')
    .slice(0, 12)

  // Function to get icon for each service
  function getServiceIcon(serviceName: string) {
    const iconClass = "w-6 h-6 text-gray-600"
    
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

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Mobile Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3c7bf6] rounded-xl flex items-center justify-center">
                <img src="/logo.svg" alt="ADChamber" className="w-6 h-6 brightness-0 invert" />
              </div>
              <span className="text-lg font-semibold font-[family-name:var(--font-poppins)]">ADChamber</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Content */}
      <div className="px-4 py-4 space-y-4">
        
        {/* 1. Welcome Back Ahmed Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-black rounded-[24px] overflow-hidden p-6"
        >
          {/* Blue glow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[#3c7bf6] via-[#3c7bf6]/70 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[40%] bg-[#3c7bf6] blur-[100px]" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/70 text-sm font-[family-name:var(--font-poppins)]">Welcome back,</p>
                <h2 className="text-white text-2xl font-medium font-[family-name:var(--font-poppins)]">Ahmed</h2>
              </div>
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className="w-14 h-14 rounded-full border-2 border-white/20"
              />
            </div>
            
            {/* Membership Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-white" strokeWidth={1.5} />
                  <span className="text-white text-sm font-[family-name:var(--font-poppins)]">Elite Plus</span>
                </div>
                <button className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-[family-name:var(--font-poppins)]">
                  Upgrade
                </button>
              </div>
              <p className="text-white/90 text-base font-[family-name:var(--font-poppins)] mb-2">
                Falcon Technologies LLC
              </p>
              <div className="flex justify-between text-xs">
                <div>
                  <p className="text-white/60 font-[family-name:var(--font-poppins)]">Member Since</p>
                  <p className="text-white/90 font-[family-name:var(--font-poppins)]">Jan 2019</p>
                </div>
                <div>
                  <p className="text-white/60 font-[family-name:var(--font-poppins)]">Valid Until</p>
                  <p className="text-white/90 font-[family-name:var(--font-poppins)]">Dec 2024</p>
                </div>
              </div>
            </div>
            
            {/* My Team */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-white/70 text-sm font-[family-name:var(--font-poppins)]">My Team</p>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-black" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-white/10 rounded-lg text-white text-xs font-[family-name:var(--font-poppins)]">
                Manage
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. Your Business Assistant */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[24px] p-5 shadow-card border border-gray-100"
        >
          <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)] mb-4">
            Your Business Assistant
          </h3>
          
          {/* Alert Cards - Stack on mobile */}
          <div className="space-y-3 mb-4">
            {/* ESG Certificate Alert */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
                    ESG certificate expiring in 5 days
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-[family-name:var(--font-poppins)]">
                    Expires Dec 31
                  </p>
                </div>
              </div>
              <button className="w-full mt-3 px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-medium font-[family-name:var(--font-poppins)]">
                <CreditCard className="w-3 h-3 inline mr-1" />
                Renew • 500 AED
              </button>
            </div>

            {/* Trade Summit Alert */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
                    Trade Summit 2025 Early bird
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-[family-name:var(--font-poppins)]">
                    Jan 15, 2025
                  </p>
                </div>
              </div>
              <button className="w-full mt-3 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-full text-xs font-medium font-[family-name:var(--font-poppins)]">
                <Calendar className="w-3 h-3 inline mr-1" />
                Register
              </button>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="bg-gray-50 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
            <input
              type="text"
              placeholder="I'm looking to grow my business..."
              className="bg-transparent text-gray-700 placeholder-gray-400 text-sm flex-1 outline-none font-[family-name:var(--font-poppins)]"
            />
            <button className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        {/* 3. Active Applications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[24px] p-5 shadow-card border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
              Active Applications (3)
            </h3>
            <ArrowUpRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
          </div>
          
          {/* Stacked Cards */}
          <div className="relative h-[160px]">
            {/* Back cards */}
            <div className="absolute left-4 right-4 top-0 bg-gradient-to-br from-black/10 to-[#1a3a6b]/10 rounded-[16px] h-[130px]" />
            <div className="absolute left-2 right-2 top-4 bg-gradient-to-br from-black/20 to-[#1a3a6b]/20 rounded-[16px] h-[130px]" />
            
            {/* Front card */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-br from-black to-[#1a3a6b] rounded-[20px] p-4 h-[140px]">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] rounded-full font-medium">
                  In Progress
                </span>
              </div>
              
              <h4 className="text-white font-medium text-sm mb-2 font-[family-name:var(--font-poppins)]">
                Chamber ESG Label
              </h4>
              
              <div className="mt-auto">
                <div className="flex justify-between text-[10px] text-white/60 mb-1">
                  <span>Progress</span>
                  <span>10%</span>
                </div>
                <div className="bg-white/10 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full w-[10%]" />
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-xs font-medium font-[family-name:var(--font-poppins)]">
            Continue
          </button>
        </motion.div>

        {/* 4. Recommended for You */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[24px] p-5 shadow-card border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
              Recommended for You
            </h3>
            <div className="flex gap-2">
              <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
              </button>
              <button className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
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
              <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-[family-name:var(--font-poppins)]">
                Networking
              </span>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">
              Chamber Business Summit 2024
            </h4>
            <p className="text-xs text-gray-600 mb-3 font-[family-name:var(--font-poppins)]">
              Connect with industry leaders and explore new opportunities
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                <span className="text-xs text-gray-600 font-[family-name:var(--font-poppins)]">Dec 28, 2024</span>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium font-[family-name:var(--font-poppins)]">
                Register →
              </button>
            </div>
          </div>
        </motion.div>

        {/* 5. Services Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
              Services Tailored for You
            </h3>
            <p className="text-xl font-medium text-gray-900 font-[family-name:var(--font-poppins)] mt-1">
              Accelerate Your Business Growth
            </p>
          </div>
          
          {/* Horizontal scrollable services */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {availableServices.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white border border-gray-100 rounded-[20px] p-4 w-[200px] flex-shrink-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                      {getServiceIcon(service.name)}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0" strokeWidth={1.5} />
                  </div>
                  
                  <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 font-[family-name:var(--font-poppins)]">
                    {service.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3 font-[family-name:var(--font-poppins)]">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2"/>
                    </svg>
                    <span className="font-[family-name:var(--font-poppins)]">{service.processingTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 6. Recent Transactions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[24px] p-5 shadow-card border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
              Recent Transactions
            </h3>
            <ArrowUpRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
          </div>
          
          <div className="space-y-3">
            {/* Transaction items */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Membership Fees</p>
                  <p className="text-[10px] text-gray-400">Annual Renewal</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-15,000</p>
                <p className="text-[10px] text-gray-400">Today</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                  <p className="text-[10px] text-gray-400">ESG Certificate</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-2,500</p>
                <p className="text-[10px] text-gray-400">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Service Charge</p>
                  <p className="text-[10px] text-gray-400">Certificate of Origin</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700 font-[family-name:var(--font-poppins)]">-350</p>
                <p className="text-[10px] text-gray-400">Dec 10</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 text-center text-xs text-gray-500 font-[family-name:var(--font-poppins)]">
            View All Transactions
          </button>
        </motion.div>
      </div>

      {/* Floating AI Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#3c7bf6] to-[#2563eb] rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center group transition-all z-50"
      >
        <Bot className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </motion.button>
    </div>
  )
}