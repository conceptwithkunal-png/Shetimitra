import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Languages,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const VoiceAssistantView: React.FC = () => {
  const { language, setLanguage, t } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text:
        language === 'mr'
          ? 'राम राम शेतकरी मित्रा! मी आपला शेती मित्र आवाज सहाय्यक आहे. आपण मला आजचे बाजारभाव, हवामान, पीक रोग किंवा सरकारी योजनांबद्दल कोणताही प्रश्न मराठीत विचारू शकता.'
          : language === 'hi'
          ? 'नमस्ते किसान भाई! मैं शेती मित्र आवाज सहायक हूँ। आप मुझसे मंडी भाव, मौसम, फसल रोग या सरकारी योजनाओं के बारे में हिंदी में पूछ सकते हैं।'
          : 'Hello farmer friend! I am your Sheti Mitra Voice AI Assistant. You can speak or ask anything about Mandi rates, weather, crop diseases, or government schemes.',
      timestamp: 'आत्ताच'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Suggested quick prompts
  const samplePrompts = language === 'mr' ? [
    'आज लासलगाव बाजारात कांद्याला काय भाव आहे?',
    'सोयाबीनवरील पिवळा मोझॅक रोगावर काय फवारावे?',
    'नाशिक जिल्ह्यात पुढील २ दिवसांत पाऊस पडेल का?',
    'पंतप्रधान किसान सन्मान निधीचे पैसे कधी मिळतात?'
  ] : language === 'hi' ? [
    'आज लासलगांव में प्याज का मंडी भाव क्या है?',
    'सोयाबीन में पीले मोज़ेक रोग का क्या उपाय है?',
    'क्या अगले 2 दिनों में बारिश होने की संभावना है?',
    'पीएम किसान योजना के लिए आवश्यक दस्तावेज क्या हैं?'
  ] : [
    'What is today\'s modal price for soybean in Latur?',
    'How do I treat purple blotch in onion?',
    'Is today suitable for pesticide spraying in Pune?',
    'What are the eligibility terms for PM-KISAN?'
  ];

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
        // Automatically submit the recognized voice text
        handleSendQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('तुमच्या ब्राउझरमध्ये व्हॉईस रेकग्निशन उपलब्ध नाही. कृपया टेक्स्ट बॉक्समध्ये टाईप करा.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Error starting mic:', e);
      }
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendQuery = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language
        })
      });

      const data = await res.json();
      const replyText = data.reply || 'क्षमस्व, उत्तर मिळण्यात अडचण आली.';

      const botMsg: Message = {
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);

      // Automatically speak the reply in TTS
      speakText(replyText);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: 'सर्व्हरशी संपर्क साधता आला नाही. कृपया इंटरनेट तपासा.',
          timestamp: 'त्रुटी'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-950 p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-2 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Voice & Speech Grounded in APMC & IMD Data</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {t.assistantTitle}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
            {t.assistantSubtitle}
          </p>
        </div>

        {/* Language switch buttons */}
        <div className="flex items-center space-x-1.5 bg-black/20 p-1 rounded-xl backdrop-blur-md border border-white/10 self-start md:self-auto">
          {[
            { id: 'mr', label: 'मराठी' },
            { id: 'hi', label: 'हिंदी' },
            { id: 'en', label: 'English' }
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id as Language)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === l.id
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col h-[520px]">

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 text-[#16833B]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#16833B] text-white rounded-tr-xs'
                    : 'bg-gray-50 border border-gray-200 text-gray-800 rounded-tl-xs'
                }`}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 hover:text-emerald-800 cursor-pointer"
                      title="Speak audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 italic p-2">
              <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>शेती मित्र कृषी माहिती शोधत आहे...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-gray-50/80 border-t border-gray-100 flex items-center space-x-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-gray-400 shrink-0">सुचवलेले प्रश्न:</span>
          {samplePrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              className="px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-900 whitespace-nowrap text-[11px] font-medium shrink-0 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar with Mic & Send */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
          {/* Mic Button */}
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition-all flex items-center justify-center shrink-0 cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
            title={isListening ? t.stopSpeak : t.speakNow}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            placeholder={isListening ? t.listening : t.askPlaceholder}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-hidden"
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={!inputQuery.trim() || loading}
            className="p-3 bg-[#16833B] hover:bg-[#10552B] text-white rounded-xl transition-colors disabled:opacity-40 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
