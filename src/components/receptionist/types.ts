export interface Member {
    id: string;
    name: string;
    status: 'Actif' | 'Expiré' | 'Suspendu';
    lastVisit: string;
    phone: string;
    email: string;
    membershipType: string;
    startDate: string;
    endDate: string;
    remainingDays: number;
    visits: number;
    photo: string;
    healthInfo?: string;
    goals?: string[];
}

export interface Course {
    id: number;
    name: string;
    time: string;
    instructor: string;
    spots: number;
    maxSpots: number;
    duration: number;
    level: string;
}

export interface Zone {
    name: string;
    current: number;
    max: number;
    icon: any;
}

export interface Capacity {
    current: number;
    max: number;
    zones: Zone[];
}

export interface Notification {
    id: number;
    type: 'warning' | 'info' | 'success';
    message: string;
    time: string;
}

export interface MenuItem {
    id: string;
    label: string;
    icon: any;
}
