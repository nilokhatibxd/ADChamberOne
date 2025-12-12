export type MembershipTier = 'Essential' | 'Elite' | 'Elite Plus'
export type ServicePlatform = 'ADC Platform' | 'TAMM' | 'Affiliates Platform'
export type ApplicationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected'

export interface Service {
  id: string
  name: string
  nameAr: string
  department: string
  platform: ServicePlatform
  description: string
  descriptionAr: string
  category?: string
  tags: string[]
  url?: string
  tierRequired?: MembershipTier
  aiEnabled?: boolean
}

export interface Membership {
  id: string
  companyName: string
  memberId: string
  tier: MembershipTier
  status: 'Active' | 'Expiring' | 'Expired'
  validUntil: string
  servicesUsedThisMonth: number
  daysUntilRenewal?: number
}

export interface Application {
  id: string
  service: string
  department: string
  status: ApplicationStatus
  updatedAt: string
  platform: ServicePlatform
}

export interface Payment {
  id: string
  description: string
  amount: number
  currency: string
  status: 'Pending' | 'Paid' | 'Overdue'
  dueDate: string
}

export interface AiInsight {
  id: string
  text: string
  type: 'recommendation' | 'alert' | 'insight'
  priority?: 'high' | 'medium' | 'low'
}