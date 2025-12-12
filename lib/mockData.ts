import { Service, Membership, Application, Payment, AiInsight } from './types'

export const mockMembership: Membership = {
  id: '1',
  companyName: 'Abu Dhabi National Oil Company (ADNOC)',
  memberId: 'ADCCI-2024-0156',
  tier: 'Elite',
  status: 'Active',
  validUntil: '2024-12-31',
  servicesUsedThisMonth: 12,
  daysUntilRenewal: 20
}

// Real services from the RFP and Kareem's prototype - EXACT names from specification
export const services: Service[] = [
  // ADC Platform Services (14 Internal)
  {
    id: '1',
    name: 'Chamber ESG Label',
    nameAr: 'شهادة ESG من الغرفة',
    department: 'Sustainability',
    platform: 'ADC Platform',
    description: 'Apply for ESG (Environmental, Social, Governance) certification to demonstrate your commitment to sustainable business practices.',
    descriptionAr: 'تقدم بطلب للحصول على شهادة ESG (البيئة والمجتمع والحوكمة) لإثبات التزامك بممارسات الأعمال المستدامة.',
    category: 'Certificates',
    tags: ['ESG', 'sustainability', 'environment', 'social', 'governance'],
    aiEnabled: true
  },
  {
    id: '2',
    name: 'Policy Advocacy',
    nameAr: 'الدعوة للسياسات',
    department: 'Business Development',
    platform: 'ADC Platform',
    description: 'Engage with policymakers to advocate for business-friendly policies and regulations.',
    descriptionAr: 'التواصل مع صانعي السياسات للدعوة إلى سياسات ولوائح صديقة للأعمال.',
    category: 'Business Enablement',
    tags: ['policy', 'advocacy', 'regulations', 'government'],
    aiEnabled: true
  },
  {
    id: '3',
    name: 'Upskilling Programs',
    nameAr: 'برامج تطوير المهارات',
    department: 'Training & Development',
    platform: 'ADC Platform',
    description: 'Professional development and training programs to enhance business skills and capabilities.',
    descriptionAr: 'برامج التطوير المهني والتدريب لتعزيز مهارات وقدرات الأعمال.',
    category: 'Training',
    tags: ['training', 'skills', 'development', 'courses'],
  },
  {
    id: '4',
    name: 'Chamber Boost',
    nameAr: 'دعم الغرفة',
    department: 'Business Support',
    platform: 'ADC Platform',
    description: 'Comprehensive support program to accelerate business growth and market expansion.',
    descriptionAr: 'برنامج دعم شامل لتسريع نمو الأعمال والتوسع في السوق.',
    category: 'Business Enablement',
    tags: ['boost', 'growth', 'support', 'acceleration'],
    tierRequired: 'Elite Plus'
  },
  {
    id: '5',
    name: 'Chamber Business Matchmaking',
    nameAr: 'التوفيق بين الأعمال',
    department: 'Business Development',
    platform: 'ADC Platform',
    description: 'Connect with potential business partners, investors, and collaborators through our matchmaking service.',
    descriptionAr: 'تواصل مع شركاء الأعمال المحتملين والمستثمرين والمتعاونين من خلال خدمة التوفيق لدينا.',
    category: 'Networking',
    tags: ['matchmaking', 'partners', 'investors', 'networking'],
    aiEnabled: true
  },
  {
    id: '6',
    name: 'Business Development Services',
    nameAr: 'خدمات تطوير الأعمال',
    department: 'Business Development',
    platform: 'ADC Platform',
    description: 'Strategic consulting and support services to help grow and develop your business.',
    descriptionAr: 'خدمات استشارية ودعم استراتيجي للمساعدة في نمو وتطوير أعمالك.',
    category: 'Business Enablement',
    tags: ['development', 'consulting', 'strategy', 'growth'],
  },
  {
    id: '7',
    name: 'Business Enablement Advisory',
    nameAr: 'استشارات تمكين الأعمال',
    department: 'Advisory Services',
    platform: 'ADC Platform',
    description: 'Expert advisory services to enable and support business operations and growth initiatives.',
    descriptionAr: 'خدمات استشارية متخصصة لتمكين ودعم عمليات الأعمال ومبادرات النمو.',
    category: 'Advisory',
    tags: ['advisory', 'enablement', 'consulting', 'support'],
    tierRequired: 'Elite'
  },
  {
    id: '8',
    name: 'Expert Library',
    nameAr: 'مكتبة الخبراء',
    department: 'Knowledge Services',
    platform: 'ADC Platform',
    description: 'Access a comprehensive library of expert resources, guides, and knowledge materials.',
    descriptionAr: 'الوصول إلى مكتبة شاملة من موارد الخبراء والأدلة والمواد المعرفية.',
    category: 'Market Intelligence',
    tags: ['library', 'resources', 'knowledge', 'guides'],
    aiEnabled: true
  },
  {
    id: '9',
    name: 'Global Tenders Hub',
    nameAr: 'مركز المناقصات العالمية',
    department: 'Trade Services',
    platform: 'ADC Platform',
    description: 'Access international tender opportunities and procurement notices from around the world.',
    descriptionAr: 'الوصول إلى فرص المناقصات الدولية وإعلانات المشتريات من جميع أنحاء العالم.',
    category: 'Market Intelligence',
    tags: ['tenders', 'procurement', 'international', 'opportunities'],
    aiEnabled: true
  },
  {
    id: '10',
    name: 'Data Hub',
    nameAr: 'مركز البيانات',
    department: 'Research & Analytics',
    platform: 'ADC Platform',
    description: 'Access comprehensive business data, analytics, and market insights for informed decision-making.',
    descriptionAr: 'الوصول إلى بيانات الأعمال الشاملة والتحليلات ورؤى السوق لاتخاذ قرارات مستنيرة.',
    category: 'Market Intelligence',
    tags: ['data', 'analytics', 'insights', 'market'],
    aiEnabled: true
  },
  {
    id: '11',
    name: 'Flagship & Sectoral Reports',
    nameAr: 'التقارير الرئيسية والقطاعية',
    department: 'Research & Analytics',
    platform: 'ADC Platform',
    description: 'Access in-depth flagship reports and sector-specific analysis for strategic planning.',
    descriptionAr: 'الوصول إلى التقارير الرئيسية المتعمقة والتحليلات الخاصة بالقطاعات للتخطيط الاستراتيجي.',
    category: 'Market Intelligence',
    tags: ['reports', 'analysis', 'sectors', 'research'],
  },
  {
    id: '12',
    name: 'Procurement Hub',
    nameAr: 'مركز المشتريات',
    department: 'Trade Services',
    platform: 'ADC Platform',
    description: 'Centralized procurement platform for business purchasing and supplier management.',
    descriptionAr: 'منصة مشتريات مركزية لشراء الأعمال وإدارة الموردين.',
    category: 'Trade',
    tags: ['procurement', 'purchasing', 'suppliers'],
    tierRequired: 'Elite Plus'
  },
  {
    id: '13',
    name: 'AD Connect and Concierge',
    nameAr: 'خدمة AD Connect والكونسيرج',
    department: 'Member Services',
    platform: 'ADC Platform',
    description: 'Premium concierge services and networking opportunities for chamber members.',
    descriptionAr: 'خدمات الكونسيرج المتميزة وفرص التواصل لأعضاء الغرفة.',
    category: 'Member Services',
    tags: ['concierge', 'networking', 'connect', 'premium'],
    tierRequired: 'Elite Plus'
  },
  {
    id: '14',
    name: 'Market Directory',
    nameAr: 'دليل السوق',
    department: 'Trade Services',
    platform: 'ADC Platform',
    description: 'Comprehensive directory of businesses, suppliers, and market participants in Abu Dhabi.',
    descriptionAr: 'دليل شامل للشركات والموردين والمشاركين في سوق أبوظبي.',
    category: 'Market Intelligence',
    tags: ['directory', 'businesses', 'suppliers', 'market'],
    aiEnabled: true
  },

  // TAMM Services (Selected key services)
  {
    id: '15',
    name: 'Certificate of Origin',
    nameAr: 'شهادة المنشأ',
    department: 'Trade Documentation',
    platform: 'TAMM',
    description: 'Obtain certificates of origin for your exported goods and products.',
    descriptionAr: 'الحصول على شهادات المنشأ للسلع والمنتجات المصدرة.',
    category: 'Certificates',
    tags: ['origin', 'certificate', 'export', 'trade'],
    url: 'https://www.tamm.abudhabi/services/certificate-of-origin'
  },
  {
    id: '16',
    name: 'Membership Renewal – Industrial Areas',
    nameAr: 'تجديد العضوية - المناطق الصناعية',
    department: 'Membership Services',
    platform: 'TAMM',
    description: 'Renew your chamber membership for businesses in industrial areas.',
    descriptionAr: 'تجديد عضويتك في الغرفة للشركات في المناطق الصناعية.',
    category: 'Membership',
    tags: ['renewal', 'membership', 'industrial'],
    url: 'https://www.tamm.abudhabi/services/membership-renewal-industrial'
  },
  {
    id: '17',
    name: 'Businessman Certificate',
    nameAr: 'شهادة رجل أعمال',
    department: 'Documentation Services',
    platform: 'TAMM',
    description: 'Obtain a certificate verifying your status as a registered businessman.',
    descriptionAr: 'الحصول على شهادة تثبت حالتك كرجل أعمال مسجل.',
    category: 'Certificates',
    tags: ['businessman', 'certificate', 'verification'],
    url: 'https://www.tamm.abudhabi/services/businessman-certificate'
  },

  // Affiliates Services (Key services)
  {
    id: '18',
    name: 'Abu Dhabi Youth Business Council',
    nameAr: 'مجلس أبوظبي لرجال الأعمال الشباب',
    department: 'Youth Programs',
    platform: 'Affiliates Platform',
    description: 'Support and networking platform for young entrepreneurs and business professionals.',
    descriptionAr: 'منصة دعم وتواصل لرواد الأعمال الشباب والمهنيين.',
    category: 'Special Programs',
    tags: ['youth', 'entrepreneurs', 'networking'],
    url: 'https://abudhabichamber.ae/youth-council'
  },
  {
    id: '19',
    name: 'Abu Dhabi Businesswomen Council',
    nameAr: 'مجلس سيدات أعمال أبوظبي',
    department: 'Women Programs',
    platform: 'Affiliates Platform',
    description: 'Empowering women in business through networking, mentorship, and development programs.',
    descriptionAr: 'تمكين المرأة في الأعمال من خلال التواصل والإرشاد وبرامج التطوير.',
    category: 'Special Programs',
    tags: ['women', 'businesswomen', 'empowerment'],
    url: 'https://abudhabichamber.ae/businesswomen-council'
  },
]

