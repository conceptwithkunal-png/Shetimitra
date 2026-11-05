import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { AndroidAppModal } from './components/AndroidAppModal';

// Views
import { FarmerDashboardView } from './components/views/FarmerDashboardView';
import { MandiPricesView } from './components/views/MandiPricesView';
import { CropDoctorView } from './components/views/CropDoctorView';
import { WeatherView } from './components/views/WeatherView';
import { MarketplaceView } from './components/views/MarketplaceView';
import { GovtSchemesView } from './components/views/GovtSchemesView';
import { EquipmentRentalView } from './components/views/EquipmentRentalView';
import { ExpenseCalculatorView } from './components/views/ExpenseCalculatorView';
import { SoilHealthView } from './components/views/SoilHealthView';
import { ExpertConsultationView } from './components/views/ExpertConsultationView';
import { VoiceAssistantView } from './components/views/VoiceAssistantView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { NotificationView } from './components/views/NotificationView';
import { UserProfileView } from './components/views/UserProfileView';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [androidModalOpen, setAndroidModalOpen] = useState<boolean>(false);
  const { user } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <FarmerDashboardView onNavigate={setCurrentView} />;
      case 'mandi':
        return <MandiPricesView />;
      case 'crop-doctor':
        return <CropDoctorView />;
      case 'weather':
        return <WeatherView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'schemes':
        return <GovtSchemesView />;
      case 'equipment':
        return <EquipmentRentalView />;
      case 'expenses':
        return <ExpenseCalculatorView />;
      case 'soil':
        return <SoilHealthView />;
      case 'experts':
        return <ExpertConsultationView />;
      case 'assistant':
        return <VoiceAssistantView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'notifications':
        return <NotificationView />;
      case 'profile':
        return <UserProfileView />;
      default:
        return <FarmerDashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF7] text-[#1D2B21] flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">

      {/* Top Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenAndroidModal={() => setAndroidModalOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Application Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 max-w-full overflow-x-hidden">
          {renderCurrentView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* Auth / Login / Registration Modal */}
      <AuthModal />

      {/* Android APK & PWA Center Modal */}
      <AndroidAppModal
        isOpen={androidModalOpen}
        onClose={() => setAndroidModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
