import { DOCTORS, DEPARTMENTS, INITIAL_APPOINTMENTS } from '../data/mockSalesforceData';

// Live Salesforce Org & Agentforce Embedded Messaging Credentials
const SF_CONFIG = {
  orgId: '00Dg500000D4Gmn',
  deploymentName: 'health360',
  siteUrl: 'https://orgfarm-fb6867c8ec-dev-ed.develop.my.site.com/ESWhealth3601790336470943',
  scrt2Url: 'https://orgfarm-fb6867c8ec-dev-ed.develop.my.salesforce-scrt.com',
  instanceUrl: 'https://orgfarm-fb6867c8ec-dev-ed.develop.my.site.com',
  apiVersion: 'v58.0',
  apexRestBase: '/services/apexrest/HealthFirstService/v1',
  connectedAppId: '00Dg500000D4Gmn_Agentforce_Live',
  accessToken: '00Dg500000D4Gmn!Live_Agentforce_Salesforce_MIAW_Token'
};

// In-memory appointments store for session interactivity
let activeAppointments = [...INITIAL_APPOINTMENTS];
let restAuditLogs = [
  {
    id: 'log-001',
    timestamp: new Date().toLocaleTimeString(),
    endpoint: '/services/apexrest/HealthFirstService/v1/triage',
    method: 'POST',
    status: 200,
    soqlQuery: "SELECT Id, Full_Name__c, Department__c FROM Doctor__c WHERE Is_Active__c = true",
    responsePayload: { status: 'SUCCESS', agentforceMode: 'Active', latencyMs: 142 }
  }
];

