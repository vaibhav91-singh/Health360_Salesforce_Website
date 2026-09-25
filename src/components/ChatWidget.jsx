import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Code, 
  Maximize2, 
  Minimize2, 
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Stethoscope,
  Activity,
  ArrowRight
} from 'lucide-react';
import { PRESET_CHIPS, DOCTORS } from '../data/mockSalesforceData';
import { salesforceService } from '../services/salesforceService';

export default function ChatWidget({ isOpen, onClose, initialQuery = '', selectedDoctor = null }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'agentforce',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: 'Hello! I am your Salesforce Agentforce AI Health Assistant. I analyze symptoms, assess urgency levels, check real-time doctor availability, and issue instant appointment locks directly to Salesforce.',
      type: 'welcome'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  
  // Active booking form state inside chat
  const [activeTriageResult, setActiveTriageResult] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientForm, setPatientForm] = useState({ name: '', phone: '', email: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing, activeTriageResult, bookingConfirmed]);

  // Handle initialQuery or pre-selected doctor if passed
  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  // Fetch audit logs
  useEffect(() => {
    setAuditLogs(salesforceService.getAuditLogs());
  }, [messages]);

  // Handle user submitting a message
  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isProcessing) return;

    // Reset previous booking states for new query
    setBookingConfirmed(null);
    setActiveTriageResult(null);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsProcessing(true);

    try {
      // Check if user is asking for appointment status search
      if (text.toLowerCase().includes('status') || text.toUpperCase().includes('APT-')) {
        const matches = text.match(/APT-\d{4}/i);
        const searchId = matches ? matches[0] : text;
        const apt = await salesforceService.findAppointment(searchId);

        let statusText = '';
        if (apt) {
          statusText = `✅ **Salesforce Record Found!**\n- **Appointment ID:** ${apt.id}\n- **Patient:** ${apt.patientName}\n- **Doctor:** ${apt.doctorName} (${apt.department})\n- **Scheduled Time:** ${apt.date}\n- **Status:** ${apt.status}\n- **Salesforce Object ID:** \`${apt.sfId}\``;
        } else {
          statusText = `⚠️ No active appointment found in Salesforce matching "${searchId}". You can book a new slot below using our Agentforce triage tool.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `agent-${Date.now()}`,
            sender: 'agentforce',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: statusText,
            type: 'status_result',
            foundRecord: apt
          }
        ]);
        setIsProcessing(false);
        return;
      }

      // Execute AI Triage Analysis via Salesforce Service
      const triage = await salesforceService.analyzeSymptoms(text, patientForm);
      setActiveTriageResult(triage);
      if (triage.primaryDoctor?.availableSlots?.length > 0) {
        setSelectedSlot(triage.primaryDoctor.availableSlots[0]);
      }

      let agentResponseText = '';
      if (triage.urgency === 'Emergency') {
        agentResponseText = `🚨 **EMERGENCY TRIAGE ALERT DETECTED**\n${triage.triageReason}\n\nOur system has flagged your symptoms for urgent cardiac/emergency evaluation. If you are experiencing chest pain or difficulty breathing, please call 911 or head to our Emergency Room immediately.`;
      } else {
        agentResponseText = `I have analyzed your symptoms using Salesforce Agentforce Clinical Logic.\n\n- **Assigned Urgency Level:** ${triage.urgency}\n- **Matched Department:** ${triage.departmentName}\n- **Recommended Specialist:** ${triage.primaryDoctor.name} (${triage.primaryDoctor.qualification})`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `agent-${Date.now()}`,
          sender: 'agentforce',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: agentResponseText,
          triageData: triage,
          type: 'triage_result'
        }
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `agent-err-${Date.now()}`,
          sender: 'agentforce',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: '⚠️ An error occurred connecting to Salesforce Apex REST service. Please try again.'
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Confirm appointment creation
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!activeTriageResult || !patientForm.name || !patientForm.phone) return;

    setIsProcessing(true);

    try {
      const created = await salesforceService.createAppointment({
        patientName: patientForm.name,
        patientPhone: patientForm.phone,
        patientEmail: patientForm.email,
        doctorName: activeTriageResult.primaryDoctor.name,
        doctorId: activeTriageResult.primaryDoctor.id,
        department: activeTriageResult.departmentName,
        slotTime: selectedSlot,
        urgency: activeTriageResult.urgency,
        symptoms: activeTriageResult.apexPayload?.symptomsInput || 'Agentforce AI Triage'
      });

      setBookingConfirmed(created);
      setActiveTriageResult(null);

      setMessages((prev) => [
        ...prev,
        {
          id: `agent-conf-${Date.now()}`,
          sender: 'agentforce',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `🎉 **Appointment Locked in Salesforce!**\nAppointment ID: **${created.id}** has been generated and synced with Salesforce Custom Object \`Appointment__c\` (\`${created.sfId}\`).`,
          type: 'confirmation_card',
          appointmentRecord: created
        }
      ]);

    } catch (err) {
      alert('Failed to lock appointment in Salesforce.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyAppointmentId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMaximized
          ? 'inset-4 md:inset-10'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-full max-w-lg h-[650px] max-h-[85vh]'
      }`}
    >
      <div className="w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden glass-panel">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Agentforce Health Bot</h3>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                  Salesforce AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Live Apex REST Engine
              </p>
            </div>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAuditLogs(!showAuditLogs)}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                showAuditLogs ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
              title="Toggle Salesforce REST Payload Inspector"
            >
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">REST Logs</span>
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body Grid: Chat Log vs Audit Log Drawer */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Chat Conversation Container */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            
            {/* Quick Action Chips Bar */}
            <div className="pb-2 border-b border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Quick Action Triage Chips:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.query)}
                    className="text-[11px] font-medium bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300 px-2.5 py-1 rounded-full shadow-2xs transition-all text-left"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Feed */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {msg.sender === 'user' ? 'You (Patient)' : 'Agentforce AI'}
                  </span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[90%] sm:max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-md'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Render Confirmation Card if message has appointmentRecord */}
                  {msg.appointmentRecord && (
                    <div className="mt-3 p-3.5 bg-slate-900 text-white rounded-xl border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-mono text-cyan-400 font-bold">
                          CONFIRMED APPOINTMENT
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                          Salesforce Synced
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Appointment ID:</span>
                          <span className="font-extrabold text-white text-xs">{msg.appointmentRecord.id}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Patient Name:</span>
                          <span className="font-semibold text-slate-200">{msg.appointmentRecord.patientName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Specialist:</span>
                          <span className="font-semibold text-slate-200">{msg.appointmentRecord.doctorName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Scheduled Time:</span>
                          <span className="font-semibold text-emerald-400">{msg.appointmentRecord.date}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">
                          SF Object: Appointment__c ({msg.appointmentRecord.sfId})
                        </span>
                        <button
                          onClick={() => copyAppointmentId(msg.appointmentRecord.id)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded text-[10px] font-bold flex items-center gap-1"
                        >
                          {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedId ? 'Copied' : 'Copy ID'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Processing Loader */}
            {isProcessing && (
              <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
                <RefreshCw className="w-4 h-4 animate-spin text-sky-600" />
                <span>Agentforce executing Salesforce Apex REST Triage...</span>
              </div>
            )}

            {/* Active Triage Interactive Form Card */}
            {activeTriageResult && !bookingConfirmed && (
              <div className="bg-white rounded-2xl p-4 border-2 border-sky-300 shadow-md space-y-3">
                
                {/* Urgency Badge Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Stethoscope className="w-4 h-4 text-sky-600" />
                    Recommended Doctor Slot:
                  </span>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                      activeTriageResult.urgency === 'Emergency'
                        ? 'bg-rose-100 text-rose-700 border-rose-300 emergency-glow'
                        : activeTriageResult.urgency === 'High'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    Urgency: {activeTriageResult.urgency}
                  </span>
                </div>

                {/* Doctor Mini Profile */}
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <img
                    src={activeTriageResult.primaryDoctor.avatar}
                    alt="Doctor"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      {activeTriageResult.primaryDoctor.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {activeTriageResult.primaryDoctor.title} ({activeTriageResult.departmentName})
                    </p>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Fee: ${activeTriageResult.primaryDoctor.consultationFee}
                    </span>
                  </div>
                </div>

                {/* Slot Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Select Available Time Slot (Salesforce Locked):
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {activeTriageResult.primaryDoctor.availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                          selectedSlot === slot
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Information Input */}
                <form onSubmit={handleConfirmBooking} className="space-y-2 pt-2 border-t border-slate-100">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={patientForm.name}
                      onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-sky-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={patientForm.phone}
                      onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-sky-500 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={patientForm.email}
                      onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-sky-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-200" />
                    Lock Appointment in Salesforce
                  </button>
                </form>

              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Salesforce REST Audit Drawer (Toggleable) */}
          {showAuditLogs && (
            <div className="w-72 bg-slate-950 text-slate-200 p-3 border-l border-slate-800 flex flex-col font-mono text-[10px] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="font-bold text-sky-400 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> REST Audit Stream
                </span>
                <span className="text-slate-500 text-[9px]">{auditLogs.length} events</span>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold">{log.method} {log.status}</span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <div className="text-sky-300 truncate">{log.endpoint}</div>
                    
                    {log.soqlQuery && (
                      <div className="text-slate-400 bg-slate-950 p-1 rounded text-[9px] overflow-x-auto whitespace-pre-wrap">
                        SOQL: {log.soqlQuery}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Type your symptoms or question..."
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isProcessing}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
