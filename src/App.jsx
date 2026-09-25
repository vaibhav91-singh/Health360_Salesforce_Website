import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specialties from './components/Specialties';
import Doctors from './components/Doctors';
import ChatWidget from './components/ChatWidget';
import SalesforceDebugger from './components/SalesforceDebugger';
import AppointmentModal from './components/AppointmentModal';
import Footer from './components/Footer';
import { Bot, Code2, Calendar } from 'lucide-react';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [isDebuggerOpen, setIsDebuggerOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [appointmentSearchQuery, setAppointmentSearchQuery] = useState('');

  const handleOpenChat = (query = '', doctor = null) => {
    setChatInitialQuery(query);
    setSelectedDoctor(doctor);
    setIsChatOpen(true);
  };

  const handleOpenAppointments = (searchQuery = '') => {
    setAppointmentSearchQuery(searchQuery);
    setIsAppointmentsOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navigation Header */}
      <Navbar
        onOpenChat={() => handleOpenChat()}
        onOpenDebugger={() => setIsDebuggerOpen(true)}
        onOpenAppointments={(q) => handleOpenAppointments(q)}
        sfStatus="Connected"
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* Hero Banner with Agentforce Simulator Preview */}
        <Hero
          onOpenChat={() => handleOpenChat()}
          onOpenDebugger={() => setIsDebuggerOpen(true)}
          onOpenAppointments={() => handleOpenAppointments()}
        />

        {/* Medical Specialties & Departments */}
        <Specialties
          onSelectSpecialty={(deptName) => {
            handleOpenChat(`I need a consultation for ${deptName}`);
          }}
          onOpenChat={(query) => handleOpenChat(query)}
        />

        {/* Featured Doctors Directory */}
        <Doctors
          onBookDoctor={(doc) => {
            setSelectedDoctor(doc);
            handleOpenChat(`Book an appointment with ${doc.name}`, doc);
          }}
          onOpenChat={(query) => handleOpenChat(query)}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenDebugger={() => setIsDebuggerOpen(true)}
        onOpenChat={() => handleOpenChat()}
      />

      {/* Floating Action Bar (Bottom Right) */}
      {!isChatOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
          
          {/* Quick REST Inspector Floating Pill */}
          <button
            onClick={() => setIsDebuggerOpen(true)}
            className="px-3.5 py-2 bg-slate-900 text-sky-300 border border-slate-700 rounded-full shadow-lg text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Salesforce REST</span>
          </button>

          {/* Core Agentforce Floating Bot Button */}
          <button
            onClick={() => handleOpenChat()}
            className="px-5 py-3.5 bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-sky-500/50 transition-all flex items-center gap-2.5 font-bold text-sm agentforce-glow group"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
            </div>
            <span>Agentforce AI Bot</span>
          </button>
        </div>
      )}

      {/* Agentforce Simulation Chat Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
        selectedDoctor={selectedDoctor}
      />

      {/* Salesforce Architecture & REST Inspector Modal */}
      <SalesforceDebugger
        isOpen={isDebuggerOpen}
        onClose={() => setIsDebuggerOpen(false)}
      />

      {/* Patient Appointments Management Modal */}
      <AppointmentModal
        isOpen={isAppointmentsOpen}
        onClose={() => setIsAppointmentsOpen(false)}
        initialSearch={appointmentSearchQuery}
      />

    </div>
  );
}
