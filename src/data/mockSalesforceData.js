export const DEPARTMENTS = [
  {
    id: 'dept-cardio',
    name: 'Cardiology',
    title: 'Cardiovascular Care',
    icon: 'Heart',
    salesforceCode: 'CARD_DEPT_01',
    description: 'Advanced heart monitoring, ECG diagnostics, angioplasty, and preventative cardiology care.',
    conditions: ['Chest Pain', 'Hypertension', 'Arrhythmia', 'Coronary Artery Disease'],
    doctorCount: 4,
    color: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics',
    title: 'Orthopedic & Joint Surgery',
    icon: 'Activity',
    salesforceCode: 'ORTH_DEPT_02',
    description: 'Expert joint replacement, sports injury rehabilitation, fracture care, and spinal wellness.',
    conditions: ['Joint Pain', 'Fractures', 'Arthritis', 'Ligament Tears'],
    doctorCount: 3,
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    id: 'dept-general',
    name: 'General Physician',
    title: 'Internal & General Medicine',
    icon: 'Stethoscope',
    salesforceCode: 'GEN_DEPT_03',
    description: 'Comprehensive primary care, annual health checkups, chronic disease management, and immunity.',
    conditions: ['Fever & Cold', 'Fatigue', 'Diabetes Management', 'Routine Wellness'],
    doctorCount: 6,
    color: 'from-sky-500 to-blue-600',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-200'
  },
  {
    id: 'dept-neuro',
    name: 'Neurology',
    title: 'Neurological Sciences',
    icon: 'Brain',
    salesforceCode: 'NEUR_DEPT_04',
    description: 'Cutting-edge diagnosis and treatment for migraines, neuropathy, stroke recovery, and epilepsy.',
    conditions: ['Severe Migraines', 'Nerve Pain', 'Memory Loss', 'Dizziness'],
    doctorCount: 3,
    color: 'from-purple-500 to-indigo-600',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'dept-pedia',
    name: 'Pediatrics',
    title: 'Pediatric & Child Health',
    icon: 'Baby',
    salesforceCode: 'PED_DEPT_05',
    description: 'Gentle, compassionate pediatric care, newborn screenings, vaccinations, and growth monitoring.',
    conditions: ['Childhood Fever', 'Vaccinations', 'Asthma in Children', 'Pediatric Growth'],
    doctorCount: 4,
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  }
];

