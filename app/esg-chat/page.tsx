'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, ArrowUpRight, Award, 
  FileText, CheckCircle2, AlertCircle, Clock, ChevronRight,
  Download, Upload, Leaf, Users, Shield, TrendingUp, CreditCard,
  Edit2, Plus, Sparkles, Building2, Mail, Phone, Globe, MapPin,
  Calendar, BarChart3, Target, Zap, Check, X, Info
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// TypewriterText Component
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 20)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-4 bg-gray-600 animate-pulse ml-0.5"></span>
      )}
    </span>
  )
}

// Suggestion Cards Component - Bigger and more prominent
const SuggestionCards = ({ suggestions, onSelect }: { 
  suggestions: { title: string, icon: any, description: string, isBlue?: boolean }[], 
  onSelect: (text: string) => void
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {suggestions.map((suggestion, index) => {
        const isPrefill = suggestion.title.includes('Prefill')
        const isDisabled = !isPrefill && !suggestion.isBlue
        
        // Special styling for "Continue" option
        if (suggestion.isBlue) {
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect("Continue where we left off")}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group text-left flex items-center justify-center"
            >
              <span className="text-sm font-semibold text-[#3c7bf6]">{suggestion.title}</span>
            </motion.button>
          )
        }
        
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !isDisabled && onSelect(suggestion.title)}
            disabled={isDisabled}
            className={`bg-white border rounded-xl p-4 transition-all group text-left ${
              isDisabled 
                ? 'border-gray-100 opacity-50 cursor-not-allowed' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            <div className="mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                isDisabled
                  ? 'bg-gray-50'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200'
              }`}>
                <suggestion.icon className={`w-5 h-5 ${isDisabled ? 'text-gray-400' : 'text-blue-600'}`} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className={`text-sm font-semibold mb-1 ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
              {suggestion.title}
            </h3>
            <p className={`text-xs ${isDisabled ? 'text-gray-300' : 'text-gray-500'}`}>
              {suggestion.description}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}

// Accordion Section Component
const AccordionSection = ({ 
  title, 
  isComplete, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  title: string
  isComplete: boolean
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
          )}
          <span className={`font-medium ${isComplete ? 'text-gray-900' : 'text-gray-600'}`}>
            {title}
          </span>
        </div>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 border-t border-gray-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Required Documents List with Upload Assessment
const RequiredDocumentsList = () => {
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  
  const requiredDocs = [
    { name: 'ESG / Sustainability Policy', description: 'ESG commitment document', icon: FileText },
    { name: 'Latest ESG / Sustainability Report', description: 'Annual sustainability report', icon: BarChart3 },
    { name: 'Governance or Ethics Policy', description: 'Governance framework & code of conduct', icon: Shield },
    { name: 'Trade License', description: 'Valid license for verification', icon: Award }
  ]
  
  const handleFileSelect = () => {
    setIsUploading(true)
    // Simulate AI document analysis
    setTimeout(() => {
      setUploadedDocs([
        { 
          name: 'Screenshot 2025-12-11 at 11.23.19 PM.png',
          type: 'Esg policy',
          status: 'verified',
          message: 'Document appears to be a valid ESG policy. Contains key sustainability commitments.'
        },
        { 
          name: 'Screenshot 2025-12-11 at 11.23.30 PM.png',
          type: 'Sustainability report',
          status: 'verified',
          message: 'Sustainability report identified. Includes GRI-aligned disclosures.'
        },
        { 
          name: 'Screenshot 2025-12-11 at 11.23.34 PM.png',
          type: 'Governance policy',
          status: 'pending',
          message: 'Document received for review.'
        }
      ])
      setIsUploading(false)
    }, 2000)
  }
  
  if (uploadedDocs.length > 0) {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-500" />
          Uploaded Documents
        </h4>
        {uploadedDocs.map((doc, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">{doc.name}</p>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-blue-600 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {doc.type}
                  </p>
                  <button 
                    onClick={() => setUploadedDocs(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className={`text-xs ${doc.status === 'verified' ? 'text-green-600' : 'text-gray-500'}`}>
                  {doc.status === 'verified' && '✅ '}{doc.message}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
          <button onClick={handleFileSelect} className="text-sm text-gray-600 hover:text-gray-800">
            + Add more documents
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-red-500" />
        Required Documents
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {requiredDocs.map((doc, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <doc.icon className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors mt-4">
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-600">Analyzing documents with AI...</p>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Drop documents here or browse</p>
            <button onClick={handleFileSelect} className="mt-2 px-4 py-2 bg-black text-white rounded-lg text-xs hover:bg-gray-800">
              Select Files
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// Animated Application Canvas with progressive completion
const AnimatedApplicationCanvas = ({ data }: { data: any }) => {
  const [sectionStatus, setSectionStatus] = useState({
    applicant: 'loading',
    esg: 'loading',
    documents: 'pending'
  })
  
  const [expandedSections, setExpandedSections] = useState({
    applicant: false,
    esg: false,
    documents: true
  })
  
  // Animate section completion
  useEffect(() => {
    // Complete applicant info first
    setTimeout(() => {
      setSectionStatus(prev => ({ ...prev, applicant: 'complete' }))
      // Start ESG profile
      setTimeout(() => {
        setSectionStatus(prev => ({ ...prev, esg: 'complete' }))
        // Documents ready for upload
        setTimeout(() => {
          setSectionStatus(prev => ({ ...prev, documents: 'ready' }))
        }, 1000)
      }, 1500)
    }, 500)
  }, [])
  
  const toggleSection = (section: string) => {
    setExpandedSections({
      applicant: section === 'applicant',
      esg: section === 'esg',
      documents: section === 'documents'
    })
  }
  
  const LoadingSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-5 h-5"
    >
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray-200" />
        <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-500" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-3"
    >
      {/* Applicant Information - Animated */}
      <AccordionSection
        title="Applicant Information" 
        isComplete={sectionStatus.applicant === 'complete'}
        isExpanded={expandedSections.applicant}
        onToggle={() => toggleSection('applicant')}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Applicant Name *</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
              defaultValue="Ahmed Al Rashid" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Organization Name *</label>
            <input 
              type="text" 
              placeholder="Enter organization name"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
              defaultValue="Abu Dhabi Tech Solutions" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Email Address *</label>
            <input 
              type="email" 
              placeholder="Enter email address"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
              defaultValue="ahmed.rashid@adts.ae" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Phone Number *</label>
            <input 
              type="tel" 
              placeholder="+971 XX XXX XXXX"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
              defaultValue="+971 50 123 4567" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Trade License Number *</label>
            <input 
              type="text" 
              placeholder="Enter trade license number"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
              defaultValue="CN-2847569" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Country *</label>
            <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" defaultValue="UAE">
              <option>Select country</option>
              <option value="UAE">United Arab Emirates</option>
              <option>Saudi Arabia</option>
              <option>Qatar</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Sector *</label>
            <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" defaultValue="Technology">
              <option>Select a sector</option>
              <option value="Technology">Technology</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Sub-sector (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., Renewable Energy"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
              defaultValue="Cloud Computing & AI" 
            />
          </div>
        </div>
      </AccordionSection>
      
      {/* ESG Profile - Animated */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <button
          onClick={() => toggleSection('esg')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {sectionStatus.esg === 'loading' ? (
              <LoadingSpinner />
            ) : sectionStatus.esg === 'complete' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            )}
            <span className={`font-medium ${sectionStatus.esg === 'complete' ? 'text-gray-900' : 'text-gray-600'}`}>
              ESG Profile
            </span>
          </div>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.esg ? 'rotate-90' : ''}`} />
        </button>
        
        <AnimatePresence>
          {expandedSections.esg && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-4 border-t border-gray-100 space-y-6">
                {/* Environmental */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600">🌱</span> Environmental (E)
                  </h4>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm h-32 resize-none mb-4"
                    placeholder="Describe environmental sustainability efforts..."
                    defaultValue="We have implemented comprehensive sustainability measures including 60% renewable energy usage, zero-waste-to-landfill program, and ISO 14001 certified environmental management system."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Carbon emissions" defaultValue="8,500 tCO2e (35% reduction YoY)" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Energy reduction" defaultValue="60% renewable sources" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Waste management" defaultValue="Zero waste to landfill" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Water conservation" defaultValue="40% water recycled" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">👥</span> Social (S)
                  </h4>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm h-32 resize-none mb-4"
                    placeholder="Describe social responsibility programs..."
                    defaultValue="Strong commitment to diversity with 45% female workforce, comprehensive employee wellness programs, and active community engagement through STEM education initiatives."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Workforce diversity" defaultValue="45% female workforce" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Community programs" defaultValue="12 STEM workshops/year" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Health & safety" defaultValue="Zero workplace incidents" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Employee wellbeing" defaultValue="95% satisfaction score" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                  </div>
                </div>

                {/* Governance */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-purple-600">⚖️</span> Governance (G)
                  </h4>
                  <textarea 
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm h-32 resize-none mb-4"
                    placeholder="Describe governance structure and compliance practices..."
                    defaultValue="Independent board with 7 members including 3 independent directors. Robust compliance framework with quarterly audits and transparent reporting practices."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Board structure" defaultValue="7 members, 3 independent" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Compliance frameworks" defaultValue="ISO 27001, SOC2 certified" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Risk management" defaultValue="Quarterly audits" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                    <input type="text" placeholder="Transparency" defaultValue="100% GRI compliant" className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Documents - Expanded by default */}
      <AccordionSection
        title="Documents"
        isComplete={false}
        isExpanded={expandedSections.documents}
        onToggle={() => toggleSection('documents')}
      >
        <RequiredDocumentsList />
      </AccordionSection>
      
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-medium">Note:</span> All submitted documents will be verified by Abu Dhabi Chamber. 
          Processing typically takes 3-5 business days. You'll receive email updates on your application status.
        </p>
      </div>
      
      {/* Submit Button */}
      <button className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-colors">
        Submit ESG Application
      </button>
    </motion.div>
  )
}

// Application Canvas Component - Accordion style
const ApplicationCanvas = ({ data, onFieldEdit }: { 
  data: any, 
  onFieldEdit: (field: string, value: any) => void 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    applicant: true,
    esg: false,
    documents: false
  })
  
  const [documents, setDocuments] = useState<{name: string, status: string}[]>([])
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-3"
    >
      {/* Applicant Information Section */}
      <AccordionSection
        title="Applicant Information"
        isComplete={true}
        isExpanded={expandedSections.applicant}
        onToggle={() => toggleSection('applicant')}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Applicant Name *</label>
            <input 
              type="text" 
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
              defaultValue="Ahmed Al Rashid"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Organization Name *</label>
            <input 
              type="text" 
              placeholder="Enter organization name"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
              defaultValue="Abu Dhabi Tech Solutions"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Email Address *</label>
            <input 
              type="email" 
              placeholder="Enter email address"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
              defaultValue="ahmed.rashid@adts.ae"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Phone Number *</label>
            <input 
              type="tel" 
              placeholder="+971 XX XXX XXXX"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
              defaultValue="+971 50 123 4567"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Trade License Number *</label>
            <input 
              type="text" 
              placeholder="Enter trade license number"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
              defaultValue="CN-2847569"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Country *</label>
            <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" defaultValue="UAE">
              <option>Select country</option>
              <option value="UAE">United Arab Emirates</option>
              <option>Saudi Arabia</option>
              <option>Qatar</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Sector *</label>
            <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" defaultValue="Technology">
              <option>Select a sector</option>
              <option value="Technology">Technology</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Sub-sector (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., Renewable Energy"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm"
              defaultValue="Cloud Computing & AI"
            />
          </div>
        </div>
      </AccordionSection>

      {/* ESG Profile Section */}
      <AccordionSection
        title="ESG Profile"
        isComplete={true}
        isExpanded={expandedSections.esg}
        onToggle={() => toggleSection('esg')}
      >
        <div className="space-y-6">
          {/* Environmental */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-green-600">🌱</span> Environmental (E)
            </h4>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm h-32 resize-none mb-4"
              placeholder="Describe environmental sustainability efforts..."
              defaultValue="We have implemented comprehensive sustainability measures including 60% renewable energy usage, zero-waste-to-landfill program, and ISO 14001 certified environmental management system."
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Carbon emissions"
                  defaultValue="8,500 tCO2e (35% reduction YoY)" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Energy reduction"
                  defaultValue="60% renewable sources" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Waste management"
                  defaultValue="Zero waste to landfill" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Water conservation"
                  defaultValue="40% water recycled" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-blue-600">👥</span> Social (S)
            </h4>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm h-32 resize-none mb-4"
              placeholder="Describe social responsibility programs..."
              defaultValue="Strong commitment to diversity with 45% female workforce, comprehensive employee wellness programs, and active community engagement through STEM education initiatives."
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Workforce diversity"
                  defaultValue="45% female workforce" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Community programs"
                  defaultValue="12 STEM workshops/year" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Health & safety"
                  defaultValue="Zero workplace incidents" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Employee wellbeing"
                  defaultValue="95% satisfaction score" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
            </div>
          </div>

          {/* Governance */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-purple-600">⚖️</span> Governance (G)
            </h4>
            <textarea 
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm h-32 resize-none mb-4"
              placeholder="Describe governance structure and compliance practices..."
              defaultValue="Independent board with 7 members including 3 independent directors. Robust compliance framework with quarterly audits and transparent reporting practices."
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Board structure"
                  defaultValue="7 members, 3 independent" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Compliance frameworks"
                  defaultValue="ISO 27001, SOC2 certified" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Risk management"
                  defaultValue="Quarterly audits" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Transparency"
                  defaultValue="100% GRI compliant" 
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none text-sm" 
                />
              </div>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Documents Section */}
      <AccordionSection
        title="Documents"
        isComplete={false}
        isExpanded={expandedSections.documents}
        onToggle={() => toggleSection('documents')}
      >
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm flex-1">{doc.name}</span>
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                ✓ Verified
              </span>
              <button className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600">Drop files here or click to browse</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS up to 10MB</p>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-3">
            * Documents will be verified by Abu Dhabi Chamber officials within 24-48 hours
          </p>
        </div>
      </AccordionSection>
    </motion.div>
  )
}

// File Upload Component
const FileUpload = ({ count = 0 }: { count?: number }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">{count} documents uploaded</span>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>
      <button className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-gray-700">
        <Upload className="w-4 h-4" />
        <span className="text-sm font-medium">Upload new document</span>
      </button>
    </div>
  )
}

// Action Tools Component
const ActionTools = () => {
  const tools = [
    { icon: Leaf, title: "Carbon Calculator", description: "Calculate emissions" },
    { icon: Users, title: "Employee Survey", description: "Wellbeing assessment" },
    { icon: Shield, title: "Compliance Check", description: "Verify requirements" },
    { icon: TrendingUp, title: "ESG Score", description: "Estimate rating" }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {tools.map((tool, index) => (
        <button
          key={index}
          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group text-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
              <tool.icon className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{tool.title}</p>
              <p className="text-xs text-gray-500">{tool.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

interface Message {
  role: 'user' | 'assistant' | 'alert'
  content: string | JSX.Element
  typing?: boolean
}

export default function ESGChat() {
  const router = useRouter()
  const [isRenewal, setIsRenewal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // 0-based index, 0 = Applicant Information (at 10%)
  const [applicationData, setApplicationData] = useState({
    companyName: 'Abu Dhabi Tech Solutions',
    tradeLicense: 'CN-2847569',
    industry: 'Technology Services',
    employees: '250-500',
    energySource: '60% Renewable',
    wasteManagement: 'Zero Landfill'
  })
  
  // Initialize messages
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([
    {
      title: "Prefill Application",
      icon: Sparkles,
      description: "Auto-complete with AI"
    },
    {
      title: "View ESG Score",
      icon: BarChart3,
      description: "Calculate current rating"
    },
    {
      title: "Generate Report",
      icon: FileText,
      description: "Create sustainability docs"
    },
    {
      title: "→ Continue where we left off",
      icon: null,
      description: "",
      isBlue: true
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const steps = [
    'Applicant Information',
    'ESG Profile', 
    'Documents'
  ]
  
  // For 10% progress in first step
  const progressPercentage = 10

  // Check if coming from renewal link and set initial message
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('renewal') === 'true') {
      setIsRenewal(true)
      setMessages([
        { 
          role: 'assistant', 
          content: "Welcome back! I'll help you renew your ESG certificate." 
        }
      ])
      setSuggestions([
        {
          title: "Prefill from Last Year",
          icon: Clock,
          description: "Use previous data"
        },
        {
          title: "What's Changed",
          icon: AlertCircle,
          description: "View new requirements"
        },
        {
          title: "Review Score",
          icon: TrendingUp,
          description: "Previous ESG rating"
        },
        {
          title: "→ Continue where we left off",
          icon: null,
          description: "",
          isBlue: true
        }
      ])
    } else {
      setMessages([
        { 
          role: 'assistant', 
          content: "Hi! I'm here to help you complete your ESG application. I can prefill forms, calculate scores, and provide AI suggestions." 
        }
      ])
    }
  }, [])

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || inputValue
    if (messageText.trim()) {
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: messageText }])
      setInputValue('')
      
      // Handle different commands
      setTimeout(() => {
        if (messageText.toLowerCase().includes('prefill')) {
          // Show the application canvas with animation
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Based on your business profile and our previous chats, I've prefilled your application below."
          }])
          
          // Add animated canvas after a delay
          setTimeout(() => {
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: <AnimatedApplicationCanvas data={applicationData} />
            }])
            
            // Update suggestions after prefill
            setSuggestions([
              {
                title: "Upload Required Documents",
                icon: Upload,
                description: "Add ESG policies & reports"
              },
              {
                title: "Calculate ESG Score",
                icon: BarChart3,
                description: "View your rating"
              },
              {
                title: "Get AI Recommendations",
                icon: Sparkles,
                description: "Improve your score"
              },
              {
                title: "Submit Application",
                icon: Check,
                description: "Final submission"
              }
            ])
          }, 500)
          
          // Update step progress
          setCurrentStep(2)
        } else if (messageText.toLowerCase().includes('continue where we left off')) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Let's continue with your applicant information. What's your organization name?</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Organization Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Enter organization name..." />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Trade License Number</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Enter trade license number..." />
                    </div>
                    <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
                      Continue to ESG Profile
                    </button>
                  </div>
                </div>
              </div>
            )
          }])
        } else if (messageText.toLowerCase().includes('score')) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: (
              <div>
                <p className="mb-3 text-sm">Your projected ESG score based on current data:</p>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold text-gray-900">78/100</span>
                    <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">Above Average</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Environmental</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="w-[82%] h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">82</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Social</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="w-[75%] h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">Governance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="w-[77%] h-full bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">77</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }])
        } else if (messageText.toLowerCase().includes('diversity')) {
          setInputValue('Our diversity metrics show 45% female leadership, 12 nationalities represented, and 3 accessibility programs')
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "I've analyzed your workforce data and generated diversity metrics. Press enter to submit or edit as needed." 
          }])
        } else if (messageText.toLowerCase().includes('sustainability report')) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: (
              <div className="space-y-3">
                <p className="text-sm font-medium">Generating your sustainability report...</p>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">2024 Sustainability Report</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      Carbon emissions reduced by 35%
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      100% renewable energy in main facilities
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      Zero waste to landfill achieved
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      Employee satisfaction at 87%
                    </li>
                  </ul>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Download Full Report
                  </button>
                </div>
              </div>
            )
          }])
        } else {
          // Default helpful response
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "I can help you with that. Try asking me to 'Prefill this application' or check your ESG score." 
          }])
        }
      }, 1000)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex-shrink-0">
        {/* Top Bar with Logo */}
        <div className="px-4 md:px-8 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#3c7bf6] rounded-xl flex items-center justify-center">
              <img src="/logo.svg" alt="ADChamber Logo" className="w-6 h-6 brightness-0 invert" />
            </div>
            <span className="text-xl font-semibold text-black font-[family-name:var(--font-poppins)]">ADChamber One</span>
          </div>
        </div>
        
        {/* Back Button and Title Section - Match chat width */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => router.push('/unified-portal')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back to Dashboard
            </button>
            
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-200 rounded-full hover:bg-gray-50">
              <span>About this Service</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <h1 className="text-2xl font-light text-gray-900 mb-3">
            {isRenewal ? 'ESG Certificate Renewal' : 'ESG Certificate Application'}
          </h1>
          
          <div className="border-t border-gray-200 pt-3">
            {/* Progress Section */}
            <div className="flex items-center gap-3">
              {/* Progress Bar with percentage */}
              <div className="flex-1 flex items-center gap-3">
                <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-400"
                    initial={{ width: '10%' }}
                    animate={{ width: '10%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">10%</span>
              </div>
              
              {/* Stepper far right */}
              <div className="flex items-center gap-3">
                {['Applicant Information', 'ESG Profile', 'Documents'].map((step, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-amber-400' : 'bg-gray-200'
                    }`}>
                      {index === 0 ? (
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      ) : (
                        <span className="text-gray-500 text-[10px] font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs hidden lg:inline ${
                      index === 0 ? 'text-gray-900 font-medium' : 'text-gray-400'
                    }`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-px bg-gray-200"></div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
            
            {/* Suggestion Cards - Show only when no/few messages */}
            {messages.length <= 1 && suggestions.length > 0 && (
              <SuggestionCards 
                suggestions={suggestions}
                onSelect={(text) => handleSend(text)}
              />
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    message.role === 'user' 
                      ? 'flex justify-end' 
                      : 'flex justify-start'
                  }`}
                >
                  <div className={`${
                    message.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-900'
                  } rounded-2xl px-4 py-3 max-w-[85%] ${
                    typeof message.content !== 'string' ? 'w-full' : ''
                  }`}>
                    {message.typing ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : typeof message.content === 'string' ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      message.content
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Input Field */}
            <div className="py-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message or click a suggestion..."
                    className="bg-transparent text-gray-700 placeholder-gray-400 text-sm flex-1 outline-none font-[family-name:var(--font-poppins)]"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim()}
                    className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}