"use client";

import {
  Users,
  DollarSign,
  Activity,
  Calendar,
  Settings,
  Plus,
  TrendingUp,
  TrendingDown,
  MapPin,
  Clock,
  CreditCard,
  Dumbbell,
  Edit,
  Trash2,
  Target,
  Zap,
  Heart,
  Award,
  Filter,
  Download
} from "lucide-react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout, isAuthenticated, User } from '@/lib/auth';

// ==================== TYPES ====================
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

// ==================== COMPOSANTS UI DE BASE ====================

const Card = ({
  children,
  className = "",
  gradient = false,
  glow = false
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  glow?: boolean;
}) => (
  <div className={`
    bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
    ${gradient ? "bg-gradient-to-br from-white to-gray-50" : ""}
    ${glow ? "shadow-xl shadow-purple-500/10" : ""}
    ${className}
  `}>
    {children}
  </div>
);

const Badge = ({
  children,
  variant = "default",
  size = "md"
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "premium" | "vip";
  size?: "sm" | "md" | "lg";
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
    premium: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
    vip: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm"
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
  className = ""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-[#15B5B0] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0f766e] text-white",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
    accent: "bg-gradient-to-r from-[#e6bb00] to-[#f59e0b] hover:from-[#d97706] hover:to-[#b45309] text-black"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-xl font-medium 
        transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
};

// ==================== COMPOSANTS STATISTIQUES ====================

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = "up",
  color = "teal",
  subtitle
}: {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  trend?: "up" | "down";
  color?: "teal" | "purple" | "yellow" | "pink" | "blue";
  subtitle?: string;
}) => {
  const colorClasses = {
    teal: "from-teal-400 to-cyan-400",
    purple: "from-purple-400 to-pink-400",
    yellow: "from-yellow-400 to-orange-400",
    pink: "from-pink-400 to-rose-400",
    blue: "from-blue-400 to-indigo-400"
  };

  return (
    <Card className="p-6 relative overflow-hidden" glow>
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full -translate-y-8 translate-x-8`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className={`h-12 w-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>

        <div className="flex items-center">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500 mr-2" />
          )}
          <span className={`text-sm font-semibold ${trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
        </div>
      </div>
    </Card>
  );
};

// ==================== WIDGETS ====================

const CapacityWidget = ({ current, max }: { current: number; max: number }) => {
  const percentage = (current / max) * 100;
  const isNearCapacity = percentage >= 80;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50" glow>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Capacité en Temps Réel</h3>
          <p className="text-sm text-gray-600">Membres présents dans la salle</p>
        </div>
        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <MapPin className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {current}<span className="text-xl text-gray-500 font-normal">/{max}</span>
        </div>
        <p className="text-sm text-gray-600">personnes présentes</p>
      </div>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={isNearCapacity ? "text-yellow-400" : "text-cyan-400"}
            style={{
              strokeDasharray: `${2 * Math.PI * 50}`,
              strokeDashoffset: `${2 * Math.PI * 50 * (1 - percentage / 100)}`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="text-center">
        <Badge variant={isNearCapacity ? "warning" : "success"} size="lg">
          {isNearCapacity ? "🟡 Presque plein" : "🟢 Disponible"}
        </Badge>
      </div>
    </Card>
  );
};

const RevenueChart = ({ data }: { data: ChartData[] }) => (
  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50" glow>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Revenus Hebdomadaires</h3>
        <p className="text-sm text-gray-600">Performance financière</p>
      </div>
      <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
        <TrendingUp className="h-6 w-6 text-white" />
      </div>
    </div>

    <div className="mb-4">
      <div className="text-3xl font-bold text-gray-900 mb-1">16.235.000 F CFA</div>
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
        <span className="text-sm font-medium text-emerald-600">+12.5%</span>
        <span className="text-sm text-gray-500 ml-1">cette semaine</span>
      </div>
    </div>

    <div className="space-y-3">
      {data.map((day, index) => (
        <div key={day.day} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 w-10">{day.day}</span>
          <div className="flex-1 mx-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                style={{ width: `${(day.revenue / 5000) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-gray-900 w-16 text-right">{day.revenue} cfa</span>
        </div>
      ))}
    </div>
  </Card>
);

