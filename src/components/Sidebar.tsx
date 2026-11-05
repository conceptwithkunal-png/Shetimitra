import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Stethoscope,
  CloudSun,
  ShoppingBag,
  Tractor,
  Landmark,
  Calculator,
  TestTube2,
  GraduationCap,
  Mic,
  ShieldAlert,
  Bell,
  User,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen = false,
  onClose
}) => {
  const { user, t, unreadNotificationsCount } = useApp();

  const navItems = [
    { id: 'dashboard', label: t.navHome, icon: LayoutDashboard },
    { id: 'mandi', label: t.navMandi, icon: TrendingUp, badge: 'Live' },
    { id: 'crop-doctor', label: t.navCropDoctor, icon: Stethoscope, badge: 'AI' },
    { id: 'weather', label: t.navWeather, icon: CloudSun },
    { id: 'marketplace', label: t.navMarketplace, icon: ShoppingBag },
    { id: 'equipment', label: t.navEquipment, icon: Tractor },
    { id: 'schemes', label: t.navSchemes, icon: Landmark },
    { id: 'expenses', label: t.navExpenses, icon: Calculator },
    { id: 'soil', label: t.navSoil, icon: TestTube2 },
    { id: 'experts', label: t.navExperts, icon: GraduationCap },
    { id: 'assistant', label: t.navAssistant, icon: Mic, badge: 'Voice' },
    {
      id: 'admin',
      label: t.navAdmin,
      icon: ShieldAlert,
      adminOnly: true,
      badge: user.role === 'admin' ? 'Active' : 'Admin'
    },
    {
      id: 'notifications',
      label: t.navNotifications,
      icon: Bell,
      count: unreadNotificationsCount
    },
    { id: 'profile', label: t.navProfile, icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 z-50 lg:z-10 h-full lg:h-[calc(100vh-5rem)] w-64 bg-white border-r border-emerald-100 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#16833B] flex items-center justify-center text-white font-bold">
              SM
            </div>
            <span className="font-bold text-gray-900">{t.appName}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#16833B] text-white shadow-sm shadow-emerald-700/20'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count && item.count > 0 ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-red-500 text-white">
                      {item.count}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Farmer Helpline card */}
        <div className="p-3 m-3 bg-[#EAF7ED] rounded-xl border border-emerald-200 text-xs">
          <p className="font-bold text-emerald-950">शेतकरी हेल्पलाईन (Toll-Free)</p>
          <p className="text-emerald-800 font-semibold mt-0.5">1800-180-1551</p>
          <p className="text-[10px] text-emerald-700 mt-1">
            किसान कॉल सेंटर (Kisan Call Centre - २४×७ उपलब्ध)
          </p>
        </div>
      </aside>
    </>
  );
};
