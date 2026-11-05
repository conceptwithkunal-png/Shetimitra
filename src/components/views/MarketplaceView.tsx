import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit3,
  CreditCard,
  QrCode,
  Truck,
  Clock,
  AlertCircle,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CropListing, MarketplaceOrder, OrderStatus } from '../../types';

export const MarketplaceView: React.FC = () => {
  const {
    cropListings,
    addCropListing,
    deleteCropListing,
    updateCropListingStatus,
    orders,
    placeOrder,
    updateOrderStatus,
    user,
    commissionPercentage,
    t,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'browse' | 'add' | 'my-orders'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedListingForOrder, setSelectedListingForOrder] = useState<CropListing | null>(null);

  // Order modal state
  const [orderQuantity, setOrderQuantity] = useState<number>(10);
  const [deliveryAddress, setDeliveryAddress] = useState('वाशी कृषी उत्पन्न बाजार, सेक्टर १९, नवी मुंबई');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<MarketplaceOrder | null>(null);

  // New Listing Form state
  const [newCrop, setNewCrop] = useState('कांदा (Onion)');
  const [newVariety, setNewVariety] = useState('लाल गरवा (Garwa Red)');
  const [newQty, setNewQty] = useState<number>(50);
  const [newUnit, setNewUnit] = useState<CropListing['unit']>('Quintal');
  const [newPrice, setNewPrice] = useState<number>(2400);
  const [newDistrict, setNewDistrict] = useState(user.district || 'Pune');
  const [newVillage, setNewVillage] = useState(user.village || 'Baramati');
  const [newDesc, setNewDesc] = useState('चांगली प्रतवारी केलेला, ओलावा नसलेला दर्जेदार माल.');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80');
  const [newIsOrganic, setNewIsOrganic] = useState(false);

  const districts = ['All', 'Nashik', 'Pune', 'Latur', 'Akola', 'Solapur', 'Nagpur', 'Ahmednagar', 'Kolhapur'];

  const filteredListings = cropListings.filter((item) => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.variety.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingForOrder) return;

    setPaymentProcessing(true);

    const totalAmount = orderQuantity * selectedListingForOrder.pricePerUnit;
    const commissionAmount = Math.round(totalAmount * (commissionPercentage / 100));
    const farmerPayout = totalAmount - commissionAmount;

    try {
      const placed = await placeOrder({
        buyerId: user.id,
        buyerName: user.fullName,
        buyerPhone: user.phoneNumber,
        farmerId: selectedListingForOrder.farmerId,
        farmerName: selectedListingForOrder.farmerName,
        listingId: selectedListingForOrder.id,
        crop: selectedListingForOrder.crop,
        quantity: orderQuantity,
        unit: selectedListingForOrder.unit,
        unitPrice: selectedListingForOrder.pricePerUnit,
        totalAmount,
        commissionRate: commissionPercentage / 100,
        commissionAmount,
        farmerPayout,
        deliveryAddress
      });

      setOrderSuccess(placed);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    addCropListing({
      farmerId: user.id,
      farmerName: user.fullName,
      farmerPhone: user.phoneNumber,
      crop: newCrop,
      variety: newVariety,
      quantity: Number(newQty),
      unit: newUnit,
      pricePerUnit: Number(newPrice),
      district: newDistrict,
      village: newVillage,
      description: newDesc,
      imageUrl: newImageUrl,
      isOrganic: newIsOrganic,
      qualityGrade: 'Grade A',
      status: 'active'
    });

    setActiveTab('browse');
    alert('आपला शेतीमाल विक्रीसाठी यशस्वीरीत्या सूचीबद्ध करण्यात आला आहे!');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">निश्चित (Confirmed)</span>;
      case 'processing':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">प्रक्रियेत (Processing)</span>;
      case 'shipped':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">वाहतुकीत (Shipped)</span>;
      case 'delivered':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">वितरीत (Delivered)</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">रद्द (Cancelled)</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow Protected Direct Trading</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.marketTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.marketSubtitle}
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.activeListings} ({cropListings.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
              activeTab === 'add'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addListing}</span>
          </button>

          <button
            onClick={() => setActiveTab('my-orders')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my-orders'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.myOrders} ({orders.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Browse Crops */}
      {activeTab === 'browse' && (
        <div className="space-y-4">

          {/* Search & District Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder={language === 'mr' ? 'शेतीमाल किंवा वाण शोधा...' : 'Search produce or crop variety...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-4 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden bg-white"
              >
                {districts.map(d => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'सर्व जिल्हे (All Districts)' : `${d} District`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Produce Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Organic badge */}
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.crop}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isOrganic && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] shadow-sm">
                        सेंद्रिय (Organic)
                      </span>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                      {item.district}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-emerald-800">{item.variety}</span>
                        <h3 className="text-base font-extrabold text-gray-900 mt-0.5">{item.crop}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-[#10552B]">
                          ₹{item.pricePerUnit.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-gray-500 block">/ {item.unit}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Quantity & Location */}
                    <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400 text-[11px] block">{t.availableQty}</span>
                        <span className="font-bold text-gray-800">{item.quantity} {item.unit}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-[11px] block">स्थान (Location)</span>
                        <span className="font-semibold text-gray-800 truncate block">
                          {item.village}, {item.district}
                        </span>
                      </div>
                    </div>

                    {/* Farmer / Seller Contact */}
                    <div className="mt-2.5 p-2 rounded-lg bg-gray-50 flex items-center justify-between text-xs text-gray-700">
                      <span className="font-medium truncate max-w-[150px]">{item.farmerName}</span>
                      <a
                        href={`tel:${item.farmerPhone}`}
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>कॉल करा</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setSelectedListingForOrder(item);
                      setOrderQuantity(Math.min(item.quantity, 10));
                      setOrderSuccess(null);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl font-extrabold text-xs text-white bg-[#16833B] hover:bg-[#10552B] transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.buyNow}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Add Produce Listing Form */}
      {activeTab === 'add' && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <h2 className="text-base sm:text-lg font-extrabold text-gray-900 mb-1 flex items-center space-x-2">
            <Plus className="w-5 h-5 text-emerald-700" />
            <span>{t.addListing}</span>
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            आपल्या शेतातील ताजा शेतीमाल महाराष्ट्रातील हजारो प्रमाणित व्यापाऱ्यांपर्यंत थेट पोहोचवा.
          </p>

          <form onSubmit={handleCreateListing} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.cropName} *</label>
                <input
                  type="text"
                  required
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.variety}</label>
                <input
                  type="text"
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.availableQty} *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newQty}
                  onChange={(e) => setNewQty(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">एकक (Unit)</label>
                <select
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="Quintal">क्विंटल (Quintal)</option>
                  <option value="Tons">टन (Tons)</option>
                  <option value="Kg">किलो (Kg)</option>
                  <option value="Crates">क्रेट्स (Crates)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.pricePerQuintal} *</label>
                <input
                  type="number"
                  min="100"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.district} *</label>
                <input
                  type="text"
                  required
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t.village} *</label>
                <input
                  type="text"
                  required
                  value={newVillage}
                  onChange={(e) => setNewVillage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">मालाचे वर्णन (Description)</label>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="isOrganicCheck"
                checked={newIsOrganic}
                onChange={(e) => setNewIsOrganic(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm"
              />
              <label htmlFor="isOrganicCheck" className="text-xs font-semibold text-gray-700 cursor-pointer">
                हा माल नैसर्गिक / सेंद्रिय पद्धतीने पिकवलेला आहे (Organic Produce)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-extrabold text-sm text-white bg-[#16833B] hover:bg-[#10552B] transition-colors shadow-md mt-4 cursor-pointer"
            >
              शेतीमाल प्रकाशित करा (Publish Listing)
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: My Orders & Order History */}
      {activeTab === 'my-orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-gray-900">
              {t.myOrders} ({orders.length})
            </h3>
            <span className="text-xs text-emerald-700 font-semibold">२% एस्क्रो कमिशन सुरक्षित</span>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-gray-500">{ord.id}</span>
                    {getStatusBadge(ord.status)}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      पेमेंट: {ord.paymentStatus}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-gray-900 mt-1">
                    {ord.crop} • {ord.quantity} {ord.unit}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-1">
                    <span>शेतकरी: <strong>{ord.farmerName}</strong></span>
                    <span>•</span>
                    <span>खरेदीदार: <strong>{ord.buyerName}</strong></span>
                    <span>•</span>
                    <span>तारीख: {ord.createdAt}</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 truncate max-w-md">
                    डिलिव्हरी पत्ता: {ord.deliveryAddress}
                  </p>
                </div>

                <div className="md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 shrink-0">
                  <div className="text-lg font-black text-emerald-950">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    कमिशन (२%): ₹{ord.commissionAmount} | शेतकरी देयक: ₹{ord.farmerPayout}
                  </div>

                  {/* Status Progression Controls (for testing full lifecycle) */}
                  <div className="flex items-center space-x-1.5 mt-2 md:justify-end">
                    {ord.status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'processing')}
                        className="text-[11px] font-bold px-2 py-1 bg-amber-500 text-white rounded-lg"
                      >
                        प्रक्रियेत पाठवा
                      </button>
                    )}
                    {ord.status === 'processing' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'shipped')}
                        className="text-[11px] font-bold px-2 py-1 bg-purple-600 text-white rounded-lg"
                      >
                        वाहतुकीस पाठवा
                      </button>
                    )}
                    {ord.status === 'shipped' && (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'delivered')}
                        className="text-[11px] font-bold px-2 py-1 bg-emerald-600 text-white rounded-lg"
                      >
                        वितरण पूर्ण करा
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buy Produce & Escrow Checkout Modal */}
      {selectedListingForOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">

            {orderSuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16833B] flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {t.orderPlaced}
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  आपली ऑर्डर आयडी <strong className="font-mono text-gray-900">{orderSuccess.id}</strong> सह निश्चित झाली आहे. एस्क्रो प्रणालीद्वारे रक्कम सुरक्षित करण्यात आली आहे.
                </p>

                <div className="p-4 bg-gray-50 rounded-2xl text-left text-xs space-y-1.5 border border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-500">एकूण रक्कम:</span>
                    <strong className="font-bold">₹{orderSuccess.totalAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">प्लॅटफॉर्म कमिशन (२%):</span>
                    <strong className="text-amber-800">₹{orderSuccess.commissionAmount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">शेतकरी देयक:</span>
                    <strong className="text-emerald-800">₹{orderSuccess.farmerPayout}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-200">
                    <span className="text-gray-500">पेमेंट संदर्भ:</span>
                    <span className="font-mono text-[10px] text-gray-700">{orderSuccess.paymentId}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedListingForOrder(null);
                    setOrderSuccess(null);
                    setActiveTab('my-orders');
                  }}
                  className="w-full py-3 bg-[#16833B] text-white rounded-xl font-extrabold text-sm shadow-md cursor-pointer"
                >
                  माझ्या ऑर्डर्स पहा (View Orders)
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-emerald-800">
                      {selectedListingForOrder.variety}
                    </span>
                    <h3 className="text-lg font-black text-gray-900">
                      {selectedListingForOrder.crop}
                    </h3>
                    <p className="text-xs text-gray-500">
                      शेतकरी: {selectedListingForOrder.farmerName} ({selectedListingForOrder.district})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedListingForOrder(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quantity selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    खरेदी प्रमाण ({selectedListingForOrder.unit}) - कमाल {selectedListingForOrder.quantity} उपलब्ध
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedListingForOrder.quantity}
                    required
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    वितरण पत्ता (Delivery Address) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Financial Summary Box */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-2">
                  <h4 className="font-bold text-emerald-950 text-sm mb-1">{t.orderSummary}</h4>

                  <div className="flex justify-between text-gray-700">
                    <span>उपज मूल्य ({orderQuantity} {selectedListingForOrder.unit} × ₹{selectedListingForOrder.pricePerUnit}):</span>
                    <span className="font-bold text-gray-900">
                      ₹{(orderQuantity * selectedListingForOrder.pricePerUnit).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>{t.platformCommission}:</span>
                    <span className="font-semibold text-amber-800">
                      ₹{Math.round(orderQuantity * selectedListingForOrder.pricePerUnit * (commissionPercentage / 100))}
                    </span>
                  </div>

                  <div className="flex justify-between text-emerald-950 pt-2 border-t border-emerald-200 font-bold">
                    <span>{t.farmerPayout}:</span>
                    <span className="text-sm font-extrabold text-[#16833B]">
                      ₹{(
                        orderQuantity * selectedListingForOrder.pricePerUnit -
                        Math.round(orderQuantity * selectedListingForOrder.pricePerUnit * (commissionPercentage / 100))
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* UPI Payment Simulator Notice */}
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    UPI / Escrow थेट सुरक्षितता: डिलिव्हरी पूर्ण होईपर्यंत रक्कम सुरक्षित एस्क्रो खात्यात राहील.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={paymentProcessing}
                  className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-[#16833B] hover:bg-[#10552B] transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                >
                  {paymentProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>पेमेंट प्रक्रिया व स्वाक्षरी तपासणी...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>{t.confirmPayment} (₹{(orderQuantity * selectedListingForOrder.pricePerUnit).toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
