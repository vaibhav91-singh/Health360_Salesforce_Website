import React from 'react';
import { 
  Bot, 
  CalendarCheck, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Activity, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
  Users
} from 'lucide-react';

export default function Hero({ onOpenChat, onOpenDebugger, onOpenAppointments }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Salesforce Agentforce Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-sky-500/30 text-sky-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Powered by Salesforce Agentforce AI & REST Integration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Enterprise Health Triage <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Instantly Connected to Salesforce
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of clinical triage. HealthFirst Clinic pairs world-class medical specialists with an interactive Salesforce Agentforce AI bot that analyzes symptoms, determines urgency levels, and locks appointment slots in real-time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all flex items-center justify-center gap-2.5 group agentforce-glow"
              >
                <Bot className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                Launch AI Agentforce Triage
                <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenDebugger}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Database className="w-4 h-4 text-sky-400" />
                Inspect Salesforce Custom Objects
              </button>
            </div>

            {/* Trust Checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HIPAA & ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Node.js Backend Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Apex REST & SOQL</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Agentforce Interactive Simulator Preview */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Card */}
            <div className="glass-dark rounded-2xl p-6 shadow-2xl border border-slate-700/80 relative overflow-hidden">
              
              {/* Header inside simulator preview */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-900 shadow-md">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      Agentforce Medical Bot
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </h3>
                    <p className="text-[11px] text-slate-400">Salesforce Custom Apex Service Hook</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-sky-950/80 text-sky-300 px-2.5 py-1 rounded border border-sky-800/50">
                  Apex REST v58.0
                </span>
              </div>

              {/* Chat Simulation Snippet */}
              <div className="space-y-3 font-sans text-xs">
                
                {/* User Bubble */}
                <div className="flex justify-end">
                  <div className="bg-sky-600 text-white py-2.5 px-3.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                    "I have severe chest tightness and dizziness..."
                  </div>
                </div>

                {/* Agentforce Bubble with Triage Tag */}
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-200 py-3 px-4 rounded-2xl rounded-tl-none max-w-[90%] border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 text-[11px]">Agentforce AI Triage:</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold emergency-glow flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Emergency (Red)
                      </span>
                    </div>
                    <p className="text-slate-300">
                      Chest pain mapped to <strong className="text-rose-300">Cardiology</strong>. Reserve priority slot with Dr. Elena Rostova?
                    </p>

                    {/* SF Payload Preview Tag */}
                    <div className="bg-slate-900/90 rounded p-2 text-[10px] font-mono text-cyan-300 border border-slate-700/50">
                      <span className="text-slate-500">// Salesforce Apex Payload</span> <br/>
                      SOQL: SELECT Id FROM Doctor__c WHERE Dept='Cardiology' <br/>
                      Locked Record: <span className="text-emerald-400">APT-8921</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Simulator Action Trigger */}
              <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  Encrypted Apex Session
                </span>

                <button
                  onClick={onOpenChat}
                  className="px-3.5 py-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1"
                >
                  Try Live Simulator
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Quick Stats Overlay Card */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/70 text-center">
                <span className="block font-extrabold text-lg text-sky-400">100%</span>
                <span className="text-[10px] text-slate-400 font-medium">Salesforce Sync</span>
              </div>
              <div className="bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/70 text-center">
                <span className="block font-extrabold text-lg text-emerald-400">&lt; 30s</span>
                <span className="text-[10px] text-slate-400 font-medium">AI Triage Time</span>
              </div>
              <div className="bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/70 text-center">
                <span className="block font-extrabold text-lg text-cyan-400">5+</span>
                <span className="text-[10px] text-slate-400 font-medium">Medical Depts</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
