"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Phone,
  Activity,
  Award,
  Heart,
  Zap,
  User,
  MapPin,
  Timer,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Edit,
  Eye,
  Bookmark,
  UserCheck,
  Dumbbell,
  PlayCircle,
  StopCircle
} from "lucide-react";

// ==================== TYPES ====================
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membershipType: "Basic" | "Premium" | "VIP";
  goals: string[];
  progress: number;
  lastVisit: string;
  isPresent: boolean;
  status: "active" | "pending" | "inactive";
  joinDate: string;
  totalSessions: number;
  thisWeekSessions: number;
}

interface WorkSchedule {
  id: string;
  date: string;
  dayName: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "active" | "completed";
  location: string;
  zone: string;
}

interface CoachStats {
  assignedClients: number;
  presentClients: number;
  hoursWorked: number;
  sessionsToday: number;
  rating: number;
  isOnDuty: boolean;
}

interface GymStats {
  totalCheckIns: number;
  averageSessionTime: number;
  popularZone: string;
  currentOccupancy: number;
}

// ==================== COMPOSANTS UI ====================
const Card = ({
  children,
  className = "",
  gradient = false,
  hover = false
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
}) => (
  <div className={`
    bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
    ${gradient ? "bg-gradient-to-br from-white to-gray-50" : ""}
    ${hover ? "hover:shadow-xl hover:scale-105 transition-all duration-300" : ""}
    ${className}
  `}>
    {children}
  </div>
);

const Badge = ({
  children,
  variant = "default",
  size = "sm"
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "premium" | "vip" | "active" | "present";
  size?: "xs" | "sm" | "md";
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
    premium: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
    vip: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800",
    active: "bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800",
    present: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800"
  };

  const sizes = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm"
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

const GradientButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white",
    secondary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white",
    accent: "bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-xl font-medium 
        transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
};

