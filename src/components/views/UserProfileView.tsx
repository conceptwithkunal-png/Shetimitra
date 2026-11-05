import React, { useState } from 'react';
import {
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  Tractor,
  ShieldCheck,
  Globe,
  LogOut,
  Edit2,
  Save,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Download,
  FileArchive
} from 'lucide-react';
import { useApp, DEMO_USERS } from '../../context/AppContext';
import { UserRole, Language } from '../../types';

export const UserProfileView: React.FC = () => {
  const { user, setUser, switchRole, language, setLanguage, t, setAuthModalOpen } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [village, setVillage] = useState(user.village || 'Malegaon Budruk');
  const [taluka, setTaluka] = useState(user.taluka || 'Baramati');
  const [district, setDistrict] = useState(user.district || 'Pune');
  const [farmAreaAcres, setFarmAreaAcres] = useState(user.farmAreaAcres || 5.5);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      fullName,
      phoneNumber,
      village,
      taluka,
      district,
      farmAreaAcres: Number(farmAreaAcres)
    });
    setIsEditing(false);
    alert('आपली प्रोफाइल यशस्वीरीत्या अद्यतनित झाली आहे!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#10552B] to-[#16833B] relative" />

        <div className="px-6 pb-6 relative pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-end space-x-4">
              <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg shrink-0">
                <div className="w-full h-full rounded-2xl bg-[#16833B] text-white flex items-center justify-center font-black text-3xl">
                  {user.fullName ? user.fullName[0] : 'U'}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                    {user.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {user.phoneNumber} • {user.email || 'conceptwithkunal@gmail.com'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'रद्द करा' : 'प्रोफाइल संपादित करा'}</span>
              </button>

              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#16833B] text-white hover:bg-[#10552B] transition-colors"
              >
                लॉगिन / नवीन नोंदणी
              </button>
            </div>
          </div>

          {/* Edit Form or Read View */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पूर्ण नाव</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मोबाईल क्रमांक</label>
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">गाव</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">तालुका</label>
                  <input
                    type="text"
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">जिल्हा</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">शेती क्षेत्र (एकर)</label>
                <input
                  type="number"
                  step="0.5"
                  value={farmAreaAcres}
                  onChange={(e) => setFarmAreaAcres(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl font-extrabold text-xs text-white bg-[#16833B] hover:bg-[#10552B] transition-colors shadow-md flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>बदल जतन करा (Save Changes)</span>
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                  स्थानिक माहिती (Location)
                </span>
                <div className="flex justify-between">
                  <span className="text-gray-500">गाव व तालुका:</span>
                  <strong className="text-gray-900">{user.village || 'बारामती'}, {user.taluka || 'पुणे'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">जिल्हा व राज्य:</span>
                  <strong className="text-gray-900">{user.district || 'Pune'}, {user.state || 'Maharashtra'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">पिन कोड:</span>
                  <strong className="text-gray-900">{user.pinCode || '413115'}</strong>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <span className="font-bold text-gray-400 block uppercase tracking-wider text-[10px]">
                  शेती तपशील (Farm Details)
                </span>
                <div className="flex justify-between">
                  <span className="text-gray-500">शेती क्षेत्र:</span>
                  <strong className="text-emerald-800 font-extrabold">{user.farmAreaAcres || 5.5} एकर</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">प्रमुख पिके:</span>
                  <strong className="text-gray-900">सोयाबीन, कांदा, ऊस</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">खाते स्थिती:</span>
                  <strong className="text-emerald-700">सत्यापित शेतकरी (Verified)</strong>
                </div>
              </div>
            </div>
          )}

          {/* Quick Demo Role Switcher Section */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              भूमिका स्वीचर (Quick Role Testing):
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['farmer', 'buyer', 'expert', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                    user.role === r
                      ? 'border-[#16833B] bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="capitalize">{r}</span>
                  <span className="block text-[10px] text-gray-500 font-normal">
                    {r === 'farmer' ? 'शेतकरी' : r === 'buyer' ? 'व्यापारी' : r === 'expert' ? 'तज्ज्ञ' : 'प्रशासक'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Project Source Code ZIP Download Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#16833B] flex items-center justify-center shrink-0">
            <FileArchive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-gray-900">
              संपूर्ण प्रोजेक्ट झिप फाइल डाउनलोड (Project Source Code .ZIP)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              React + TypeScript + Tailwind + Express + Firebase + Gemini AI सर्व फाइल्स एका झिप फाइलमध्ये समाविष्ट आहेत.
            </p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              📦 sheti-mitra-project.zip (~111 KB)
            </span>
          </div>
        </div>

        <a
          href="/download-zip"
          download="sheti-mitra-project.zip"
          className="px-5 py-3 rounded-xl font-extrabold text-xs text-white bg-[#16833B] hover:bg-[#10552B] transition-colors shadow-md flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>झिप डाउनलोड करा (Download ZIP)</span>
        </a>
      </div>

    </div>
  );
};
