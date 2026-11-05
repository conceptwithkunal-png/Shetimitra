import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Language,
  CropListing,
  MarketplaceOrder,
  EquipmentItem,
  EquipmentBooking,
  GovernmentScheme,
  ExpertProfile,
  SoilTestRecord,
  ExpenseRecord,
  CropScanReport,
  ConsultationRequest,
  AppNotification,
  MandiRecord,
  WeatherData
} from '../types';
import {
  INITIAL_CROP_LISTINGS,
  INITIAL_ORDERS,
  INITIAL_EQUIPMENT,
  INITIAL_SCHEMES,
  INITIAL_EXPERTS,
  INITIAL_SOIL_TESTS,
  INITIAL_EXPENSES
} from '../data/mockSeed';
import { getTranslation } from '../i18n/translations';

// Pre-configured profiles for instant role-switching and testing
export const DEMO_USERS: Record<UserRole, User> = {
  farmer: {
    id: 'farmer-1',
    fullName: 'विठ्ठल तुकाराम पाटील (Vitthal Patil)',
    phoneNumber: '+91 98220 12345',
    email: 'vitthal.patil@shetimitra.in',
    role: 'farmer',
    preferredLanguage: 'mr',
    district: 'Pune',
    taluka: 'Baramati',
    village: 'Malegaon Budruk',
    state: 'Maharashtra',
    pinCode: '413115',
    farmAreaAcres: 5.5,
    mainCrops: ['Soybean (सोयाबीन)', 'Sugarcane (ऊस)', 'Onion (कांदा)'],
    status: 'active'
  },
  buyer: {
    id: 'buyer-1',
    fullName: 'राजेश गोयल (Rajesh Goyal)',
    phoneNumber: '+91 98221 99887',
    email: 'goyal.traders@mandi.in',
    role: 'buyer',
    preferredLanguage: 'hi',
    businessName: 'गोयल अ‍ॅग्रो ट्रेडर्स (Goyal Agro Commodities)',
    buyerType: 'Wholesaler',
    district: 'Mumbai Sub',
    state: 'Maharashtra',
    status: 'active',
    verified: true
  },
  expert: {
    id: 'exp-1',
    fullName: 'डॉ. संजय शिंदे (Dr. Sanjay Shinde)',
    phoneNumber: '+91 98230 44556',
    email: 'dr.shinde@mpkv.ac.in',
    role: 'expert',
    preferredLanguage: 'mr',
    qualification: 'Ph.D. Plant Pathology (MPKV Rahuri)',
    specialization: 'Crop Pathology & Disease Control',
    experienceYears: 18,
    district: 'Ahmednagar',
    state: 'Maharashtra',
    status: 'active',
    verified: true
  },
  admin: {
    id: 'admin-1',
    fullName: 'कुणाल शेळके (Kunal Shelke - Administrator)',
    phoneNumber: '+91 99000 88888',
    email: 'conceptwithkunal@gmail.com',
    role: 'admin',
    preferredLanguage: 'en',
    district: 'Pune',
    state: 'Maharashtra',
    status: 'active'
  }
};

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof getTranslation>;
  switchRole: (role: UserRole) => void;

  // Marketplace & Orders
  cropListings: CropListing[];
  addCropListing: (listing: Omit<CropListing, 'id' | 'createdAt'>) => void;
  deleteCropListing: (id: string) => void;
  updateCropListingStatus: (id: string, status: 'active' | 'sold' | 'cancelled') => void;

  orders: MarketplaceOrder[];
  placeOrder: (order: Omit<MarketplaceOrder, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Promise<MarketplaceOrder>;
  updateOrderStatus: (orderId: string, status: MarketplaceOrder['status']) => void;

  // Commission & Payments
  commissionPercentage: number;
  setCommissionPercentage: (val: number) => void;

  // Equipment Rental
  equipmentList: EquipmentItem[];
  equipmentBookings: EquipmentBooking[];
  bookEquipment: (booking: Omit<EquipmentBooking, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (bookingId: string, status: EquipmentBooking['status']) => void;

  // AI Crop Doctor
  cropScans: CropScanReport[];
  addCropScan: (scan: Omit<CropScanReport, 'id' | 'createdAt'>) => void;

  // Government Schemes
  schemes: GovernmentScheme[];
  savedSchemeIds: string[];
  toggleSaveScheme: (schemeId: string) => void;

  // Soil & Expenses
  soilTests: SoilTestRecord[];
  addSoilTest: (test: Omit<SoilTestRecord, 'id' | 'createdAt'>) => void;
  expenses: ExpenseRecord[];
  addExpenseRecord: (rec: Omit<ExpenseRecord, 'id' | 'createdAt'>) => void;

  // Experts & Consultations
  experts: ExpertProfile[];
  consultations: ConsultationRequest[];
  requestConsultation: (req: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => void;
  replyConsultation: (id: string, advice: string) => void;

  // Mandi & Weather
  mandiData: MandiRecord[];
  refreshMandiData: () => Promise<void>;
  mandiLoading: boolean;
  favouriteMarketIds: string[];
  toggleFavouriteMarket: (id: string) => void;

  currentDistrict: string;
  setCurrentDistrict: (dist: string) => void;
  weather: WeatherData | null;
  weatherLoading: boolean;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  unreadNotificationsCount: number;

  // Global Auth Modal
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr');
  const [user, setUser] = useState<User>(DEMO_USERS.farmer);
  const [cropListings, setCropListings] = useState<CropListing[]>(INITIAL_CROP_LISTINGS);
  const [orders, setOrders] = useState<MarketplaceOrder[]>(INITIAL_ORDERS);
  const [commissionPercentage, setCommissionPercentage] = useState<number>(2.0);
  const [equipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [equipmentBookings, setEquipmentBookings] = useState<EquipmentBooking[]>([]);
  const [cropScans, setCropScans] = useState<CropScanReport[]>([]);
  const [schemes] = useState<GovernmentScheme[]>(INITIAL_SCHEMES);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(['pm-kisan', 'pmfby']);
  const [soilTests, setSoilTests] = useState<SoilTestRecord[]>(INITIAL_SOIL_TESTS);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [experts] = useState<ExpertProfile[]>(INITIAL_EXPERTS);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [mandiData, setMandiData] = useState<MandiRecord[]>([]);
  const [mandiLoading, setMandiLoading] = useState<boolean>(false);
  const [favouriteMarketIds, setFavouriteMarketIds] = useState<string[]>(['m-1', 'm-2']);
  const [currentDistrict, setCurrentDistrict] = useState<string>('Pune');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'बाजारभाव अपडेट',
      message: 'आज लासलगाव बाजार समितीत कांद्याला कमाल ₹२,८२० असा भाव मिळाला आहे.',
      type: 'mandi',
      timestamp: '१० मिनिटांपूर्वी',
      read: false
    },
    {
      id: 'notif-2',
      title: 'हवामान सतर्कता',
      message: 'नाशिक व पुणे जिल्ह्यात पुढील ४८ तासांत ढगाळ हवामान राहण्याची शक्यता आहे.',
      type: 'weather',
      timestamp: '१ तासापूर्वी',
      read: false
    },
    {
      id: 'notif-3',
      title: 'ऑर्डर वितरण पूर्ण',
      message: 'ऑर्डर SM-ORD-2026-881 यशस्वीरीत्या पोहोचली आहे. शेतकरी पेमेंट खात्यात जमा केले आहे.',
      type: 'order',
      timestamp: 'काल',
      read: true
    }
  ]);

  const t = getTranslation(language);

  const switchRole = (newRole: UserRole) => {
    setUser(DEMO_USERS[newRole]);
  };

  // Fetch Mandi Data from server API
  const refreshMandiData = async () => {
    setMandiLoading(true);
    try {
      const res = await fetch('/api/mandi-prices');
      const data = await res.json();
      if (data.success && data.data) {
        setMandiData(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch mandi data:', e);
    } finally {
      setMandiLoading(false);
    }
  };

  // Fetch Weather Data from server API
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true);
      try {
        const res = await fetch(`/api/weather?district=${encodeURIComponent(currentDistrict)}`);
        const data = await res.json();
        if (data.success && data.data) {
          setWeather(data.data);
        }
      } catch (e) {
        console.error('Failed to fetch weather:', e);
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchWeather();
  }, [currentDistrict]);

  useEffect(() => {
    refreshMandiData();
  }, []);

  const addCropListing = (listing: Omit<CropListing, 'id' | 'createdAt'>) => {
    const newListing: CropListing = {
      ...listing,
      id: `crop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCropListings(prev => [newListing, ...prev]);
  };

  const deleteCropListing = (id: string) => {
    setCropListings(prev => prev.filter(c => c.id !== id));
  };

  const updateCropListingStatus = (id: string, status: 'active' | 'sold' | 'cancelled') => {
    setCropListings(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const placeOrder = async (orderData: Omit<MarketplaceOrder, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Promise<MarketplaceOrder> => {
    const orderId = `SM-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Call payment verification endpoint
    let settlementData: any = {};
    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: orderData.totalAmount,
          paymentMethod: 'UPI'
        })
      });
      settlementData = await res.json();
    } catch (e) {
      console.warn('Payment verify fallback:', e);
    }

    const newOrder: MarketplaceOrder = {
      ...orderData,
      id: orderId,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentId: settlementData.settlementReference || `SM-PAY-UPI-${Date.now()}`,
      paymentMethod: 'UPI (GPay / PhonePe Verified)',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Send in-app notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'नवीन ऑर्डर यशस्वी!',
        message: `${orderData.crop} साठी ₹${orderData.totalAmount.toLocaleString('en-IN')} ची ऑर्डर यशस्वीरीत्या स्वीकारली गेली.`,
        type: 'order',
        timestamp: 'आत्ताच',
        read: false
      },
      ...prev
    ]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: MarketplaceOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString().split('T')[0] } : o));
  };

  const bookEquipment = (booking: Omit<EquipmentBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: EquipmentBooking = {
      ...booking,
      id: `eq-bk-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEquipmentBookings(prev => [newBooking, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'अवजारे बुकिंग निश्चित!',
        message: `${booking.equipmentTitle} साठी बुकिंग निश्चित झाली आहे.`,
        type: 'system',
        timestamp: 'आत्ताच',
        read: false
      },
      ...prev
    ]);
  };

  const updateBookingStatus = (bookingId: string, status: EquipmentBooking['status']) => {
    setEquipmentBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const addCropScan = (scan: Omit<CropScanReport, 'id' | 'createdAt'>) => {
    const newScan: CropScanReport = {
      ...scan,
      id: `scan-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCropScans(prev => [newScan, ...prev]);
  };

  const toggleSaveScheme = (schemeId: string) => {
    setSavedSchemeIds(prev =>
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  const addSoilTest = (test: Omit<SoilTestRecord, 'id' | 'createdAt'>) => {
    const newRecord: SoilTestRecord = {
      ...test,
      id: `soil-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSoilTests(prev => [newRecord, ...prev]);
  };

  const addExpenseRecord = (rec: Omit<ExpenseRecord, 'id' | 'createdAt'>) => {
    const newRecord: ExpenseRecord = {
      ...rec,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setExpenses(prev => [newRecord, ...prev]);
  };

  const requestConsultation = (req: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: ConsultationRequest = {
      ...req,
      id: `consult-${Date.now()}`,
      status: 'accepted',
      scheduledTime: 'आज दुपारी ३:३० वा. (Digital Audio Consult)',
      expertAdvice: 'पिकाची मुळे व देठ स्वच्छ पाण्याने धुवून पहा. बुरशीचा प्रादुर्भाव रोखण्यासाठी ट्रायकोडर्मा वापरावे.',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setConsultations(prev => [newRequest, ...prev]);
  };

  const replyConsultation = (id: string, advice: string) => {
    setConsultations(prev => prev.map(c => c.id === id ? { ...c, expertAdvice: advice, status: 'answered', updatedAt: new Date().toISOString().split('T')[0] } : c));
  };

  const toggleFavouriteMarket = (id: string) => {
    setFavouriteMarketIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        language,
        setLanguage,
        t,
        switchRole,
        cropListings,
        addCropListing,
        deleteCropListing,
        updateCropListingStatus,
        orders,
        placeOrder,
        updateOrderStatus,
        commissionPercentage,
        setCommissionPercentage,
        equipmentList,
        equipmentBookings,
        bookEquipment,
        updateBookingStatus,
        cropScans,
        addCropScan,
        schemes,
        savedSchemeIds,
        toggleSaveScheme,
        soilTests,
        addSoilTest,
        expenses,
        addExpenseRecord,
        experts,
        consultations,
        requestConsultation,
        replyConsultation,
        mandiData,
        refreshMandiData,
        mandiLoading,
        favouriteMarketIds,
        toggleFavouriteMarket,
        currentDistrict,
        setCurrentDistrict,
        weather,
        weatherLoading,
        notifications,
        markNotificationRead,
        unreadNotificationsCount,
        authModalOpen,
        setAuthModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
