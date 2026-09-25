import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Mail, 
  ExternalLink,
  Code2,
  Bot
} from 'lucide-react';

export default function Footer({ onOpenDebugger, onOpenChat }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Footer Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                Salesforce Agentforce Triage Active
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h4>
              <p className="text-xs text-slate-400">
                Direct REST API Architecture • 0 Node.js Middleware Dependencies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDebugger}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4" />
              REST API Inspector
            </button>
            <button
              onClick={onOpenChat}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-colors shadow-md flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4" />
              Launch Agentforce
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                Health<span className="text-sky-400">First</span> Clinic
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Enterprise healthcare portal powered by Salesforce Agentforce AI, real-time doctor slot locks, and Apex REST integration.
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Compliant & ISO 27001</span>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-3">
              Departments
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#departments" className="hover:text-sky-400 transition-colors">Cardiology & Heart Care</a></li>
              <li><a href="#departments" className="hover:text-sky-400 transition-colors">Orthopedics & Joint Surgery</a></li>
              <li><a href="#departments" className="hover:text-sky-400 transition-colors">General & Internal Medicine</a></li>
              <li><a href="#departments" className="hover:text-sky-400 transition-colors">Neurology & Brain Sciences</a></li>
              <li><a href="#departments" className="hover:text-sky-400 transition-colors">Pediatrics & Child Wellness</a></li>
            </ul>
          </div>

          {/* Salesforce Integration */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-3">
              Salesforce Tech Stack
            </h5>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li className="text-slate-400">Custom Obj: Patient__c</li>
              <li className="text-slate-400">Custom Obj: Doctor__c</li>
              <li className="text-slate-400">Custom Obj: Doctor_Schedule__c</li>
              <li className="text-slate-400">Custom Obj: Appointment__c</li>
              <li className="text-sky-400 font-bold">Apex REST: /HealthFirstService/v1</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-3">
              Hospital Contact
            </h5>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>100 Medical Center Parkway, Suite 400, Healthcare City</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-bold text-white">1-800-HEALTH-FIRST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>triage@healthfirst-clinic.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Footer */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} HealthFirst Clinic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Salesforce Partner Notice</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
