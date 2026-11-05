import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  FileText,
  Sliders,
  History,
  AlertTriangle,
  RefreshCw,
  Download,
  Trash2,
  Check,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboardView: React.FC = () => {
  const {
    cropListings,
    orders,
    commissionPercentage,
    setCommissionPercentage,
    deleteCropListing,
    user,
    t,
    language
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'listings' | 'orders' | 'commission' | 'audit'>('overview');
  const [newCommissionRate, setNewCommissionRate] = useState<number>(commissionPercentage);
  const [rateUpdatedSuccess, setRateUpdatedSuccess] = useState(false);

  // Mock users for admin management
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 'usr-1', name: 'बाळासाहेब शिंदे', role: 'Farmer (शेतकरी)', doc: '७/१२ व आधार कार्ड', village: 'मुर्तिजापूर, अकोला', status: 'Pending' },
    { id: 'usr-2', name: 'राजेश गोयल', role: 'Buyer (व्यापारी)', doc: 'APMC परवाना व GST प्रमाणपत्र', village: 'नवी मुंबई', status: 'Pending' },
    { id: 'usr-3', name: 'डॉ. संजय शिंदे', role: 'Agri Expert (तज्ज्ञ)', doc: 'Ph.D. पदवी प्रमाणपत्र (MPKV)', village: 'राहुरी, अहमदनगर', status: 'Pending' }
  ]);

  const auditLogs = [
    { id: 'log-1', actor: 'Admin (Kunal)', action: 'COMMISSION_UPDATE', detail: 'Updated base marketplace commission to 2%', time: '१० मिनिटांपूर्वी' },
    { id: 'log-2', actor: 'System', action: 'PAYMENT_ESCROW_RELEASE', detail: 'Order SM-ORD-2026-881 farmer settlement approved', time: '१ तासापूर्वी' },
    { id: 'log-3', actor: 'Admin (Kunal)', action: 'MODERATION_APPROVE', detail: 'Approved listing crop-101 (Garwa Red Onion)', time: '२ तासांपूर्वी' },
    { id: 'log-4', actor: 'Security Engine', action: 'LOGIN_2FA_VERIFIED', detail: 'User farmer-1 phone OTP 123456 verified', time: '३ तासांपूर्वी' }
  ];

  // Calculations
  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCommission = orders.reduce((sum, o) => sum + o.commissionAmount, 0);

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    setCommissionPercentage(Number(newCommissionRate));
    setRateUpdatedSuccess(true);
    setTimeout(() => setRateUpdatedSuccess(false), 2000);
  };

  const handleApproveUser = (id: string) => {
    setPendingVerifications(prev => prev.filter(u => u.id !== id));
    alert('वापरकर्ता पडताळणी मंजूर करण्यात आली आहे (User Verified).');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Order ID,Crop,Quantity,Total Amount,Commission,Farmer Payout,Status,Payment\n' +
      orders
        .map(
          (o) =>
            `${o.id},${o.crop},${o.quantity} ${o.unit},${o.totalAmount},${o.commissionAmount},${o.farmerPayout},${o.status},${o.paymentStatus}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sheti_Mitra_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold mb-2 border border-white/20">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span>Role-Based Access Control (RBAC Level 1)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {t.adminTitle}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
            {t.adminSubtitle}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-purple-950 hover:bg-gray-100 transition-colors flex items-center space-x-1.5 shadow-md self-start md:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t.exportReport}</span>
        </button>
      </div>

      {/* Overview Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t.totalGmv}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1.5">
            ₹{totalGMV.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {orders.length} ऑर्डर्स नोंदणीकृत
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t.totalCommissionEarned}</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-900 mt-1.5">
            ₹{totalCommission.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
            दर: {commissionPercentage}%
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t.activeListingsCount}</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-blue-900 mt-1.5">
            {cropListings.length}
          </div>
          <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
            सर्व जिल्हे सक्रिय
          </span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold">
            <span>{t.pendingVerifications}</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-900 mt-1.5">
            {pendingVerifications.length}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
            कागदपत्रे तपासणी आवश्यक
          </span>
        </div>
      </div>

      {/* Admin Module Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {[
          { id: 'overview', label: 'सत्यापन व वापरकर्ते (Verifications)' },
          { id: 'listings', label: 'शेतीमाल मॉडरेशन (Listings)' },
          { id: 'orders', label: 'ऑर्डर व पेमेंटस् (Orders & Escrow)' },
          { id: 'commission', label: 'कमिशन दर सेटिंग (Commission)' },
          { id: 'audit', label: 'सुरक्षा ऑडिट लॉग्स (Audit Logs)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === tab.id
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Verifications */}
      {activeAdminTab === 'overview' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-gray-900">
              प्रलंबित शेतकरी, खरेदीदार व तज्ज्ञ पडताळणी ({pendingVerifications.length})
            </h3>
            <span className="text-xs text-gray-400">KYC व अधिकृत कागदपत्रे</span>
          </div>

          <div className="space-y-3">
            {pendingVerifications.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-gray-900">{item.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    दस्तऐवज: <strong>{item.doc}</strong> • पत्ता: {item.village}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleApproveUser(item.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#16833B] text-white hover:bg-[#10552B] transition-colors flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>मंजूर करा (Approve)</span>
                  </button>
                  <button
                    onClick={() => setPendingVerifications(prev => prev.filter(x => x.id !== item.id))}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    नाकारा
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Listings Moderation */}
      {activeAdminTab === 'listings' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">
            सक्रिय शेतीमाल मॉडरेशन व गुणवत्ता नियंत्रण ({cropListings.length})
          </h3>

          <div className="space-y-3">
            {cropListings.map((listing) => (
              <div
                key={listing.id}
                className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-gray-900 text-sm">{listing.crop}</span>
                  <p className="text-gray-500">
                    शेतकरी: {listing.farmerName} • प्रमाण: {listing.quantity} {listing.unit} • दर: ₹{listing.pricePerUnit} • {listing.district}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {listing.status}
                  </span>
                  <button
                    onClick={() => deleteCropListing(listing.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Commission Rate Adjuster */}
      {activeAdminTab === 'commission' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 max-w-lg space-y-4">
          <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-purple-700" />
            <span>{t.commissionSettings}</span>
          </h3>
          <p className="text-xs text-gray-600">
            खरेदीदार व शेतकरी यांच्यातील प्रत्येक यशस्वी व्यवहारावर प्लॅटफॉर्म कमिशन दर निर्धारित करा. (डीफॉल्ट: २%)
          </p>

          <form onSubmit={handleUpdateCommission} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                कमिशन टक्केवारी (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                value={newCommissionRate}
                onChange={(e) => setNewCommissionRate(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:outline-hidden"
              />
            </div>

            <div className="p-3 bg-purple-50 rounded-xl text-xs text-purple-900 space-y-1">
              <span className="font-bold">उदाहरण गणना:</span>
              <p>₹५०,००० च्या शेतीमाल व्यवहारावर {newCommissionRate}% दराने ₹{(50000 * (newCommissionRate / 100)).toFixed(0)} कमिशन आकारले जाईल.</p>
            </div>

            {rateUpdatedSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-1.5">
                <Check className="w-4 h-4" />
                <span>कमिशन दर यशस्वीरीत्या अद्यतनित केला!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-900 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:bg-purple-950 transition-colors"
            >
              दर सेव्ह करा (Save Commission Rate)
            </button>
          </form>
        </div>
      )}

      {/* Tab: Security Audit Logs */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center space-x-2">
              <History className="w-4 h-4 text-gray-500" />
              <span>{t.systemAuditLogs}</span>
            </h3>
            <span className="text-xs text-gray-400">Immutable Ledger</span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-purple-100 text-purple-800">
                    {log.action}
                  </span>
                  <p className="text-gray-800 mt-1">{log.detail}</p>
                </div>
                <div className="sm:text-right text-gray-400 text-[11px] shrink-0">
                  <span>{log.actor}</span> • <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