export const DOCTORS = [
  {
    id: 'DOC-101',
    sfId: 'a008b000001XyZA0',
    name: 'Dr. Elena Rostova',
    title: 'Chief Cardiologist',
    department: 'Cardiology',
    deptId: 'dept-cardio',
    qualification: 'MD, FACC - Harvard Medical School',
    experienceYears: 14,
    rating: 4.95,
    reviewsCount: 328,
    avatar: '/assets/doctor_cardio.png',
    bio: 'Pioneer in non-invasive cardiac imaging and acute coronary syndrome intervention.',
    nextAvailableSlot: 'Today, 02:30 PM',
    availableSlots: ['02:30 PM', '04:15 PM', '05:30 PM', 'Tomorrow 10:00 AM'],
    consultationFee: 180
  },
  {
    id: 'DOC-102',
    sfId: 'a008b000001XyZB1',
    name: 'Dr. Marcus Vance',
    title: 'Senior Orthopedic Surgeon',
    department: 'Orthopedics',
    deptId: 'dept-ortho',
    qualification: 'MD, Ortho Board - Johns Hopkins',
    experienceYears: 11,
    rating: 4.88,
    reviewsCount: 245,
    avatar: '/assets/doctor_ortho.png',
    bio: 'Specializing in minimally invasive arthroscopic surgery and robotic joint restoration.',
    nextAvailableSlot: 'Today, 03:45 PM',
    availableSlots: ['03:45 PM', '05:00 PM', 'Tomorrow 09:30 AM', 'Tomorrow 11:15 AM'],
    consultationFee: 160
  },
  {
    id: 'DOC-103',
    sfId: 'a008b000001XyZC2',
    name: 'Dr. Sophia Chen',
    title: 'Lead Neurologist',
    department: 'Neurology',
    deptId: 'dept-neuro',
    qualification: 'MD, PhD Neuroscience - Stanford',
    experienceYears: 16,
    rating: 4.98,
    reviewsCount: 412,
    avatar: '/assets/doctor_neuro.png',
    bio: 'Expert in complex neurological disorders, chronic migraine therapy, and neuro-rehabilitation.',
    nextAvailableSlot: 'Today, 03:00 PM',
    availableSlots: ['03:00 PM', '05:30 PM', 'Tomorrow 02:00 PM'],
    consultationFee: 200
  },
  {
    id: 'DOC-104',
    sfId: 'a008b000001XyZD3',
    name: 'Dr. Sarah Jenkins',
    title: 'Pediatric Care Director',
    department: 'Pediatrics',
    deptId: 'dept-pedia',
    qualification: 'MD Pediatrics - Yale Medicine',
    experienceYears: 9,
    rating: 4.92,
    reviewsCount: 198,
    avatar: '/assets/doctor_pedia.png',
    bio: 'Dedicated to empathetic child care, developmental tracking, and pediatric emergency triage.',
    nextAvailableSlot: 'Today, 02:00 PM',
    availableSlots: ['02:00 PM', '04:00 PM', 'Tomorrow 10:30 AM'],
    consultationFee: 140
  },
  {
    id: 'DOC-105',
    sfId: 'a008b000001XyZE4',
    name: 'Dr. David Miller',
    title: 'Senior General Physician',
    department: 'General Physician',
    deptId: 'dept-general',
    qualification: 'MD Internal Medicine - Columbia Univ',
    experienceYears: 12,
    rating: 4.85,
    reviewsCount: 310,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Focuses on preventative health checkups, metabolic health, and acute illness diagnostics.',
    nextAvailableSlot: 'Today, 01:30 PM',
    availableSlots: ['01:30 PM', '04:00 PM', 'Tomorrow 09:00 AM', 'Tomorrow 03:15 PM'],
    consultationFee: 120
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-8921',
    sfId: 'a018b00000XyZ12',
    patientName: 'Michael Thorne',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'm.thorne@example.com',
    doctorName: 'Dr. Elena Rostova',
    doctorId: 'DOC-101',
    department: 'Cardiology',
    date: 'Today, 02:30 PM',
    urgency: 'Moderate',
    urgencyColor: 'amber',
    status: 'Confirmed',
    symptoms: 'Occasional tightness in chest during moderate workout',
    createdAt: '2026-09-25T09:15:00Z',
    sfSyncStatus: 'Synced'
  },
  {
    id: 'APT-8922',
    sfId: 'a018b00000XyZ13',
    patientName: 'Emma Roberts',
    patientPhone: '+1 (555) 987-6543',
    patientEmail: 'emma.r@example.com',
    doctorName: 'Dr. Marcus Vance',
    doctorId: 'DOC-102',
    department: 'Orthopedics',
    date: 'Tomorrow, 10:00 AM',
    urgency: 'Normal',
    urgencyColor: 'emerald',
    status: 'Confirmed',
    symptoms: 'Post-knee surgery routine checkup and mobility review',
    createdAt: '2026-09-24T14:20:00Z',
    sfSyncStatus: 'Synced'
  }
];

export const PRESET_CHIPS = [
  { label: '🚨 Chest Pain Triage', query: 'I am experiencing severe chest tightness and shortness of breath.' },
  { label: '🩺 Book General Physician', query: 'I need to schedule a consultation with a General Physician for high fever.' },
  { label: '🦴 Joint & Bone Consultation', query: 'I injured my ankle during sports and need an Orthopedic specialist.' },
  { label: '👶 Pediatric Fever Check', query: 'My 5-year-old child has a high fever of 102°F and coughing.' },
  { label: '📅 Check Appointment Status', query: 'Can I check the status of my appointment APT-8921?' },
  { label: '⚡ Live Salesforce Rest Sync', query: 'Show Salesforce Agentforce connection status and active custom objects.' }
];

export const SALESFORCE_OBJECT_MAPPINGS = {
  Patient__c: {
    label: 'Patient (Patient__c)',
    fields: ['Id', 'First_Name__c', 'Last_Name__c', 'Email__c', 'Phone__c', 'DOB__c', 'Emergency_Contact__c']
  },
  Doctor__c: {
    label: 'Doctor (Doctor__c)',
    fields: ['Id', 'Full_Name__c', 'Department__c', 'Specialization__c', 'Rating__c', 'Is_Active__c']
  },
  Doctor_Schedule__c: {
    label: 'Doctor Schedule (Doctor_Schedule__c)',
    fields: ['Id', 'Doctor__c', 'Shift_Date__c', 'Slot_Time__c', 'Is_Available__c', 'Max_Capacity__c']
  },
  Appointment__c: {
    label: 'Appointment (Appointment__c)',
    fields: ['Id', 'Appointment_Number__c', 'Patient__c', 'Doctor__c', 'Urgency_Level__c', 'Symptoms_Summary__c', 'Status__c', 'Scheduled_Slot__c']
  }
};