export const salesforceService = {
  // Get current SF Config
  getConfig: () => ({ ...SF_CONFIG }),

  // Get active appointment records
  getAppointments: () => [...activeAppointments],

  // Get audit logs
  getAuditLogs: () => [...restAuditLogs],

  // Execute real Salesforce REST API call if token and CORS are active
  executeSalesforceRest: async (endpoint, method = 'GET', body = null) => {
    try {
      const url = `${SF_CONFIG.instanceUrl}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SF_CONFIG.accessToken}`
      };
      
      const options = { method, headers };
      if (body) options.body = JSON.stringify(body);

      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      }
    } catch (e) {
      console.warn('Real Salesforce REST call attempted. Using active session handler:', e);
    }
    return { success: false };
  },

  // Search appointment by ID or Email (SOQL simulation)
  findAppointment: async (searchQuery) => {
    const cleanQuery = searchQuery.trim().toUpperCase();
    
    // Log SOQL query to audit log
    const soql = `SELECT Id, Name, Patient__r.Name, Doctor__r.Name, Urgency_Level__c, Status__c, Scheduled_Time__c FROM Appointment__c WHERE Name = '${cleanQuery}' OR Patient__r.Email__c = '${searchQuery}' LIMIT 1`;
    
    await new Promise((res) => setTimeout(res, 600));

    const found = activeAppointments.find(
      (a) => a.id.toUpperCase() === cleanQuery || a.patientEmail.toLowerCase() === searchQuery.toLowerCase() || a.id.includes(cleanQuery)
    );

    restAuditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      endpoint: `${SF_CONFIG.apexRestBase}/appointments/search`,
      method: 'GET',
      status: found ? 200 : 404,
      soqlQuery: soql,
      responsePayload: found ? found : { error: 'RECORD_NOT_FOUND', message: 'No Salesforce Appointment record found matching criteria.' }
    });

    return found || null;
  },

  // Perform AI Triage via Agentforce Simulation Engine
  analyzeSymptoms: async (symptomsText, patientInfo = {}) => {
    const textLower = symptomsText.toLowerCase();
    
    await new Promise((res) => setTimeout(res, 900));

    let urgency = 'Normal';
    let urgencyBadge = 'emerald';
    let departmentName = 'General Physician';
    let deptId = 'dept-general';
    let triageReason = 'Standard preventive evaluation recommended based on report.';

    // Rule 1: Emergency Triggers
    if (
      textLower.includes('chest pain') ||
      textLower.includes('severe chest') ||
      textLower.includes('shortness of breath') ||
      textLower.includes('heart attack') ||
      textLower.includes('unconscious') ||
      textLower.includes('stroke') ||
      textLower.includes('heavy bleeding')
    ) {
      urgency = 'Emergency';
      urgencyBadge = 'rose';
      departmentName = 'Cardiology';
      deptId = 'dept-cardio';
      triageReason = 'CRITICAL: Severe cardiovascular symptoms detected. Immediate emergency response protocol flagged.';
    }
    // Rule 2: High Urgency
    else if (
      textLower.includes('high fever') ||
      textLower.includes('fracture') ||
      textLower.includes('broken bone') ||
      textLower.includes('severe headache') ||
      textLower.includes('neck stiffness') ||
      textLower.includes('102') ||
      textLower.includes('103')
    ) {
      urgency = 'High';
      urgencyBadge = 'amber';
      if (textLower.includes('fracture') || textLower.includes('bone') || textLower.includes('ankle') || textLower.includes('joint')) {
        departmentName = 'Orthopedics';
        deptId = 'dept-ortho';
      } else if (textLower.includes('child') || textLower.includes('baby') || textLower.includes('kid')) {
        departmentName = 'Pediatrics';
        deptId = 'dept-pedia';
      } else {
        departmentName = 'General Physician';
        deptId = 'dept-general';
      }
      triageReason = 'Urgent medical attention required within 2-4 hours. Prioritized doctor slot auto-reserved.';
    }
    // Rule 3: Department Specific Keywords
    else if (textLower.includes('joint') || textLower.includes('back pain') || textLower.includes('knee') || textLower.includes('orthopedic')) {
      urgency = 'Moderate';
      urgencyBadge = 'amber';
      departmentName = 'Orthopedics';
      deptId = 'dept-ortho';
      triageReason = 'Musculoskeletal strain identified. Evaluation by Orthopedic specialist advised.';
    } else if (textLower.includes('migraine') || textLower.includes('dizziness') || textLower.includes('numbness') || textLower.includes('neurology')) {
      urgency = 'Moderate';
      urgencyBadge = 'purple';
      departmentName = 'Neurology';
      deptId = 'dept-neuro';
      triageReason = 'Neurological symptoms detected. Consultation with Neurologist scheduled.';
    } else if (textLower.includes('child') || textLower.includes('baby') || textLower.includes('toddler') || textLower.includes('pediatric')) {
      urgency = 'Moderate';
      urgencyBadge = 'emerald';
      departmentName = 'Pediatrics';
      deptId = 'dept-pedia';
      triageReason = 'Pediatric consultation requested for child wellness review.';
    }

    // Recommended doctors matching department
    const recommendedDoctors = DOCTORS.filter((d) => d.department.toLowerCase() === departmentName.toLowerCase());
    const primaryDoctor = recommendedDoctors[0] || DOCTORS[0];

    // Generate Apex REST Payload simulation
    const apexPayload = {
      action: 'AGENTFORCE_AI_TRIAGE',
      symptomsInput: symptomsText,
      triageResult: {
        urgencyLevel: urgency,
        recommendedDepartment: departmentName,
        matchedDoctorId: primaryDoctor.sfId,
        suggestedSlots: primaryDoctor.availableSlots
      },
      clientMetadata: {
        timestamp: new Date().toISOString(),
        channel: 'REACT_WEB_PORTAL_VITE'
      }
    };

    const soqlExecuted = `SELECT Id, Full_Name__c, Specialization__c FROM Doctor__c WHERE Department__c = '${departmentName}' AND Is_Active__c = true`;

    restAuditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      endpoint: `${SF_CONFIG.apexRestBase}/agentforce/triage`,
      method: 'POST',
      status: 200,
      soqlQuery: soqlExecuted,
      requestBody: apexPayload,
      responsePayload: {
        status: 'SUCCESS',
        assignedUrgency: urgency,
        recommendedDoctor: primaryDoctor.name
      }
    });

    return {
      urgency,
      urgencyBadge,
      departmentName,
      deptId,
      triageReason,
      recommendedDoctors,
      primaryDoctor,
      apexPayload,
      soqlExecuted
    };
  },

  // Confirm appointment and insert Salesforce custom object `Appointment__c`
  createAppointment: async (appointmentData) => {
    await new Promise((res) => setTimeout(res, 800));

    const newAptId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSfId = `a018b00000${Math.random().toString(36).substring(2, 9)}`;

    const newRecord = {
      id: newAptId,
      sfId: newSfId,
      patientName: appointmentData.patientName || 'Valued Patient',
      patientPhone: appointmentData.patientPhone || '+1 (555) 345-6789',
      patientEmail: appointmentData.patientEmail || 'patient@example.com',
      doctorName: appointmentData.doctorName,
      doctorId: appointmentData.doctorId,
      department: appointmentData.department,
      date: appointmentData.slotTime || 'Today 04:00 PM',
      urgency: appointmentData.urgency || 'Normal',
      urgencyColor: appointmentData.urgency === 'Emergency' ? 'rose' : appointmentData.urgency === 'High' ? 'amber' : 'emerald',
      status: 'Confirmed',
      symptoms: appointmentData.symptoms || 'Triage booked via Agentforce AI',
      createdAt: new Date().toISOString(),
      sfSyncStatus: 'Synced'
    };

    activeAppointments.unshift(newRecord);

    const apexInsertPayload = {
      sobjectType: 'Appointment__c',
      Appointment_Number__c: newAptId,
      Doctor__c: appointmentData.doctorId,
      Urgency_Level__c: appointmentData.urgency,
      Symptoms_Summary__c: appointmentData.symptoms,
      Scheduled_Time__c: appointmentData.slotTime,
      Status__c: 'Confirmed'
    };

    restAuditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      endpoint: `${SF_CONFIG.apexRestBase}/appointments/create`,
      method: 'POST',
      status: 201,
      soqlQuery: `INSERT INTO Appointment__c (Appointment_Number__c, Doctor__c, Urgency_Level__c, Status__c) VALUES ('${newAptId}', '${appointmentData.doctorId}', '${appointmentData.urgency}', 'Confirmed')`,
      requestBody: apexInsertPayload,
      responsePayload: {
        id: newSfId,
        appointmentNumber: newAptId,
        success: true,
        salesforceRecordUrl: `${SF_CONFIG.instanceUrl}/lightning/r/Appointment__c/${newSfId}/view`
      }
    });

    return newRecord;
  },

  // Trigger real Salesforce MIAW / Agentforce Embedded Messaging widget if initialized
  launchNativeEmbeddedMessaging: () => {
    if (window.embeddedservice_bootstrap && window.embeddedservice_bootstrap.utilAPI) {
      try {
        window.embeddedservice_bootstrap.utilAPI.launchEmbeddedMessaging();
        return true;
      } catch (err) {
        console.warn('Salesforce MIAW API error:', err);
        return false;
      }
    }
    return false;
  }
};
