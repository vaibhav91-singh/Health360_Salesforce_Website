import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  RefreshCw, 
  Copy, 
  Check, 
  Layers, 
  FileCode, 
  Server,
  Zap
} from 'lucide-react';
import { SALESFORCE_OBJECT_MAPPINGS } from '../data/mockSalesforceData';
import { salesforceService } from '../services/salesforceService';

export default function SalesforceDebugger({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('objects'); // 'objects' | 'apex' | 'audit' | 'config'
  const [copiedCode, setCopiedCode] = useState(false);
  const [customSoql, setCustomSoql] = useState("SELECT Id, Name, Doctor__r.Full_Name__c, Urgency_Level__c FROM Appointment__c WHERE Status__c = 'Confirmed'");
  const [soqlResult, setSoqlResult] = useState(null);

  const sfConfig = salesforceService.getConfig();
  const auditLogs = salesforceService.getAuditLogs();

  if (!isOpen) return null;

  const sampleApexCode = `@RestResource(urlMapping='/HealthFirstService/v1/*')
global with sharing class HealthFirstApexREST {

    // POST /services/apexrest/HealthFirstService/v1/agentforce/triage
    @HttpPost
    global static TriageResponse processAgentforceTriage() {
        RestRequest req = RestContext.request;
        String requestBody = req.requestBody.toString();
        
        // Parse incoming Agentforce AI payload
        TriageRequest payload = (TriageRequest) JSON.deserialize(requestBody, TriageRequest.class);
        
        // SOQL Query for Available Doctors in Department
        List<Doctor__c> activeDocs = [
            SELECT Id, Full_Name__c, Department__c, Specialization__c, Rating__c 
            FROM Doctor__c 
            WHERE Department__c = :payload.triageResult.recommendedDepartment 
            AND Is_Active__c = true
            LIMIT 5
        ];

        TriageResponse resp = new TriageResponse();
        resp.status = 'SUCCESS';
        resp.matchedDoctors = activeDocs;
        resp.assignedUrgency = payload.triageResult.urgencyLevel;
        return resp;
    }
    
    global class TriageRequest {
        public String symptomsInput;
        public TriageDetail triageResult;
    }
    
    global class TriageDetail {
        public String urgencyLevel;
        public String recommendedDepartment;
    }
    
    global class TriageResponse {
        public String status;
        public String assignedUrgency;
        public List<Doctor__c> matchedDoctors;
    }
}`;

  const handleRunSoql = () => {
    setSoqlResult([
      { Id: 'a018b00000XyZ12', Name: 'APT-8921', Doctor__r_Full_Name__c: 'Dr. Elena Rostova', Urgency_Level__c: 'Moderate', Status__c: 'Confirmed' },
      { Id: 'a018b00000XyZ13', Name: 'APT-8922', Doctor__r_Full_Name__c: 'Dr. Marcus Vance', Urgency_Level__c: 'Normal', Status__c: 'Confirmed' }
    ]);
  };

  const handleCopyApex = () => {
    navigator.clipboard.writeText(sampleApexCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="w-full max-w-5xl h-[85vh] bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Salesforce Architecture & REST Inspector</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Direct REST Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Inspect Custom Object schemas, Apex REST endpoints, and SOQL query payloads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('objects')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'objects' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Custom Object Schemas
          </button>

          <button
            onClick={() => setActiveTab('apex')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'apex' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Apex REST Controller
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'audit' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            SOQL & REST Log Stream
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'config' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            Connected App Config
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: Custom Object Schemas */}
          {activeTab === 'objects' && (
            <div className="space-y-6">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                <p className="font-semibold text-sky-400 mb-1">💡 Salesforce Custom Object Data Architecture</p>
                HealthFirst Clinic connects React state directly with Salesforce custom objects via REST API without any Node.js intermediate middleware.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(SALESFORCE_OBJECT_MAPPINGS).map(([objName, objDef]) => (
                  <div key={objName} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-bold text-sm text-cyan-300">{objDef.label}</span>
                      <span className="text-[10px] font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                        {objName}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Mapped API Fields:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {objDef.fields.map((field) => (
                          <span key={field} className="font-mono text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Apex REST Controller */}
          {activeTab === 'apex' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">Salesforce Apex REST Resource Handler</h4>
                  <p className="text-xs text-slate-400">Endpoint: <code className="text-sky-300">{sfConfig.apexRestBase}/agentforce/triage</code></p>
                </div>
                <button
                  onClick={handleCopyApex}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedCode ? 'Apex Code Copied' : 'Copy Apex Class'}
                </button>
              </div>

              <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>{sampleApexCode}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: SOQL & REST Audit Logs */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* SOQL Query Playground */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-sky-400 uppercase tracking-wider">
                  Interactive SOQL Query Tester
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customSoql}
                    onChange={(e) => setCustomSoql(e.target.value)}
                    className="flex-1 bg-slate-900 text-slate-200 font-mono text-xs p-2.5 rounded-lg border border-slate-700 outline-none focus:border-sky-500"
                  />
                  <button
                    onClick={handleRunSoql}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Zap className="w-4 h-4" /> Run SOQL
                  </button>
                </div>

                {soqlResult && (
                  <div className="mt-3 bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                    <pre>{JSON.stringify(soqlResult, null, 2)}</pre>
                  </div>
                )}
              </div>

              {/* Audit Stream list */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
                  Live REST API Call Log History ({auditLogs.length}):
                </h4>
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 font-mono">
                        [{log.method}] {log.endpoint}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">{log.timestamp}</span>
                    </div>

                    <p className="text-slate-300 font-mono text-xs bg-slate-900 p-2 rounded">
                      SOQL: {log.soqlQuery}
                    </p>

                    {log.requestBody && (
                      <div className="text-[11px] text-sky-300 font-mono bg-slate-900/60 p-2 rounded">
                        Payload: {JSON.stringify(log.requestBody)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Connected App Credentials */}
          {activeTab === 'config' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs">
              <h4 className="font-bold text-sm text-white">Salesforce Connected App Credentials</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Salesforce Instance URL:</span>
                  <span className="text-sky-300 font-semibold">{sfConfig.instanceUrl}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">API Version:</span>
                  <span className="text-sky-300 font-semibold">{sfConfig.apiVersion}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Connected App Consumer Key:</span>
                  <span className="text-sky-300 font-semibold">{sfConfig.connectedAppId}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">OAuth 2.0 Bearer Token:</span>
                  <span className="text-emerald-400 font-semibold truncate block">{sfConfig.accessToken}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
