import {
  CropListing,
  EquipmentItem,
  GovernmentScheme,
  ExpertProfile,
  MarketplaceOrder,
  SoilTestRecord,
  ExpenseRecord
} from '../types';

export const INITIAL_CROP_LISTINGS: CropListing[] = [
  {
    id: 'crop-101',
    farmerId: 'farmer-1',
    farmerName: 'विठ्ठल तुकाराम पाटील (Vitthal Patil)',
    farmerPhone: '+91 98220 12345',
    crop: 'Onion (कांदा)',
    variety: 'लाल गरवा कांदा (Garwa Red)',
    quantity: 120,
    unit: 'Quintal',
    pricePerUnit: 2400,
    district: 'Nashik',
    village: 'Lasalgaon',
    description: 'उत्तम प्रतवारी केलेला, सुकवलेला गोल लाल कांदा. साठवणुकीसाठी अत्यंत योग्य.',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    isOrganic: false,
    qualityGrade: 'Grade A',
    harvestDate: '2026-10-25',
    status: 'active',
    createdAt: '2026-11-01'
  },
  {
    id: 'crop-102',
    farmerId: 'farmer-2',
    farmerName: 'ज्ञानेश्वर कदम (Dnyaneshwar Kadam)',
    farmerPhone: '+91 94231 67890',
    crop: 'Soybean (सोयाबीन)',
    variety: 'JS 335 (पिवळा सोयाबीन)',
    quantity: 85,
    unit: 'Quintal',
    pricePerUnit: 4650,
    district: 'Latur',
    village: 'Ausa',
    description: 'कमी ओलावा असलेला (१०% आत), स्वच्छ केलेला ग्रेड १ सोयाबीन बियाणे/तेल वापरासाठी.',
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    isOrganic: true,
    qualityGrade: 'Grade A',
    harvestDate: '2026-10-28',
    status: 'active',
    createdAt: '2026-11-02'
  },
  {
    id: 'crop-103',
    farmerId: 'farmer-3',
    farmerName: 'बाळासाहेब शिंदे (Balasaheb Shinde)',
    farmerPhone: '+91 98900 45678',
    crop: 'Cotton (कापूस)',
    variety: 'अजित १५५ (लांब धागा)',
    quantity: 60,
    unit: 'Quintal',
    pricePerUnit: 7450,
    district: 'Akola',
    village: 'Murtizapur',
    description: 'पहिली वेचणी, कचरा नसलेला पांढरा शुभ्र लांब धाग्याचा कापूस.',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    isOrganic: false,
    qualityGrade: 'Grade A',
    harvestDate: '2026-10-30',
    status: 'active',
    createdAt: '2026-11-03'
  },
  {
    id: 'crop-104',
    farmerId: 'farmer-4',
    farmerName: 'सुनील पवार (Sunil Pawar)',
    farmerPhone: '+91 97654 32109',
    crop: 'Pomegranate (डाळिंब)',
    variety: 'भगवा (Bhagawa)',
    quantity: 40,
    unit: 'Quintal',
    pricePerUnit: 11500,
    district: 'Solapur',
    village: 'Sangola',
    description: 'रक्तासारखा लाल रंग, मऊ बिया, निर्यातक्षम प्रतवारी (Export Quality 250g+).',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    isOrganic: true,
    qualityGrade: 'Grade A',
    harvestDate: '2026-11-01',
    status: 'active',
    createdAt: '2026-11-03'
  },
  {
    id: 'crop-105',
    farmerId: 'farmer-5',
    farmerName: 'रमेश जाधव (Ramesh Jadhav)',
    farmerPhone: '+91 98812 34567',
    crop: 'Tomato (टोमॅटो)',
    variety: 'अभिनव हायब्रीड',
    quantity: 300,
    unit: 'Crates',
    pricePerUnit: 420,
    district: 'Pune',
    village: 'Narayangaon',
    description: 'ताजे, घट्ट, लाल चमकदार टोमॅटो. वाहतुकीसाठी टिकाऊ.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    isOrganic: false,
    qualityGrade: 'Standard',
    harvestDate: '2026-11-04',
    status: 'active',
    createdAt: '2026-11-04'
  }
];

