import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  ExternalLink,
  Github,
  X,
  Sparkles,
  HelpCircle,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        language === 'mr'
          ? 'तुमच्या मोबाईलमधील Chrome ब्राउझरच्या मेनूवर (३ डॉट्स) क्लिक करा आणि "Add to Home screen" किंवा "Install app" निवडा.'
          : 'In your mobile browser (Chrome/Edge), tap the 3-dot menu and select "Install app" or "Add to Home screen".'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#16833B] flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              Android Application
            </span>
            <h2 className="text-lg font-black text-gray-900 mt-0.5">
              {language === 'mr' ? 'शेती मित्र अँड्रॉइड अ‍ॅप (Android App)' : 'Sheti Mitra Android App'}
            </h2>
          </div>
        </div>

        {/* Method 1: Instant 1-Tap Installation (PWA) */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-950 flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>पर्याय १: थेट मोबाईलवर इन्स्टॉल करा (१-क्लिक)</span>
              </span>
              <p className="text-xs text-emerald-800 mt-1">
                कोणतीही APK डाऊनलोड न करता थेट तुमच्या Android फोनवर standalone अ‍ॅप म्हणून इन्स्टॉल करा.
              </p>
            </div>
          </div>

          <button
            onClick={handleInstallPWA}
            className="w-full mt-3 py-2.5 bg-[#16833B] hover:bg-[#10552B] text-white rounded-xl font-extrabold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>
              {isInstalled
                ? 'अ‍ॅप आधीच इन्स्टॉल केले आहे'
                : 'मोबाईलवर इन्स्टॉल करा (Install on Phone)'}
            </span>
          </button>
        </div>

        {/* Method 2: GitHub Actions Automated APK Generator */}
        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 mb-4 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-purple-950">
            <Github className="w-4 h-4 text-purple-700" />
            <span>पर्याय २: GitHub Actions द्वारे स्वयंचलित APK निर्मिती</span>
          </div>
          <p className="text-purple-900">
            आपल्या GitHub रिपॉझिटरी (<strong>conceptwithkunal-png/Shetimitra</strong>) मध्ये 
            <code className="bg-purple-100 px-1 py-0.5 rounded-xs ml-1">.github/workflows/build-apk.yml</code> 
            कॉन्फिगर केली आहे.
          </p>

          <div className="p-2.5 bg-white rounded-xl border border-purple-100 font-mono text-[11px] text-gray-700">
            <p>1. GitHub वर कोड पुश करा:</p>
            <p className="text-purple-700 font-bold">git push origin main</p>
            <p className="mt-1">2. GitHub Actions टॅबमध्ये <strong>Build Android APK</strong> वर्कफ्लो आपोआप सुरू होईल.</p>
            <p className="mt-1">3. ५ मिनिटांत <strong className="text-emerald-700">app-debug.apk</strong> डाऊनलोडसाठी उपलब्ध होईल!</p>
          </div>
        </div>

        {/* Method 3: Build APK on your Computer using Android Studio / Capacitor */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-gray-900">
            <Cpu className="w-4 h-4 text-gray-700" />
            <span>पर्याय ३: तुमच्या PC वर Android Studio द्वारे APK बिल्ड करा</span>
          </div>
          <p className="text-gray-600">
            तुमच्या कॉम्प्युटरवर Android Studio असल्यास खालील २ कमांड्स रन करा:
          </p>
          <div className="p-2 bg-gray-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto">
            <p>npx cap sync android</p>
            <p>npx cap open android</p>
          </div>
          <p className="text-gray-500 text-[10px]">
            Android Studio उघडल्यावर <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> वर क्लिक करा.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
        >
          बंद करा (Close)
        </button>
      </div>
    </div>
  );
};
