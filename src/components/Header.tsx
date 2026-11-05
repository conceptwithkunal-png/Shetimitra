import React, { useState } from 'react';
import {
  Sprout,
  Bell,
  Globe,
  User as UserIcon,
  ShieldCheck,
  CloudSun,
  Menu,
  ChevronDown,
  CheckCircle2,
  Download,
  Smartphone
} from 'lucide-react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { Language, UserRole } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onToggleSidebar?: () => void;
  onOpenAndroidModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onToggleSidebar,
  onOpenAndroidModal
}) => {
  const {
    user,
    switchRole,
    language,
    setLanguage,
    t,
    weather,
    unreadNotificationsCount,
    setAuthModalOpen
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'farmer':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'buyer':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'expert':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'farmer': return t.roleFarmer;
      case 'buyer': return t.roleBuyer;
      case 'expert': return t.roleExpert;
      case 'admin': return t.roleAdmin;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-emerald-800 hover:bg-emerald-50 focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#10552B] to-[#16833B] flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg sm:text-2xl text-[#10552B] tracking-tight">
                    {language === 'mr' ? 'शेती मित्र' : language === 'hi' ? 'शेती मित्र' : 'SHETI MITRA'}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Maha-Agri
                  </span>
                </div>
                <p className="text-xs text-emerald-700 font-medium hidden xs:block">
                  {t.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Weather Quick Widget (Desktop) */}
          <div
            onClick={() => onNavigate('weather')}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#EAF7ED] rounded-full border border-emerald-200 cursor-pointer hover:bg-emerald-100/70 transition-colors"
          >
            <CloudSun className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-semibold text-emerald-900">
              {weather ? `${user.district || 'Pune'} : ${weather.temp}°C` : 'पुणे : २९°C'}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium hidden lg:inline">
              {weather?.condition || 'अंशतः ढगाळ'}
            </span>
          </div>

          {/* Right Controls: Role Switcher, Language, Notifications, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all ${getRoleBadgeColor(user.role)}`}
                title="Click to switch test user role"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{getRoleLabel(user.role)}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t.switchRoleNotice}
                  </div>
                  {(['farmer', 'buyer', 'expert', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                        user.role === r ? 'font-bold text-emerald-800 bg-emerald-50/70' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${r === 'farmer' ? 'bg-emerald-500' : r === 'buyer' ? 'bg-amber-500' : r === 'expert' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                        <span>{getRoleLabel(r)}</span>
                      </div>
                      {user.role === r && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-emerald-50 border border-gray-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  {[
                    { code: 'mr', label: 'मराठी' },
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'en', label: 'English' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code as Language);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 ${
                        language === l.code ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-gray-700'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-full text-gray-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Direct Project ZIP Download Button */}
            <a
              href="/download-zip"
              download="sheti-mitra-project.zip"
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
              title="Download Full Project ZIP File"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ZIP</span>
            </a>

            {/* Android App & APK Center */}
            <button
              onClick={() => onOpenAndroidModal && onOpenAndroidModal()}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 transition-colors border border-emerald-300 shadow-2xs"
              title="Install Android App or Build APK"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Android APK</span>
            </button>

            {/* User Profile / Login Avatar */}
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#16833B] text-white flex items-center justify-center font-bold text-xs">
                {user.fullName ? user.fullName[0] : 'U'}
              </div>
              <span className="text-xs font-semibold text-emerald-950 hidden sm:inline max-w-[100px] truncate">
                {user.fullName.split(' ')[0]}
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