export const INITIAL_ORDERS: MarketplaceOrder[] = [
  {
    id: 'SM-ORD-2026-881',
    buyerId: 'buyer-1',
    buyerName: 'गोयल अ‍ॅग्रो ट्रेडर्स (Goyal Agro)',
    buyerPhone: '+91 98221 99887',
    farmerId: 'farmer-1',
    farmerName: 'विठ्ठल तुकाराम पाटील',
    listingId: 'crop-101',
    crop: 'Onion (कांदा)',
    quantity: 50,
    unit: 'Quintal',
    unitPrice: 2400,
    totalAmount: 120000,
    commissionRate: 0.02,
    commissionAmount: 2400,
    farmerPayout: 117600,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentId: 'SM-PAY-UPI-9921',
    paymentMethod: 'UPI (GPay / PhonePe)',
    deliveryAddress: 'वाशी कृषी बाजार, गाळा क्र. २४, नवी मुंबई, महाराष्ट्र',
    createdAt: '2026-10-31',
    updatedAt: '2026-11-02'
  },
  {
    id: 'SM-ORD-2026-882',
    buyerId: 'buyer-2',
    buyerName: 'महादेव ऑईल मिल्स (Mahadev Oil Mills)',
    buyerPhone: '+91 94220 88776',
    farmerId: 'farmer-2',
    farmerName: 'ज्ञानेश्वर कदम',
    listingId: 'crop-102',
    crop: 'Soybean (सोयाबीन)',
    quantity: 40,
    unit: 'Quintal',
    unitPrice: 4650,
    totalAmount: 186000,
    commissionRate: 0.02,
    commissionAmount: 3720,
    farmerPayout: 182280,
    status: 'processing',
    paymentStatus: 'paid',
    paymentId: 'SM-PAY-UPI-9944',
    paymentMethod: 'Bank Transfer / RTGS',
    deliveryAddress: 'एमआयडीसी प्लॉट क्र. १२, लातूर, महाराष्ट्र',
    createdAt: '2026-11-03',
    updatedAt: '2026-11-04'
  }
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    ownerId: 'farmer-owner-1',
    ownerName: 'सचिन थोरात (Sachin Thorat)',
    ownerPhone: '+91 98234 56789',
    title: 'Mahindra 575 DI XP Plus Tractor (४७ HP)',
    category: 'Tractor',
    model: '२०२४ मॉडेल, हायड्रॉलिक रोटरी सुसज्ज',
    ratePerHour: 650,
    ratePerDay: 4800,
    withOperator: true,
    fuelIncluded: false,
    district: 'Pune',
    village: 'Baramati',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=600&q=80',
    description: 'नांगरणी, रोटाव्हेटर, व पेरणीसाठी अत्यंत शक्तिशाली ट्रॅक्टर. अनुभवी ऑपरेटरसह उपलब्ध.'
  },
  {
    id: 'eq-2',
    ownerId: 'farmer-owner-2',
    ownerName: 'अशोक मोरे (Ashok More)',
    ownerPhone: '+91 94225 11223',
    title: 'Shaktiman Champion 7ft Rotavator',
    category: 'Rotavator',
    model: '५४ ब्लेड्स, हेवी ड्युटी गिअर बॉक्स',
    ratePerHour: 450,
    ratePerDay: 3200,
    withOperator: false,
    fuelIncluded: false,
    district: 'Nashik',
    village: 'Niphad',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    description: 'माती भुसभुशीत करण्यासाठी उत्तम रोटाव्हेटर. ट्रॅक्टरला जोडण्यासाठी तयार स्थितीत.'
  },
  {
    id: 'eq-3',
    ownerId: 'farmer-owner-3',
    ownerName: 'कृषी टेक सेवा संस्था (Krishi Tech)',
    ownerPhone: '+91 97660 33445',
    title: 'Agriculture Drone Sprayer (१० लिटर टँक)',
    category: 'Drone Sprayer',
    model: 'DGCA प्रमाणित, ऑटोमॅटिक GPS स्प्रे सिस्टीम',
    ratePerHour: 950,
    ratePerDay: 7000,
    withOperator: true,
    fuelIncluded: true,
    district: 'Latur',
    village: 'Latur Rural',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
    description: 'एका एकराची फवारणी अवघ्या ८ मिनिटांत. औषधाची व पाण्याची ६०% बचत. अनुभवी पायलटसह.'
  },
  {
    id: 'eq-4',
    ownerId: 'farmer-owner-4',
    ownerName: 'दशरथ शिंदे (Dashrath Shinde)',
    ownerPhone: '+91 98901 77665',
    title: 'Preet 987 Multicrop Combine Harvester',
    category: 'Harvester',
    model: 'सोयाबीन, गहू, हरभरा मळणी सुसज्ज',
    ratePerHour: 1800,
    ratePerDay: 14000,
    withOperator: true,
    fuelIncluded: true,
    district: 'Akola',
    village: 'Akot',
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    description: 'स्वच्छ दाणे काढणी, शून्य नुकसान. एका तासात २ एकर क्षेत्राची सोंगणी व मळणी.'
  }
];

