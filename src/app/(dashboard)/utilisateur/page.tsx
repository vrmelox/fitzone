"use client";

import { useState, useEffect } from "react";
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
  CreditCard,
  Bell,
  Settings,
  Flame,
  Trophy,
  Calendar as CalendarIcon,
  BarChart3,
  Wallet,
  Shield,
  QrCode,
  LogOut
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Card, Badge, GradientButton } from "@/components/ui/dashboard-components";
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout, isAuthenticated, User as TheUser } from '@/lib/auth';

// ==================== TYPES ====================
interface MemberStats {
  totalVisits: number;
  thisWeekVisits: number;
  averageTime: number;
  streakDays: number;
}





interface GymClass {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux";
  category: string;
  isBooked: boolean;
}

interface Membership {
  type: "Basic" | "Premium" | "VIP";
  startDate: string;
  endDate: string;
  status: "active" | "expiring" | "expired";
  daysLeft: number;
  autoRenewal: boolean;
}

// ==================== COMPOSANTS UI ====================




// ==================== STATS OVERVIEW ====================
const StatsOverview = ({ stats }: { stats: MemberStats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50" glow>
      <div className="flex items-center justify-between mb-2">
        <Calendar className="h-8 w-8 text-teal-600" />
        <Badge variant="streak" size="xs">🔥 {stats.streakDays}j</Badge>
      </div>
      <div className="text-2xl font-bold text-gray-900">{stats.thisWeekVisits}</div>
      <div className="text-sm text-gray-600">Cette semaine</div>
      <div className="text-xs text-teal-600 mt-1">+2 vs semaine passée</div>
    </Card>

    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50" glow>
      <div className="flex items-center justify-between mb-2">
        <Clock className="h-8 w-8 text-purple-600" />
        <TrendingUp className="h-4 w-4 text-pink-600" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{stats.averageTime}min</div>
      <div className="text-sm text-gray-600">Temps moyen</div>
      <div className="text-xs text-gray-600 mt-1">Objectif: 60min</div>
    </Card>
  </div>
);

// ==================== PROGRESS CHART ====================
const ProgressChart = () => (
  <Card className="p-6 bg-white border border-gray-100" glow>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Ma Progression</h3>
        <p className="text-sm text-gray-600">Évolution des 30 derniers jours</p>
      </div>
      <BarChart3 className="h-6 w-6 text-gray-400" />
    </div>

    <div className="space-y-4">
      {[
        { week: "Sem 1", visits: 3, progress: 60 },
        { week: "Sem 2", visits: 4, progress: 80 },
        { week: "Sem 3", visits: 5, progress: 100 },
        { week: "Sem 4", visits: 4, progress: 80 }
      ].map((week, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 w-12">{week.week}</span>
          <div className="flex-1 mx-4">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${week.progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-900">{week.visits}</span>
            <Calendar className="h-3 w-3 text-gray-400" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-center justify-center space-x-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">16</div>
          <div className="text-xs text-gray-500">Visites ce mois</div>
        </div>
        <div className="w-px h-8 bg-gray-200"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-600">+25%</div>
          <div className="text-xs text-gray-500">vs mois dernier</div>
        </div>
      </div>
    </div>
  </Card>
);

// ==================== GOALS SECTION ====================


// ==================== ACHIEVEMENTS ====================


// ==================== UPCOMING CLASSES ====================
const UpcomingClasses = ({ classes }: { classes: GymClass[] }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Prochains Cours</h3>
        <p className="text-sm text-gray-600">Vos réservations</p>
      </div>
      <GradientButton variant="secondary" size="sm">
        <CalendarIcon className="h-4 w-4 mr-1" />
        Planning
      </GradientButton>
    </div>

    <div className="space-y-3">
      {classes.slice(0, 3).map((gymClass) => (
        <div key={gymClass.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{gymClass.name}</div>
              <div className="text-sm text-gray-500">{gymClass.instructor} • {gymClass.time}</div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={gymClass.isBooked ? "success" : "default"} size="xs">
              {gymClass.isBooked ? "Réservé" : "Libre"}
            </Badge>
            <div className="text-xs text-gray-500 mt-1">
              {gymClass.enrolled}/{gymClass.capacity}
            </div>
          </div>
        </div>
      ))}
    </div>

    <GradientButton variant="outline" fullWidth className="mt-4">
      Voir Tous les Cours
    </GradientButton>
  </Card>
);

// ==================== QUICK ACTIONS ====================
// ==================== ACCESS CARD ====================
const AccessCard = ({ memberName }: { memberName: string }) => {
  // Mock secure token data
  const accessData = JSON.stringify({
    id: "MEM-123456",
    name: memberName,
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    type: "access_token"
  });

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white" glow>
      <div className="flex flex-col items-center text-center space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Pass d'Accès</h3>
          <p className="text-gray-400 text-sm">Scannez ce code à l'entrée</p>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-inner">
          <QRCodeSVG
            value={accessData}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <QrCode className="h-4 w-4" />
          <span>Code sécurisé • Actualisation auto</span>
        </div>
      </div>
    </Card>
  );
};

// ==================== MAIN COMPONENT ====================
export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<TheUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      logout(); // Clear cookie to prevent middleware loop
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();

        // Case-insensitive role check
        if (userData.role?.toUpperCase() !== 'MEMBER') {
          logout();
          router.push('/login');
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error('Erreur:', error);
        logout();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Données simulées
  const memberStats: MemberStats = {
    totalVisits: 47,
    thisWeekVisits: 4,
    averageTime: 85,
    streakDays: 5
  };



  const upcomingClasses: GymClass[] = [
    {
      id: "1",
      name: "HIIT Intensif",
      instructor: "Marie Dupont",
      time: "18:00 - 19:00",
      duration: 60,
      capacity: 15,
      enrolled: 12,
      level: "Intermédiaire",
      category: "Cardio",
      isBooked: true
    },
    {
      id: "2",
      name: "Yoga Détente",
      instructor: "Sophie Martin",
      time: "19:30 - 20:30",
      duration: 60,
      capacity: 20,
      enrolled: 8,
      level: "Débutant",
      category: "Bien-être",
      isBooked: false
    },
    {
      id: "3",
      name: "Musculation Guidée",
      instructor: "Thomas Wilson",
      time: "Demain 10:00",
      duration: 75,
      capacity: 10,
      enrolled: 7,
      level: "Tous niveaux",
      category: "Force",
      isBooked: true
    }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Stats Overview */}
      <StatsOverview stats={memberStats} />

      {/* Access Card */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Accès Salle</h2>
        {user && <AccessCard memberName={`${user.first_name} ${user.last_name}`} />}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progression Chart */}
        <ProgressChart />

        {/* Upcoming Classes */}
        <UpcomingClasses classes={upcomingClasses} />
      </div>

      {/* Member Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Temps Favoris */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Créneaux Favoris</h4>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">18h - 20h</span>
              <div className="flex items-center space-x-1">
                <div className="w-12 bg-gray-100 rounded-full h-1">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-4/5"></div>
                </div>
                <span className="text-xs text-gray-500">80%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">10h - 12h</span>
              <div className="flex items-center space-x-1">
                <div className="w-12 bg-gray-100 rounded-full h-1">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1 rounded-full w-1/5"></div>
                </div>
                <span className="text-xs text-gray-500">20%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Zones Préférées */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Zones Préférées</h4>
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Zone Cardio</span>
              <span className="text-xs text-gray-500">65%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Musculation</span>
              <span className="text-xs text-gray-500">35%</span>
            </div>
          </div>
        </Card>

        {/* Prochaine Visite */}
        <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Recommandation</h4>
            <Zap className="h-5 w-5 text-teal-500" />
          </div>
          <div className="text-sm text-gray-600 mb-3">
            Basé sur vos habitudes, le meilleur moment pour votre prochaine visite :
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded-lg">
            <span className="font-medium text-teal-600">Demain 18h30</span>
            <Badge variant="success" size="xs">Optimal</Badge>
          </div>
        </Card>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button className="h-14 w-14 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 hover:scale-110">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

// ==================== EXPORTS ====================
export {
  StatsOverview,
  ProgressChart,
  UpcomingClasses
};

export type {
  MemberStats,
  GymClass,
  Membership
};