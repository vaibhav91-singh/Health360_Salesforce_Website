import React from 'react';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Brain, 
  Baby, 
  ArrowUpRight, 
  CheckCircle,
  Users,
  Sparkles,
  Bot
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockSalesforceData';

const iconMap = {
  Heart: Heart,
  Activity: Activity,
  Stethoscope: Stethoscope,
  Brain: Brain,
  Baby: Baby
};

export default function Specialties({ onSelectSpecialty, onOpenChat }) {
  return (
    <section id="departments" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Specialized Medical Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Core Clinical Departments
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            HealthFirst Clinic operates 5 specialized centers of excellence, integrated directly with Salesforce Custom Object <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono font-bold">Doctor_Schedule__c</code>.
          </p>
        </div>

        {/* Grid of 5 Specialties */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Stethoscope;

            return (
              <div
                key={dept.id}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${dept.badgeColor}`}>
                      {dept.name}
                    </span>
                  </div>

                  {/* Title & SF Code */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {dept.title}
                  </h3>
                  
                  <p className="mt-1 text-xs font-mono text-slate-500">
                    SF Code: <span className="text-sky-700 font-semibold">{dept.salesforceCode}</span>
                  </p>

                  <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Conditions Treated Chips */}
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Key Conditions Treated:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.conditions.map((cond, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-slate-700 text-[11px] px-2.5 py-1 rounded-md border border-slate-200 font-medium"
                        >
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>{dept.doctorCount} Active Specialists</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectSpecialty(dept.name);
                      onOpenChat(`I need to book an appointment for ${dept.name}`);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Book via AI</span>
                    <Bot className="w-3.5 h-3.5 text-cyan-500" />
                  </button>
                </div>

              </div>
            );
          })}

          {/* 6th Card: AI Triage Assistant Promo Card */}
          <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-2xl p-6 border border-sky-800/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold mb-5 shadow-lg">
                <Bot className="w-7 h-7" />
              </div>

              <span className="bg-cyan-400/20 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Salesforce Agentforce Bot
              </span>

              <h3 className="text-xl font-bold text-white mt-3">
                Unsure Which Specialist You Need?
              </h3>

              <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
                Describe your symptoms to our interactive Salesforce Agentforce AI assistant. It analyzes clinical severity, maps to the right department, and auto-reserves a doctor slot.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => onOpenChat()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-slate-900" />
                Start Instant AI Triage
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
