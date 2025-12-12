'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, ChevronDown, Bell, Globe, Sparkles, TrendingUp, 
  Calendar, CreditCard, FileText, Users, BarChart3, 
  ArrowRight, CheckCircle2, Clock, AlertCircle, Bot,
  Building2, Award, Zap, Send, User, LogOut, Settings,
  Shield, Crown, Gem
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { services, mockMembership, mockApplications, mockPayments, mockAiInsights } from '@/lib/mockData'
import { Service, MembershipTier } from '@/lib/types'

// Tier configuration
const tierConfig = {
  'Essential': { icon: Shield, color: 'from-gray-500 to-gray-600', servicesLimit: 5 },
  'Elite': { icon: Crown, color: 'from-[#3c7bf6] to-[#2563eb]', servicesLimit: 12 },
  'Elite Plus': { icon: Gem, color: 'from-purple-500 to-purple-600', servicesLimit: 999 }
}

export default function UnifiedPortal() {
  const [currentTier, setCurrentTier] = useState<MembershipTier>('Elite')
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [aiQuery, setAiQuery] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isListening, setIsListening] = useState(false)

  // Filter services based on current tier
  const availableServices = services.filter(service => {
    if (currentTier === 'Elite Plus') return true
    if (currentTier === 'Elite') return !service.tierRequired || service.tierRequired !== 'Elite Plus'
    return !service.tierRequired || service.tierRequired === 'Essential'
  })

  // AI Chat simulation
  const handleAiSubmit = () => {
    if (!aiQuery.trim()) return
    setIsAiTyping(true)
    
    // Simulate AI response
    setTimeout(() => {
      if (aiQuery.toLowerCase().includes('esg')) {
        setAiResponse('Your Chamber ESG Label application is currently in the Quality Check stage (Step 2 of 6). The review team is verifying your environmental metrics. Expected completion: 3 business days.')
      } else if (aiQuery.toLowerCase().includes('renew')) {
        setAiResponse('Your Elite membership expires in 12 days. I can help you renew it now. Would you like to maintain Elite tier or explore Elite Plus for advanced benefits like Procurement Hub access?')
      } else if (aiQuery.toLowerCase().includes('tender')) {
        setAiResponse('Based on your profile, I found 7 new tenders in the Global Tenders Hub matching your sector. The Expert Library also has a new report on international procurement strategies.')
      } else {
        setAiResponse(`I understand you're asking about "${aiQuery}". Let me connect you with the right service. Based on your query, I recommend checking our Business Development Services or Policy Advocacy programs.`)
      }
      setIsAiTyping(false)
    }, 1500)
  }

  const TierIcon = tierConfig[currentTier].icon

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-sm border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#3c7bf6] to-[#2563eb] rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-gray-900 font-semibold text-lg">AD Chamber One</h1>
                  <p className="text-gray-500 text-xs">Abu Dhabi Chamber Smart Services</p>
                </div>
              </div>

              {/* AI Search Bar - CENTER FOCUS */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative group">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-[#3c7bf6]/10 to-purple-500/10 rounded-2xl blur-xl transition-all duration-500",
                    isListening && "from-[#3c7bf6]/20 to-purple-500/20 animate-pulse"
                  )} />
                  <div className="relative bg-white rounded-2xl border border-gray-200 hover:border-[#3c7bf6]/50 shadow-sm hover:shadow-md transition-all duration-300">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                      placeholder="Ask AI anything: 'Check my ESG status' or 'Find tenders in my sector'"
                      className="w-full px-6 py-4 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <button 
                        onClick={() => setIsListening(!isListening)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          isListening ? "bg-[#3c7bf6] text-white animate-pulse" : "hover:bg-gray-100 text-gray-500"
                        )}
                      >
                        <Bot className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleAiSubmit}
                        className="p-2 bg-gradient-to-r from-[#3c7bf6] to-[#2563eb] rounded-lg hover:shadow-lg transition-all"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </button>
                <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>
                
                {/* User Menu with Tier Switcher */}
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border border-gray-200"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
                      tierConfig[currentTier].color
                    )}>
                      <TierIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 text-sm font-medium">ADNOC Representative</p>
                      <p className="text-gray-500 text-xs">{currentTier} Member</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
                      >
                        <div className="p-2">
                          <p className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wide">Switch Tier View</p>
                          {(['Essential', 'Elite', 'Elite Plus'] as MembershipTier[]).map((tier) => {
                            const Icon = tierConfig[tier].icon
                            return (
                              <button
                                key={tier}
                                onClick={() => {
                                  setCurrentTier(tier)
                                  setShowUserMenu(false)
                                }}
                                className={cn(
                                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all",
                                  currentTier === tier 
                                    ? "bg-[#3c7bf6]/10 text-gray-900" 
                                    : "hover:bg-gray-50 text-gray-600"
                                )}
                              >
                                <div className={cn(
                                  "w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center",
                                  tierConfig[tier].color
                                )}>
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="text-sm font-medium">{tier}</p>
                                  <p className="text-xs opacity-70">
                                    {tier === 'Essential' && 'Basic services'}
                                    {tier === 'Elite' && 'Premium services'}
                                    {tier === 'Elite Plus' && 'All services + exclusive'}
                                  </p>
                                </div>
                                {currentTier === tier && (
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                        <div className="border-t border-white/10 p-2">
                          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600">
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Settings</span>
                          </button>
                          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600">
                            <LogOut className="w-4 h-4" />
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
        </motion.header>

        {/* AI Response Bar */}
        <AnimatePresence>
          {(isAiTyping || aiResponse) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gradient-to-r from-[#3c7bf6]/5 to-purple-500/5 border-b border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#3c7bf6] to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    {isAiTyping ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                      </div>
                    ) : (
                      <p className="text-gray-700 text-sm">{aiResponse}</p>
                    )}
                  </div>
                  {aiResponse && (
                    <button 
                      onClick={() => setAiResponse('')}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Membership Card & AI Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Membership Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#3c7bf6]/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg">{mockMembership.companyName}</h3>
                  <p className="text-gray-500 text-sm">ID: {mockMembership.memberId}</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-medium",
                  tierConfig[currentTier].color
                )}>
                  {currentTier}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="text-green-400 text-sm font-medium flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Valid Until</span>
                  <span className="text-gray-900 text-sm">Dec 31, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Services Used</span>
                  <span className="text-gray-900 text-sm font-medium">
                    {currentTier === 'Essential' ? '3' : currentTier === 'Elite' ? '8' : '15'} this month
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button className="w-full py-2 bg-gradient-to-r from-[#3c7bf6] to-[#2563eb] rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all">
                  Renew Membership
                </button>
                {currentTier !== 'Elite Plus' && (
                  <button className="w-full py-2 bg-[#3c7bf6]/5 rounded-lg text-[#3c7bf6] text-sm font-medium hover:bg-[#3c7bf6]/10 transition-all border border-[#3c7bf6]/20">
                    Upgrade to {currentTier === 'Essential' ? 'Elite' : 'Elite Plus'}
                  </button>
                )}
              </div>
            </motion.div>

            {/* AI Insights Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold text-lg flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-[#3c7bf6]" />
                  AI Insights & Recommendations
                </h3>
                <span className="text-xs text-gray-500">Powered by AI</span>
              </div>

              <div className="space-y-3">
                {mockAiInsights.map((insight, index) => (
                  <motion.div 
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#3c7bf6]/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        insight.priority === 'high' && "bg-red-500/20",
                        insight.priority === 'medium' && "bg-yellow-500/20",
                        insight.priority === 'low' && "bg-green-500/20"
                      )}>
                        {insight.type === 'alert' && <AlertCircle className="w-4 h-4 text-red-400" />}
                        {insight.type === 'recommendation' && <TrendingUp className="w-4 h-4 text-yellow-400" />}
                        {insight.type === 'insight' && <Zap className="w-4 h-4 text-green-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm">{insight.text}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 text-xl font-semibold">
                Available Services ({availableServices.length})
              </h2>
              <button className="text-[#3c7bf6] text-sm hover:underline flex items-center">
                View All Services
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableServices.slice(0, 6).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedService(service)}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#3c7bf6]/30 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-medium text-sm mb-1">{service.name}</h4>
                      <p className="text-gray-500 text-xs">{service.department}</p>
                    </div>
                    {service.aiEnabled && (
                      <div className="w-6 h-6 bg-[#3c7bf6]/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-[#3c7bf6]" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      service.platform === 'ADC Platform' && "bg-[#3c7bf6]/10 text-[#3c7bf6]",
                      service.platform === 'TAMM' && "bg-green-500/10 text-green-600",
                      service.platform === 'Affiliates Platform' && "bg-purple-500/10 text-purple-600"
                    )}>
                      {service.platform}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#3c7bf6] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Applications & Payments Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="text-gray-900 font-semibold text-lg mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#3c7bf6]" />
                Recent Applications
              </h3>
              
              <div className="space-y-3">
                {mockApplications.map((app) => (
                  <div key={app.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-gray-900 text-sm font-medium">{app.service}</h4>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        app.status === 'Under Review' && "bg-yellow-500/10 text-yellow-600",
                        app.status === 'Submitted' && "bg-[#3c7bf6]/10 text-[#3c7bf6]",
                        app.status === 'Approved' && "bg-green-500/10 text-green-600"
                      )}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{app.department}</span>
                      <span>Updated {app.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pending Payments */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="text-gray-900 font-semibold text-lg mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-[#3c7bf6]" />
                Payments & Invoices
              </h3>
              
              <div className="space-y-3">
                {mockPayments.map((payment) => (
                  <div key={payment.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-gray-900 text-sm font-medium">{payment.description}</h4>
                      <span className="text-gray-900 font-semibold text-sm">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        payment.status === 'Pending' && "bg-yellow-500/10 text-yellow-600",
                        payment.status === 'Paid' && "bg-green-500/10 text-green-600",
                        payment.status === 'Overdue' && "bg-red-500/10 text-red-600"
                      )}>
                        {payment.status}
                      </span>
                      {payment.status === 'Pending' && (
                        <button className="text-xs text-[#3c7bf6] hover:underline">
                          Pay Now →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating AI Assistant Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#3c7bf6] to-[#8b5cf6] rounded-2xl shadow-2xl flex items-center justify-center group hover:shadow-3xl transition-all"
        >
          <Bot className="w-8 h-8 text-white" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
        </motion.button>
      </div>
    </div>
  )
}