const QuickActions = () => (
  <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50" glow>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Actions Rapides</h3>
        <p className="text-sm text-gray-600">Raccourcis fréquents</p>
      </div>
      <Zap className="h-6 w-6 text-yellow-500" />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <GradientButton variant="primary" className="justify-center py-4">
        <Plus className="h-4 w-4 mr-2" />
        Nouveau Membre
      </GradientButton>

      <GradientButton variant="accent" className="justify-center py-4">
        <Calendar className="h-4 w-4 mr-2" />
        Planning
      </GradientButton>

      <GradientButton variant="secondary" className="justify-center py-4">
        <CreditCard className="h-4 w-4 mr-2" />
        Paiements
      </GradientButton>

      <GradientButton variant="primary" className="justify-center py-4">
        <Settings className="h-4 w-4 mr-2" />
        Paramètres
      </GradientButton>
    </div>
  </Card>
);

const RecentActivities = ({ activities }: { activities: RecentActivity[] }) => (
  <Card className="p-6 h-full" glow>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Activités Récentes</h3>
        <p className="text-sm text-gray-600">Dernières actions système</p>
      </div>
      <Clock className="h-6 w-6 text-gray-400" />
    </div>

    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div className={`h-3 w-3 ${activity.color} rounded-full mt-2 flex-shrink-0 shadow-lg`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-medium text-gray-600">{activity.user}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <GradientButton variant="primary" className="w-full mt-4 justify-center">
      Voir toutes les activités
    </GradientButton>
  </Card>
);

const MembersTable = ({ members }: { members: Member[] }) => (
  <Card className="p-6 h-full" glow>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Membres Récents</h3>
        <p className="text-sm text-gray-600">Nouvelles inscriptions</p>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          <Filter className="h-4 w-4" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          <Download className="h-4 w-4" />
        </button>
        <GradientButton variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Ajouter</span>
        </GradientButton>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Membre</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 hidden sm:table-cell">Type</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 hidden md:table-cell">Statut</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 hidden lg:table-cell">Dernière visite</th>
            <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id} className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all">
              <td className="py-4 px-2">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 bg-gradient-to-br ${index % 4 === 0 ? "from-teal-400 to-cyan-400" :
                    index % 4 === 1 ? "from-purple-400 to-pink-400" :
                      index % 4 === 2 ? "from-yellow-400 to-orange-400" :
                        "from-rose-400 to-pink-400"
                    } rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500 sm:hidden">
                      <Badge variant={member.membershipType === "VIP" ? "vip" : member.membershipType === "Premium" ? "premium" : "default"}>
                        {member.membershipType}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400">{member.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-2 hidden sm:table-cell">
                <Badge variant={member.membershipType === "VIP" ? "vip" : member.membershipType === "Premium" ? "premium" : "default"}>
                  {member.membershipType}
                </Badge>
              </td>
              <td className="py-4 px-2 hidden md:table-cell">
                <Badge variant={member.status === "Actif" ? "success" : "warning"}>
                  {member.status}
                </Badge>
              </td>
              <td className="py-4 px-2 text-sm text-gray-600 hidden lg:table-cell">
                {member.lastVisit}
              </td>
              <td className="py-4 px-2">
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-gray-500 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-gray-500">Affichage 1-4 sur 342 membres</p>
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Précédent
        </button>
        <button className="px-3 py-1 text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all">
          Suivant
        </button>
      </div>
    </div>
  </Card>
);

// ==================== COMPOSANT PRINCIPAL ====================


