import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Shield, BarChart3, Globe, Layers, Server, RefreshCw } from 'lucide-react';

const AgentCore = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center commercial-card border-none bg-gradient-to-b from-bg-card to-bg-main overflow-hidden shadow-2xl rounded-[3rem]">
      
      {/* Structural Tech Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* 360 Spin Background Ring - FORCE VISIBILITY */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] border-2 border-dashed border-brand-primary/10 rounded-full flex items-center justify-center opacity-40"
      >
        <div className="w-full h-full border-t-2 border-brand-primary/20 rounded-full" />
      </motion.div>

      {/* Pulsing Scanline Effect */}
      <motion.div 
        animate={{ y: [-500, 500] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-6xl px-12 flex items-center justify-between">
        
        {/* Left Telemetry Pillar */}
        <div className="flex flex-col gap-8">
            <motion.div 
                initial={{ x: -50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-bg-card/80 backdrop-blur-xl border border-border-subtle rounded-3xl shadow-xl flex items-center gap-5 cursor-pointer relative group"
            >
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 relative">
                    <Zap size={28} className="animate-pulse" />
                </div>
                <div className="relative">
                    <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Growth Velocity</p>
                    <p className="text-3xl font-black text-text-primary tracking-tighter">+12.4%</p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ x: -50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-bg-card/80 backdrop-blur-xl border border-border-subtle rounded-3xl shadow-xl flex items-center gap-5 cursor-pointer relative group"
            >
                <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 relative">
                    <Shield size={28} />
                </div>
                <div className="relative">
                    <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Lead Integrity</p>
                    <p className="text-3xl font-black text-text-primary tracking-tighter">Grade A</p>
                </div>
            </motion.div>
        </div>

        {/* Central Core: High-Performance Engine */}
        <div className="relative flex flex-col items-center">
            <motion.div
                animate={{ 
                    scale: [1, 1.05, 1],
                    rotateY: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-56 h-64 bg-bg-card border-4 border-brand-primary rounded-[3rem] shadow-[0_0_60px_rgba(129,140,248,0.3)] flex flex-col items-center justify-center relative z-10 overflow-hidden group"
            >
                <div className="absolute inset-0 bg-brand-primary/5 flex flex-col p-6 gap-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <motion.div 
                            key={i} 
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 1 + i, repeat: Infinity }}
                            className="h-2 w-full bg-white/10 rounded-full flex gap-1 items-center px-1"
                        >
                            <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
                            <div className="flex-1" />
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                        </motion.div>
                    ))}
                </div>
                <Server size={80} className="text-brand-primary relative z-10 drop-shadow-[0_0_20px_var(--color-brand-primary)]" />
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mt-4 flex items-center gap-2 relative z-10"
                >
                    <RefreshCw size={12} className="text-brand-primary animate-spin" />
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-[4px]">Processing</span>
                </motion.div>
            </motion.div>
            
            <div className="mt-12 text-center">
                <h2 className="text-4xl font-black text-text-primary uppercase tracking-tighter italic">OMNI_ENGINE.v4</h2>
                <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center justify-center gap-2 mt-3"
                >
                    <div className="px-4 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20 text-[10px] font-black text-brand-primary uppercase tracking-[5px]">
                        Neural Hub Active
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Right Telemetry Pillar */}
        <div className="flex flex-col gap-8">
            <motion.div 
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-bg-card/80 backdrop-blur-xl border border-border-subtle rounded-3xl shadow-xl flex items-center gap-5 cursor-pointer relative group"
            >
                <div className="absolute inset-0 bg-amber-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                    <p className="text-[10px] font-black uppercase text-text-muted tracking-widest text-right">Processing</p>
                    <p className="text-3xl font-black text-text-primary tracking-tighter text-right italic">42ms</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 relative">
                    <BarChart3 size={28} />
                </div>
            </motion.div>

            <motion.div 
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-bg-card/80 backdrop-blur-xl border border-border-subtle rounded-3xl shadow-xl flex items-center gap-5 cursor-pointer relative group"
            >
                <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                    <p className="text-[10px] font-black uppercase text-text-muted tracking-widest text-right">Connectivity</p>
                    <p className="text-3xl font-black text-text-primary tracking-tighter text-right italic">99.9%</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary relative">
                    <Layers size={28} className="animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AgentCore;
