import { 
  Building2, FileText, Award, Shield, TrendingUp, Users, 
  Briefcase, Package, Globe, HeartHandshake, BookOpen,
  Target, Coins, Scale, FileCheck, CreditCard, BarChart3,
  Sparkles, Zap, Crown
} from 'lucide-react'

export type ServiceTier = 'Essential' | 'Elite' | 'Elite Plus'

export interface ServiceData {
  id: string
  name: string
  description: string
  icon: any
  color: string
  tiers: ServiceTier[]
  processingTime: string
  isPopular?: boolean
}

export const availableServicesData: ServiceData[] = [
  // Essential Tier Services (Available to all)
  {
    id: '1',
    name: 'Trade License Renewal',
    description: 'Renew your trade license quickly and efficiently',
    icon: FileText,
    color: 'bg-blue-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: '1-2 days',
    isPopular: true
  },
  {
    id: '2',
    name: 'Certificate of Origin',
    description: 'Get certificates for export documentation',
    icon: Award,
    color: 'bg-green-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: 'Same day',
    isPopular: true
  },
  {
    id: '3',
    name: 'Membership Certificate',
    description: 'Official chamber membership verification',
    icon: Shield,
    color: 'bg-purple-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: 'Instant'
  },
  {
    id: '4',
    name: 'Commercial Registration',
    description: 'Register your business with the chamber',
    icon: Building2,
    color: 'bg-indigo-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: '2-3 days'
  },
  {
    id: '5',
    name: 'Good Standing Certificate',
    description: 'Proof of good standing with the chamber',
    icon: FileCheck,
    color: 'bg-orange-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: '1 day'
  },
  {
    id: '6',
    name: 'Business Directory Listing',
    description: 'List your business in our official directory',
    icon: Globe,
    color: 'bg-cyan-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: 'Instant'
  },
  {
    id: '7',
    name: 'Event Registration',
    description: 'Register for chamber events and workshops',
    icon: Users,
    color: 'bg-pink-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: 'Instant'
  },
  {
    id: '8',
    name: 'Document Attestation',
    description: 'Official attestation of business documents',
    icon: FileText,
    color: 'bg-red-500',
    tiers: ['Essential', 'Elite', 'Elite Plus'],
    processingTime: '1-2 days'
  },

  // Elite Tier Services (Elite and Elite Plus)
  {
    id: '9',
    name: 'ESG Certification',
    description: 'Environmental, Social & Governance certification',
    icon: HeartHandshake,
    color: 'bg-emerald-500',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: '5-7 days',
    isPopular: true
  },
  {
    id: '10',
    name: 'Policy Advocacy',
    description: 'Represent your interests in policy making',
    icon: Scale,
    color: 'bg-slate-500',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: 'Ongoing'
  },
  {
    id: '11',
    name: 'Business Matching',
    description: 'Connect with potential partners and clients',
    icon: Target,
    color: 'bg-violet-500',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: '2-3 days'
  },
  {
    id: '12',
    name: 'Market Intelligence Reports',
    description: 'Access detailed market analysis and insights',
    icon: BarChart3,
    color: 'bg-teal-500',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: 'Instant'
  },
  {
    id: '13',
    name: 'Trade Missions',
    description: 'Join official trade delegations',
    icon: Briefcase,
    color: 'bg-amber-500',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: 'Scheduled'
  },
  {
    id: '14',
    name: 'Legal Advisory',
    description: 'Get legal consultation for business matters',
    icon: Scale,
    color: 'bg-gray-600',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: '1-2 days'
  },
  {
    id: '15',
    name: 'Export Documentation',
    description: 'Complete export documentation services',
    icon: Package,
    color: 'bg-blue-600',
    tiers: ['Elite', 'Elite Plus'],
    processingTime: 'Same day'
  },

  // Elite Plus Exclusive Services
  {
    id: '16',
    name: 'AI Business Assistant',
    description: 'Personal AI-powered business advisory',
    icon: Sparkles,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    tiers: ['Elite Plus'],
    processingTime: 'Real-time',
    isPopular: true
  },
  {
    id: '17',
    name: 'Priority Fast-Track',
    description: 'Skip queues with premium processing',
    icon: Zap,
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    tiers: ['Elite Plus'],
    processingTime: 'Priority'
  },
  {
    id: '18',
    name: 'Executive Lounge Access',
    description: 'Access to exclusive business lounges',
    icon: Crown,
    color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    tiers: ['Elite Plus'],
    processingTime: 'Instant'
  },
  {
    id: '19',
    name: 'Dedicated Account Manager',
    description: 'Personal account management services',
    icon: Users,
    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    tiers: ['Elite Plus'],
    processingTime: 'Dedicated'
  }
]