export default function AdminDashboard() {
  // Données simulées avec plus de variété
  const stats: DashboardStats = {
    totalMembers: 342,
    activeMembers: 298,
    monthlyRevenue: 24750,
    currentCapacity: 23,
    maxCapacity: 50,
    todayCheckIns: 87,
    pendingPayments: 12,
    equipmentIssues: 3
  };

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "member_join",
      message: "Nouveau membre Premium inscrit - Marie Dubois",
      time: "Il y a 5 min",
      user: "Réception",
      color: "bg-gradient-to-r from-emerald-400 to-teal-400"
    },
    {
      id: "2",
      type: "payment",
      message: "Paiement VIP reçu - 52.470 F CFA (Thomas Martin)",
      time: "Il y a 12 min",
      user: "Système",
      color: "bg-gradient-to-r from-yellow-400 to-orange-400"
    },
    {
      id: "3",
      type: "equipment",
      message: "Maintenance programmée - Tapis de course #3",
      time: "Il y a 1h",
      user: "Technicien",
      color: "bg-gradient-to-r from-purple-400 to-pink-400"
    },
    {
      id: "4",
      type: "checkin",
      message: "Pic d'affluence - 15 nouveaux check-ins",
      time: "Il y a 2h",
      user: "Système",
      color: "bg-gradient-to-r from-blue-400 to-cyan-400"
    },
    {
      id: "5",
      type: "goal",
      message: "Objectif atteint - Sarah a perdu 5kg !",
      time: "Il y a 3h",
      user: "Coach Marie",
      color: "bg-gradient-to-r from-pink-400 to-rose-400"
    }
  ];

  const members: Member[] = [
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      membershipType: "Premium",
      status: "Actif",
      joinDate: "2024-01-15",
      lastVisit: "Aujourd'hui"
    },
    {
      id: "2",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      membershipType: "VIP",
      status: "Actif",
      joinDate: "2024-01-14",
      lastVisit: "Hier"
    },
    {
      id: "3",
      name: "Emma Brown",
      email: "emma.b@email.com",
      membershipType: "Basic",
      status: "Suspendu",
      joinDate: "2024-01-13",
      lastVisit: "Il y a 3 jours"
    },
    {
      id: "4",
      name: "Alex Chen",
      email: "alex.c@email.com",
      membershipType: "Premium",
      status: "Actif",
      joinDate: "2024-01-12",
      lastVisit: "Aujourd'hui"
    }
  ];

  const revenueData: ChartData[] = [
    { day: "Lun", checkins: 45, revenue: 3200 },
    { day: "Mar", checkins: 52, revenue: 3800 },
    { day: "Mer", checkins: 48, revenue: 3400 },
    { day: "Jeu", checkins: 61, revenue: 4200 },
    { day: "Ven", checkins: 75, revenue: 4800 },
    { day: "Sam", checkins: 89, revenue: 5300 },
    { day: "Dim", checkins: 67, revenue: 4000 }
  ];

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier d'abord si authentifié
        if (!isAuthenticated()) {
          console.log('❌ Non authentifié - Redirection vers login');
          router.push('/login');
          return;
        }

        // Récupérer les données utilisateur
        const userData = await getCurrentUser();
        console.log('✅ Données utilisateur complètes:', JSON.stringify(userData, null, 2));
        console.log('🔍 Rôle exact:', userData.role);
        console.log('🔍 Type du rôle:', typeof userData.role);
        console.log('🔍 Longueur du rôle:', userData.role?.length);

        // Vérifier le rôle - STRICTEMENT 'ADMIN'
        if (userData.role !== 'ADMIN') {
          console.log('⛔ ACCÈS REFUSÉ');
          console.log('   - Rôle reçu:', `"${userData.role}"`);
          console.log('   - Rôle attendu: "ADMIN"');
          console.log('   - Comparaison stricte:', userData.role === 'ADMIN');
          alert(`⛔ Accès refusé\n\nVotre rôle: "${userData.role}"\nRôle requis: "ADMIN"\n\nVérifiez votre compte en base de données.`);
          router.push('/login');
          return;
        }

        console.log('✅ AUTHENTIFICATION RÉUSSIE - Accès Admin autorisé');
        setUser(userData);
      } catch (error) {
        console.error('❌ Erreur lors de la vérification:', error);
        console.error('   Stack:', error instanceof Error ? error.stack : 'N/A');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Bonjour {`${user?.first_name} ${user?.last_name}`} ! 👋
            </h1>
            <p className="text-teal-100 lg:text-lg">
              Voici un aperçu de votre salle Gogym aujourd'hui
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-200" />
                <span className="text-sm">342 membres actifs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-yellow-200" />
                <span className="text-sm">87 check-ins aujourd'hui</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Dumbbell className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total Membres"
          subtitle="Membres inscrits"
          value={stats.totalMembers}
          change="+12%"
          icon={Users}
          trend="up"
          color="teal"
        />
        <StatCard
          title="Revenus Mensuels"
          subtitle="Facturation"
          value={`${stats.monthlyRevenue.toLocaleString()}M XOF`}
          change="+8.2%"
          icon={DollarSign}
          trend="up"
          color="yellow"
        />
        <StatCard
          title="Check-ins Aujourd'hui"
          subtitle="Entrées salle"
          value={stats.todayCheckIns}
          change="+15%"
          icon={Activity}
          trend="up"
          color="purple"
        />
        <StatCard
          title="Équipements"
          subtitle="Maintenance requise"
          value={stats.equipmentIssues}
          change="-2"
          icon={Dumbbell}
          trend="down"
          color="pink"
        />
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Capacité - Large */}
        <div className="lg:col-span-4">
          <CapacityWidget
            current={stats.currentCapacity}
            max={stats.maxCapacity}
          />
        </div>

        {/* Revenus Chart - Large */}
        <div className="lg:col-span-5">
          <RevenueChart data={revenueData} />
        </div>

        {/* Actions Rapides - Small */}
        <div className="lg:col-span-3">
          <QuickActions />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activités récentes */}
        <div className="lg:col-span-1">
          <RecentActivities activities={recentActivities} />
        </div>

        {/* Table des membres */}
        <div className="lg:col-span-2">
          <MembersTable members={members} />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Taux de rétention", value: "94.2%", icon: Target, gradient: "from-emerald-400 to-teal-500" },
          { label: "Satisfaction client", value: "4.8/5", icon: Heart, gradient: "from-pink-400 to-rose-500" },
          { label: "Cours cette semaine", value: "24", icon: Calendar, gradient: "from-purple-400 to-indigo-500" },
          { label: "Nouveaux cette semaine", value: "+18", icon: Users, gradient: "from-blue-400 to-cyan-500" }
        ].map((stat, index) => (
          <Card key={index} className="p-4 text-center hover:scale-105 transition-transform duration-300">
            <div className={`h-10 w-10 mx-auto mb-3 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique d'affluence */}
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50" glow>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Affluence de la Journée</h3>
              <p className="text-sm text-gray-600">Check-ins par heure</p>
            </div>
            <Activity className="h-6 w-6 text-indigo-500" />
          </div>

          <div className="space-y-3">
            {[
              { hour: "06:00", count: 8, percentage: 15 },
              { hour: "09:00", count: 23, percentage: 45 },
              { hour: "12:00", count: 35, percentage: 70 },
              { hour: "18:00", count: 42, percentage: 85 },
              { hour: "20:00", count: 28, percentage: 55 },
              { hour: "22:00", count: 12, percentage: 25 }
            ].map((time, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{time.hour}</span>
                <div className="flex-1 mx-4">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${time.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 w-8 text-right">{time.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Action Bar */}
      <Card className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold mb-2">Prêt à booster votre salle ? 🚀</h3>
            <p className="text-gray-300">Découvrez nos nouvelles fonctionnalités et outils d'analyse avancés</p>
          </div>
          <div className="flex items-center space-x-4">
            <GradientButton variant="accent" size="lg">
              <Zap className="h-5 w-5 mr-2" />
              Nouvelles Fonctionnalités
            </GradientButton>
            <GradientButton variant="primary" size="lg">
              <Target className="h-5 w-5 mr-2" />
              Rapports Avancés
            </GradientButton>
          </div>
        </div>
      </Card>

      {/* Floating Action Button - Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button className="h-14 w-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 hover:scale-110">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}