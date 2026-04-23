import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  PenTool,
  Send,
  GitBranch,
  Bell,
  Search,
  Zap,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Leads', path: '/dashboard/leads' },
  { icon: PenTool, label: 'Content Generator', path: '/dashboard/content' },
  { icon: Send, label: 'Submit Lead', path: '/dashboard/form' },
  { icon: GitBranch, label: 'Pipeline Map', path: '/dashboard/pipeline-map' },
];


const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[var(--sidebar-bg)] border-r border-[var(--border-subtle)] flex flex-col z-50 transition-colors duration-300">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)] font-heading">
            NEXUS<span className="text-indigo-500">AI</span>
          </h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'nav-link group transition-all duration-300',
                isActive && 'active'
              )}
            >
              <item.icon size={20} className={cn('group-hover:scale-110 transition-transform')} />
              <span className="font-medium">{item.label}</span>
              {location.pathname === item.path && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/5">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--text-primary)] truncate">Admin</p>
            <p className="text-xs text-[var(--text-muted)] truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-20 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">2 Automations Active</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <button className="w-10 h-10 rounded-xl bg-[var(--nav-hover-bg)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[var(--bg-main)]" />
          </button>
        </div>

        <ThemeToggle />
        
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-body transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-72">
        <Header />
        <main className="p-10 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
