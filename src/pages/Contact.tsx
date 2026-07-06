import { useState } from 'react';
import axios from 'axios';
import { Send, MapPin, Phone, Mail, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../api/config';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    axios.post(`${API_BASE_URL}/contact.php`, formData)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-16 font-outfit">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
             <span className="w-12 h-1.5 bg-brand-blue rounded-full"></span>
             <span className="text-brand-blue font-black uppercase text-xs tracking-widest">Nous contacter</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-6">
            Parlons de <span className="text-brand-blue">demain</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl">
            Notre équipe est à votre écoute pour toute demande d'information, 
            partenariat ou retour sur nos programmes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-50 h-full flex flex-col">
              <h3 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-tighter border-b border-gray-50 pb-6">Relations Publiques</h3>
              
              <div className="space-y-10 flex-grow">
                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-5 rounded-[24px] text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Siège Social</h4>
                    <p className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tighter">Bld de l'Excellence</p>
                    <p className="text-gray-500 font-medium mt-1">Lubumbashi, RDC</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-5 rounded-[24px] text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Standard</h4>
                    <p className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tighter">+243 81 000 0000</p>
                    <p className="text-gray-500 font-medium mt-1">Lundi — Vendredi, 8h-18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-5 rounded-[24px] text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Emails</h4>
                    <p className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tighter">contact@malaika.tv</p>
                    <p className="text-gray-500 font-medium mt-1">redaction@malaika.tv</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-brand-blue rounded-[32px] text-white relative overflow-hidden">
                 <p className="text-sm font-black uppercase tracking-widest mb-2 relative z-10">Direct antenne</p>
                 <p className="text-2xl font-black relative z-10 tracking-tighter">Participez à nos débats</p>
                 <MessageSquare className="absolute -bottom-4 -right-4 h-24 w-24 text-white/10" />
              </div>
            </div>
          </div>

          {/* Contact Form Main */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-gray-50 h-full">
              <h3 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tighter">Formulaire de contact</h3>
              
              {status === 'success' && (
                <div className="mb-10 p-6 bg-green-50 text-green-700 rounded-[24px] border border-green-100 flex items-center gap-4 animate-in fade-in zoom-in duration-500">
                  <CheckCircle2 className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <p className="font-black text-lg uppercase tracking-tighter">Message transmis</p>
                    <p className="text-sm font-medium opacity-80">Notre équipe de rédaction vous répondra dans les meilleurs délais.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-10 p-6 bg-red-50 text-red-700 rounded-[24px] border border-red-100 flex items-center gap-4">
                  <AlertCircle className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <p className="font-black text-lg uppercase tracking-tighter">Erreur d'envoi</p>
                    <p className="text-sm font-medium opacity-80">Une erreur technique est survenue. Veuillez réessayer ultérieurement.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all font-black text-gray-900 placeholder:text-gray-300 placeholder:uppercase placeholder:text-[10px]"
                      placeholder="Identité complète"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email de contact</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all font-black text-gray-900 placeholder:text-gray-300 placeholder:uppercase placeholder:text-[10px]"
                      placeholder="votre@adresse.com"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Objet du message</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all font-black text-gray-900 placeholder:text-gray-300 placeholder:uppercase placeholder:text-[10px]"
                    placeholder="De quoi souhaitez-vous nous parler ?"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Votre message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-[#F3F4F6] border-2 border-transparent focus:border-brand-blue focus:bg-white outline-none transition-all font-black text-gray-900 placeholder:text-gray-300 placeholder:uppercase placeholder:text-[10px] resize-none"
                    placeholder="Écrivez votre message ici..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-brand-blue text-white font-black rounded-2xl hover:bg-blue-900 focus:outline-none transition-all disabled:opacity-70 shadow-xl shadow-blue-100 uppercase text-xs tracking-widest active:scale-95"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  ) : (
                    <>Transmettre le message <Send className="h-5 w-5" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
