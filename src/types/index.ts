export type Language = 'mr' | 'hi' | 'en';
export type UserRole = 'farmer' | 'buyer' | 'expert' | 'admin';

export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  preferredLanguage: Language;
  avatarUrl?: string;
  district?: string;
  taluka?: string;
  village?: string;
  state?: string;
  pinCode?: string;
  farmAreaAcres?: number;
  mainCrops?: string[];
  businessName?: string;
  buyerType?: 'Wholesaler' | 'Retailer' | 'Processor' | 'Exporter' | 'Commission Agent';
  qualification?: string;
  specialization?: string;
  experienceYears?: number;
  verified?: boolean;
  status: 'active' | 'pending' | 'suspended';
  createdAt?: string;
}

export interface MandiRecord {
  id: string;
  state: string;
  district: string;
  market: string;
  crop: string;
  cropKey: string;
  variety: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  arrivals: string;
  source: string;
  trend: 'up' | 'down' | 'stable';
  trendPct: string;
}

export interface WeatherData {
  temp: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  rainProbability: number;
  advisory: string;
  forecast: {
    day: string;
    temp: number;
    condition: string;
    rain: number;
  }[];
}

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: 'Quintal' | 'Tons' | 'Kg' | 'Crates';
  pricePerUnit: number;
  district: string;
  village: string;
  description: string;
  imageUrl: string;
  isOrganic?: boolean;
  qualityGrade?: 'Grade A' | 'Grade B' | 'Standard';
  harvestDate?: string;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'disputed'
  | 'refunded';

export interface MarketplaceOrder {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  farmerId: string;
  farmerName: string;
  listingId: string;
  crop: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalAmount: number;
  commissionRate: number; // e.g. 0.02
  commissionAmount: number;
  farmerPayout: number;
  status: OrderStatus;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  paymentId?: string;
  paymentMethod?: string;
  deliveryAddress: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CropScanReport {
  id: string;
  userId: string;
  cropName: string;
  plantPart: string;
  symptoms?: string;
  imageUrl?: string;
  diagnosis: {
    cropIdentified: string;
    suspectedDisease: string;
    confidenceScore: number;
    affectedPart: string;
    severityLevel: 'Low' | 'Moderate' | 'High';
    observedSymptoms: string[];
    probableCauses: string[];
    organicTreatment: string[];
    chemicalTreatmentGuidelines: string[];
    preventiveMeasures: string[];
    expertConsultationNeeded: boolean;
    safetyDisclaimer: string;
  };
  createdAt: string;
}

export interface GovernmentScheme {
  id: string;
  nameMr: string;
  nameHi: string;
  nameEn: string;
  category: 'Direct Income' | 'Insurance' | 'Credit & Loan' | 'Subsidies' | 'Soil & Water';
  shortDescMr: string;
  shortDescHi: string;
  shortDescEn: string;
  benefitsMr: string;
  benefitsHi: string;
  benefitsEn: string;
  eligibility: string[];
  documentsRequired: string[];
  applicationUrl: string;
  portalName: string;
  verifiedDate: string;
}

export interface EquipmentItem {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  title: string;
  category: 'Tractor' | 'Rotavator' | 'Harvester' | 'Drone Sprayer' | 'Cultivator' | 'Thresher' | 'Seed Drill';
  model: string;
  ratePerHour: number;
  ratePerDay: number;
  withOperator: boolean;
  fuelIncluded: boolean;
  district: string;
  village: string;
  available: boolean;
  imageUrl: string;
  description: string;
}

export interface EquipmentBooking {
  id: string;
  equipmentId: string;
  equipmentTitle: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  ownerId: string;
  ownerName: string;
  bookingDate: string;
  durationHours: number;
  totalCost: number;
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ExpenseRecord {
  id: string;
  farmerId: string;
  season: 'Kharif (खरीप)' | 'Rabi (रब्बी)' | 'Summer (उन्हाळी)';
  year: number;
  crop: string;
  areaAcres: number;
  costs: {
    seeds: number;
    fertilizer: number;
    pesticides: number;
    labour: number;
    irrigation: number;
    tractorMachinery: number;
    transport: number;
    other: number;
  };
  production: {
    totalYieldQuintals: number;
    sellingPricePerQuintal: number;
  };
  totalExpense: number;
  totalRevenue: number;
  netProfit: number;
  profitPerAcre: number;
  createdAt: string;
}

export interface SoilTestRecord {
  id: string;
  farmerId: string;
  farmName: string;
  sampleDate: string;
  ph: number;
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  organicCarbon: number; // %
  electricalConductivity: number; // dS/m
  cropRecommended: string;
  healthGrade: 'उत्कृष्ट (Ideal)' | 'चांगले (Good)' | 'सुधारणा आवश्यक (Needs Care)';
  recommendations: string[];
  createdAt: string;
}

export interface ExpertProfile {
  id: string;
  name: string;
  qualification: string;
  institution: string;
  specialization: 'Crop Pathology' | 'Soil Health' | 'Horticulture' | 'Organic Farming' | 'Irrigation Tech' | 'Pest Management';
  experienceYears: number;
  languages: string[];
  district: string;
  rating: number;
  consultationFee: number;
  available: boolean;
  imageUrl: string;
}

export interface ConsultationRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  expertId: string;
  expertName: string;
  crop: string;
  issueDescription: string;
  photoUrl?: string;
  status: 'requested' | 'accepted' | 'answered' | 'closed';
  scheduledTime?: string;
  expertAdvice?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'weather' | 'mandi' | 'order' | 'consultation' | 'scheme' | 'system';
  timestamp: string;
  read: boolean;
}
