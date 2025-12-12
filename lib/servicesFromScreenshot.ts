// Services from Kareem's prototype screenshot - EXACT services from ADCCI
export interface ServiceDetail {
  id: string
  name: string
  description: string
  department: string
  platform: 'Affiliates' | 'ADC' | 'TAMM'
  processingTime: string
  isNew?: boolean
  isAI?: boolean
}

export const chambersServices: ServiceDetail[] = [
  // Row 1
  {
    id: '1',
    name: 'ADSM & UAE Academy',
    description: 'Abu Dhabi Securities Market and UAE Academy for financial education and investment services',
    department: 'Education & Finance',
    platform: 'Affiliates',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '2', 
    name: 'Abu Dhabi Businesswomen Council',
    description: 'Empowering women in business through networking, mentorship, and development programs',
    department: 'Women Programs',
    platform: 'Affiliates',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '3',
    name: 'Abu Dhabi Youth Business Council',
    description: 'Support and networking platform for young entrepreneurs and business professionals',
    department: 'Youth Programs',
    platform: 'Affiliates',
    processingTime: 'External link',
    isNew: false
  },

  // Row 2
  {
    id: '4',
    name: 'Branch Membership Registration – Industrial Areas',
    description: 'Register branch membership for businesses in industrial areas',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '5',
    name: 'Business Development Services',
    description: 'Strategic consulting and support services to help grow and develop your business',
    department: 'Business Development',
    platform: 'ADC',
    processingTime: '2-3 days',
    isAI: true
  },
  {
    id: '6',
    name: 'Business Enablement Advisory',
    description: 'Expert advisory services to enable and support business operations and growth initiatives',
    department: 'Advisory Services',
    platform: 'ADC',
    processingTime: '2-3 days',
    isAI: true
  },

  // Row 3
  {
    id: '7',
    name: 'Businessman Certificate',
    description: 'Obtain a certificate verifying your status as a registered businessman',
    department: 'Documentation Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '8',
    name: 'Certificate of Origin',
    description: 'Obtain certificates of origin for your exported goods and products',
    department: 'Trade Documentation',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '9',
    name: 'Certified Membership Translation',
    description: 'Get certified translations of your membership documents',
    department: 'Documentation Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },

  // Row 4
  {
    id: '10',
    name: 'Chamber Boost',
    description: 'Comprehensive support program to accelerate business growth and market expansion',
    department: 'Business Support',
    platform: 'ADC',
    processingTime: '2-3 days',
    isAI: true
  },
  {
    id: '11',
    name: 'Chamber Business Matchmaking',
    description: 'Connect with potential business partners, investors, and collaborators through matchmaking services',
    department: 'Business Development',
    platform: 'ADC',
    processingTime: '2-3 days',
    isAI: true
  },
  {
    id: '12',
    name: 'Chamber ESG Label',
    description: 'Apply for ESG (Environmental, Social, Governance) certification to demonstrate your commitment to sustainability',
    department: 'Sustainability',
    platform: 'ADC',
    processingTime: '5-7 days',
    isAI: true
  },

  // Row 5
  {
    id: '13',
    name: 'Conciliation and Mediation',
    description: 'Alternative dispute resolution services through conciliation and mediation',
    department: 'Legal Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '14',
    name: 'Contract Guard',
    description: 'Contract protection and verification services to secure your business agreements',
    department: 'Legal Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '15',
    name: 'Data Hub',
    description: 'Access comprehensive business data, analytics, and market insights for informed decision-making',
    department: 'Research & Analytics',
    platform: 'ADC',
    processingTime: 'Instant',
    isAI: true
  },

  // Row 6
  {
    id: '16',
    name: 'Expert Library',
    description: 'Access a comprehensive library of expert resources, guides, and knowledge materials',
    department: 'Knowledge Services',
    platform: 'ADC',
    processingTime: 'Instant',
    isAI: true
  },
  {
    id: '17',
    name: 'Family Business',
    description: 'Support services for family owned businesses including succession planning and governance',
    department: 'Family Business',
    platform: 'Affiliates',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '18',
    name: 'Flagship & Sectoral Reports',
    description: 'Access in-depth flagship reports and sector-specific analysis for strategic planning',
    department: 'Research & Analytics',
    platform: 'ADC',
    processingTime: 'Instant',
    isAI: true
  },

  // Row 7
  {
    id: '19',
    name: 'Franchise',
    description: 'Franchise development and support services for businesses looking to expand through franchising',
    department: 'Franchise Services',
    platform: 'Affiliates',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '20',
    name: 'Global Tenders Hub',
    description: 'Access international tender opportunities and procurement notices from around the world',
    department: 'Trade Services',
    platform: 'ADC',
    processingTime: '2-3 days',
    isAI: true
  },
  {
    id: '21',
    name: 'Legal Consultancy',
    description: 'Professional legal consultation services for businesses and investors',
    department: 'Legal Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },

  // Row 8
  {
    id: '22',
    name: 'Market Directory',
    description: 'Comprehensive directory of businesses, suppliers, and market participants in Abu Dhabi',
    department: 'Trade Services',
    platform: 'ADC',
    processingTime: 'Instant',
    isAI: true
  },
  {
    id: '23',
    name: 'Membership Cancellation – Free Zones',
    description: 'Cancel your chamber membership for businesses in free zones',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '24',
    name: 'Membership Registration – Industrial Areas',
    description: 'Register for chamber membership for businesses located in industrial areas',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },

  // Row 9
  {
    id: '25',
    name: 'Membership Renewal – Free Zones',
    description: 'Renew your chamber membership for businesses in free zones',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '26',
    name: 'Membership Renewal – Industrial Areas',
    description: 'Renew your chamber membership for businesses in industrial areas',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '27',
    name: 'Non-Membership Certificate',
    description: 'Obtain a certificate confirming non-membership status with Abu Dhabi Chamber',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },

  // Row 10
  {
    id: '28',
    name: 'Policy Advocacy',
    description: 'Engage with policymakers to advocate for business-friendly policies and regulations',
    department: 'Business Development',
    platform: 'ADC',
    processingTime: 'Ongoing',
    isAI: true
  },
  {
    id: '29',
    name: 'SKEA',
    description: 'Skills and Education Academy offering professional development and training programs',
    department: 'Skills & Education',
    platform: 'Affiliates',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '30',
    name: 'To Whom It May Concern Certificate',
    description: 'Obtain a general-purpose certificate for various official requirements',
    department: 'Documentation Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },

  // Row 11
  {
    id: '31',
    name: 'Updating Membership – Free Zones',
    description: 'Update your chamber membership details for businesses in free zones',
    department: 'Membership Services',
    platform: 'TAMM',
    processingTime: 'External link',
    isNew: false
  },
  {
    id: '32',
    name: 'Upskilling Programs',
    description: 'Professional development and training programs to enhance business skills and capabilities',
    department: 'Training & Development',
    platform: 'ADC',
    processingTime: '2-3 days',
    isNew: false
  }
]