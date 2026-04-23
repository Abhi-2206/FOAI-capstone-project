import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Cpu, 
  MessageSquare, 
  Mail, 
  AlertCircle, 
  FileText, 
  Image, 
  ArrowRight,
  Zap,
  CheckCircle2,
  GitBranch
} from 'lucide-react';

const Node = ({ icon: Icon, label, status = 'done', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center gap-3 relative z-10"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${
      status === 'done' 
        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500 shadow-emerald-500/10' 
        : status === 'active'
        ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-500 animate-pulse-glow'
        : 'bg-border-subtle border-border-subtle text-text-muted'
    }`}>
      <Icon size={24} />
    </div>
    <div className="text-center">
      <p className="text-[10px] font-black text-text-primary uppercase tracking-wider">{label}</p>
      <div className="flex items-center justify-center gap-1 mt-1">
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'done' ? 'bg-emerald-500' : status === 'active' ? 'bg-indigo-500' : 'bg-text-muted opacity-30'}`} />
        <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">{status}</span>
      </div>
    </div>
  </motion.div>
);

const Connector = ({ delay = 0, active = true }) => (
  <div className="flex-1 h-[2px] bg-border-subtle relative min-w-[40px] mt-7">
    {active && (
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left"
      />
    )}
    {active && (
      <motion.div
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{ delay, duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[2px] shadow-[0_0_10px_#fff]"
      />
    )}
  </div>
);

const PipelineMap = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black text-text-primary font-heading tracking-tight">
          Pipeline <span className="text-indigo-500">Flow Map</span>
        </h1>
        <p className="text-text-muted mt-2 font-body">Visual architecture of your active AI automation sequences.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Pipeline 1 */}
        <div className="glass-card p-8 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary font-heading flex items-center gap-2">
              <Zap size={20} className="text-indigo-500 fill-indigo-500" />
              Pipeline 1: Lead Gen & CRM
            </h3>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Flow</span>
          </div>

          <div className="flex items-start justify-between relative px-4">
            <Node icon={MessageSquare} label="Contact Form" delay={0.1} />
            <Connector delay={0.6} />
            <Node icon={Cpu} label="Groq AI Chain" delay={0.2} status="active" />
            <Connector delay={0.7} />
            <Node icon={GitBranch} label="Output Parser" delay={0.3} status="pending" />
          </div>

          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-border-subtle relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-border-subtle -mt-10" />
             
             <Node icon={AlertCircle} label="Priority Alert" delay={0.8} status="pending" />
             <Node icon={Database} label="Google Sheets" delay={0.9} status="pending" />
             <Node icon={Mail} label="Auto Reply" delay={1.0} status="pending" />
          </div>
        </div>

        {/* Pipeline 2 */}
        <div className="glass-card p-8 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-primary font-heading flex items-center gap-2">
              <FileText size={20} className="text-purple-500 fill-purple-500" />
              Pipeline 2: Content Generation
            </h3>
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Active</span>
          </div>

          <div className="flex items-start justify-between relative px-4">
            <Node icon={FileText} label="Content Form" delay={1.2} />
            <Connector delay={1.7} />
            <Node icon={Cpu} label="Llama 3.1 AI" delay={1.3} />
            <Connector delay={1.8} />
            <Node icon={GitBranch} label="Parser" delay={1.4} />
          </div>

          <div className="grid grid-cols-2 gap-10 pt-10 border-t border-border-subtle relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-border-subtle -mt-10" />
            
            <div className="flex flex-col items-center">
              <Node icon={FileText} label="Google Docs" delay={1.9} />
            </div>
            <div className="flex flex-col items-center">
              <Node icon={Image} label="Instagram" delay={2.0} />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 border-indigo-500/20 bg-indigo-500/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-text-primary">System Integrity: 100%</h4>
            <p className="text-xs text-text-muted">All nodes are synchronized and responding within nominal latency parameters (&lt; 150ms).</p>
          </div>
          <button className="ml-auto px-6 py-2 rounded-xl bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 transition-all">
            Run Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineMap;
