import React, { useState } from 'react';
import {
  Landmark,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  FileText,
  Calendar,
  Search,
  Filter,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GovernmentScheme } from '../../types';

export const GovtSchemesView: React.FC = () => {
  const {
    schemes,
    savedSchemeIds,
    toggleSaveScheme,
    t,
    language
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  const categories = ['All', 'Direct Income', 'Insurance', 'Credit & Loan', 'Subsidies'];

  const filteredSchemes = schemes.filter(s => {
    return categoryFilter === 'All' || s.category === categoryFilter;
  });

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2">
            <Landmark className="w-3.5 h-3.5" />
            <span>Govt. of Maharashtra & Central Welfare Initiatives</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.schemesTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.schemesSubtitle}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'All' ? 'सर्व योजना (All)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => {
          const isSaved = savedSchemeIds.includes(scheme.id);
          const name = language === 'mr' ? scheme.nameMr : language === 'hi' ? scheme.nameHi : scheme.nameEn;
          const shortDesc = language === 'mr' ? scheme.shortDescMr : language === 'hi' ? scheme.shortDescHi : scheme.shortDescEn;
          const benefits = language === 'mr' ? scheme.benefitsMr : language === 'hi' ? scheme.benefitsHi : scheme.benefitsEn;

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-800">
                    {scheme.category}
                  </span>

                  <button
                    onClick={() => toggleSaveScheme(scheme.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isSaved ? 'text-purple-700 bg-purple-50' : 'text-gray-300 hover:text-gray-600'
                    }`}
                    title={t.saveScheme}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-purple-700' : ''}`} />
                  </button>
                </div>

                <h3 className="font-extrabold text-base text-gray-900 mt-2.5">
                  {name}
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {shortDesc}
                </p>

                {/* Benefits highlight */}
                <div className="mt-3 p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs">
                  <span className="font-bold text-purple-950 block mb-0.5">{t.benefits}:</span>
                  <p className="text-purple-900">{benefits}</p>
                </div>

                {/* Eligibility checklist preview */}
                <div className="mt-3 space-y-1">
                  <span className="text-[11px] font-bold text-gray-700 block">{t.eligibility}:</span>
                  {scheme.eligibility.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-start space-x-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>सत्यापित: {scheme.verifiedDate}</span>
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 px-2 py-1"
                  >
                    तपशील पहा
                  </button>

                  <a
                    href={scheme.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-colors shadow-xs"
                  >
                    <span>{t.applyOnline}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-purple-700">{selectedScheme.category}</span>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">
                  {language === 'mr' ? selectedScheme.nameMr : selectedScheme.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="text-gray-400 hover:text-gray-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-1.5">{t.eligibility}</h4>
              <ul className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl">
                {selectedScheme.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-700 mb-1.5">{t.documentsReq}</h4>
              <ul className="space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl">
                {selectedScheme.documentsRequired.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <FileText className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <a
                href={selectedScheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <span>{selectedScheme.portalName} वर अर्ज करा</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
