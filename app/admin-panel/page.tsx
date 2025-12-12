'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, Bell, Menu, X, User, Settings, UsersRound, LogOut,
  TrendingUp, FileText, Clock, CheckCircle2, AlertCircle, XCircle,
  Building2, Award, BarChart3, Users, ArrowUpRight, Filter, Eye,
  Calendar, MoreHorizontal, Download
} from 'lucide-react'

export default function AdminPanel() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock application data
  const applications = [
    {
      id: 'APP-2024-001',
      company: 'Falcon Technologies LLC',
      service: 'ESG Certificate',
      status: 'under_review',
      priority: 'high',
      submittedDate: '2024-01-15',
      aiScore: 85,
      estimatedCompletion: '3-5 days'
    },
    {
      id: 'APP-2024-002', 
      company: 'Emirates Innovation Hub',
      service: 'Business Matchmaking',
      status: 'approved',
      priority: 'medium',
      submittedDate: '2024-01-14',
      aiScore: 92,
      estimatedCompletion: 'Completed'
    },
    {
      id: 'APP-2024-003',
      company: 'Gulf Energy Solutions',
      service: 'Trade License Renewal',
      status: 'pending_documents',
      priority: 'medium',
      submittedDate: '2024-01-13',
      aiScore: 78,
      estimatedCompletion: '7-10 days'
    },
    {
      id: 'APP-2024-004',
      company: 'Abu Dhabi Tech Ventures',
      service: 'Global Tenders Hub',
      status: 'rejected',
      priority: 'low',
      submittedDate: '2024-01-12',
      aiScore: 45,
      estimatedCompletion: 'N/A'
    },
    {
      id: 'APP-2024-005',
      company: 'Desert Capital Partners',
      service: 'Chamber Boost',
      status: 'under_review',
      priority: 'high',
      submittedDate: '2024-01-11',
      aiScore: 88,
      estimatedCompletion: '2-3 days'
    }
  ]

  const stats = {
    totalApplications: 247,
    pendingReview: 45,
    approved: 156,
    rejected: 23,
    avgProcessingTime: '4.2 days',
    avgAiScore: 82
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'pending_documents': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
      case 'under_review': return <Clock className="w-4 h-4" strokeWidth={1.5} />
      case 'pending_documents': return <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
      case 'rejected': return <XCircle className="w-4 h-4" strokeWidth={1.5} />
      default: return <FileText className="w-4 h-4" strokeWidth={1.5} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredApplications = selectedFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedFilter)

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Same Navigation Header */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo and Hamburger */}
            <div className="flex items-center">
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
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors font-[family-name:var(--font-poppins)]"
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
              <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
                <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-full shadow-sm font-[family-name:var(--font-poppins)] transition-all">
                  EN
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-full font-[family-name:var(--font-poppins)] transition-all hover:bg-gray-50">
                  عربي
                </button>
              </div>

              <button className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-600" strokeWidth={1.5} />
              </button>

              <button className="relative w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-600" strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full" />
              </button>

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
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Admin Panel
                </button>
                <button 
                  onClick={() => {router.push('/leadership'); setShowMobileMenu(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors font-[family-name:var(--font-poppins)]"
                >
                  Leadership
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Dashboard Content */}
      <main className="px-4 md:px-8 pt-6 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-3">Admin Dashboard</h1>
          <p className="text-gray-500 font-light font-[family-name:var(--font-poppins)]">Manage service applications and monitor performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[40px] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-1">{stats.totalApplications}</p>
              <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Total Applications</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light font-[family-name:var(--font-poppins)]">All time submissions</p>
            </div>
          </motion.div>

          {/* Pending Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[40px] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-yellow-600" strokeWidth={1.5} />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-1">{stats.pendingReview}</p>
              <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Pending Review</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light font-[family-name:var(--font-poppins)]">Awaiting assessment</p>
            </div>
          </motion.div>

          {/* Approved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[40px] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={1.5} />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-1">{stats.approved}</p>
              <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Approved</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light font-[family-name:var(--font-poppins)]">Successfully completed</p>
            </div>
          </motion.div>

          {/* Rejected */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[40px] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" strokeWidth={1.5} />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-1">{stats.rejected}</p>
              <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Rejected</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light font-[family-name:var(--font-poppins)]">Did not meet criteria</p>
            </div>
          </motion.div>

          {/* Avg Processing Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[40px] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-600" strokeWidth={1.5} />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-1">{stats.avgProcessingTime}</p>
              <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Avg Processing Time</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light font-[family-name:var(--font-poppins)]">From submission to approval</p>
            </div>
          </motion.div>

          {/* AI Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-[40px] p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />
              </div>
              <button className="w-10 h-10 rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:border-gray-400">
                <ArrowUpRight className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-1">{stats.avgAiScore}%</p>
              <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Average AI Score</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-light font-[family-name:var(--font-poppins)]">AI assessment quality</p>
            </div>
          </motion.div>
        </div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-[40px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Table Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-light text-gray-900 font-[family-name:var(--font-poppins)] mb-2">Recent Applications</h3>
                <p className="text-sm font-light text-gray-500 font-[family-name:var(--font-poppins)]">Manage and review service applications</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-light font-[family-name:var(--font-poppins)] outline-none focus:border-blue-500 bg-gray-50"
                >
                  <option value="all">All Status</option>
                  <option value="under_review">Under Review</option>
                  <option value="pending_documents">Pending Documents</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-gray-50">
                  <Download className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/30">
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">Application</th>
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">Company</th>
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">Service</th>
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">Status</th>
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">AI Score</th>
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">Completion</th>
                  <th className="px-8 py-5 text-left text-xs font-light text-gray-400 uppercase tracking-wider font-[family-name:var(--font-poppins)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredApplications.map((app, index) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-8 rounded-full ${getPriorityColor(app.priority)}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">{app.id}</p>
                          <p className="text-xs text-gray-500 font-[family-name:var(--font-poppins)]">{app.submittedDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">{app.company}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 font-[family-name:var(--font-poppins)]">{app.service}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)} font-[family-name:var(--font-poppins)]`}>
                        {getStatusIcon(app.status)}
                        {app.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${app.aiScore >= 80 ? 'bg-green-500' : app.aiScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${app.aiScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-[family-name:var(--font-poppins)]">{app.aiScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 font-[family-name:var(--font-poppins)]">{app.estimatedCompletion}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}