// ==================== HEADER ====================
const Header = ({ onMenuClick, isOnDuty, onDutyToggle }: {
  onMenuClick: () => void;
  isOnDuty: boolean;
  onDutyToggle: () => void;
}) => (
  <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Espace Coach
          </h1>
          <p className="text-sm text-gray-500">Suivi clients en salle</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Duty Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 hidden sm:block">Service:</span>
          <button
            onClick={onDutyToggle}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${isOnDuty
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            <div className={`h-2 w-2 rounded-full ${isOnDuty ? "bg-emerald-500" : "bg-gray-400"}`} />
            <span className="text-sm font-medium">{isOnDuty ? "En Service" : "Hors Service"}</span>
          </button>
        </div>

        {/* Current Time */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Marie Dupont</p>
            <p className="text-xs text-gray-500">Coach Certifiée</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  </header>
);

// ==================== NAVIGATION ====================
const NavigationItem = ({
  icon: Icon,
  label,
  active = false,
  badge,
  onClick
}: {
  icon: any;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 group
      ${active
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
      }
    `}
  >
    <div className="flex items-center space-x-3">
      <Icon className={`h-5 w-5 ${active ? "text-white" : "text-gray-500 group-hover:text-blue-500"}`} />
      <span className="font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
    )}

    <div className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Gogym Coach</h2>
            <p className="text-blue-100 text-sm">Interface Salle</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <NavigationItem icon={Activity} label="Vue d'ensemble" active />
        <NavigationItem icon={Users} label="Mes Clients" badge={8} />
        <NavigationItem icon={MapPin} label="Zones Salle" />
        <NavigationItem icon={Calendar} label="Mon Planning" />
        <NavigationItem icon={Target} label="Objectifs Clients" />
        <NavigationItem icon={Award} label="Performances" />
        <NavigationItem icon={Bookmark} label="Programmes" />
        <NavigationItem icon={Dumbbell} label="Équipements" />
      </nav>

      {/* Quick Stats */}
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">4.9</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">8h30</div>
                <div className="text-xs text-gray-500">Aujourd'hui</div>
              </div>
            </div>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  </>
);

// ==================== STATS CARDS ====================
const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  subtitle
}: {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  gradient: string;
  subtitle?: string;
}) => (
  <Card className="p-6 relative overflow-hidden" hover>
    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-full -translate-y-4 translate-x-4`} />

    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className={`h-12 w-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>

      {change && (
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
          <span className="text-sm font-medium text-emerald-600">{change}</span>
        </div>
      )}
    </div>
  </Card>
);

// ==================== TODAY SCHEDULE ====================
const TodaySchedule = ({ schedule }: { schedule: WorkSchedule }) => (
  <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Mon Service Aujourd'hui</h3>
        <p className="text-sm text-gray-600">{schedule.dayName} - {schedule.date}</p>
      </div>
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        <span className="text-sm font-medium text-blue-600">{schedule.zone}</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="text-center p-3 bg-white rounded-xl">
        <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
        <div className="text-lg font-bold text-gray-900">{schedule.startTime}</div>
        <div className="text-xs text-gray-500">Début service</div>
      </div>
      <div className="text-center p-3 bg-white rounded-xl">
        <Timer className="h-6 w-6 text-purple-500 mx-auto mb-2" />
        <div className="text-lg font-bold text-gray-900">{schedule.endTime}</div>
        <div className="text-xs text-gray-500">Fin service</div>
      </div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Progression service</span>
        <span className="font-medium text-gray-900">6h30 / 8h</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: "81%" }} />
      </div>
    </div>

    <div className="flex space-x-2">
      <GradientButton variant="primary" className="flex-1 justify-center">
        <UserCheck className="h-4 w-4 mr-2" />
        Aide Client
      </GradientButton>
      <GradientButton variant="outline" className="px-3">
        <MapPin className="h-4 w-4" />
      </GradientButton>
    </div>
  </Card>
);

// ==================== CLIENT CARD ====================
const ClientCard = ({ client }: { client: Client }) => (
  <Card className="p-4 hover:shadow-xl transition-all duration-300 hover:scale-105">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className={`h-12 w-12 bg-gradient-to-br ${client.membershipType === "VIP" ? "from-yellow-400 to-orange-500" :
            client.membershipType === "Premium" ? "from-purple-400 to-pink-500" :
              "from-blue-400 to-cyan-500"
          } rounded-full flex items-center justify-center text-white font-bold shadow-lg relative`}>
          {client.name.charAt(0)}
          {client.isPresent && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{client.name}</div>
          <div className="flex items-center space-x-2">
            <Badge variant={client.membershipType === "VIP" ? "vip" : client.membershipType === "Premium" ? "premium" : "default"}>
              {client.membershipType}
            </Badge>
            {client.isPresent && (
              <Badge variant="present" size="xs">
                En salle
              </Badge>
            )}
          </div>
        </div>
      </div>
      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>

    {client.isPresent && (
      <div className="flex items-center space-x-2 mb-3 p-2 bg-blue-50 rounded-lg">
        <MapPin className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-blue-700">Présent en salle</span>
      </div>
    )}

    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Objectifs</span>
        <span className="text-gray-900">{client.progress}% complétés</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${client.progress}%` }}
        />
      </div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex flex-wrap gap-1">
        {client.goals.slice(0, 2).map((goal, index) => (
          <Badge key={index} variant="success" size="xs">{goal}</Badge>
        ))}
        {client.goals.length > 2 && (
          <Badge variant="default" size="xs">+{client.goals.length - 2}</Badge>
        )}
      </div>
    </div>

    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
      <span>Sessions semaine: {client.thisWeekSessions}</span>
      <span>Dernière visite: {client.lastVisit}</span>
    </div>

    <div className="flex space-x-2">
      <GradientButton variant="primary" size="sm" className="flex-1 justify-center">
        <UserCheck className="h-3 w-3 mr-1" />
        Accompagner
      </GradientButton>
      <GradientButton variant="secondary" size="sm" className="flex-1 justify-center">
        <Eye className="h-3 w-3 mr-1" />
        Profil
      </GradientButton>
    </div>
  </Card>
);

// ==================== CLIENTS GRID ====================
const ClientsGrid = ({ clients }: { clients: Client[] }) => {
  const presentClients = clients.filter(c => c.isPresent);
  const totalClients = clients.length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Mes Clients Assignés</h3>
          <p className="text-sm text-gray-600">
            {presentClients.length} présents sur {totalClients} assignés
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Filter */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm text-gray-600">Filtres:</span>
        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
          Présents ({presentClients.length})
        </button>
        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
          Tous ({totalClients})
        </button>
        <button className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
          VIP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </Card>
  );
};

// ==================== GYM OVERVIEW ====================
const GymOverview = () => (
  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">État de la Salle</h3>
        <p className="text-sm text-gray-600">Informations générales</p>
      </div>
      <Dumbbell className="h-6 w-6 text-emerald-500" />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="text-center p-3 bg-white rounded-xl">
        <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
        <div className="text-lg font-bold text-gray-900">23</div>
        <div className="text-xs text-gray-500">Présents</div>
      </div>
      <div className="text-center p-3 bg-white rounded-xl">
        <MapPin className="h-6 w-6 text-purple-500 mx-auto mb-2" />
        <div className="text-lg font-bold text-gray-900">Zone Cardio</div>
        <div className="text-xs text-gray-500">Plus occupée</div>
      </div>
      <div className="text-center p-3 bg-white rounded-xl">
        <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
        <div className="text-lg font-bold text-gray-900">1h15</div>
        <div className="text-xs text-gray-500">Temps moyen</div>
      </div>
      <div className="text-center p-3 bg-white rounded-xl">
        <Activity className="h-6 w-6 text-green-500 mx-auto mb-2" />
        <div className="text-lg font-bold text-gray-900">67</div>
        <div className="text-xs text-gray-500">Check-ins</div>
      </div>
    </div>

    <GradientButton variant="secondary" className="w-full mt-4 justify-center">
      <MapPin className="h-4 w-4 mr-2" />
      Vue Générale Salle
    </GradientButton>
  </Card>
);

