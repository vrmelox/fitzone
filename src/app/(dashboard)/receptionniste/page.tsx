"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  QrCode,
  UserPlus,
  Users,
  Calendar,
  Headphones,
  Search,
  CheckCircle,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  X,
  Activity,
  Home,
  BarChart3,
  ChevronDown,
  Dumbbell,
  Timer,
  MessageSquare,
  Zap,
  Heart,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  Wifi,
  Clock,
  Bell,
  AlertCircle,
  Shield,
  Star,
  CreditCard,
  Award,
  FileText,
  Camera
} from 'lucide-react';

// Import extracted components
import { Sidebar, MobileSidebar } from '@/components/receptionist/layout/Sidebar';
import { TopBar } from '@/components/receptionist/layout/TopBar';
import { StatsCard } from '@/components/receptionist/dashboard/StatsCard';
import { CheckInPopup } from '@/components/receptionist/checkin/CheckInPopup';
import { AddMemberForm, type NewMemberData } from '@/components/receptionist/members/AddMemberForm';
import type { Member, Course, Zone, Capacity, Notification, MenuItem } from '@/components/receptionist/types';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [memberCode, setMemberCode] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Enhanced mock data
  const [members] = useState<Member[]>([
    {
      id: '001',
      name: 'Marie Dassi',
      status: 'Actif',
      lastVisit: '2025-07-29',
      phone: '06 12 34 56 78',
      email: 'marie@email.com',
      membershipType: 'Premium Annuel',
      startDate: '2024-08-01',
      endDate: '2025-08-01',
      remainingDays: 1,
      visits: 127,
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      healthInfo: 'Aucune restriction',
      goals: ['Perte de poids', 'Tonification']
    },
    {
      id: '002',
      name: 'Jean Malomon',
      status: 'Expiré',
      lastVisit: '2025-07-25',
      phone: '06 98 76 54 32',
      email: 'jean@email.com',
      membershipType: 'Mensuel',
      startDate: '2025-06-01',
      endDate: '2025-07-01',
      remainingDays: -29,
      visits: 45,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      healthInfo: 'Problème de dos',
      goals: ['Renforcement musculaire']
    },
    {
      id: '003',
      name: 'Sophie Balogoun',
      status: 'Actif',
      lastVisit: '2025-07-29',
      phone: '06 11 22 33 44',
      email: 'sophie@email.com',
      membershipType: 'Trimestriel',
      startDate: '2025-06-01',
      endDate: '2025-09-01',
      remainingDays: 32,
      visits: 67,
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      goals: ['Cardio', 'Yoga']
    },
    {
      id: '004',
      name: 'Lucas Mouftaou',
      status: 'Actif',
      lastVisit: '2025-07-30',
      phone: '06 55 44 33 22',
      email: 'lucas@email.com',
      membershipType: 'Premium Annuel',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      remainingDays: 153,
      visits: 89,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      goals: ['CrossFit', 'Performance']
    },
    {
      id: '005',
      name: 'Emma Dossou',
      status: 'Suspendu',
      lastVisit: '2025-07-20',
      phone: '06 77 88 99 00',
      email: 'emma@email.com',
      membershipType: 'Mensuel',
      startDate: '2025-06-15',
      endDate: '2025-07-15',
      remainingDays: 0,
      visits: 12,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      healthInfo: 'Grossesse',
      goals: ['Bien-être']
    }
  ]);

  const [capacity] = useState<Capacity>({
    current: 45,
    max: 80,
    zones: [
      { name: 'Cardio', current: 12, max: 20, icon: Heart },
      { name: 'Musculation', current: 25, max: 35, icon: Dumbbell },
      { name: 'Cours collectifs', current: 8, max: 25, icon: Users },
      { name: 'Zone CrossFit', current: 0, max: 15, icon: Activity }
    ]
  });

  const [classes] = useState<Course[]>([
    { id: 1, name: 'Yoga Flow', time: '09:00', instructor: 'Emma', spots: 8, maxSpots: 15, duration: 60, level: 'Tous niveaux' },
    { id: 2, name: 'CrossFit WOD', time: '10:30', instructor: 'Marc', spots: 12, maxSpots: 12, duration: 45, level: 'Avancé' },
    { id: 3, name: 'Zumba Party', time: '14:00', instructor: 'Lisa', spots: 5, maxSpots: 20, duration: 60, level: 'Débutant' },
    { id: 4, name: 'Pilates', time: '18:00', instructor: 'Anna', spots: 10, maxSpots: 15, duration: 55, level: 'Intermédiaire' },
    { id: 5, name: 'HIIT Express', time: '19:00', instructor: 'Tom', spots: 18, maxSpots: 20, duration: 30, level: 'Avancé' },
    { id: 6, name: 'Stretching', time: '20:00', instructor: 'Sarah', spots: 3, maxSpots: 12, duration: 45, level: 'Tous niveaux' }
  ]);

  const [notifications] = useState<Notification[]>([
    { id: 1, type: 'warning', message: 'Marie Dupont - Abonnement expire demain', time: '10:30' },
    { id: 2, type: 'success', message: 'CrossFit WOD - Cours complet', time: '09:45' },
    { id: 3, type: 'info', message: 'Maintenance équipement cardio prévue ce soir', time: '08:00' },
    { id: 4, type: 'warning', message: 'Capacité zone musculation à 90%', time: '07:30' }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'checkin', label: 'Check-in', icon: QrCode },
    { id: 'members', label: 'Membres', icon: UserPlus },
    { id: 'capacity', label: 'Capacité', icon: Users },
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScan = () => {
    setScannerActive(true);
    setTimeout(() => {
      setScannerActive(false);
      const randomMember = members[Math.floor(Math.random() * members.length)];
      setMemberCode(randomMember.id);
      setSelectedMember(randomMember);
    }, 2000);
  };

  const handleManualCheckIn = (code: string) => {
    const member = members.find(m => m.id === code || m.name.toLowerCase().includes(code.toLowerCase()));
    if (member) {
      setSelectedMember(member);
      setMemberCode('');
    } else {
      alert('Membre non trouvé');
    }
  };

  const handleAddMember = (memberData: NewMemberData) => {
    // Generate a new member ID
    const newId = `00${members.length + 1}`;

    // Calculate end date based on membership type
    const startDate = new Date(memberData.startDate);
    let endDate = new Date(startDate);

    switch (memberData.membershipType) {
      case 'mensuel':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'trimestriel':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 'semestriel':
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case 'annuel':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    const newMember: Member = {
      id: newId,
      name: `${memberData.firstName} ${memberData.lastName}`,
      status: 'Actif',
      lastVisit: new Date().toISOString().split('T')[0],
      phone: memberData.phone,
      email: memberData.email,
      membershipType: memberData.membershipType.charAt(0).toUpperCase() + memberData.membershipType.slice(1),
      startDate: memberData.startDate,
      endDate: endDate.toISOString().split('T')[0],
      remainingDays: Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      visits: 0,
      photo: memberData.photo || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face',
      goals: []
    };

    // In a real app, this would send to an API
    console.log('New member created:', newMember);
    alert(`Membre ${newMember.name} créé avec succès!`);

    // Optionally refresh the page or update the members list
    // For now, just close the form
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.includes(searchTerm) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capacityPercentage = (capacity.current / capacity.max) * 100;

  const todayStats = {
    newCheckIns: 42,
    activeNow: capacity.current,
    coursesToday: classes.length,
    revenue: 45
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-100 dark:border-gray-700 transition-all duration-300 z-40 ${sidebarOpen ? 'w-72' : 'w-20'
        }`}>
        {/* Header Sidebar */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <img src="/gofit.svg" alt="Logo Gogym" className="w-10 h-10" />
                </div>
                <div>
                  <Link
                    href="/"
                    className="hidden md:block md:text-2xl font-bold bg-gradient-to-r from-white to-[#FAD02C] bg-clip-text text-transparent hover:from-[#FAD02C] hover:to-white transition-all duration-500"
                  >
                    Gogym
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard Réceptionniste</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                {activeTab === item.id && sidebarOpen && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              {sidebarOpen && <span className="text-sm">{darkMode ? 'Mode clair' : 'Mode sombre'}</span>}
            </button>
          </div>

          {sidebarOpen && (
            <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-100 truncate">Sarah Dossou</p>
                <p className="text-xs text-gray-500">Réceptionniste</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Settings size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                <Wifi size={16} className="text-green-500" />
                Système connecté - Temps réel
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {currentTime.toLocaleTimeString('fr-FR')}
                  </div>
                  <div className="text-xs text-gray-950 dark:text-gray-300 font-semibold ">
                    {currentTime.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${notif.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/50' :
                              notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/50' :
                                'bg-blue-100 dark:bg-blue-900/50'
                              }`}>
                              {notif.type === 'warning' ? <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400" /> :
                                notif.type === 'success' ? <CheckCircle size={16} className="text-green-600 dark:text-green-400" /> :
                                  <Bell size={16} className="text-blue-600 dark:text-blue-400" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-700 dark:text-green-300 text-sm font-medium">Check-ins aujourd'hui</p>
                      <p className="text-3xl font-bold text-green-800 dark:text-green-200">{todayStats.newCheckIns}</p>
                      <p className="text-green-600 dark:text-green-400 text-sm">+12% vs hier</p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-2xl">
                      <Users className="text-green-600 dark:text-green-400" size={28} />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">Actifs maintenant</p>
                      <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{todayStats.activeNow}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{Math.round(capacityPercentage)}% capacité</p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-2xl">
                      <Activity className="text-blue-600 dark:text-blue-400" size={28} />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">Cours aujourd'hui</p>
                      <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">{todayStats.coursesToday}</p>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">2 complets</p>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded-2xl">
                      <Calendar className="text-purple-600 dark:text-purple-400" size={28} />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-700 dark:text-orange-300 text-sm font-medium">Revenus du jour</p>
                      <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">{todayStats.revenue}k XOF</p>
                      <p className="text-orange-600 dark:text-orange-400 text-sm">3 nouvelles inscriptions</p>
                    </div>
                    <div className="bg-orange-500/20 p-3 rounded-2xl">
                      <TrendingUp className="text-orange-600 dark:text-orange-400" size={28} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions and Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Activity size={20} />
                    Activité récente
                  </h3>
                  <div className="space-y-4">
                    {[
                      { time: '10:45', action: 'Check-in', member: 'Lucas Mouftaou', status: 'success' },
                      { time: '10:30', action: 'Nouvelle inscription', member: 'Alexandre Dossou', status: 'info' },
                      { time: '10:15', action: 'Sortie', member: 'Sophie Balogoun', status: 'default' },
                      { time: '09:50', action: 'Renouvellement', member: 'Marie Dassi', status: 'success' },
                      { time: '09:30', action: 'Check-in', member: 'Jean Malomon', status: 'warning' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${activity.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                            activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                              activity.status === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                            }`}>
                            {activity.action}
                          </div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">{activity.member}</div>
                        </div>
                        <ChevronDown size={16} className="text-gray-400 dark:text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>



                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Zap size={20} />
                    Actions rapides
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('checkin')}
                      className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-700 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <QrCode className="text-blue-500 group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Check-in rapide</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('members')}
                      className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <UserPlus className="text-green-500 group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Nouvelle inscription</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl hover:shadow-lg transition-all group">
                      <Calendar className="text-purple-500 group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Réserver un cours</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl hover:shadow-lg transition-all group">
                      <MessageSquare className="text-orange-500 group-hover:scale-110 transition-transform" size={20} />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Messages (3)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Zone Capacity Overview */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Users size={20} />
                  Occupation par zone
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {capacity.zones.map((zone, index) => {
                    const zonePercentage = (zone.current / zone.max) * 100;
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <zone.icon size={20} className="text-gray-600 dark:text-gray-400" />
                            <span className="font-medium text-gray-800 dark:text-gray-200">{zone.name}</span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {zone.current}/{zone.max}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${zonePercentage > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                              zonePercentage > 60 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-green-400 to-green-500'
                              }`}
                            style={{ width: `${zonePercentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {zonePercentage.toFixed(0)}% occupé
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Check-in Tab */}
          {activeTab === 'checkin' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                    <QrCode size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Check-in rapide</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Scanner automatique</h3>
                    <div className="relative">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center">
                        {scannerActive ? (
                          <div className="animate-pulse">
                            <div className="relative mx-auto mb-6">
                              <QrCode size={80} className="text-blue-600 dark:text-blue-400" />
                              <div className="absolute inset-0 bg-blue-500/20 rounded-xl animate-ping"></div>
                            </div>
                            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Scan en cours...</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Approchez le code QR du scanner</p>
                          </div>
                        ) : (
                          <>
                            <QrCode size={80} className="mx-auto text-gray-400 dark:text-gray-500 mb-6" />
                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">Scanner prêt</p>
                            <button
                              onClick={handleScan}
                              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
                            >
                              Démarrer le scan
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Simulation: cliquez pour tester</p>
                          </>
                        )}
                      </div>

                      {!scannerActive && (
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            En ligne
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Saisie manuelle</h3>
                    <div className="space-y-6">
                      <div className="relative">
                        <Search className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={20} />
                        <input
                          type="text"
                          placeholder="Code membre ou nom"
                          value={memberCode}
                          onChange={(e) => setMemberCode(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleManualCheckIn(memberCode);
                            }
                          }}
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleManualCheckIn(memberCode)}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
                        >
                          <CheckCircle size={20} />
                          Entrée
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl hover:from-red-700 hover:to-rose-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                          <X size={20} />
                          Sortie
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-200 dark:border-teal-700">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                        <Shield size={18} />
                        Instructions
                      </h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          Le client scanne son QR code à l'entrée
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          Son profil s'affiche automatiquement
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          Vérifiez la validité de l'abonnement
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          Confirmez l'entrée ou gérez les problèmes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          }

          {/* Members Tab */}
          {
            activeTab === 'members' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-xl">
                        <UserPlus size={24} className="text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Gestion des membres</h2>
                    </div>
                    <button
                      onClick={() => setShowAddMemberForm(true)}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 font-semibold shadow-lg flex items-center gap-2"
                    >
                      <UserPlus size={20} />
                      Nouveau membre
                    </button>
                  </div>

                  {/* Member Search and List */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={20} />
                      <input
                        type="text"
                        placeholder="Rechercher un membre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredMembers.map((member) => (
                      <div key={member.id} className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-start gap-4">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">ID: {member.id}</p>
                            <div className="mt-2">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${member.status === 'Actif'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                                : member.status === 'Expiré'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                                }`}>
                                {member.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CreditCard size={14} />
                            <span>{member.membershipType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar size={14} />
                            <span>Expire le {new Date(member.endDate).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Activity size={14} />
                            <span>{member.visits} visites</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors text-sm font-medium">
                            Profil
                          </button>
                          <button className="flex-1 px-3 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/70 transition-colors text-sm font-medium">
                            Check-in
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          {/* Capacity Tab */}
          {
            activeTab === 'capacity' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                      <Users size={24} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Occupation en temps réel</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Capacité globale</h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">{capacity.current}</span>
                          <span className="text-gray-600 dark:text-gray-400 text-lg">/ {capacity.max} personnes</span>
                        </div>

                        <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6 mb-6 overflow-hidden">
                          <div
                            className={`h-6 rounded-full transition-all duration-500 ${capacityPercentage > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                              capacityPercentage > 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-green-500 to-green-600'
                              }`}
                            style={{ width: `${capacityPercentage}%` }}
                          >
                            <div className="h-full bg-white/30 animate-pulse"></div>
                          </div>
                        </div>

                        <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-semibold">
                          {capacityPercentage.toFixed(0)}% d'occupation
                        </p>

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">↑ 12</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Dernière heure</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">45</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Moyenne/heure</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">127</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Total aujourd'hui</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Par zone</h3>
                      <div className="space-y-4">
                        {capacity.zones.map((zone, index) => {
                          const zonePercentage = (zone.current / zone.max) * 100;
                          return (
                            <div key={index} className="bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-all">
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg ${zonePercentage > 80 ? 'bg-red-100 dark:bg-red-900/50' :
                                  zonePercentage > 60 ? 'bg-orange-100 dark:bg-orange-900/50' : 'bg-green-100 dark:bg-green-900/50'
                                  }`}>
                                  <zone.icon size={20} className={
                                    zonePercentage > 80 ? 'text-red-600 dark:text-red-400' :
                                      zonePercentage > 60 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
                                  } />
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{zone.name}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{zone.current}/{zone.max}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full transition-all duration-300 ${zonePercentage > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                                    zonePercentage > 60 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-green-400 to-green-500'
                                    }`}
                                  style={{ width: `${zonePercentage}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {zonePercentage.toFixed(0)}% occupé
                                </p>
                                {zonePercentage > 80 && (
                                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">Presque plein</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Real-time activity feed */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Flux temps réel</h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2 max-h-64 overflow-y-auto">
                      {[
                        { time: '10:45:23', zone: 'Musculation', action: 'Entrée', member: 'Lucas M.' },
                        { time: '10:44:15', zone: 'Cardio', action: 'Sortie', member: 'Sophie B.' },
                        { time: '10:43:50', zone: 'Cours collectifs', action: 'Entrée', member: 'Marie D.' },
                        { time: '10:42:30', zone: 'Musculation', action: 'Entrée', member: 'Jean M.' },
                        { time: '10:41:12', zone: 'Cardio', action: 'Entrée', member: 'Emma P.' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.action === 'Entrée'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-red-400 dark:text-gray-200'
                              }`}>
                              {activity.action}
                            </span>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.zone}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{activity.member}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* Planning Tab */}
          {
            activeTab === 'planning' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                        <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Planning des cours</h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-50 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 font-semibold shadow-lg">
                        Nouveau cours
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {classes.map((course) => (
                      <div key={course.id} className="bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 p-3 rounded-xl">
                              <Timer className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">{course.name}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <User size={14} />
                                  {course.instructor}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                  <Clock size={14} />
                                  {course.duration} min
                                </p>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.level === 'Débutant' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                  course.level === 'Intermédiaire' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                                    'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
                                  }`}>
                                  {course.level}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{course.time}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {course.spots}/{course.maxSpots} inscrits
                            </div>
                            <div className="mt-2">
                              <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${course.spots >= course.maxSpots ? 'bg-red-500' :
                                    course.spots >= course.maxSpots * 0.8 ? 'bg-orange-500' : 'bg-green-500'
                                    }`}
                                  style={{ width: `${(course.spots / course.maxSpots) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                              <FileText size={20} />
                            </button>
                            <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 font-semibold">
                              Gérer
                            </button>
                            {course.spots >= course.maxSpots && (
                              <span className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/50 dark:to-rose-900/50 text-red-800 dark:text-red-200 px-4 py-2 rounded-xl text-sm font-semibold border border-red-200 dark:border-red-700">
                                Complet
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Participants preview */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                              {[...Array(Math.min(5, course.spots))].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-700"></div>
                              ))}
                              {course.spots > 5 && (
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">+{course.spots - 5}</span>
                                </div>
                              )}
                            </div>
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                              Voir tous les participants
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          {/* Analytics Tab */}
          {
            activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                        <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">+15.3%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">1,247</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Visites cette semaine</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <Users size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">+8</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">342</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Membres actifs</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                        <Award size={20} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">94%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">4.8/5</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction client</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                        <CreditCard size={20} className="text-orange-600 dark:text-orange-400" />
                      </div>
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">+12.7%</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">€18,750</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Revenus ce mois</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Fréquentation hebdomadaire</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[
                        { day: 'Lun', value: 75 },
                        { day: 'Mar', value: 82 },
                        { day: 'Mer', value: 90 },
                        { day: 'Jeu', value: 85 },
                        { day: 'Ven', value: 95 },
                        { day: 'Sam', value: 88 },
                        { day: 'Dim', value: 60 }
                      ].map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-t-lg relative" style={{ height: `${item.value}%` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg"></div>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Cours populaires</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'CrossFit WOD', percentage: 95, color: 'from-purple-500 to-pink-500' },
                        { name: 'Yoga Flow', percentage: 88, color: 'from-purple-500 to-pink-500' },
                        { name: 'HIIT Express', percentage: 85, color: 'from-teal-500 to-cyan-500' },
                        { name: 'Zumba Party', percentage: 72, color: 'from-yellow-500 to-orange-500' },
                        { name: 'Pilates', percentage: 68, color: 'from-rose-500 to-pink-500' }
                      ].map((course, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{course.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{course.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                              style={{ width: `${course.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* Support Tab */}
          {
            activeTab === 'support' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl">
                      <Headphones size={24} className="text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Support client</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Recherche membre</h3>
                      <div className="relative mb-6">
                        <Search className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={20} />
                        <input
                          type="text"
                          placeholder="Rechercher par nom ou ID..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-50 text-gray-800 dark:text-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredMembers.map((member) => (
                          <div key={member.id} className="bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-3">
                                <img
                                  src={member.photo}
                                  alt={member.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {member.id}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Phone size={14} className="text-gray-400 dark:text-gray-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{member.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Mail size={14} className="text-gray-400 dark:text-gray-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{member.email}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.status === 'Actif'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                                  : member.status === 'Expiré'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                                  }`}>
                                  {member.status}
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                  Dernière visite: {member.lastVisit}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Actions rapides</h3>
                      <div className="space-y-4">
                        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl hover:shadow-lg transition-all group">
                          <AlertCircle className="text-orange-500 group-hover:scale-110 transition-transform" size={20} />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Signaler un problème</span>
                        </button>

                        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-700 rounded-xl hover:shadow-lg transition-all group">
                          <CreditCard className="text-blue-500 group-hover:scale-110 transition-transform" size={20} />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Traitement paiement</span>
                        </button>

                        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl hover:shadow-lg transition-all group">
                          <MapPin className="text-green-500 group-hover:scale-110 transition-transform" size={20} />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Visite guidée</span>
                        </button>

                        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-xl hover:shadow-lg transition-all group">
                          <Users className="text-purple-500 group-hover:scale-110 transition-transform" size={20} />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Modifier abonnement</span>
                        </button>

                        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-700 rounded-xl hover:shadow-lg transition-all group">
                          <Camera className="text-red-500 group-hover:scale-110 transition-transform" size={20} />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Photo de profil</span>
                        </button>

                        <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-700 rounded-xl hover:shadow-lg transition-all group">
                          <MessageSquare className="text-indigo-500 group-hover:scale-110 transition-transform" size={20} />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">Envoyer un message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div >

        {/* Modals */}
        {selectedMember && (
          <CheckInPopup
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}

        {showAddMemberForm && (
          <AddMemberForm
            onClose={() => setShowAddMemberForm(false)}
            onSubmit={handleAddMember}
          />
        )}
      </div >
    </div >
  );
}

export default Dashboard;