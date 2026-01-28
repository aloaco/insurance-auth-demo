import { getRelativeDate } from '../utils/date';
import avatarSarahMitchell from '../assets/avatar-sarah-mitchell.png';
import avatarJamesRodriguez from '../assets/avatar-james-rodriguez.png';
import avatarEmilyChen from '../assets/avatar-emily-chen.png';
import avatarRobertKim from '../assets/avatar-robert-kim.png';

export const initialAuthRecords = [
  {
    id: 1,
    patientName: 'Sarah Mitchell',
    avatar: avatarSarahMitchell,
    insurance: 'UnitedHealthcare',
    status: 'Approved',
    lastUpdated: getRelativeDate(10),
    procedure: 'MRI Lumbar Spine'
  },
  {
    id: 2,
    patientName: 'James Rodriguez',
    avatar: avatarJamesRodriguez,
    insurance: 'Aetna',
    status: 'Pending',
    lastUpdated: getRelativeDate(7),
    procedure: 'CT Abdomen'
  },
  {
    id: 3,
    patientName: 'Emily Chen',
    avatar: avatarEmilyChen,
    insurance: 'Blue Cross',
    status: 'Needs Peer-to-Peer',
    lastUpdated: getRelativeDate(1),
    procedure: 'Humira Injection',
    peerToPeer: {
      scheduledDate: '2026-01-05',
      scheduledTime: '2:30 PM EST',
      reviewerName: 'Dr. Michael Roberts',
      reviewerSpecialty: 'Rheumatology',
      phoneNumber: '1-800-555-5555',
      caseNumber: 'P2P-2025-78432',
      talkingPoints: [
        'Patient has failed methotrexate therapy for 6+ months with documented side effects',
        'Current disease activity score (DAS28) of 5.1 indicates high disease activity',
        'Joint erosions visible on recent X-rays indicate progressive disease',
        'Humira is FDA-approved for moderate-to-severe RA after inadequate response to DMARDs.',
        'Early biologic intervention shown to prevent irreversible joint damage',
        'Patient has no contraindications to TNF-inhibitor therapy'
      ],
      clinicalNotes:
        'Patient diagnosed with RA 2 years ago. Failed conventional DMARDs. Significant morning stiffness (>1 hour), elevated CRP and ESR.'
    }
  },
  {
    id: 4,
    patientName: 'Robert Kim',
    avatar: avatarRobertKim,
    insurance: 'Medicare',
    status: 'Denied',
    lastUpdated: getRelativeDate(0),
    procedure: 'Spinal Fusion Surgery',
    denial: {
      denialCode: 'MED-2025-11234',
      denialReason:
        'Documentation does not demonstrate failure of conservative treatment for minimum 6-week period as required by LCD 37848.',
      appealDeadline: '2026-01-28',
      requiredForResubmission: [
        'Physical therapy progress notes showing 6+ weeks of treatment',
        'Documentation of failed oral medication trial (NSAIDs, muscle relaxants)',
        'Updated functional assessment scores (ODI or similar)',
        'Confirmation of epidural steroid injection trial'
      ],
      phoneNumber: '1-800-MEDICARE',
      appealFaxNumber: '1-800-555-5555',
      disputeScript: [
        'Reference case number MED-2025-11234 for spinal fusion prior authorization',
        'Patient has completed 8 weeks of physical therapy with documented lack of improvement',
        'Request expedited review based on progressive neurological symptoms',
        'Ask for specific documentation requirements for appeal submission'
      ]
    }
  }
];

export const documentQuestions = [
  {
    field: 'prior_treatment',
    question:
      'What conservative treatments has the patient tried? Please include duration and outcomes.'
  },
  { field: 'diagnosis_duration', question: 'How long has the patient had this diagnosis?' },
  {
    field: 'procedure_details',
    question:
      'Please specify the exact procedure, including approach, dosage if applicable, and frequency.'
  }
];