export const INITIAL_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    nameMr: 'पंतप्रधान किसान सन्मान निधी (PM-KISAN)',
    nameHi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    nameEn: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    category: 'Direct Income',
    shortDescMr: 'शेतकऱ्यांना प्रतिवर्षी ₹६,००० थेट बँक खात्यात (३ हप्त्यांमध्ये ₹२,००० प्रत्येकी).',
    shortDescHi: 'पात्र किसानों को प्रति वर्ष ₹6,000 की वित्तीय सहायता (3 किस्तों में ₹2,000)।',
    shortDescEn: 'Income support of ₹6,000 per year in three equal instalments of ₹2,000 directly into bank accounts.',
    benefitsMr: 'दर चार महिन्यांनी ₹२,००० थेट डीबीटी द्वारे. महाराष्ट्र शासनाकडून अतिरिक्त ₹६,००० नमो महासन्मान योजना!',
    benefitsHi: 'हर 4 महीने पर ₹2,000 सीधे बैंक खाते में। महाराष्ट्र में नमो योजना के साथ कुल ₹12,000 प्रति वर्ष!',
    benefitsEn: '₹2,000 every 4 months via DBT. In Maharashtra, combined with Namo Shetkari Yojana for total ₹12,000/year.',
    eligibility: [
      'स्वतःच्या नावावर शेतजमीन असलेले सर्व शेतकरी कुटुंब',
      'आधार कार्ड बँक खात्याशी लिंक असणे अनिवार्य (DBT Enabled)',
      'e-KYC पूर्ण असणे आवश्यक'
    ],
    documentsRequired: [
      '७/१२ आणि ८-अ उतारा (Land Records)',
      'आधार कार्ड (Aadhaar Card)',
      'बँक पासबुक (Bank Passbook with IFSC)',
      'पासपोर्ट साईज फोटो'
    ],
    applicationUrl: 'https://pmkisan.gov.in',
    portalName: 'PM-KISAN Official Portal & CSC Center',
    verifiedDate: '2026-10-15'
  },
  {
    id: 'pmfby',
    nameMr: 'प्रधानमंत्री पीक विमा योजना (PMFBY - १ रुपयात पीक विमा)',
    nameHi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    nameEn: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Insurance',
    shortDescMr: 'महाराष्ट्र शासनाची केवळ ₹१ मध्ये सर्वसमावेशक खरीप व रब्बी पीक विमा संरक्षण योजना.',
    shortDescHi: 'महाराष्ट्र सरकार की केवल ₹1 में व्यापक खरीफ व रबी फसल बीमा योजना।',
    shortDescEn: 'Comprehensive crop insurance coverage for farmers at a nominal premium of just ₹1 in Maharashtra.',
    benefitsMr: 'नैसर्गिक आपत्ती, दुष्काळ, अतिवृष्टी, कीड रोगामुळे पिकांचे नुकसान झाल्यास थेट भरपाई.',
    benefitsHi: 'सूखा, बाढ़, ओलावृष्टि और कीट प्रकोप से होने वाले फसल नुकसान की 100% भरपाई।',
    benefitsEn: 'Full financial security against non-preventable natural risks, flood, drought, and post-harvest losses.',
    eligibility: [
      'अधिसूचित क्षेत्रात अधिसूचित पिके घेणारे सर्व शेतकरी (कर्जदार व बिगर-कर्जदार)',
      'भाडेतत्त्वावर शेती करणारे शेतकरी (संमतीपत्रासह)'
    ],
    documentsRequired: [
      'डिजिटल स्वाक्षरीत ७/१२ व ८-अ',
      'पीक पाहणी नोंद (e-Pik Pahani)',
      'आधार कार्ड व बँक पासबुक'
    ],
    applicationUrl: 'https://pmfby.gov.in',
    portalName: 'PMFBY / MahaDBT Farmers Portal',
    verifiedDate: '2026-09-20'
  },
  {
    id: 'mahadbt-drip',
    nameMr: 'मुख्यमंत्री सूक्ष्म सिंचन योजना (ठिबक व तुषार सिंचन अनुदान)',
    nameHi: 'मुख्यमंत्री सूक्ष्म सिंचाई योजना (ड्रिप एवं स्प्रिंकलर सब्सिडी)',
    nameEn: 'Chief Minister Micro Irrigation Scheme (Drip & Sprinkler Subsidy)',
    category: 'Subsidies',
    shortDescMr: 'अल्प व अत्यल्प भूधारक शेतकऱ्यांना ठिबक सिंचनासाठी ८०% पर्यंत थेट शासकीय अनुदान.',
    shortDescHi: 'छोटे व सीमांत किसानों को ड्रिप व स्प्रिंकलर सिंचाई के लिए 80% तक की भारी सब्सिडी।',
    shortDescEn: 'Up to 80% financial subsidy on installation of micro-irrigation systems for small & marginal farmers.',
    benefitsMr: 'पाण्याची ५०-६०% बचत, खतांचा कार्यक्षम वापर, व उत्पादनात ३०-४०% वाढ.',
    benefitsHi: 'पानी की 60% बचत, उर्वरक खर्च में कमी और पैदावार में 35% की बढ़ोतरी।',
    benefitsEn: 'Substantial water saving, reduction in labor cost, and improved yield quality.',
    eligibility: [
      'शेतजमिनीवर पाण्याचा खात्रीशीर स्त्रोत असणे आवश्यक (विहीर / बोअरवेल / कालवा)',
      'महाडीबीटी पोर्टलवर शेतकरी नोंदणी असणे आवश्यक'
    ],
    documentsRequired: [
      '७/१२ पाणी नोंदीसह',
      'वीज बिल पावती (विद्युत जोडणी असल्यास)',
      'अधिकृत डीलरचे कोटेशन'
    ],
    applicationUrl: 'https://mahadbt.maharashtra.gov.in',
    portalName: 'MahaDBT Farmer Schemes',
    verifiedDate: '2026-10-01'
  },
  {
    id: 'kcc-loan',
    nameMr: 'किसान क्रेडिट कार्ड (KCC - ४% सवलतीचे पीक कर्ज)',
    nameHi: 'किसान क्रेडिट कार्ड (KCC - 4% रियायती फसल ऋण)',
    nameEn: 'Kisan Credit Card Scheme (KCC - 4% Subsidized Crop Loan)',
    category: 'Credit & Loan',
    shortDescMr: 'वेळेवर परतफेड करणाऱ्या शेतकऱ्यांना ₹३ लाखांपर्यंत शून्य ते ४% व्याजदराने पीक कर्ज.',
    shortDescHi: 'समय पर भुगतान करने वाले किसानों को ₹3 लाख तक शून्य से 4% ब्याज पर रियायती ऋण।',
    shortDescEn: 'Short term crop loans up to ₹3,00,000 at an effective interest rate of 4% (0% with state prompt repayment rebate).',
    benefitsMr: 'सावकारांच्या जाचातून मुक्ती, खते, बियाणे खरेदीसाठी तात्काळ रोख रक्कम उपलब्ध.',
    benefitsHi: 'उर्वरक, बीज और जुताई की तात्कालिक जरूरतों के लिए आसान और सुलभ बैंक लोन।',
    benefitsEn: 'Instant access to institutional agricultural credit without collateral up to ₹1.60 Lakh.',
    eligibility: [
      'सर्व शेतकरी वैयक्तिक किंवा संयुक्त कर्जदार',
      'पशुपालन व दुग्धव्यवसाय करणारे शेतकरी देखील पात्र'
    ],
    documentsRequired: [
      '७/१२, ८-अ, फेरफार उतारा',
      'आधार कार्ड व पॅन कार्ड',
      'ना-हरकत प्रमाणपत्र (NOC)'
    ],
    applicationUrl: 'https://agricoop.nic.in',
    portalName: 'Any Nationalized / District Central Co-op Bank',
    verifiedDate: '2026-10-10'
  }
];

