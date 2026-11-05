import React, { useState } from 'react';
import {
  GraduationCap,
  Star,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Phone,
  Send,
  Clock,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExpertProfile, ConsultationRequest } from '../../types';

export const ExpertConsultationView: React.FC = () => {
  const {
    experts,
    consultations,
    requestConsultation,
    replyConsultation,
    user,
    t,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'experts' | 'my-consultations'>('experts');
  const [bookingModalExpert, setBookingModalExpert] = useState<ExpertProfile | null>(null);

  // Booking Form state
  const [crop, setCrop] = useState('सोयाबीन (Soybean)');
  const [issueDescription, setIssueDescription] = useState('पानांवर तांबेरा रोगाची लक्षणे दिसत आहेत, पाने पिवळी पडून गळत आहेत.');
  const [expertReplyText, setExpertReplyText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalExpert) return;

    requestConsultation({
      farmerId: user.id,
      farmerName: user.fullName,
      farmerPhone: user.phoneNumber,
      expertId: bookingModalExpert.id,
      expertName: bookingModalExpert.name,
      crop,
      issueDescription
    });

    setBookingModalExpert(null);
    setActiveTab('my-consultations');
    alert('तज्ज्ञांशी सल्लामसलत विनंती यशस्वीरीत्या पाठवली आहे!');
  };

  const handleExpertReply = (consultationId: string) => {
    if (!expertReplyText.trim()) return;
    replyConsultation(consultationId, expertReplyText);
    setExpertReplyText('');
    setReplyingToId(null);
    alert('शेतकऱ्याला कृषी सल्ला यशस्वीरीत्या पाठवला आहे!');
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>MPKV Rahuri, PDKV Akola & VNMKV Faculty</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.expertTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.expertSubtitle}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('experts')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'experts'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            तज्ज्ञ यादी ({experts.length})
          </button>

          <button
            onClick={() => setActiveTab('my-consultations')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my-consultations'
                ? 'bg-[#16833B] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            सल्लामसलत इतिहास ({consultations.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Experts Directory */}
      {activeTab === 'experts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {experts.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-orange-300 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start space-x-3.5">
                  <img
                    src={exp.imageUrl}
                    alt={exp.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800">
                      {exp.specialization}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-gray-900 mt-1">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">{exp.qualification}</p>
                    <p className="text-[11px] text-gray-400">{exp.institution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 bg-gray-50 rounded-xl text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] block">{t.experience}</span>
                    <strong className="text-gray-800">{exp.experienceYears} वर्षे अनुभव</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">{t.fee}</span>
                    <strong className="text-[#16833B]">मोफत (Digital Free)</strong>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{exp.rating} / ५.०</span>
                  </div>
                  <span className="text-gray-500">भाषा: {exp.languages.join(', ')}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setBookingModalExpert(exp)}
                  className="w-full py-2.5 rounded-xl font-extrabold text-xs text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.requestConsult}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: My Consultations & Expert Responses */}
      {activeTab === 'my-consultations' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">
            माझा सल्लामसलत इतिहास ({consultations.length})
          </h3>

          {consultations.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
              <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-700">अद्याप कोणताही सल्ला मागितलेला नाही</p>
              <button
                onClick={() => setActiveTab('experts')}
                className="mt-3 text-xs font-bold text-orange-600 hover:underline"
              >
                तज्ज्ञ शोधा व मोफत सल्ला घ्या
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {c.crop}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-gray-900 mt-1">
                        सल्लागार: {c.expertName}
                      </h4>
                      <p className="text-xs text-gray-500">
                        शेतकरी: {c.farmerName} • दिनांक: {c.createdAt}
                      </p>
                    </div>

                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 self-start sm:self-auto">
                      स्थिती: {c.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-600 block">शेतकऱ्याची समस्या / प्रश्न:</span>
                    <p className="text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl mt-1">
                      {c.issueDescription}
                    </p>
                  </div>

                  {c.expertAdvice && (
                    <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                      <span className="font-extrabold text-emerald-950 block mb-1 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>शास्त्रज्ञ / तज्ज्ञांचा सल्ला व मार्गदर्शन:</span>
                      </span>
                      <p className="text-emerald-900 leading-relaxed font-medium">
                        {c.expertAdvice}
                      </p>
                      {c.scheduledTime && (
                        <span className="text-[10px] text-emerald-700 block mt-2">
                          कॉल वेळ: {c.scheduledTime}
                        </span>
                      )}
                    </div>
                  )}

                  {/* If user is Expert or testing reply */}
                  {user.role === 'expert' && !c.expertAdvice && (
                    <div className="pt-2">
                      {replyingToId === c.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            placeholder="शेतकऱ्यासाठी उपाय व सल्ला लिहा..."
                            value={expertReplyText}
                            onChange={(e) => setExpertReplyText(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:outline-hidden"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setReplyingToId(null)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100"
                            >
                              रद्द करा
                            </button>
                            <button
                              onClick={() => handleExpertReply(c.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-700"
                            >
                              सल्ला पाठवा
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReplyingToId(c.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-orange-600"
                        >
                          सल्ला उत्तर द्या (Reply as Expert)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Consultation Modal */}
      {bookingModalExpert && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-700">{bookingModalExpert.specialization}</span>
                <h3 className="text-base font-extrabold text-gray-900 mt-0.5">
                  {bookingModalExpert.name}
                </h3>
              </div>
              <button
                onClick={() => setBookingModalExpert(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">पीक निवडा *</label>
                <input
                  type="text"
                  required
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  समस्या / प्रश्न सविस्तर वर्णन करा *
                </label>
                <textarea
                  rows={3}
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900">
                ✅ Sheti Mitra वरील सर्व विद्यापीठ डिजिटल सल्ला शेतकऱ्यांसाठी पूर्णतः मोफत आहे.
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-extrabold text-sm shadow-md transition-colors cursor-pointer"
              >
                सल्ला विनंती पाठवा (Send Request)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
