import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Target, 
  MessageSquare,
  ShieldCheck,
  Building2,
  User,
  Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { submitLead } from '../services/api';

const LeadForm = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, analyzing, result
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: ''
  });

  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await submitLead(formData);
      setAnalysis(response);
      setStatus('result');
      toast.success('AI Analysis Complete');
    } catch (error) {
      setStatus('idle');
      toast.error('AI Processing Failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-black text-text-primary font-heading tracking-tight">
          Lead <span className="text-indigo-500">Intake</span>
        </h1>
        <p className="text-text-muted mt-2 font-body">Direct signal injection into our AI-scoring pipeline.</p>
      </div>

      <AnimatePresence mode="wait">
        {(status === 'idle' || status === 'submitting' || status === 'analyzing') && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-10 relative overflow-hidden"
          >
            {status !== 'idle' && (
              <div className="absolute inset-0 z-50 bg-bg-main/80 backdrop-blur-md flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {status === 'submitting' ? <Send size={24} className="text-indigo-500 animate-pulse" /> : <Target size={24} className="text-indigo-500 animate-pulse" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary font-heading">
                  {status === 'submitting' ? 'Transmitting Data...' : 'Analyzing your message with AI...'}
                </h3>
                <p className="text-text-muted opacity-50 mt-2 font-mono text-[10px] uppercase tracking-[4px]">Groq-Llama-3-8B-Instant Processing</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-border-subtle/50 border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted/50 focus:border-indigo-500/50 focus:ring-0 transition-all"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Mail size={14} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    required 
                    className="w-full bg-border-subtle/50 border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted/50 focus:border-indigo-500/50 focus:ring-0 transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                  <Building2 size={14} /> Company Name
                </label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-border-subtle/50 border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted/50 focus:border-indigo-500/50 focus:ring-0 transition-all"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                  <MessageSquare size={14} /> Message
                </label>
                <textarea 
                  required 
                  rows={5}
                  className="w-full bg-border-subtle/50 border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-muted/50 focus:border-indigo-500/50 focus:ring-0 transition-all resize-none"
                  placeholder="Tell us what you need help with..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full justify-center py-5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(99,102,241,0.5)]"
              >
                <Send size={18} />
                Submit for AI Analysis
              </button>

              <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5 opacity-50">
                <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-indigo-400" /> Secure Protocol
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  <Target size={14} className="text-indigo-400" /> Real-time Scoring
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {status === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {analysis?.score >= 80 && (
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-rose-500/20 border border-rose-500/30 p-4 rounded-2xl flex items-center justify-center gap-3"
              >
                <Flame className="text-rose-500 fill-rose-500" size={20} />
                <span className="text-sm font-black text-rose-500 uppercase tracking-[4px]">High Priority — Team Notified</span>
              </motion.div>
            )}

            <div className="glass-card p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] -mt-32" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                  <div className="text-4xl font-black text-indigo-400 font-heading">{analysis?.score || 0}</div>
                </div>
                
                <h2 className="text-3xl font-black text-text-primary font-heading mb-4">Analysis Complete</h2>
                <p className="text-text-muted max-w-md mx-auto leading-relaxed mb-8">
                  "{analysis?.reason || 'No analysis available.'}"
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold uppercase">
                    <CheckCircle2 size={16} /> Auto-reply sent
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 text-xs font-bold uppercase">
                    <CheckCircle2 size={16} /> Database Sync Done
                  </div>
                </div>

                <button 
                  onClick={() => setStatus('idle')}
                  className="px-10 py-4 rounded-xl border border-border-subtle text-text-muted text-xs font-bold uppercase tracking-widest hover:bg-border-subtle hover:text-text-primary transition-all"
                >
                  Submit Another Lead
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;
