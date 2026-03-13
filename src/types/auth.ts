// src/types/auth.ts
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'coach' | 'receptionist' | 'member'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

// src/types/gym.ts
export interface Member {
  id: string
  userId: string
  membershipType: 'basic' | 'premium' | 'vip'
  membershipStart: string
  membershipEnd: string
  isActive: boolean
  emergencyContact: string
  medicalNotes?: string
  user: User
}

export interface GymClass {
  id: string
  name: string
  description: string
  coachId: string
  capacity: number
  duration: number // en minutes
  price: number
  schedule: {
    dayOfWeek: number // 0-6 (dimanche-samedi)
    startTime: string // HH:MM
    endTime: string
  }[]
  coach: User
}

export interface Equipment {
  id: string
  name: string
  category: string
  status: 'available' | 'maintenance' | 'out_of_order'
  lastMaintenance?: string
  nextMaintenance?: string
}

export interface Payment {
  id: string
  memberId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  stripePaymentId?: string
  createdAt: string
  member: Member
}