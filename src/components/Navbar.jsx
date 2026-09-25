import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Calendar, 
  ShieldCheck, 
  PhoneCall, 
  Bot, 
  Code2, 
  Menu, 
  X,
  Clock,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  onOpenChat, 
  onOpenDebugger, 
  onOpenAppointments,
  sfStatus 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenAppointments(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Urgent Care & Salesforce Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-rose-400">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              24/7 Emergency Line: <a href="tel:1800432584" className="hover:underline font-bold text-white">1-800-HEALTH-FIRST</a>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Walk-in Clinic Hours: Mon-Sun 7:00 AM - 10:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-medium text-slate-300">Salesforce Agentforce:</span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Connected REST
              </span>
            </div>
            
            <button 
              onClick={onOpenDebugger}
              className="text-[11px] text-sky-300 hover:text-white hover:underline flex items-center gap-1 transition-colors"
            >
              <Code2 className="w-3 h-3" />
              REST Inspector
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  Health<span className="text-sky-600">First</span>
                </span>
                <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-200">
                  CLINIC
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                Salesforce Agentforce Powered Healthcare
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            <a href="#departments" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors">
              Specialties
            </a>
            <a href="#doctors" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors">
              Doctors
            </a>
            <a href="#agentforce" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-sky-500" />
              AI Triage
            </a>
            <a href="#salesforce-arch" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors">
              Salesforce Arch
            </a>
          </div>

          {/* Search & Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search Appointment */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="APT ID (e.g. APT-8921)"
                className="w-44 lg:w-52 pl-9 pr-3 py-1.5 text-xs rounded-full border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </form>

            {/* Check Appointment Status Button */}
            <button
              onClick={() => onOpenAppointments()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              My Appointments
            </button>

            {/* Agentforce AI Widget Button */}
            <button
              onClick={onOpenChat}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 rounded-xl shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all flex items-center gap-2 agentforce-glow"
            >
              <Bot className="w-4 h-4 text-cyan-200" />
              AI Triage Bot
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 text-sky-600 bg-sky-50 rounded-lg border border-sky-200"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Appointment ID (APT-8921)"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-sky-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <a 
            href="#departments" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            Specialties & Departments
          </a>
          <a 
            href="#doctors" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            Featured Doctors
          </a>
          <a 
            href="#agentforce" 
            onClick={() => { setMobileMenuOpen(false); onOpenChat(); }} 
            className="block text-sm font-semibold text-sky-600"
          >
            🤖 AI Health Assistant (Agentforce Bot)
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenDebugger(); }}
            className="w-full text-left text-sm font-semibold text-slate-700 hover:text-sky-600 flex items-center gap-2 pt-2 border-t border-slate-100"
          >
            <Code2 className="w-4 h-4 text-sky-600" />
            Salesforce REST Inspector & Schema
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenAppointments(); }}
            className="w-full text-left text-sm font-semibold text-slate-700 hover:text-sky-600 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            Check Appointment Status
          </button>
        </div>
      )}
    </header>
  );
}
