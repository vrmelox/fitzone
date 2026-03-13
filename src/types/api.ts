// src/types/api.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// export interface DashboardStats {
//   totalMembers: number
//   activeMembers: number
//   monthlyRevenue: number
//   todayCheckins: number
//   upcomingClasses: number
//   equipmentIssues: number
// }

export interface ButtonProps {
    text: string;
    color: string;
    href: string;
    onClick?: () => void;
}

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  monthlyRevenue: number;
  currentCapacity: number;
  maxCapacity: number;
  todayCheckIns: number;
  pendingPayments: number;
  equipmentIssues: number;
}

interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  status: string;
  joinDate: string;
  lastVisit: string;
  avatar?: string;
}

interface RecentActivity {
  id: string;
  type: string;
  message: string;
  time: string;
  user: string;
  color: string;
}

interface ChartData {
  day: string;
  checkins: number;
  revenue: number;
}