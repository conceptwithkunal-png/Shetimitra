import React from 'react';
import { LayoutDashboard, TrendingUp, Stethoscope, ShoppingBag, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  const { t } = useApp();

  const tabs = [
    { id: 'dashboard', label: t.navHome, icon: LayoutDashboard },
    { id: 'mandi', label: t.navMandi, icon: TrendingUp },
    { id: 'crop-doctor', label: t.navCropDoctor, icon: Stethoscope, isSpecial: true },
    { id: 'marketplace', label: t.navMarketplace, icon: ShoppingBag },
    { id: 'profile', label: t.navProfile, icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-emerald-100 shadow-lg px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center -mt-5 group focus:outline-hidden"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-95 ${
                    isActive
                      ? 'bg-[#10552B] ring-4 ring-emerald-200'
                      : 'bg-[#16833B]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-[#16833B]' : 'text-gray-600'}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-[#16833B]' : 'text-gray-500 hover:text-emerald-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
