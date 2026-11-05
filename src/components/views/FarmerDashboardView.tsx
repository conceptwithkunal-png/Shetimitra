import React from 'react';
import {
  TrendingUp,
  Stethoscope,
  CloudSun,
  ShoppingBag,
  Landmark,
  Tractor,
  Calculator,
  TestTube2,
  GraduationCap,
  Mic,
  ArrowRight,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
  Droplets,
  Wind,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FarmerDashboardViewProps {
  onNavigate: (view: string) => void;
}

export const FarmerDashboardView: React.FC<FarmerDashboardViewProps> = ({ onNavigate }) => {
  const { user, t, weather, mandiData, language } = useApp();

  const todayDate = new Date().toLocaleDateString(
    language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    }
  );

  const dashboardCards = [
    {
      id: 'mandi',
      title: t.navMandi,
      subtitle: language === 'mr' ? 'कांदा ₹२,४५० | सोयाबीन ₹४,६२०' : language === 'hi' ? 'प्याज ₹2,450 | सोयाबीन ₹4,620' : 'Onion ₹2,450 | Soybean ₹4,620',
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-700',
      bgLight: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-900',
      badge: 'Live APMC'
    },
    {
      id: 'crop-doctor',
      title: t.navCropDoctor,
      subtitle: language === 'mr' ? 'पिकाचा फोटो काढा व रोग ओळखा' : language === 'hi' ? 'फोटो अपलोड कर रोग पहचानें' : 'Instant AI Disease Diagnosis',
      icon: Stethoscope,
      color: 'from-blue-600 to-indigo-700',
      bgLight: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-900',
      badge: 'Gemini AI'
    },
    {
      id: 'weather',
      title: t.navWeather,
      subtitle: weather ? `${weather.temp}°C | ${weather.condition}` : '२९°C | अंशतः ढगाळ',
      icon: CloudSun,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-900',
      badge: 'IMD'
    },
    {
      id: 'marketplace',
      title: t.navMarketplace,
      subtitle: language === 'mr' ? 'दलालांशिवाय थेट खरेदी-विक्री' : language === 'hi' ? 'सीधा खरीद-बिक्री मंच' : 'Direct Buy & Sell with Escrow',
      icon: ShoppingBag,
      color: 'from-teal-600 to-emerald-800',
      bgLight: 'bg-teal-50 border-teal-200',
      textColor: 'text-teal-900',
      badge: '0% Middlemen'
    },
    {
      id: 'schemes',
      title: t.navSchemes,
      subtitle: language === 'mr' ? 'PM-किसान, ₹१ पीक विमा, महाडीबीटी' : language === 'hi' ? 'PM-किसान, फसल बीमा, सब्सिडी' : 'PM-KISAN, PMFBY, Subsidies',
      icon: Landmark,
      color: 'from-purple-600 to-indigo-800',
      bgLight: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-900',
      badge: 'Govt Portal'
    },
    {
      id: 'equipment',
      title: t.navEquipment,
      subtitle: language === 'mr' ? 'ट्रॅक्टर, रोटाव्हेटर, ड्रोन स्प्रे' : language === 'hi' ? 'ट्रैक्टर, रोटावेटर, ड्रोन' : 'Tractor, Drone & Harvester',
      icon: Tractor,
      color: 'from-rose-500 to-red-700',
      bgLight: 'bg-rose-50 border-rose-200',
      textColor: 'text-rose-900',
      badge: 'Nearby'
    },
    {
      id: 'expenses',
      title: t.navExpenses,
      subtitle: language === 'mr' ? 'हंगामनिहाय नफा व खर्चाचे गणित' : language === 'hi' ? 'लागत व मुनाफा बहीखाता' : 'Crop Cost & Profit Ledger',
      icon: Calculator,
      color: 'from-cyan-600 to-blue-800',
      bgLight: 'bg-cyan-50 border-cyan-200',
      textColor: 'text-cyan-900',
      badge: 'Finance'
    },
    {
      id: 'soil',
      title: t.navSoil,
      subtitle: language === 'mr' ? 'माती परीक्षण व खत शिफारसी' : language === 'hi' ? 'मिट्टी जांच व खाद सलाह' : 'Soil Test & Fertilizer Dosing',
      icon: TestTube2,
      color: 'from-lime-600 to-emerald-700',
      bgLight: 'bg-lime-50 border-lime-200',
      textColor: 'text-lime-900',
      badge: 'Health Card'
    },
    {
      id: 'experts',
      title: t.navExperts,
      subtitle: language === 'mr' ? 'राहुरी व अकोला कृषी शास्त्रज्ञ' : language === 'hi' ? 'कृषि वैज्ञानिक सीधा परामर्श' : 'University Agronomists',
      icon: GraduationCap,
      color: 'from-orange-500 to-amber-700',
      bgLight: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-900',
      badge: 'KVK Certified'
    },
    {
      id: 'assistant',
      title: t.navAssistant,
      subtitle: language === 'mr' ? 'मराठीत बोला, शेती सल्ला मिळवा' : language === 'hi' ? 'आवाज से पूछें फसल सवाल' : 'Multilingual Agro-AI Voice',
      icon: Mic,
      color: 'from-emerald-600 to-teal-700',
      bgLight: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-900',
      badge: 'Voice AI'
    }
  ];

  return (
    <div className="space-y-6">

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#10552B] via-[#16833B] to-[#1e9947] text-white p-5 sm:p-7 shadow-lg">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'mr' ? 'शेती मित्र - समृद्ध शेतीचा राजमार्ग' : 'Sheti Mitra - Smart Digital Farming'}</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'mr' ? `राम राम, ${user.fullName}!` : `Welcome, ${user.fullName}!`}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-emerald-100">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>{user.village ? `${user.village}, ` : ''}{user.district || 'Pune'}, {user.state || 'Maharashtra'}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>{todayDate}</span>
            </div>
          </div>

          {/* Quick Advisory ticker */}
          <div className="mt-4 p-3 rounded-xl bg-black/20 border border-white/10 text-xs sm:text-sm text-emerald-50 flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p>
              <span className="font-bold text-amber-200">
                {language === 'mr' ? 'आजचा शेती सल्ला:' : 'Today\'s Advisory:'}{' '}
              </span>
              {weather?.advisory || 'सोयाबीन काढणी व हरभरा पेरणीसाठी अनुकूल हवामान. रब्बी हंगामाची पूर्वतयारी वेळेत पूर्ण करा.'}
            </p>
          </div>
        </div>

        {/* Decorative Leaf Graphic */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-15 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-white/20 blur-2xl" />
        </div>
      </div>

      {/* Weather & Mandi Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Weather Card */}
        <div
          onClick={() => onNavigate('weather')}
          className="bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-xs cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.navWeather}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {user.district || 'Pune'}
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {weather?.temp || 29}°C
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{weather?.condition || 'अंशतः ढगाळ'}</p>
            </div>
            <CloudSun className="w-10 h-10 text-amber-500" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.humidity}: {weather?.humidity || 54}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>{t.wind}: {weather?.windSpeed || 12} km/h</span>
            </div>
          </div>
        </div>

        {/* Mandi Rates Highlights */}
        <div
          onClick={() => onNavigate('mandi')}
          className="bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-300 shadow-xs cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">आजचे मुख्य बाजारभाव</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
              Live
            </span>
          </div>
          <div className="mt-2.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">लासलगाव कांदा (Onion)</span>
              <span className="font-bold text-emerald-800">₹२,४५० / क्विंटल</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">लातूर सोयाबीन (Soybean)</span>
              <span className="font-bold text-emerald-800">₹४,६२० / क्विंटल</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">अकोला कापूस (Cotton)</span>
              <span className="font-bold text-emerald-800">₹७,४२० / क्विंटल</span>
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-[11px] font-bold text-[#16833B] inline-flex items-center space-x-1">
              <span>सर्व बाजारभाव पहा</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* AI Doctor Quick Scanner Banner */}
        <div
          onClick={() => onNavigate('crop-doctor')}
          className="bg-gradient-to-br from-emerald-800 to-green-950 p-4 rounded-xl text-white shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-1.5 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t.navCropDoctor}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold mt-1">
              {language === 'mr' ? 'पिकावर कीड किंवा रोग आहे का?' : 'Is your crop facing pest or disease?'}
            </h3>
            <p className="text-xs text-emerald-200 mt-1">
              {language === 'mr' ? 'कॅमेऱ्याने त्वरित फोटो काढा, AI कडून अचूक उपाय मिळवा.' : 'Instant AI pathology scan with prevention guidelines.'}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs bg-white text-emerald-950 font-bold px-3 py-1.5 rounded-lg shadow-sm">
              {language === 'mr' ? 'आताच स्कॅन करा' : 'Scan Now'}
            </span>
            <Stethoscope className="w-7 h-7 text-emerald-300/80" />
          </div>
        </div>

      </div>

      {/* 10 Core Application Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-extrabold text-gray-900">
            {language === 'mr' ? 'शेती मित्र मुख्य सेवा' : 'Core Agricultural Services'}
          </h2>
          <span className="text-xs text-emerald-700 font-semibold">१० सेवा उपलब्ध</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`p-3.5 sm:p-4 rounded-xl bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#16833B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                  <span>{language === 'mr' ? 'उघडा' : 'Open'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farmer Recent Expenses & Reminders Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Farming Expense Summary */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                {language === 'mr' ? 'चालू हंगाम खर्च व नफा हिशोब' : 'Current Season Expense Ledger'}
              </h3>
              <p className="text-xs text-gray-500">सोयाबीन खरीप २०२६ (३ एकर)</p>
            </div>
            <button
              onClick={() => onNavigate('expenses')}
              className="text-xs font-bold text-[#16833B] hover:underline"
            >
              {language === 'mr' ? 'सविस्तर पहा' : 'View All'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-xl text-center">
            <div>
              <p className="text-[11px] text-gray-500">{t.totalInvestment}</p>
              <p className="font-bold text-sm text-gray-900 mt-0.5">₹४६,३००</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">{t.totalRevenue}</p>
              <p className="font-bold text-sm text-emerald-800 mt-0.5">₹१,२९,३६०</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">{t.netProfit}</p>
              <p className="font-extrabold text-sm text-[#16833B] mt-0.5">+₹८३,०६०</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
            <span>प्रति एकर निव्वळ नफा: <strong className="text-gray-900 font-bold">₹२७,६८६</strong></span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              उत्पादन: २८ क्विंटल
            </span>
          </div>
        </div>

        {/* Agricultural Crop Reminders & Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                {language === 'mr' ? 'शेती कामे व स्मरणपत्रे' : 'Farming Reminders & Tasks'}
              </h3>
              <p className="text-xs text-gray-500">हंगाम रब्बी २०२६-२७</p>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              ३ आवश्यक कामे
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#16833B] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">हरभरा पेरणीसाठी ट्रायकोडर्मा बीजप्रक्रिया</p>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  मर रोग प्रतिबंधासाठी प्रति किलो बियाण्यास ५ ग्रॅम ट्रायकोडर्मा किंवा २ ग्रॅम थायरम चोळावे.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">कांदा रोपांची गादीवाफ्यावर पुनर्लागवड</p>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  रोपे ४५ ते ५० दिवसांची झाल्यावर १५×१० सेमी अंतरावर पुनर्लागवड करावी.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">महाडीबीटी ठिबक सिंचन पूर्वसंमती तपासणी</p>
                <p className="text-gray-600 text-[11px] mt-0.5">
                  लॉटरी लागलेल्या शेतकऱ्यांनी कागदपत्रे ७ दिवसांच्या आत अपलोड करावीत.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
