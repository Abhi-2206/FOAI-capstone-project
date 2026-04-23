import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Flag,
  Send,
  Mail,
  Building2,
  Calendar,
  ChevronRight
} from 'lucide-react';

const mockLeads = [];

const ScoreBadge = ({ score }) => {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-border-subtle rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${score}%` }} 
          className={`h-full ${color}`} 
        />
      </div>
      <span className="text-xs font-bold text-text-primary">{score}</span>
    </div>
  );
};

const CircularGauge = ({ score }) => {
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f43f5e';
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle cx="48" cy="48" r={radius} fill="transparent" stroke="var(--border-subtle)" strokeWidth="8" />
        <motion.circle 
          cx="48" cy="48" r={radius} fill="transparent" 
          stroke={color} strokeWidth="8" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-text-primary">{score}</span>
        <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Score</span>
      </div>
    </div>
  );
};

const Leads = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredLeads = mockLeads.filter(lead => {
    if (filter === 'High Priority') return lead.score >= 80;
    if (filter === 'Pending') return lead.status === 'Pending';
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-text-primary font-heading tracking-tight">
            Lead <span className="text-indigo-500">Management</span>
          </h1>
          <p className="text-text-muted mt-2 font-body">CRM overview of AI-scored incoming signals.</p>
        </div>
        <div className="flex items-center gap-2 bg-border-subtle p-1 rounded-xl border border-border-subtle">
          {['All Leads', 'High Priority', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === tab ? 'bg-indigo-500 text-white shadow-lg' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-main/50">
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">AI Score</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-border-subtle transition-colors cursor-pointer group"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                          {lead.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">{lead.name}</p>
                          <p className="text-xs text-text-muted">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-medium">{lead.company}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-text-muted max-w-xs truncate">{lead.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <ScoreBadge score={lead.score} />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                        lead.status === 'New' ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400' :
                        lead.status === 'Contacted' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                        'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted font-mono">{lead.date}</td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <Users size={48} className="mx-auto text-text-muted opacity-20 mb-4" />
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest">No leads found in the matrix</p>
                    <p className="text-xs text-text-muted mt-2">Incoming signals will appear here after AI quantification.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-bg-main/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card-bg border-l border-border-subtle z-[70] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="w-10 h-10 rounded-full bg-border-subtle border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-all"
                >
                  <X size={20} />
                </button>
                {selectedLead.score >= 80 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
                    <Flag size={14} className="text-rose-500 fill-rose-500" />
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">High Priority</span>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-6 mb-10">
                <CircularGauge score={selectedLead.score} />
                <div className="pt-2">
                  <h2 className="text-2xl font-black text-text-primary font-heading">{selectedLead.name}</h2>
                  <p className="text-indigo-400 font-medium">{selectedLead.company}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted bg-border-subtle px-2 py-1 rounded-lg">
                      <Mail size={12} /> {selectedLead.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle size={14} /> AI Analysis Reasoning
                  </h3>
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 italic text-text-secondary text-sm leading-relaxed">
                    "{selectedLead.reason}"
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Building2 size={14} /> Full Message Content
                  </h3>
                  <div className="p-4 rounded-2xl bg-border-subtle border border-border-subtle text-text-muted text-sm leading-relaxed">
                    {selectedLead.message}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Send size={14} /> Drafted AI Response
                  </h3>
                  <div className="glass-card p-6 border-indigo-500/20">
                    <textarea 
                      className="w-full bg-transparent border-none text-text-secondary text-sm focus:ring-0 min-h-[150px] resize-none leading-relaxed"
                      defaultValue={selectedLead.email_reply}
                    />
                    <div className="mt-6 flex gap-3">
                      <button className="btn-primary flex-1">
                        <Send size={16} />
                        Approve & Send
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-border-subtle border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-all">
                        <Clock size={18} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leads;
