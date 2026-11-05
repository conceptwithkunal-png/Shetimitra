import React, { useState } from 'react';
import {
  Tractor,
  Phone,
  Clock,
  Calendar,
  CheckCircle2,
  MapPin,
  Plus,
  ShieldCheck,
  Search,
  Filter,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EquipmentItem, EquipmentBooking } from '../../types';

export const EquipmentRentalView: React.FC = () => {
  const {
    equipmentList,
    equipmentBookings,
    bookEquipment,
    updateBookingStatus,
    user,
    t,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'browse' | 'my-bookings'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingModalItem, setBookingModalItem] = useState<EquipmentItem | null>(null);

  // Booking Form state
  const [bookingDate, setBookingDate] = useState('2026-11-06');
  const [bookingHours, setBookingHours] = useState<number>(4);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = ['All', 'Tractor', 'Rotavator', 'Drone Sprayer', 'Harvester'];

  const filteredEquipment = equipmentList.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalItem) return;

    const totalCost = bookingHours * bookingModalItem.ratePerHour;

    bookEquipment({
      equipmentId: bookingModalItem.id,
      equipmentTitle: bookingModalItem.title,
      farmerId: user.id,
      farmerName: user.fullName,
      farmerPhone: user.phoneNumber,
      ownerId: bookingModalItem.ownerId,
      ownerName: bookingModalItem.ownerName,
      bookingDate,
      durationHours: bookingHours,
      totalCost
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModalItem(null);
      setBookingSuccess(false);
      setActiveTab('my-bookings');
    }, 1500);
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <Tractor className="w-3.5 h-3.5" />
            <span>Farm Machinery Custom Hiring Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.equipmentTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.equipmentSubtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            अवजारे शोधा ({equipmentList.length})
          </button>

          <button
            onClick={() => setActiveTab('my-bookings')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my-bookings'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            माझी बुकिंग्ज ({equipmentBookings.length})
          </button>
        </div>
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-4">

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' ? 'सर्व यंत्रे (All Equipment)' : cat}
              </button>
            ))}
          </div>

          {/* Equipment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredEquipment.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-rose-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full bg-gray-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                      {item.district}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                      {item.available ? 'उपलब्ध (Available)' : 'व्यस्त'}
                    </span>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-gray-900 mt-0.5 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.model}</p>

                    <div className="mt-3 p-2.5 bg-gray-50 rounded-xl flex items-baseline justify-between text-xs">
                      <div>
                        <span className="text-gray-400 text-[10px] block">{t.rentPerHour}</span>
                        <span className="font-extrabold text-sm text-gray-900">₹{item.ratePerHour}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 text-[10px] block">{t.rentPerDay}</span>
                        <span className="font-bold text-gray-800">₹{item.ratePerDay}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-600">
                      <span>ऑपरेटर: {item.withOperator ? '✅ समाविष्ट' : '❌ नाही'}</span>
                      <span className="truncate max-w-[100px]">{item.village}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-700 truncate max-w-[130px]">{item.ownerName}</span>
                      <a
                        href={`tel:${item.ownerPhone}`}
                        className="text-rose-700 font-bold hover:underline flex items-center space-x-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>कॉल</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setBookingModalItem(item);
                      setBookingSuccess(false);
                    }}
                    className="w-full py-2.5 rounded-xl font-extrabold text-xs text-white bg-rose-700 hover:bg-rose-800 transition-colors shadow-xs cursor-pointer"
                  >
                    {t.bookEquipment}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: My Bookings */}
      {activeTab === 'my-bookings' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">
            माझी अवजारे बुकिंग्ज ({equipmentBookings.length})
          </h3>

          {equipmentBookings.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <Tractor className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-700">अद्याप कोणतीही बुकिंग नाही</p>
              <button
                onClick={() => setActiveTab('browse')}
                className="mt-3 text-xs font-bold text-rose-700 hover:underline"
              >
                अवजारे सूची पहा
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {equipmentBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        बुकिंग निश्चित (Confirmed)
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{b.id}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-gray-900 mt-1">{b.equipmentTitle}</h4>
                    <p className="text-xs text-gray-600">
                      तारीख: <strong>{b.bookingDate}</strong> • कालावधी: <strong>{b.durationHours} तास</strong> • मालक: {b.ownerName}
                    </p>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                    <span className="text-base font-black text-rose-900">₹{b.totalCost}</span>
                    <button
                      onClick={() => updateBookingStatus(b.id, 'cancelled')}
                      className="block sm:inline-block ml-0 sm:ml-2 text-xs font-semibold text-red-600 hover:underline mt-1"
                    >
                      रद्द करा
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Form Modal */}
      {bookingModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900">बुकिंग यशस्वी!</h3>
                <p className="text-xs text-gray-500">
                  मालकाला संदेश पाठवला गेला आहे. ते आपल्याशी लवकरच संपर्क साधतील.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-rose-700">{bookingModalItem.category}</span>
                    <h3 className="text-base font-extrabold text-gray-900 mt-0.5">
                      {bookingModalItem.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingModalItem(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">आवश्यक तारीख *</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    अपेक्षित कालावधी (तास) - दर: ₹{bookingModalItem.ratePerHour}/तास
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    required
                    value={bookingHours}
                    onChange={(e) => setBookingHours(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold focus:outline-hidden"
                  />
                </div>

                <div className="p-3 bg-rose-50 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">एकूण अंदाजे भाडे:</span>
                    <strong className="text-sm font-extrabold text-rose-900">
                      ₹{bookingHours * bookingModalItem.ratePerHour}
                    </strong>
                  </div>
                  <span className="text-[10px] text-gray-500 block">
                    काम पूर्ण झाल्यावर मालकास थेट रक्कम अदा करावी.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-extrabold text-sm shadow-md transition-colors cursor-pointer"
                >
                  बुकिंग पुष्टी करा (Confirm Booking)
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
