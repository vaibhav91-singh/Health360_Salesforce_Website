import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Bot, 
  Filter,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { DOCTORS } from '../data/mockSalesforceData';

export default function Doctors({ onBookDoctor, onOpenChat }) {
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredDoctors = selectedDept === 'All' 
    ? DOCTORS 
    : DOCTORS.filter((d) => d.department.toLowerCase() === selectedDept.toLowerCase());

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5 text-sky-600" />
              Board Certified Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Clinical Specialists
            </h2>
            <p className="mt-1 text-slate-600 text-sm max-w-xl">
              Real-time schedule availability synced directly with Salesforce <code className="text-sky-700 bg-sky-50 px-1 rounded font-mono font-bold">Doctor_Schedule__c</code> object.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {['All', 'Cardiology', 'Orthopedics', 'General Physician', 'Neurology', 'Pediatrics'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedDept === dept
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Portrait Header */}
                <div className="relative h-64 bg-gradient-to-b from-sky-50 to-slate-100 overflow-hidden">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-md flex items-center gap-1 border border-slate-100">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{doctor.rating}</span>
                    <span className="text-slate-400 font-normal">({doctor.reviewsCount})</span>
                  </div>

                  {/* SF ID Badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 border border-slate-700">
                    SF ID: {doctor.sfId}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  
                  {/* Department Pill */}
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    {doctor.department}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {doctor.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium">
                    {doctor.qualification} • <span className="text-slate-700 font-semibold">{doctor.experienceYears} Years Exp</span>
                  </p>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {doctor.bio}
                  </p>

                  {/* Next Slot & Fee Info */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-600" /> Next Available Slot:
                      </span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {doctor.nextAvailableSlot}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500">Consultation Fee:</span>
                      <span className="font-bold text-slate-900">${doctor.consultationFee}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    if (onBookDoctor) onBookDoctor(doctor);
                    onOpenChat(`Book appointment with ${doctor.name} (${doctor.department})`);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 group-hover:bg-sky-600"
                >
                  <Bot className="w-4 h-4 text-cyan-300" />
                  Book Slot via Agentforce
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