export const INITIAL_EXPERTS: ExpertProfile[] = [
  {
    id: 'exp-1',
    name: 'डॉ. संजय शिंदे (Dr. Sanjay Shinde)',
    qualification: 'M.Sc. (Agri), Ph.D. (Plant Pathology)',
    institution: 'महात्मा फुले कृषी विद्यापीठ, राहुरी (MPKV)',
    specialization: 'Crop Pathology',
    experienceYears: 18,
    languages: ['Marathi', 'Hindi', 'English'],
    district: 'Ahmednagar',
    rating: 4.9,
    consultationFee: 0, // Free digital consult on Sheti Mitra
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'exp-2',
    name: 'डॉ. अर्चना कुलकर्णी (Dr. Archana Kulkarni)',
    qualification: 'M.Sc. (Soil Science & Agri Chemistry)',
    institution: 'वसंतराव नाईक मराठवाडा कृषी विद्यापीठ, परभणी (VNMKV)',
    specialization: 'Soil Health',
    experienceYears: 14,
    languages: ['Marathi', 'Hindi', 'English'],
    district: 'Latur',
    rating: 4.8,
    consultationFee: 0,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'exp-3',
    name: 'प्रा. दिलीप पाटील (Prof. Dilip Patil)',
    qualification: 'M.Sc. (Horticulture - Fruit Science)',
    institution: 'डॉ. पंजाबराव देशमुख कृषी विद्यापीठ, अकोला (PDKV)',
    specialization: 'Horticulture',
    experienceYears: 22,
    languages: ['Marathi', 'Hindi'],
    district: 'Nashik',
    rating: 5.0,
    consultationFee: 0,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_SOIL_TESTS: SoilTestRecord[] = [
  {
    id: 'soil-1',
    farmerId: 'farmer-1',
    farmName: 'रानमळा गट नं. ४२ (४.५ एकर)',
    sampleDate: '2026-10-18',
    ph: 7.4,
    nitrogen: 240, // Medium-Low
    phosphorus: 18, // Medium
    potassium: 360, // High
    organicCarbon: 0.65, // Medium
    electricalConductivity: 0.45, // Normal
    cropRecommended: 'सोयाबीन, हरभरा, कांदा',
    healthGrade: 'चांगले (Good)',
    recommendations: [
      'नत्राची कमतरता भरून काढण्यासाठी एकरी ५० किलो युरिया दोन हप्त्यांत द्यावा.',
      'सेंद्रिय कर्ब १% पर्यंत वाढवण्यासाठी शेतात एकरी ३ ट्रॉली चांगले कुजलेले शेणखत किंवा गांडूळ खत मिसळावे.',
      'पालाशचे प्रमाण पुरेसे असल्याने पोटॅश खताची अतिरिक्त मात्रा देणे टाळावे.'
    ],
    createdAt: '2026-10-20'
  }
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-rec-1',
    farmerId: 'farmer-1',
    season: 'Kharif (खरीप)',
    year: 2026,
    crop: 'Soybean (सोयाबीन JS 335)',
    areaAcres: 3,
    costs: {
      seeds: 6600,
      fertilizer: 7200,
      pesticides: 4500,
      labour: 14000,
      irrigation: 1500,
      tractorMachinery: 8500,
      transport: 2800,
      other: 1200
    },
    production: {
      totalYieldQuintals: 28,
      sellingPricePerQuintal: 4620
    },
    totalExpense: 46300,
    totalRevenue: 129360,
    netProfit: 83060,
    profitPerAcre: 27686,
    createdAt: '2026-10-29'
  }
];