// ==================== MAIN COMPONENT ====================
export default function CoachDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Données simulées pour salle physique
  const stats: CoachStats = {
    assignedClients: 8,
    presentClients: 5,
    hoursWorked: 6.5,
    sessionsToday: 6,
    rating: 4.8,
    isOnDuty: isOnDuty
  };

  const todaySchedule: WorkSchedule = {
    id: "1",
    date: "15 Janvier 2024",
    dayName: "Lundi",
    startTime: "08:00",
    endTime: "16:00",
    status: "active",
    location: "Gogym Central",
    zone: "Zone Musculation"
  };

  const clients: Client[] = [
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      phone: "+33123456789",
      membershipType: "Premium",
      goals: ["Perte de poids", "Tonification"],
      progress: 75,
      lastVisit: "Aujourd'hui",
      isPresent: true,
      status: "active",
      joinDate: "2024-01-10",
      totalSessions: 24,
      thisWeekSessions: 3
    },
    {
      id: "2",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "+33123456790",
      membershipType: "VIP",
      goals: ["Gain musculaire", "Force"],
      progress: 60,
      lastVisit: "Aujourd'hui",
      isPresent: true,
      status: "active",
      joinDate: "2024-01-08",
      totalSessions: 32,
      thisWeekSessions: 4
    },
    {
      id: "3",
      name: "Emma Brown",
      email: "emma.b@email.com",
      phone: "+33123456791",
      membershipType: "Basic",
      goals: ["Endurance", "Bien-être"],
      progress: 40,
      lastVisit: "Hier",
      isPresent: false,
      status: "active",
      joinDate: "2024-01-12",
      totalSessions: 16,
      thisWeekSessions: 2
    },
    {
      id: "4",
      name: "Alex Chen",
      email: "alex.c@email.com",
      phone: "+33123456792",
      membershipType: "Premium",
      goals: ["Performance", "Agilité", "Explosivité"],
      progress: 85,
      lastVisit: "Aujourd'hui",
      isPresent: true,
      status: "active",
      joinDate: "2024-01-05",
      totalSessions: 45,
      thisWeekSessions: 5
    },
    {
      id: "5",
      name: "Lisa Martin",
      email: "lisa.m@email.com",
      phone: "+33123456793",
      membershipType: "VIP",
      goals: ["Remise en forme", "Posture"],
      progress: 55,
      lastVisit: "Il y a 2 jours",
      isPresent: false,
      status: "active",
      joinDate: "2024-01-14",
      totalSessions: 8,
      thisWeekSessions: 1
    },
    {
      id: "6",
      name: "David Lee",
      email: "david.l@email.com",
      phone: "+33123456794",
      membershipType: "Premium",
      goals: ["Cardio", "Endurance"],
      progress: 90,
      lastVisit: "Aujourd'hui",
      isPresent: true,
      status: "active",
      joinDate: "2023-12-20",
      totalSessions: 52,
      thisWeekSessions: 4
    },
    {
      id: "7",
      name: "Sophie Martin",
      email: "sophie.m@email.com",
      phone: "+33123456795",
      membershipType: "Basic",
      goals: ["Flexibilité", "Détente"],
      progress: 65,
      lastVisit: "Aujourd'hui",
      isPresent: true,
      status: "active",
      joinDate: "2024-01-11",
      totalSessions: 18,
      thisWeekSessions: 3
    },
    {
      id: "8",
      name: "Thomas Dubois",
      email: "thomas.d@email.com",
      phone: "+33123456796",
      membershipType: "Premium",
      goals: ["Force", "Masse"],
      progress: 45,
      lastVisit: "Il y a 3 jours",
      isPresent: false,
      status: "active",
      joinDate: "2024-01-06",
      totalSessions: 28,
      thisWeekSessions: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20">
      {/* Sidebar */}
      <div className="lg:flex">
        <div className="lg:w-72 lg:flex-shrink-0">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            isOnDuty={isOnDuty}
            onDutyToggle={() => setIsOnDuty(!isOnDuty)}
          />

          <main className="p-4 lg:p-8 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-6 lg:p-8 text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                    Bonjour Marie ! 💪
                  </h1>
                  <p className="text-blue-100 lg:text-lg mb-4">
                    {stats.presentClients} de vos clients sont actuellement en salle
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-200" />
                      <span className="text-sm">{stats.assignedClients} clients assignés</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-purple-200" />
                      <span className="text-sm">Zone Musculation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-pink-200" />
                      <span className="text-sm">{stats.hoursWorked}h aujourd'hui</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block mt-4 lg:mt-0">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Dumbbell className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard
                title="Clients Assignés"
                subtitle="Total sous ma responsabilité"
                value={stats.assignedClients}
                change="+1 cette semaine"
                icon={Users}
                gradient="from-blue-400 to-purple-500"
              />
              <StatCard
                title="Présents en Salle"
                subtitle="Actuellement sur place"
                value={stats.presentClients}
                change="5 sur 8"
                icon={UserCheck}
                gradient="from-emerald-400 to-teal-500"
              />
              <StatCard
                title="Heures Travaillées"
                subtitle="Aujourd'hui"
                value={`${stats.hoursWorked}h`}
                change="6h30 sur 8h"
                icon={Clock}
                gradient="from-orange-400 to-pink-500"
              />
              <StatCard
                title="Accompagnements"
                subtitle="Clients aidés aujourd'hui"
                value={stats.sessionsToday}
                change="+2 depuis ce matin"
                icon={Heart}
                gradient="from-purple-400 to-pink-500"
              />
            </div>

            {/* État Salle et Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mon Service */}
              <div className="lg:col-span-1">
                <TodaySchedule schedule={todaySchedule} />
              </div>

              {/* État Salle */}
              <div className="lg:col-span-2">
                <GymOverview />
              </div>
            </div>

            {/* Mes Clients */}
            <ClientsGrid clients={clients} />

            {/* Zones et Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Répartition par Zone */}
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Répartition des Clients</h3>
                    <p className="text-sm text-gray-600">Par zone d'entraînement</p>
                  </div>
                  <MapPin className="h-6 w-6 text-indigo-500" />
                </div>

                <div className="space-y-4">
                  {[
                    { zone: "Zone Cardio", count: 2, percentage: 40, color: "from-blue-400 to-cyan-500" },
                    { zone: "Zone Musculation", count: 1, percentage: 20, color: "from-purple-400 to-pink-500" },
                    { zone: "Zone Functional", count: 1, percentage: 20, color: "from-orange-400 to-red-500" },
                    { zone: "Zone Stretching", count: 1, percentage: 20, color: "from-emerald-400 to-teal-500" }
                  ].map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className={`h-3 w-3 bg-gradient-to-r ${zone.color} rounded-full`} />
                        <span className="font-medium text-gray-900">{zone.zone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${zone.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${zone.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-8 text-right">{zone.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Performance du Jour */}
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Performance Aujourd'hui</h3>
                    <p className="text-sm text-gray-600">Indicateurs clés</p>
                  </div>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Clients accompagnés", value: "6", icon: UserCheck },
                    { label: "Programmes créés", value: "2", icon: Target },
                    { label: "Objectifs atteints", value: "4", icon: CheckCircle },
                    { label: "Conseils donnés", value: "15", icon: Zap }
                  ].map((metric, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-xl">
                      <metric.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                      <div className="text-xs text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-lg font-bold text-gray-900">4.8/5</div>
                  <div className="text-sm text-gray-600">Évaluations clients</div>
                </div>
              </Card>
            </div>

            {/* Action Bar */}
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-bold mb-2">Excellente journée de coaching ! 🎯</h3>
                  <p className="text-blue-100">Continuez à accompagner vos clients vers leurs objectifs</p>
                </div>
                <div className="flex items-center space-x-4">
                  <GradientButton
                    variant="accent"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <UserCheck className="h-5 w-5 mr-2" />
                    Aide Client
                  </GradientButton>
                  <GradientButton
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Changer Zone
                  </GradientButton>
                </div>
              </div>
            </Card>
          </main>

          {/* Floating Action Button - Mobile */}
          <div className="lg:hidden fixed bottom-6 right-6 z-30">
            <button className="h-14 w-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 hover:scale-110">
              <UserCheck className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== EXPORTS ====================
export {
  Card,
  Badge,
  GradientButton,
  StatCard,
  TodaySchedule,
  ClientCard,
  ClientsGrid,
  GymOverview,
  NavigationItem,
  Sidebar,
  Header
};

export type {
  Client,
  WorkSchedule,
  CoachStats,
  GymStats
};