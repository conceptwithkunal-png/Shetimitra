import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  AlertTriangle,
  MapPin,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherView: React.FC = () => {
  const {
    weather,
    weatherLoading,
    currentDistrict,
    setCurrentDistrict,
    t,
    language
  } = useApp();

  const districts = ['Pune', 'Nashik', 'Latur', 'Nagpur', 'Akola', 'Solapur', 'Nanded', 'Jalgaon', 'Ahmednagar', 'Kolhapur'];

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>IMD & Agro-Met Advisory Service</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.weatherTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {language === 'mr' ? 'स्थानिक हवामानावर आधारित पीक फवारणी व पेरणी सल्ला' : 'Real-time localized agro-meteorological guidance'}
          </p>
        </div>

        {/* District Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <select
            value={currentDistrict}
            onChange={(e) => setCurrentDistrict(e.target.value)}
            className="py-2 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-800 bg-white focus:border-emerald-500 focus:outline-hidden"
          >
            {districts.map(d => (
              <option key={d} value={d}>
                {d} ({language === 'mr' ? 'जिल्हा' : 'District'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Day Highlights Card */}
      <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-teal-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              {currentDistrict}, महाराष्ट्र (Maharashtra)
            </span>
            <span className="text-xs text-blue-100">
              आजचा अंदाज (Today)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-4">
            <div>
              <div className="text-4xl sm:text-6xl font-black tracking-tight">
                {weather?.temp || 29}°C
              </div>
              <p className="text-sm sm:text-base font-semibold text-blue-100 mt-1">
                {weather?.condition || 'अंशतः ढगाळ'} • किमान {weather?.minTemp || 18}°C ते कमाल {weather?.maxTemp || 32}°C
              </p>
            </div>

            <CloudSun className="w-20 h-20 text-amber-300 drop-shadow-md shrink-0" />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/20 text-xs">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-sky-200" />
              <div>
                <span className="block text-blue-200 text-[10px]">{t.humidity}</span>
                <span className="font-bold text-white text-sm">{weather?.humidity || 54}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-sky-200" />
              <div>
                <span className="block text-blue-200 text-[10px]">{t.wind}</span>
                <span className="font-bold text-white text-sm">{weather?.windSpeed || 12} km/h</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <CloudRain className="w-4 h-4 text-sky-200" />
              <div>
                <span className="block text-blue-200 text-[10px]">{t.rainChance}</span>
                <span className="font-bold text-white text-sm">{weather?.rainProbability || 15}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-20 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
      </div>

      {/* Agro-Advisory Alert Card */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 shadow-xs">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-emerald-950 text-sm sm:text-base">
              {t.agroAdvisory} ({currentDistrict})
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900 mt-1 leading-relaxed">
              {weather?.advisory || 'कोरडे हवामान असल्याने रब्बी हंगामासाठी मशागत, हरभरा व गहू पेरणीसाठी अनुकूल काळ आहे. तुषार सिंचन रात्रीच्या वेळेस करावे.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-emerald-200 text-xs font-semibold">
              <div className="p-2 bg-white rounded-lg border border-emerald-200 text-emerald-900">
                🌱 पेरणी अनुकूलता: <span className="font-bold text-[#16833B]">उत्कृष्ट (९०%)</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-200 text-emerald-900">
                💨 फवारणी योग्यता: <span className="font-bold text-[#16833B]">अनुकूल (वारा कमी)</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-200 text-emerald-900">
                🌾 काढणी-मळणी: <span className="font-bold text-[#16833B]">सुरक्षित (पाऊस नाही)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <h3 className="font-extrabold text-gray-900 text-base mb-4 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>{t.sevenDayForecast}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {(weather?.forecast || [
            { day: 'आज', temp: 31, condition: 'Partly Cloudy', rain: 15 },
            { day: 'उद्या', temp: 32, condition: 'Sunny', rain: 10 },
            { day: 'शुक्र', temp: 30, condition: 'Clear', rain: 5 },
            { day: 'शनि', temp: 29, condition: 'Scattered Clouds', rain: 20 },
            { day: 'रवि', temp: 31, condition: 'Sunny', rain: 10 },
            { day: 'सोम', temp: 32, condition: 'Clear', rain: 5 },
            { day: 'मंगळ', temp: 30, condition: 'Partly Cloudy', rain: 15 }
          ]).map((item, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all text-center flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-gray-700 block">{item.day}</span>
                <div className="my-2 flex justify-center">
                  {item.rain > 15 ? (
                    <CloudRain className="w-7 h-7 text-blue-500" />
                  ) : item.rain > 5 ? (
                    <CloudSun className="w-7 h-7 text-amber-500" />
                  ) : (
                    <Sun className="w-7 h-7 text-amber-500" />
                  )}
                </div>
                <div className="text-base font-extrabold text-gray-900">
                  {item.temp}°C
                </div>
                <span className="text-[10px] text-gray-500 block truncate mt-0.5">
                  {item.condition}
                </span>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-200/60 text-[10px] font-semibold text-blue-700 flex items-center justify-center space-x-1">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span>{item.rain}% पाऊस</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
