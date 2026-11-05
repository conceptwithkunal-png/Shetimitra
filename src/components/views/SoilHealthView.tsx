import React, { useState } from 'react';
import {
  TestTube2,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  GraduationCap,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SoilTestRecord } from '../../types';

export const SoilHealthView: React.FC = () => {
  const { soilTests, addSoilTest, user, t, language } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [farmName, setFarmName] = useState('माझा शेत गट क्र. ४२ (४.५ एकर)');
  const [ph, setPh] = useState<number>(7.4);
  const [nitrogen, setNitrogen] = useState<number>(240);
  const [phosphorus, setPhosphorus] = useState<number>(18);
  const [potassium, setPotassium] = useState<number>(360);
  const [organicCarbon, setOrganicCarbon] = useState<number>(0.65);
  const [electricalConductivity, setElectricalConductivity] = useState<number>(0.45);
  const [cropRecommended, setCropRecommended] = useState('सोयाबीन, हरभरा, कांदा');

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecommendations: string[] = [];
    if (ph < 6.5) {
      newRecommendations.push('जमीन आम्लधर्मी असल्याने एकरी ५०० किलो चुना (Lime) मशागतीवेळी मिसळावा.');
    } else if (ph > 8.0) {
      newRecommendations.push('जमीन विम्लधर्मी/क्षारयुक्त असल्याने एकरी ३०० किलो जिप्सम (Gypsum) वापरावे.');
    } else {
      newRecommendations.push('सामू (pH) पिकांच्या उत्तम वाढीसाठी आदर्श (६.५ ते ७.५) आहे.');
    }

    if (nitrogen < 280) {
      newRecommendations.push('नत्राचे प्रमाण मध्यम-कमी आहे. पेरणीवेळी नत्रयुक्त खतांची मात्रा वेळेवर द्यावी.');
    }
    if (organicCarbon < 0.75) {
      newRecommendations.push('सेंद्रिय कर्ब वाढवण्यासाठी एकरी २-३ ट्रॉली शेणखत किंवा गांडूळ खत वापरावे.');
    }

    addSoilTest({
      farmerId: user.id,
      farmName,
      sampleDate: new Date().toISOString().split('T')[0],
      ph: Number(ph),
      nitrogen: Number(nitrogen),
      phosphorus: Number(phosphorus),
      potassium: Number(potassium),
      organicCarbon: Number(organicCarbon),
      electricalConductivity: Number(electricalConductivity),
      cropRecommended,
      healthGrade: ph >= 6.5 && ph <= 7.8 ? 'चांगले (Good)' : 'सुधारणा आवश्यक (Needs Care)',
      recommendations: newRecommendations
    });

    setModalOpen(false);
    alert('माती परीक्षण अहवाल यशस्वीरीत्या जोडला गेला आहे!');
  };

  const getParameterStatus = (param: string, val: number) => {
    switch (param) {
      case 'ph':
        if (val >= 6.5 && val <= 7.5) return { label: 'आदर्श (Neutral)', color: 'text-emerald-700 bg-emerald-50' };
        if (val < 6.5) return { label: 'आम्लधर्मी (Acidic)', color: 'text-amber-700 bg-amber-50' };
        return { label: 'विम्लधर्मी (Alkaline)', color: 'text-rose-700 bg-rose-50' };
      case 'nitrogen':
        if (val < 280) return { label: 'कमी (Low < 280 kg/ha)', color: 'text-amber-700 bg-amber-50' };
        if (val <= 560) return { label: 'मध्यम (Medium)', color: 'text-emerald-700 bg-emerald-50' };
        return { label: 'जास्त (High)', color: 'text-blue-700 bg-blue-50' };
      case 'phosphorus':
        if (val < 14) return { label: 'कमी (Low < 14 kg/ha)', color: 'text-amber-700 bg-amber-50' };
        if (val <= 28) return { label: 'मध्यम (Medium)', color: 'text-emerald-700 bg-emerald-50' };
        return { label: 'जास्त (High)', color: 'text-blue-700 bg-blue-50' };
      case 'potassium':
        if (val < 150) return { label: 'कमी (Low)', color: 'text-amber-700 bg-amber-50' };
        if (val <= 300) return { label: 'मध्यम (Medium)', color: 'text-emerald-700 bg-emerald-50' };
        return { label: 'भरपूर (High > 300 kg/ha)', color: 'text-emerald-800 bg-emerald-100 font-bold' };
      case 'oc':
        if (val < 0.5) return { label: 'कमी (Low < 0.5%)', color: 'text-red-700 bg-red-50' };
        if (val <= 0.75) return { label: 'मध्यम (Medium)', color: 'text-amber-700 bg-amber-50' };
        return { label: 'उत्तम (High > 0.75%)', color: 'text-emerald-700 bg-emerald-50' };
      default:
        return { label: 'सामान्य', color: 'text-gray-700 bg-gray-50' };
    }
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-lime-100 text-lime-800 text-xs font-bold mb-2">
            <TestTube2 className="w-3.5 h-3.5" />
            <span>ICAR & Soil Health Card Mission</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.soilTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.soilSubtitle}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#16833B] hover:bg-[#10552B] transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addSoilReport}</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-5">
        {soilTests.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-5"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-gray-400 font-mono">
                  अहवाल आयडी: {report.id}
                </span>
                <h3 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">
                  {report.farmName}
                </h3>
                <p className="text-xs text-gray-500">
                  तपासणी तारीख: {report.sampleDate} • शिफारस पिके: <strong className="text-emerald-900">{report.cropRecommended}</strong>
                </p>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-[#16833B]" />
                <span className="text-xs font-bold">आरोग्य दर्जा: {report.healthGrade}</span>
              </div>
            </div>

            {/* 6 Key Parameter Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">{t.phLevel}</span>
                <div className="text-lg font-black text-gray-900 mt-0.5">{report.ph}</div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-1 ${getParameterStatus('ph', report.ph).color}`}>
                  {getParameterStatus('ph', report.ph).label}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">{t.nitrogenN}</span>
                <div className="text-lg font-black text-gray-900 mt-0.5">{report.nitrogen} <span className="text-[10px] text-gray-400">kg/ha</span></div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-1 ${getParameterStatus('nitrogen', report.nitrogen).color}`}>
                  {getParameterStatus('nitrogen', report.nitrogen).label}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">{t.phosphorusP}</span>
                <div className="text-lg font-black text-gray-900 mt-0.5">{report.phosphorus} <span className="text-[10px] text-gray-400">kg/ha</span></div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-1 ${getParameterStatus('phosphorus', report.phosphorus).color}`}>
                  {getParameterStatus('phosphorus', report.phosphorus).label}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">{t.potassiumK}</span>
                <div className="text-lg font-black text-gray-900 mt-0.5">{report.potassium} <span className="text-[10px] text-gray-400">kg/ha</span></div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-1 ${getParameterStatus('potassium', report.potassium).color}`}>
                  {getParameterStatus('potassium', report.potassium).label}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">{t.organicCarbonOC}</span>
                <div className="text-lg font-black text-gray-900 mt-0.5">{report.organicCarbon}%</div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-1 ${getParameterStatus('oc', report.organicCarbon).color}`}>
                  {getParameterStatus('oc', report.organicCarbon).label}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">{t.ecLevel}</span>
                <div className="text-lg font-black text-gray-900 mt-0.5">{report.electricalConductivity} <span className="text-[10px] text-gray-400">dS/m</span></div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mt-1 bg-emerald-50 text-emerald-800">
                  सामान्य (Normal)
                </span>
              </div>
            </div>

            {/* Recommendations Strip */}
            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-950 mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>तज्ज्ञ खत मात्रा व सुधारणा शिफारसी (Fertilizer Dosing):</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-900 font-medium">
                {report.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Add Soil Test Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-extrabold text-gray-900">{t.addSoilReport}</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReport} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">शेत / गट नाव (Farm Name)</label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.phLevel} *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4"
                    max="10"
                    required
                    value={ph}
                    onChange={(e) => setPh(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.organicCarbonOC} (%) *</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="2.5"
                    required
                    value={organicCarbon}
                    onChange={(e) => setOrganicCarbon(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">नत्र (N) kg/ha</label>
                  <input
                    type="number"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">स्फुरद (P) kg/ha</label>
                  <input
                    type="number"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पालाश (K) kg/ha</label>
                  <input
                    type="number"
                    value={potassium}
                    onChange={(e) => setPotassium(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-gray-200 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">शिफारस पिके</label>
                <input
                  type="text"
                  value={cropRecommended}
                  onChange={(e) => setCropRecommended(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#16833B] hover:bg-[#10552B] text-white rounded-xl font-extrabold text-sm shadow-md transition-colors cursor-pointer"
              >
                माती अहवाल सेव्ह करा (Save Report)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
