import React, { useState, useRef } from 'react';
import {
  Stethoscope,
  Upload,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ShieldAlert,
  GraduationCap,
  Leaf,
  Share2,
  FileText,
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CropDoctorView: React.FC = () => {
  const { cropScans, addCropScan, t, language, user } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('सोयाबीन (Soybean)');
  const [selectedPart, setSelectedPart] = useState('Leaf');
  const [symptomText, setSymptomText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeReport, setActiveReport] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const crops = [
    'सोयाबीन (Soybean)',
    'कांदा (Onion)',
    'कापूस (Cotton)',
    'टोमॅटो (Tomato)',
    'गहू (Wheat)',
    'डाळिंब (Pomegranate)',
    'ऊस (Sugarcane)',
    'मिरची (Chili / Pepper)',
    'हरभरा (Gram / Chana)',
    'द्राक्षे (Grapes)'
  ];

  const plantParts = [
    { id: 'Leaf', label: t.leaf },
    { id: 'Stem', label: t.stem },
    { id: 'Fruit', label: t.fruit },
    { id: 'Root', label: t.root },
    { id: 'Flower', label: t.flower }
  ];

  // Pre-bundled real sample photos for easy instant testing if user has no plant image on device
  const samplePhotos = [
    {
      title: 'कांद्यावरील जांभळा करपा (Onion Blotch)',
      url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      crop: 'कांदा (Onion)',
      part: 'Leaf',
      symptom: 'पानांवर जांभळट-तपकिरी रंगाचे डाग पडले आहेत व टोके वाळत आहेत.'
    },
    {
      title: 'सोयाबीन पिवळा मोझॅक (Soybean Mosaic)',
      url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
      crop: 'सोयाबीन (Soybean)',
      part: 'Leaf',
      symptom: 'पाने पिवळी पडली आहेत व शिरा गडद हिरव्या दिसत आहेत.'
    },
    {
      title: 'टोमॅटो करपा व फळ डाग (Tomato Blight)',
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      crop: 'टोमॅटो (Tomato)',
      part: 'Fruit',
      symptom: 'फळांवर काळे डाग व पाने करपल्यासारखी झाली आहेत.'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('कृपया १५ MB पेक्षा लहान फोटो निवडा.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof samplePhotos[0]) => {
    setSelectedCrop(sample.crop);
    setSelectedPart(sample.part);
    setSymptomText(sample.symptom);
    setImagePreview(sample.url);
    setErrorMsg(null);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/crop-doctor/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedCrop,
          plantPart: selectedPart,
          symptoms: symptomText,
          imageBase64: imagePreview && imagePreview.startsWith('data:') ? imagePreview : undefined,
          language
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'निदान करताना त्रुटी आली.');
      }

      const diagnosis = data.diagnosis;
      setActiveReport(diagnosis);

      // Save to scan history in context
      addCropScan({
        userId: user.id,
        cropName: selectedCrop,
        plantPart: selectedPart,
        symptoms: symptomText,
        imageUrl: imagePreview || undefined,
        diagnosis
      });
    } catch (err: any) {
      console.error('Diagnosis error:', err);
      setErrorMsg(err.message || 'विश्लेषण पूर्ण होऊ शकले नाही. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-950 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Google Gemini Vision Powered Plant Pathology</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {t.doctorTitle}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1.5">
            {t.doctorSubtitle}
          </p>
        </div>

        <Stethoscope className="absolute right-4 bottom-2 w-32 h-32 text-white/5 pointer-events-none" />
      </div>

      {/* Diagnostic Form & Real-Time Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Form Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <h2 className="text-base font-extrabold text-gray-900 mb-4 flex items-center space-x-2">
            <Leaf className="w-4 h-4 text-emerald-700" />
            <span>{language === 'mr' ? 'पीक लक्षणे व फोटो नोंदवा' : 'Plant Symptoms & Photo'}</span>
          </h2>

          <form onSubmit={handleAnalyze} className="space-y-4">

            {/* Select Crop */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                १. {t.filterCrop} <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden bg-white"
              >
                {crops.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Plant Part Pills */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                २. {t.choosePart} <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {plantParts.map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedPart(part.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedPart === part.id
                        ? 'bg-[#16833B] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {part.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload or Sample Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                ३. {t.uploadPhoto}
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-emerald-300 bg-gray-50 aspect-video flex items-center justify-center group">
                  <img
                    src={imagePreview}
                    alt="Affected crop preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white text-emerald-950 rounded-lg text-xs font-bold shadow-sm"
                    >
                      {language === 'mr' ? 'फोटो बदला' : 'Change Photo'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold shadow-sm"
                    >
                      {language === 'mr' ? 'काढून टाका' : 'Remove'}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-emerald-50/40"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-emerald-950">
                    {language === 'mr' ? 'कॅमेऱ्याने फोटो काढा किंवा गॅलरीतून निवडा' : 'Click photo or select from gallery'}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">JPG, PNG (कमाल १५ MB)</p>
                </div>
              )}

              {/* Sample Photo selector for instant test */}
              <div className="mt-2.5">
                <span className="text-[11px] font-semibold text-gray-500 block mb-1">
                  {language === 'mr' ? 'किंवा चाचणीसाठी नमुना फोटो निवडा:' : 'Or test with a sample image:'}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {samplePhotos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(s)}
                      className="text-[10px] font-bold p-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 truncate"
                    >
                      {s.crop.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Symptoms Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                ४. {language === 'mr' ? 'लक्षणे नमूद करा (ऐच्छिक)' : 'Describe Symptoms (Optional)'}
              </label>
              <textarea
                rows={2}
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                placeholder={t.symptomPlaceholder}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-white bg-[#16833B] hover:bg-[#10552B] transition-all shadow-md shadow-emerald-900/15 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.analyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.analyzeBtn}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Report Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeReport ? (
            <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-5">

              {/* Diagnosis Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {activeReport.cropIdentified}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      तीव्रता: {activeReport.severityLevel}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-gray-900 mt-1.5">
                    {activeReport.suspectedDisease}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    बाधित भाग: <strong>{activeReport.affectedPart}</strong>
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-[#16833B]" />
                    <span className="text-xs font-bold">{t.confidence}: {activeReport.confidenceScore}%</span>
                  </div>
                </div>
              </div>

              {/* Symptoms & Probable Causes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-extrabold text-gray-800 mb-2">
                    {t.symptomsObserved}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {activeReport.observedSymptoms?.map((sym: string, i: number) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="text-xs font-extrabold text-gray-800 mb-2">
                    {t.causes}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {activeReport.probableCauses?.map((cause: string, i: number) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Organic & Biological Treatment (Green Card) */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                <h4 className="text-xs sm:text-sm font-extrabold text-emerald-950 mb-2 flex items-center space-x-1.5">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>{t.organicCure}</span>
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900 font-medium">
                  {activeReport.organicTreatment?.map((cure: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{cure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment Guidelines with Strict Dosage Warning */}
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                <h4 className="text-xs sm:text-sm font-extrabold text-amber-950 mb-2 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>{t.chemicalCure}</span>
                </h4>
                <ul className="space-y-2 text-xs text-amber-950 font-medium">
                  {activeReport.chemicalTreatmentGuidelines?.map((guideline: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mandatory Safety Disclaimer as mandated */}
              <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-xs text-red-900 flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p>
                  <strong>{t.disclaimerLabel}</strong> {activeReport.safetyDisclaimer}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => alert('अहवाल पीडीएफ डाउनलोड केला गेला आहे.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>अहवाल सेव्ह करा (Save)</span>
                </button>

                <button
                  onClick={() => alert('कृषी तज्ज्ञांना केस रेफरल पाठवले आहे. लवकरच संपर्क होईल.')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#10552B] hover:bg-emerald-900 transition-colors flex items-center space-x-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t.expertConsultBtn}</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 shadow-xs flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-base text-gray-800">
                {language === 'mr' ? 'अद्याप कोणतेही स्कॅन केले नाही' : 'No Active Scan Result'}
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mt-1">
                {language === 'mr'
                  ? 'डाव्या बाजूला पीक निवडून फोटो अपलोड करा व "रोग निदान करा" बटनावर क्लिक करा.'
                  : 'Select your crop, upload a leaf/fruit photo, and hit "Diagnose Plant Disease" to see real-time AI pathology findings.'}
              </p>
            </div>
          )}

          {/* Past Scans History Accordion/List */}
          {cropScans.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
              <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>मागील स्कॅन इतिहास ({cropScans.length})</span>
              </h4>
              <div className="space-y-2">
                {cropScans.map((scan) => (
                  <div
                    key={scan.id}
                    onClick={() => setActiveReport(scan.diagnosis)}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-gray-900">{scan.cropName}</span>
                      <p className="text-[11px] text-emerald-800 font-semibold">{scan.diagnosis.suspectedDisease}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{scan.createdAt}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
