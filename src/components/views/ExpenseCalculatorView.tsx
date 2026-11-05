import React, { useState } from 'react';
import {
  Calculator,
  Save,
  FileDown,
  PieChart,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExpenseRecord } from '../../types';

export const ExpenseCalculatorView: React.FC = () => {
  const { expenses, addExpenseRecord, user, t, language } = useApp();

  const [season, setSeason] = useState<ExpenseRecord['season']>('Kharif (खरीप)');
  const [crop, setCrop] = useState('सोयाबीन (Soybean)');
  const [areaAcres, setAreaAcres] = useState<number>(3);

  // Granular Cost centers
  const [seedsCost, setSeedsCost] = useState<number>(6600);
  const [fertCost, setFertCost] = useState<number>(7200);
  const [pestCost, setPestCost] = useState<number>(4500);
  const [labourCost, setLabourCost] = useState<number>(14000);
  const [irrigationCost, setIrrigationCost] = useState<number>(1500);
  const [tractorCost, setTractorCost] = useState<number>(8500);
  const [transportCost, setTransportCost] = useState<number>(2800);
  const [otherCost, setOtherCost] = useState<number>(1200);

  // Harvest Outputs
  const [yieldQuintals, setYieldQuintals] = useState<number>(28);
  const [sellingPrice, setSellingPrice] = useState<number>(4620);

  // Calculations
  const totalExpense =
    Number(seedsCost) +
    Number(fertCost) +
    Number(pestCost) +
    Number(labourCost) +
    Number(irrigationCost) +
    Number(tractorCost) +
    Number(transportCost) +
    Number(otherCost);

  const totalRevenue = Number(yieldQuintals) * Number(sellingPrice);
  const netProfit = totalRevenue - totalExpense;
  const profitPerAcre = areaAcres > 0 ? Math.round(netProfit / areaAcres) : 0;
  const costPerQuintal = yieldQuintals > 0 ? Math.round(totalExpense / yieldQuintals) : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addExpenseRecord({
      farmerId: user.id,
      season,
      year: 2026,
      crop,
      areaAcres,
      costs: {
        seeds: Number(seedsCost),
        fertilizer: Number(fertCost),
        pesticides: Number(pestCost),
        labour: Number(labourCost),
        irrigation: Number(irrigationCost),
        tractorMachinery: Number(tractorCost),
        transport: Number(transportCost),
        other: Number(otherCost)
      },
      production: {
        totalYieldQuintals: Number(yieldQuintals),
        sellingPricePerQuintal: Number(sellingPrice)
      },
      totalExpense,
      totalRevenue,
      netProfit,
      profitPerAcre
    });

    alert('हिशोब वही यशस्वीरीत्या सेव्ह करण्यात आली आहे!');
  };

  const costBreakdown = [
    { label: t.labourCost, amount: labourCost, color: 'bg-amber-500' },
    { label: t.machineryCost, amount: tractorCost, color: 'bg-blue-500' },
    { label: t.fertCost, amount: fertCost, color: 'bg-emerald-500' },
    { label: t.seedsCost, amount: seedsCost, color: 'bg-purple-500' },
    { label: t.pestCost, amount: pestCost, color: 'bg-rose-500' },
    { label: t.transportCost, amount: transportCost, color: 'bg-cyan-500' },
    { label: t.irrigationCost, amount: irrigationCost, color: 'bg-sky-500' },
    { label: t.otherCost, amount: otherCost, color: 'bg-gray-400' }
  ];

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Farm Financial Planning & Profit Analysis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.calcTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.calcSubtitle}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center space-x-2 self-start md:self-auto"
        >
          <FileDown className="w-4 h-4" />
          <span>अहवाल प्रिंट / PDF</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">{t.totalInvestment}</span>
          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">
            उत्पादन खर्च: ₹{costPerQuintal}/क्विंटल
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">{t.totalRevenue}</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block font-semibold">
            {yieldQuintals} क्विंटल × ₹{sellingPrice}
          </span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${netProfit >= 0 ? 'bg-emerald-50/70 border-emerald-200' : 'bg-red-50/70 border-red-200'}`}>
          <span className="text-xs font-bold text-gray-700 block">{t.netProfit}</span>
          <div className={`text-xl sm:text-2xl font-black mt-1 ${netProfit >= 0 ? 'text-[#16833B]' : 'text-red-700'}`}>
            {netProfit >= 0 ? `+₹${netProfit.toLocaleString('en-IN')}` : `-₹${Math.abs(netProfit).toLocaleString('en-IN')}`}
          </div>
          <span className="text-[11px] text-gray-600 mt-1 block font-medium">
            {netProfit >= 0 ? 'उत्कृष्ट नफा' : 'तोटा (Loss)'}
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">{t.profitPerAcre}</span>
          <div className="text-xl sm:text-2xl font-black text-blue-900 mt-1">
            ₹{profitPerAcre.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-blue-700 mt-1 block font-semibold">
            क्षेत्र: {areaAcres} एकर
          </span>
        </div>
      </div>

      {/* Main Calculator Inputs and Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <h3 className="font-extrabold text-base text-gray-900 mb-4">
            १. हंगाम व लागवड खर्च तपशील (Cost Centers)
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.season}</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white"
                >
                  <option value="Kharif (खरीप)">खरीप (Kharif)</option>
                  <option value="Rabi (रब्बी)">रब्बी (Rabi)</option>
                  <option value="Summer (उन्हाळी)">उन्हाळी (Summer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.cropName}</label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full p-2 rounded-xl border border-gray-200 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.farmArea}</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-gray-200 text-xs font-semibold"
                />
              </div>
            </div>

            {/* Granular Expenses Grid */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                खर्च नोंदी (₹ मध्ये)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-gray-600 mb-1">{t.seedsCost}</label>
                  <input
                    type="number"
                    value={seedsCost}
                    onChange={(e) => setSeedsCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.fertCost}</label>
                  <input
                    type="number"
                    value={fertCost}
                    onChange={(e) => setFertCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.pestCost}</label>
                  <input
                    type="number"
                    value={pestCost}
                    onChange={(e) => setPestCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.labourCost}</label>
                  <input
                    type="number"
                    value={labourCost}
                    onChange={(e) => setLabourCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.machineryCost}</label>
                  <input
                    type="number"
                    value={tractorCost}
                    onChange={(e) => setTractorCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.irrigationCost}</label>
                  <input
                    type="number"
                    value={irrigationCost}
                    onChange={(e) => setIrrigationCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.transportCost}</label>
                  <input
                    type="number"
                    value={transportCost}
                    onChange={(e) => setTransportCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">{t.otherCost}</label>
                  <input
                    type="number"
                    value={otherCost}
                    onChange={(e) => setOtherCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-gray-200 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Production & Selling Inputs */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                २. उत्पादन व उत्पन्न (Harvest & Revenue)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.harvestYield}</label>
                  <input
                    type="number"
                    min="1"
                    value={yieldQuintals}
                    onChange={(e) => setYieldQuintals(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t.sellingPrice}</label>
                  <input
                    type="number"
                    min="100"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-extrabold text-xs text-white bg-[#16833B] hover:bg-[#10552B] transition-colors shadow-md flex items-center justify-center space-x-2 mt-4 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveRecord}</span>
            </button>
          </form>
        </div>

        {/* Visual Cost Center Distribution (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <h3 className="font-extrabold text-base text-gray-900 mb-3 flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-emerald-700" />
              <span>खर्च विभागणी (Cost Distribution)</span>
            </h3>

            <div className="space-y-3 pt-2">
              {costBreakdown.map((item, idx) => {
                const percentage = totalExpense > 0 ? Math.round((item.amount / totalExpense) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-700">
                      <span>{item.label}</span>
                      <span>₹{item.amount.toLocaleString('en-IN')} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Past Seasons Ledger */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>मागील हंगाम हिशोब इतिहास ({expenses.length})</span>
            </h4>

            <div className="space-y-2">
              {expenses.map((rec) => (
                <div key={rec.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900">{rec.crop}</span>
                    <p className="text-gray-500 text-[11px]">{rec.season} • {rec.areaAcres} एकर</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#16833B] text-sm">+₹{rec.netProfit.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-gray-400 block">{rec.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
