import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Filter,
  Share2,
  Star,
  RefreshCw,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MandiRecord } from '../../types';

export const MandiPricesView: React.FC = () => {
  const {
    mandiData,
    refreshMandiData,
    mandiLoading,
    favouriteMarketIds,
    toggleFavouriteMarket,
    t,
    language
  } = useApp();

  const [searchCrop, setSearchCrop] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(['m-1', 'm-4']);
  const [activeCropForChart, setActiveCropForChart] = useState<'onion' | 'soybean' | 'cotton' | 'tomato'>('onion');

  const districts = ['All', 'Nashik', 'Pune', 'Latur', 'Akola', 'Solapur', 'Nanded', 'Jalgaon', 'Ahmednagar', 'Kolhapur', 'Amravati'];

  const filteredMandi = mandiData.filter((item) => {
    const matchesCrop = item.crop.toLowerCase().includes(searchCrop.toLowerCase()) ||
                        item.cropKey.toLowerCase().includes(searchCrop.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    return matchesCrop && matchesDistrict;
  });

  const chartHistoryData = {
    onion: [
      { day: '28 Oct', price: 2100 },
      { day: '29 Oct', price: 2180 },
      { day: '30 Oct', price: 2250 },
      { day: '31 Oct', price: 2320 },
      { day: '01 Nov', price: 2380 },
      { day: '02 Nov', price: 2420 },
      { day: '03 Nov', price: 2450 }
    ],
    soybean: [
      { day: '28 Oct', price: 4550 },
      { day: '29 Oct', price: 4580 },
      { day: '30 Oct', price: 4600 },
      { day: '31 Oct', price: 4610 },
      { day: '01 Nov', price: 4630 },
      { day: '02 Nov', price: 4615 },
      { day: '03 Nov', price: 4620 }
    ],
    cotton: [
      { day: '28 Oct', price: 7150 },
      { day: '29 Oct', price: 7220 },
      { day: '30 Oct', price: 7300 },
      { day: '31 Oct', price: 7350 },
      { day: '01 Nov', price: 7380 },
      { day: '02 Nov', price: 7400 },
      { day: '03 Nov', price: 7420 }
    ],
    tomato: [
      { day: '28 Oct', price: 2200 },
      { day: '29 Oct', price: 2100 },
      { day: '30 Oct', price: 1950 },
      { day: '31 Oct', price: 1880 },
      { day: '01 Nov', price: 1800 },
      { day: '02 Nov', price: 1720 },
      { day: '03 Nov', price: 1750 }
    ]
  };

  const handleShare = (item: MandiRecord) => {
    const text = encodeURIComponent(
      `🌾 शेती मित्र - आजचे थेट बाजारभाव 🌾\n\n📌 पीक: ${item.crop} (${item.variety})\n🏛️ बाजार समिती: ${item.market} (${item.district})\n💰 सरासरी भाव: ₹${item.modalPrice.toLocaleString('en-IN')} / क्विंटल\n📉 किमान: ₹${item.minPrice} | कमाल: ₹${item.maxPrice}\n📦 आवक: ${item.arrivals}\n📅 दिनांक: ${item.arrivalDate}\n\nअधिकृत स्त्रोत: Agmarknet & MSAMB\nअधिक माहितीसाठी शेती मित्र अ‍ॅप वापरा!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const toggleCompareItem = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(prev => prev.filter(x => x !== id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare(prev => [...prev, id]);
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{t.verifiedFreshness}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {t.mandiTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t.mandiSubtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                compareMode
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t.compareMarkets}</span>
            </button>

            <button
              onClick={refreshMandiData}
              disabled={mandiLoading}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#16833B] text-white hover:bg-emerald-800 flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${mandiLoading ? 'animate-spin' : ''}`} />
              <span>{language === 'mr' ? 'रिफ्रेश' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Filters Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-5 pt-4 border-t border-gray-100">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={language === 'mr' ? 'पीक शोधा (उदा. सोयाबीन, कांदा, कापूस)...' : 'Search crop (e.g. Onion, Soybean)...'}
              value={searchCrop}
              onChange={(e) => setSearchCrop(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-6 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden bg-white"
            >
              {districts.map(d => (
                <option key={d} value={d}>
                  {d === 'All' ? (language === 'mr' ? 'सर्व जिल्हे (All Districts)' : 'All Districts') : `${d} District`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Drawer if enabled */}
      {compareMode && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-amber-950 text-sm">
                {language === 'mr' ? 'बाजार समिती तुलना फलक' : 'APMC Rate Comparison Panel'}
              </h3>
              <p className="text-xs text-amber-800">
                {language === 'mr' ? 'खालील कार्ड्सवर क्लिक करून २ ते ३ बाजारांचे दर समोरासमोर तपासा.' : 'Select 2 to 3 markets to compare modal rates side-by-side.'}
              </p>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
              {selectedForCompare.length} / 3 निवडले
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mandiData
              .filter(item => selectedForCompare.includes(item.id))
              .map(item => (
                <div key={item.id} className="bg-white p-3.5 rounded-xl border border-amber-300 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">{item.crop}</span>
                    <span className="text-[10px] text-gray-500">{item.arrivalDate}</span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mt-1">{item.market}</h4>
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg text-center">
                    <span className="text-[11px] text-gray-500 block">सरासरी भाव (Modal)</span>
                    <span className="text-base font-extrabold text-[#16833B]">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">किमान ₹{item.minPrice} - कमाल ₹{item.maxPrice}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 7-Day Price Trend Chart (Interactive SVG) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              {t.priceTrend} (₹ / क्विंटल)
            </h3>
          </div>

          {/* Crop Selector Tabs for Chart */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'onion', label: 'कांदा (Onion)' },
              { id: 'soybean', label: 'सोयाबीन (Soybean)' },
              { id: 'cotton', label: 'कापूस (Cotton)' },
              { id: 'tomato', label: 'टोमॅटो (Tomato)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCropForChart(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  activeCropForChart === tab.id
                    ? 'bg-[#16833B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bar/Trend Visualizer */}
        <div className="mt-4 pt-2">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 border-b border-gray-200 pb-2">
            {chartHistoryData[activeCropForChart].map((point, index) => {
              const maxVal = Math.max(...chartHistoryData[activeCropForChart].map(p => p.price));
              const heightPercent = Math.round((point.price / maxVal) * 80) + 15;

              return (
                <div key={index} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-900 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{point.price}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[42px] bg-gradient-to-t from-[#16833B] to-emerald-400 rounded-t-md transition-all group-hover:from-emerald-700 group-hover:to-green-400 shadow-xs"
                  />
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-600 mt-2 truncate w-full text-center">
                    {point.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
            <span>अधिकृत स्त्रोत: Agmarknet दैनिक बाजार अहवाल</span>
            <span className="font-semibold text-emerald-800">
              चालू दर: ₹{chartHistoryData[activeCropForChart][chartHistoryData[activeCropForChart].length - 1].price} / क्विंटल
            </span>
          </div>
        </div>
      </div>

      {/* Mandi Cards List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-gray-900 text-base">
            {language === 'mr' ? 'बाजार समितीनिहाय थेट दर सूची' : 'Market-wise Live Rates'} ({filteredMandi.length})
          </h3>
          <span className="text-xs text-gray-500">प्रति क्विंटल दर (INR ₹)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMandi.map((item) => {
            const isFav = favouriteMarketIds.includes(item.id);
            const isCompared = selectedForCompare.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-4.5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                  isCompared ? 'border-amber-400 ring-2 ring-amber-100' : 'border-gray-200'
                }`}
              >
                <div>
                  {/* Top Bar: Crop and Star */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                        {item.variety}
                      </span>
                      <h4 className="text-base font-extrabold text-gray-900">
                        {item.crop}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleFavouriteMarket(item.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFav ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:text-gray-600'
                        }`}
                        title="Add to favourites"
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Market info */}
                  <div className="flex items-center space-x-1.5 mt-2 text-xs text-gray-600">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800">{item.market}</span>
                    <span className="text-gray-400">•</span>
                    <span>{item.district}</span>
                  </div>

                  {/* Price Box */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50/70 to-green-50/50 rounded-xl border border-emerald-100">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-emerald-950">{t.modalPrice}:</span>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-black text-[#10552B]">
                          ₹{item.modalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium ml-1">/ क्विंटल</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-emerald-200/50 text-xs">
                      <div>
                        <span className="text-gray-500 text-[11px] block">{t.minPrice}</span>
                        <span className="font-bold text-gray-800">₹{item.minPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 text-[11px] block">{t.maxPrice}</span>
                        <span className="font-bold text-gray-800">₹{item.maxPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details strip */}
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{t.arrivals}: <strong className="text-gray-700">{item.arrivals}</strong></span>
                    <div className="flex items-center space-x-1">
                      {item.trend === 'up' && (
                        <span className="flex items-center text-emerald-700 font-bold text-[11px]">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {item.trendPct}
                        </span>
                      )}
                      {item.trend === 'down' && (
                        <span className="flex items-center text-red-600 font-bold text-[11px]">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          {item.trendPct}
                        </span>
                      )}
                      {item.trend === 'stable' && (
                        <span className="flex items-center text-gray-500 font-medium text-[11px]">
                          <Minus className="w-3.5 h-3.5" />
                          स्थिर
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  {compareMode ? (
                    <button
                      onClick={() => toggleCompareItem(item.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                        isCompared
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {isCompared ? 'निवड रद्द करा' : 'तुलनेसाठी निवडा'}
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-400">
                      दिनांक: {item.arrivalDate}
                    </span>
                  )}

                  <button
                    onClick={() => handleShare(item)}
                    className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center space-x-1 text-xs font-semibold"
                    title={t.shareWhatsApp}
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.shareWhatsApp}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