export const mockApplications: Application[] = [
  {
    id: '1',
    service: 'Chamber ESG Label',
    department: 'Sustainability',
    status: 'Under Review',
    updatedAt: '2024-12-10',
    platform: 'ADC Platform'
  },
  {
    id: '2',
    service: 'Policy Advocacy',
    department: 'Business Development',
    status: 'Submitted',
    updatedAt: '2024-12-09',
    platform: 'ADC Platform'
  },
  {
    id: '3',
    service: 'Certificate of Origin',
    department: 'Trade Documentation',
    status: 'Approved',
    updatedAt: '2024-12-08',
    platform: 'TAMM'
  }
]

export const mockPayments: Payment[] = [
  {
    id: '1',
    description: 'Annual Membership Renewal - Elite Tier',
    amount: 15000,
    currency: 'AED',
    status: 'Pending',
    dueDate: '2024-12-31'
  },
  {
    id: '2',
    description: 'Chamber ESG Label Application Fee',
    amount: 2500,
    currency: 'AED',
    status: 'Paid',
    dueDate: '2024-11-30'
  }
]

export const mockAiInsights: AiInsight[] = [
  {
    id: '1',
    text: 'Your annual membership renewal is due in 20 days. Renew now to maintain Elite tier benefits and uninterrupted access to premium services.',
    type: 'alert',
    priority: 'high'
  },
  {
    id: '2',
    text: 'Based on your recent use of Chamber Business Matchmaking and Global Tenders Hub, consider exploring the Expert Library for sector-specific insights.',
    type: 'recommendation',
    priority: 'medium'
  },
  {
    id: '3',
    text: 'Your Chamber ESG Label application is progressing well. Current stage: Quality Check (Step 3 of 6). Expected completion: 5 business days.',
    type: 'insight',
    priority: 'low'
  }
]