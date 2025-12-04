
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Ticket as TicketIcon, QrCode, CheckCircle, Wallet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TicketType, PaymentMethod } from '../types';

const TicketPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState<TicketType>(TicketType.REGULAR);
  const [count, setCount] = useState(1);
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock Price Calculation
  const pricePerTicket = type === TicketType.STUDENT ? 10 : 20;
  const totalPrice = pricePerTicket * count;

  const handlePayment = () => {
    if (!method) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-brand-light p-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-green/20 w-full max-w-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.ticketSuccess}</h2>
          <p className="text-gray-500 text-sm mb-6">{t.showQr}</p>
          
          <div className="bg-gray-900 p-6 rounded-xl mb-6 mx-auto w-48 h-48 flex items-center justify-center">
            <QrCode size={120} className="text-white" />
          </div>

          <div className="space-y-2 text-left bg-brand-light p-4 rounded-xl border border-brand-beige mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t.from}</span>
              <span className="font-bold text-gray-800">{from}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t.to}</span>
              <span className="font-bold text-gray-800">{to}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t.ticketType}</span>
              <span className="font-bold text-gray-800">{type === TicketType.STUDENT ? t.student : t.regular} x{count}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
              <span className="text-gray-500 font-bold">{t.totalPrice}</span>
              <span className="font-bold text-brand-green">৳{totalPrice}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full bg-brand-navy text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            {t.home}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light pb-24">
      {/* Header */}
      <div className="bg-brand-green p-4 pt-6 text-white rounded-b-[2rem] shadow-md mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">{t.buyTicket}</h1>
        </div>
        <div className="flex items-center justify-between px-2 pb-2">
           <div className={`flex items-center gap-2 ${step === 'details' ? 'opacity-100 font-bold' : 'opacity-60'}`}>
              <div className="w-6 h-6 rounded-full bg-white text-brand-green flex items-center justify-center text-xs">1</div>
              <span>Details</span>
           </div>
           <div className="h-0.5 w-12 bg-white/30"></div>
           <div className={`flex items-center gap-2 ${step === 'payment' ? 'opacity-100 font-bold' : 'opacity-60'}`}>
              <div className="w-6 h-6 rounded-full bg-white text-brand-green flex items-center justify-center text-xs">2</div>
              <span>Payment</span>
           </div>
        </div>
      </div>

      <div className="px-4 max-w-md mx-auto">
        {step === 'details' ? (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-brand-beige space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{t.from}</label>
              <input 
                value={from}
                onChange={e => setFrom(e.target.value)}
                placeholder="Ex: GEC"
                className="w-full p-3 bg-brand-light rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/50 outline-none font-semibold text-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">{t.to}</label>
              <input 
                value={to}
                onChange={e => setTo(e.target.value)}
                placeholder="Ex: Agrabad"
                className="w-full p-3 bg-brand-light rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/50 outline-none font-semibold text-gray-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{t.ticketType}</label>
                <select 
                  value={type}
                  onChange={e => setType(e.target.value as TicketType)}
                  className="w-full p-3 bg-brand-light rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green/50 outline-none font-semibold text-gray-800 text-sm"
                >
                  <option value={TicketType.REGULAR}>{t.regular}</option>
                  <option value={TicketType.STUDENT}>{t.student}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{t.quantity}</label>
                <div className="flex items-center bg-brand-light rounded-xl border border-gray-200">
                  <button onClick={() => setCount(Math.max(1, count - 1))} className="p-3 text-gray-500 hover:text-brand-navy">-</button>
                  <span className="flex-1 text-center font-bold text-gray-800">{count}</span>
                  <button onClick={() => setCount(Math.min(10, count + 1))} className="p-3 text-gray-500 hover:text-brand-navy">+</button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
               <span className="text-gray-500 text-sm font-medium">{t.totalPrice}</span>
               <span className="text-2xl font-bold text-brand-green">৳{totalPrice}</span>
            </div>

            <button 
              onClick={() => { if(from && to) setStep('payment'); }}
              disabled={!from || !to}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all ${(!from || !to) ? 'bg-gray-300' : 'bg-brand-navy hover:bg-gray-800'}`}
            >
              Next <ArrowLeft size={16} className="rotate-180" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="bg-white p-5 rounded-3xl shadow-lg border border-brand-beige">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                   <Wallet size={20} className="text-brand-green" /> {t.selectPayment}
                </h3>
                
                <div className="space-y-4">
                    {/* bKash Option */}
                    <button 
                      onClick={() => setMethod(PaymentMethod.BKASH)}
                      className={`relative w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all group ${
                        method === PaymentMethod.BKASH 
                        ? 'border-[#E2136E] bg-[#E2136E]/5 ring-1 ring-[#E2136E]/20' 
                        : 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                      }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-active:scale-95 bg-[#E2136E]`}>
                             <span className="font-bold italic text-xs">bKash</span>
                        </div>
                        <div className="text-left flex-1">
                            <span className={`block font-bold text-base ${method === PaymentMethod.BKASH ? 'text-[#E2136E]' : 'text-gray-700'}`}>bKash</span>
                            <span className="text-[10px] text-gray-400">Pay via bKash Wallet</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === PaymentMethod.BKASH ? 'border-[#E2136E] bg-[#E2136E]' : 'border-gray-300'}`}>
                            {method === PaymentMethod.BKASH && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                    </button>

                    {/* Nagad Option */}
                    <button 
                      onClick={() => setMethod(PaymentMethod.NAGAD)}
                      className={`relative w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all group ${
                        method === PaymentMethod.NAGAD 
                        ? 'border-[#F6921E] bg-[#F6921E]/5 ring-1 ring-[#F6921E]/20' 
                        : 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                      }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-active:scale-95 bg-[#F6921E]`}>
                             <span className="font-bold text-xs">Nagad</span>
                        </div>
                        <div className="text-left flex-1">
                            <span className={`block font-bold text-base ${method === PaymentMethod.NAGAD ? 'text-[#F6921E]' : 'text-gray-700'}`}>Nagad</span>
                            <span className="text-[10px] text-gray-400">Pay via Nagad Wallet</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === PaymentMethod.NAGAD ? 'border-[#F6921E] bg-[#F6921E]' : 'border-gray-300'}`}>
                            {method === PaymentMethod.NAGAD && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                    </button>

                    {/* Card Option */}
                    <button 
                      onClick={() => setMethod(PaymentMethod.CARD)}
                      className={`relative w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all group ${
                        method === PaymentMethod.CARD 
                        ? 'border-brand-navy bg-brand-navy/5 ring-1 ring-brand-navy/20' 
                        : 'border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white'
                      }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-active:scale-95 bg-brand-navy`}>
                             <CreditCard size={20} />
                        </div>
                        <div className="text-left flex-1">
                            <span className={`block font-bold text-base ${method === PaymentMethod.CARD ? 'text-brand-navy' : 'text-gray-700'}`}>Cards</span>
                            <span className="text-[10px] text-gray-400">Visa / Mastercard / Amex</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === PaymentMethod.CARD ? 'border-brand-navy bg-brand-navy' : 'border-gray-300'}`}>
                            {method === PaymentMethod.CARD && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                    </button>
                </div>
             </div>

             <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-beige flex justify-between items-center">
                <div>
                   <p className="text-xs text-gray-500">Payable Amount</p>
                   <p className="text-xl font-bold text-brand-navy">৳{totalPrice}</p>
                </div>
                <button 
                   onClick={handlePayment}
                   disabled={!method || loading}
                   className={`px-8 py-3 rounded-xl font-bold text-white shadow-md transition-all ${!method || loading ? 'bg-gray-400' : 'bg-brand-green hover:bg-brand-darkGreen'}`}
                >
                   {loading ? t.processing : t.payNow}
                </button>
             </div>
             
             <button 
                onClick={() => setStep('details')}
                className="w-full text-center text-gray-500 text-sm font-medium p-2"
             >
                Cancel
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;
