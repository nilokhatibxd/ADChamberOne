'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Bell, Crown, X, ArrowUpRight, Award, FileText, CheckCircle2,
  User, Settings, UsersRound, ChevronRight, Calendar, Upload, 
  Edit2, LogOut, Plus, Menu, Building2, Globe, Target, Leaf,
  Users, Shield, TrendingUp, AlertCircle, Check, Clock, Briefcase
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type MembershipTier = 'Essential' | 'Elite' | 'Elite Plus'

const esgSteps = [
  { id: 1, title: 'Company Information', status: 'completed' },
  { id: 2, title: 'Environmental Impact', status: 'completed' },
  { id: 3, title: 'Social Responsibility', status: 'current' },
  { id: 4, title: 'Governance Standards', status: 'upcoming' },
  { id: 5, title: 'Documentation Upload', status: 'upcoming' },
  { id: 6, title: 'Review & Submit', status: 'upcoming' }
]

const assistantSuggestions = [
  {
    icon: Leaf,
    title: "Carbon Footprint Calculator",
    description: "Calculate and track your company's carbon emissions",
    action: "Open Tool"
  },
  {
    icon: Users,
    title: "Employee Wellbeing Survey",
    description: "Assess and improve workplace satisfaction",
    action: "Start Survey"
  },
  {
    icon: Shield,
    title: "Compliance Checklist",
    description: "Ensure all governance requirements are met",
    action: "View Checklist"
  },
  {
    icon: TrendingUp,
    title: "ESG Score Predictor",
    description: "Estimate your potential ESG rating",
    action: "Calculate Score"
  }
]

export default function ESGApplication() {
  const router = useRouter()
  const [currentTier] = useState<MembershipTier>('Elite Plus')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [currentStep, setCurrentStep] = useState(3)
  const [assistantInput, setAssistantInput] = useState('')

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

            {/* Center: ESG Application Status */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-green-600" strokeWidth={1.5} />
                <span className="text-sm font-medium text-green-700 font-[family-name:var(--font-poppins)]">ESG Certificate Application</span>
                <span className="text-sm text-green-600 font-[family-name:var(--font-poppins)]">• Step 3 of 6</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Close Button */}
              <button 
                onClick={() => router.push('/unified-portal')}
                className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 group"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-gray-800" strokeWidth={1.5} />
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
      </nav>

      {/* Main Content - 3 Column Grid */}
      <section className="px-6 pt-6">
        <div className="grid grid-cols-4 gap-4">
          {/* Column 1: Sidebar - Same as before */}
          <div className="col-span-1">
            <div className="relative bg-black rounded-[40px] overflow-hidden h-[calc(100vh-120px)]">
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

          {/* Columns 2-4: ESG Application Form and Assistant */}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {/* Left side: ESG Application Form (2 columns) */}
            <div className="col-span-2 space-y-4">
              {/* Progress Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[40px] p-6 border border-gray-100"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6 font-[family-name:var(--font-poppins)]">Application Progress</h2>
                
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-5 top-5 w-0.5 h-[280px] bg-gray-200"></div>
                  <div className="absolute left-5 top-5 w-0.5 h-[112px] bg-green-500 transition-all duration-500"></div>
                  
                  {/* Steps */}
                  <div className="space-y-8">
                    {esgSteps.map((step, index) => (
                      <div key={step.id} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'current' ? 'bg-blue-500 ring-4 ring-blue-100' :
                          'bg-gray-200'
                        }`}>
                          {step.status === 'completed' ? (
                            <Check className="w-5 h-5 text-white" strokeWidth={2} />
                          ) : step.status === 'current' ? (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          ) : (
                            <span className="text-xs text-gray-500">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium text-sm font-[family-name:var(--font-poppins)] ${
                            step.status === 'current' ? 'text-gray-900' : 
                            step.status === 'completed' ? 'text-gray-700' : 'text-gray-400'
                          }`}>
                            {step.title}
                          </h3>
                          {step.status === 'current' && (
                            <p className="text-xs text-gray-500 mt-1">In Progress</p>
                          )}
                        </div>
                        {step.status === 'current' && (
                          <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Current Step Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-[40px] p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Social Responsibility</h2>
                  <span className="text-sm text-gray-500">Step 3 of 6</span>
                </div>

                <div className="space-y-6">
                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-poppins)]">
                      Employee Wellbeing Programs
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-[family-name:var(--font-poppins)]"
                      rows={4}
                      placeholder="Describe your employee wellbeing initiatives..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-poppins)]">
                      Community Engagement
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-[family-name:var(--font-poppins)]"
                      rows={4}
                      placeholder="Detail your community outreach and CSR activities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-[family-name:var(--font-poppins)]">
                      Diversity & Inclusion Metrics
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-[family-name:var(--font-poppins)]"
                        placeholder="Gender diversity %"
                      />
                      <input
                        type="text"
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-[family-name:var(--font-poppins)]"
                        placeholder="Cultural diversity %"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-4">
                    <button className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors font-[family-name:var(--font-poppins)]">
                      Previous Step
                    </button>
                    <div className="flex gap-3">
                      <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 font-medium text-sm transition-all font-[family-name:var(--font-poppins)]">
                        Save Draft
                      </button>
                      <button className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 font-medium text-sm transition-all font-[family-name:var(--font-poppins)] flex items-center gap-2">
                        Continue
                        <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side: Business Assistant (1 column) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 bg-white rounded-[40px] p-6 border border-gray-100 h-[calc(100vh-120px)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">Your Business Assistant</h3>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Assistant Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {/* AI Welcome Message */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-[family-name:var(--font-poppins)]">
                        Great progress on your ESG application! You're currently on Step 3: Social Responsibility. 
                        This section typically takes 15-20 minutes to complete.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tip */}
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs font-medium text-yellow-800 mb-1">Pro Tip</p>
                      <p className="text-xs text-yellow-700">
                        Companies with detailed employee wellbeing programs score 25% higher in social responsibility metrics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggested Actions */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Suggested Tools</p>
                  
                  {assistantSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                          <suggestion.icon className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">
                            {suggestion.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">{suggestion.description}</p>
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 transition-colors">
                            {suggestion.action} →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Recent Progress</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600">Company Information completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600">Environmental Impact completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                      <span className="text-xs text-gray-600">Social Responsibility in progress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
                  <input
                    type="text"
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    placeholder="Ask about ESG requirements..."
                    className="bg-transparent text-gray-700 placeholder-gray-400 text-sm flex-1 outline-none font-[family-name:var(--font-poppins)]"
                  />
                  <button className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}