import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  AlertCircle, 
  FileText, 
  Zap, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-${color}-500/20 transition-all duration-500`} />
    
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`text-${color}-500`} size={24} />
      </div>
    </div>
    
    <h3 className="text-text-muted text-sm font-medium mb-1 font-body">{title}</h3>
    <div className="flex items-end gap-2">
      <span className="text-3xl font-black text-text-primary font-heading">{value}</span>
      <span className="text-text-muted text-xs mb-1.5 font-medium">this month</span>
    </div>
  </motion.div>
);

const ActivityItem = ({ event, time, type, delay }) => {
  const getIcon = () => {
    switch (type) {
      case 'lead': return <Users size={16} className="text-indigo-400" />;
      case 'content': return <FileText size={16} className="text-purple-400" />;
      case 'alert': return <AlertCircle size={16} className="text-rose-400" />;
      default: return <Zap size={16} className="text-amber-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-border-subtle transition-colors group cursor-pointer"
    >
      <div className="w-10 h-10 rounded-xl bg-border-subtle border border-border-subtle flex items-center justify-center shrink-0 group-hover:border-accent-primary/30 transition-all">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-secondary font-medium truncate">{event}</p>
        <div className="flex items-center gap-2 mt-1">
          <Clock size={12} className="text-text-muted" />
          <span className="text-xs text-text-muted">{time} ago</span>
        </div>
      </div>
      <ArrowUpRight size={16} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-all" />
    </motion.div>
  );
};

const Dashboard = () => {
  const activities = [];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-text-primary font-heading tracking-tight">
            System <span className="text-indigo-500">Overview</span>
          </h1>
          <p className="text-text-muted mt-2 font-body">Live telemetry from your AI automation pipelines.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary">
            <Zap size={18} className="fill-current" />
            Trigger Sync
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Leads" value="0" icon={Users} color="indigo" delay={0.1} />
        <MetricCard title="High Priority Leads" value="0" icon={AlertCircle} color="rose" delay={0.2} />
        <MetricCard title="Content Generated" value="0" icon={FileText} color="purple" delay={0.3} />
        <MetricCard title="Active Automations" value="2" icon={CheckCircle2} color="emerald" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-text-primary font-heading">Performance Analytics</h3>
              <div className="flex gap-2">
                {['24h', '7d', '30d'].map((range) => (
                  <button key={range} className="px-3 py-1 rounded-lg text-xs font-bold text-text-muted hover:text-text-primary hover:bg-border-subtle transition-all">
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[45, 65, 40, 80, 55, 90, 70, 85, 50, 95, 60, 75].map((val, i) => (
                <div key={i} className="flex-1 group relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                    className="w-full bg-gradient-to-t from-indigo-600/40 to-indigo-400/80 rounded-t-lg group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all cursor-pointer"
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#09090f] text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {val}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-primary font-heading">Live Activity</h3>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            {activities.length > 0 ? (
              activities.map((item, i) => (
                <ActivityItem key={i} {...item} delay={0.6 + i * 0.1} />
              ))
            ) : (
              <div className="py-10 text-center">
                <Clock size={32} className="mx-auto text-text-muted opacity-20 mb-3" />
                <p className="text-xs text-text-muted uppercase tracking-widest">No activity recorded</p>
              </div>
            )}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-border-subtle text-text-muted text-xs font-bold hover:bg-border-subtle hover:text-text-primary transition-all uppercase tracking-widest">
            View Full Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
