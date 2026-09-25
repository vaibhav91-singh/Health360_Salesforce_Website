import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Bot,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { salesforceService } from '../services/salesforceService';

export default function AppointmentModal({ isOpen, onClose, initialSearch = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState('lookup'); // 'lookup' | 'all'
  const [isSearching, setIsSearching] = useState(false);
  const [foundAppointment, setFoundAppointment] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAllAppointments(salesforceService.getAppointments());
      if (initialSearch) {
        setSearchQuery(initialSearch);
        handleSearch(initialSearch);
      }
    }
  }, [isOpen, initialSearch]);

  if (!isOpen) return null;

  const handleSearch = async (queryToSearch = null) => {
    const q = queryToSearch !== null ? queryToSearch : searchQuery;
    if (!q.trim()) return;

    setIsSearching(true);
    setFoundAppointment(null);

    try {
      const res = await salesforceService.findAppointment(q);
      setFoundAppointment(res);
    } catch (err) {
      setFoundAppointment(null);
    } finally {
      setIsSearching(false);
    }
  };

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Patient Appointment Manager</h3>
              <p className="text-xs text-slate-400">Salesforce Custom Object: <code className="text-cyan-300">Appointment__c</code></p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-slate-200 px-6 pt-3 bg-slate-50 gap-4">
          <button
            onClick={() => setActiveTab('lookup')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'lookup'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Lookup by APT ID / Email
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            All Active Portal Records ({allAppointments.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          
          {/* TAB 1: Lookup */}
          {activeTab === 'lookup' && (
            <div className="space-y-6">
              
              {/* Search Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Appointment ID (e.g. APT-8921) or Email..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-sky-500 outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {isSearching ? 'Searching...' : 'Search Record'}
                </button>
              </form>

              {/* Found Record Display */}
              {foundAppointment ? (
                <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-cyan-400">{foundAppointment.id}</span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    </div>

                    <button
                      onClick={() => copyId(foundAppointment.id)}
                      className="px-2.5 py-1 bg-slate-800 text-sky-300 text-xs font-bold rounded flex items-center gap-1 hover:bg-slate-700"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId ? 'Copied' : 'Copy ID'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Patient Name:</span>
                      <span className="font-semibold text-slate-100">{foundAppointment.patientName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Patient Email / Phone:</span>
                      <span className="font-semibold text-slate-100">{foundAppointment.patientEmail} ({foundAppointment.patientPhone})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Assigned Specialist:</span>
                      <span className="font-semibold text-sky-300">{foundAppointment.doctorName} ({foundAppointment.department})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Scheduled Time:</span>
                      <span className="font-bold text-emerald-400">{foundAppointment.date}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block">Symptoms / Clinical Summary:</span>
                      <span className="font-medium text-slate-300 bg-slate-950 p-2 rounded block mt-1">
                        {foundAppointment.symptoms}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Salesforce Record ID: <strong className="text-cyan-400">{foundAppointment.sfId}</strong></span>
                    <span className="text-emerald-400 font-bold">SOQL Sync Verified</span>
                  </div>
                </div>
              ) : searchQuery && !isSearching ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="font-bold text-slate-800 text-sm">No Salesforce Appointment Record Found</p>
                  <p className="text-xs text-slate-500">
                    Double check the Appointment ID format (e.g., APT-8921) or try booking a new slot via Agentforce.
                  </p>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Enter an Appointment ID like <strong className="text-sky-600">APT-8921</strong> above to verify live Salesforce record status.
                </div>
              )}

            </div>
          )}

          {/* TAB 2: All Active Portal Records */}
          {activeTab === 'all' && (
            <div className="space-y-3">
              {allAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{apt.id}</span>
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                        {apt.department}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {apt.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      Patient: <strong className="text-slate-800">{apt.patientName}</strong> • Doctor: <strong className="text-slate-800">{apt.doctorName}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Scheduled: <span className="font-bold text-emerald-600">{apt.date}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right font-mono text-[10px] text-slate-500">
                    <div>SF ID: {apt.sfId}</div>
                    <button
                      onClick={() => copyId(apt.id)}
                      className="mt-1 text-sky-600 hover:underline font-bold"
                    >
                      Copy ID
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
