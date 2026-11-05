import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  CloudSun,
  ShoppingBag,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationView: React.FC = () => {
  const { notifications, markNotificationRead, t, language } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'mandi':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'weather':
        return <CloudSun className="w-4 h-4 text-blue-600" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-purple-600" />;
      default:
        return <Info className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">{t.navNotifications}</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            बाजारभाव, हवामान इशारे आणि शेतीमाल खरेदी-विक्री सूचना
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
          {notifications.length} सूचना
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
              n.read
                ? 'bg-white border-gray-200'
                : 'bg-emerald-50/50 border-emerald-200 shadow-xs'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
              {getIcon(n.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-gray-900">{n.title}</h4>
                <span className="text-[10px] text-gray-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {n.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
