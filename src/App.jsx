import { useEffect, useRef, useState } from 'react';
import { documentQuestions, initialAuthRecords } from './data/authData';
import DashboardView from './views/DashboardView';
import NewAuthWizard from './views/NewAuthWizard';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [authRecords, setAuthRecords] = useState(initialAuthRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [step, setStep] = useState(1);
  const [patientName, setPatientName] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [documentData, setDocumentData] = useState({
    prior_treatment: null,
    diagnosis_duration: null,
    procedure_details: null
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [highlightedField, setHighlightedField] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisStage, setAnalysisStage] = useState('');

  const chatEndRef = useRef(null);
  const docScrollRef = useRef(null);
  const fieldRefs = {
    prior_treatment: useRef(null),
    diagnosis_duration: useRef(null),
    procedure_details: useRef(null)
  };

  const isComplete = Object.values(documentData).every((value) => value !== null);
  const currentField = documentQuestions[currentQuestionIndex]?.field ?? null;

  const actionNeededRecords = authRecords.filter(
    (record) => record.status === 'Needs Peer-to-Peer' || record.status === 'Denied'
  );
  const deniedCount = authRecords.filter((record) => record.status === 'Denied').length;
  const peerToPeerCount = authRecords.filter(
    (record) => record.status === 'Needs Peer-to-Peer'
  ).length;
  const approvedCount = authRecords.filter((record) => record.status === 'Approved').length;
  const pendingCount = authRecords.filter((record) => record.status === 'Pending').length;
  const approvalRate =
    authRecords.length > 0 ? Math.round((approvedCount / authRecords.length) * 100) : 0;

  const dashboardStats = [
    {
      label: 'Action Needed',
      value: actionNeededRecords.length,
      subtitle: `${deniedCount} denied · ${peerToPeerCount} peer review`,
      valueClassName: 'text-[#dc2626]'
    },
    {
      label: 'Pending Review',
      value: pendingCount,
      subtitle: 'Awaiting insurance response',
      valueClassName: 'text-[#ca8a04]'
    },
    {
      label: 'Total Requests',
      value: authRecords.length,
      subtitle: `${approvedCount} approved this period`,
      valueClassName: 'text-[#1a1a1a]'
    },
    {
      label: 'Approval Rate',
      value: approvalRate,
      suffix: '%',
      subtitle: approvalRate >= 90 ? 'Meeting target rate' : 'Below target rate',
      valueClassName: 'text-[#7c3aed]'
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  useEffect(() => {
    if (currentField && fieldRefs[currentField]?.current && docScrollRef.current) {
      const container = docScrollRef.current;
      const element = fieldRefs[currentField].current;
      const scrollTop = element.offsetTop - container.offsetTop - 100;
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [currentField]);

  const simulateFileUpload = (fileName = 'clinical_notes.pdf', fileSize = '2.4 MB') => {
    setUploadProgress('uploading');
    setTimeout(() => {
      setUploadProgress('processing');
      setTimeout(() => {
        setUploadProgress(null);
        setUploadedFile({ name: fileName, size: fileSize });
      }, 2000);
    }, 1500);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      simulateFileUpload(file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB`);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAnalysis = () => {
    setStep(3);
    setIsAnalyzing(true);
    const stages = [
      'Extracting clinical data...',
      `Reviewing ${selectedInsurance} requirements...`,
      'Identifying documentation gaps...',
      'Preparing authorization checklist...'
    ];
    const stageIntervalMs = 2200;
    const totalStageDurationMs = stageIntervalMs * stages.length + 500;
    let stageIndex = 0;
    setAnalysisStage(stages[0]);
    const stageInterval = setInterval(() => {
      stageIndex += 1;
      if (stageIndex < stages.length) {
        setAnalysisStage(stages[stageIndex]);
      }
    }, stageIntervalMs);
    setTimeout(() => {
      clearInterval(stageInterval);
      setIsAnalyzing(false);
      setAnalysisStage('');
      setChatHistory([{ isSystem: true, message: documentQuestions[0].question }]);
    }, totalStageDurationMs);
  };

  const handleChatSubmit = () => {
    if (!userInput.trim() || isTyping) return;
    const userMessage = userInput.trim();
    setChatHistory((prev) => [...prev, { isSystem: false, message: userMessage }]);
    setUserInput('');
    setIsTyping(true);
    const typingDelay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      const field = documentQuestions[currentQuestionIndex]?.field;
      if (!field) {
        setIsTyping(false);
        return;
      }

      setDocumentData((prev) => ({ ...prev, [field]: userMessage }));
      setHighlightedField(field);
      setTimeout(() => setHighlightedField(null), 2000);
      setIsTyping(false);

      if (currentQuestionIndex < documentQuestions.length - 1) {
        setChatHistory((prev) => [
          ...prev,
          {
            isSystem: true,
            message: `Got it. ${documentQuestions[currentQuestionIndex + 1].question}`
          }
        ]);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            isSystem: true,
            message:
              'All required fields are now complete. Your documentation is ready for review.'
          }
        ]);
      }
    }, typingDelay);
  };

  const generatedOutputs = {
    summary: `Prior Authorization Request Summary\n\nPatient: ${
      patientName || 'John Smith'
    }\nInsurance: ${selectedInsurance}\nProcedure: Lumbar Epidural Steroid Injection\nDate of Service: 01/02/2026\nProvider: Dr. Sarah Chen, MD\n\nClinical Indication: Lumbar radiculopathy secondary to L4-L5 disc herniation with documented failure of conservative management.`,
    cptCodes: [
      { code: '62322', description: 'Injection(s), lumbar epidural, diagnostic or therapeutic' },
      { code: '77003', description: 'Fluoroscopic guidance and localization' },
      { code: '99214', description: 'Office visit, established patient' }
    ],
    icdCodes: [
      { code: 'M54.16', description: 'Radiculopathy, lumbar region' },
      { code: 'M51.16', description: 'Intervertebral disc disorders with radiculopathy, lumbar region' },
      { code: 'M47.816', description: 'Spondylosis without myelopathy, lumbar region' }
    ],
    narrative: `Medical Necessity Statement\n\nThis prior authorization is submitted for ${
      patientName || 'the patient'
    } who requires a lumbar epidural steroid injection based on documented clinical findings.\n\nThe patient has demonstrated inadequate response to conservative management including ${
      documentData.prior_treatment || 'physical therapy and pharmacological interventions'
    }. Diagnosis duration: ${
      documentData.diagnosis_duration || 'documented in clinical notes'
    }.\n\nCurrent symptoms significantly impact daily functioning and quality of life. The requested intervention (${
      documentData.procedure_details || 'epidural steroid injection'
    }) is supported by peer-reviewed literature and aligns with current clinical practice guidelines.`,
    talkingPoints: [
      'Patient has documented failure of conservative treatment over adequate duration',
      'Imaging confirms structural pathology correlating with clinical symptoms',
      'Procedure is medically necessary and appropriate for diagnosis',
      'Treatment aligns with current clinical guidelines and LCD requirements',
      'No contraindications to proposed intervention',
      'Expected outcome: Pain reduction and functional improvement'
    ]
  };

  const resetWizard = () => {
    setStep(1);
    setPatientName('');
    setSelectedInsurance('');
    setUploadedFile(null);
    setChatHistory([]);
    setUserInput('');
    setCurrentQuestionIndex(0);
    setDocumentData({ prior_treatment: null, diagnosis_duration: null, procedure_details: null });
    setIsAnalyzing(false);
    setHighlightedField(null);
    setExpandedSection(null);
    setIsDragging(false);
    setUploadProgress(null);
    setIsTyping(false);
    setAnalysisStage('');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newRecord = {
        id: authRecords.length + 1,
        patientName: patientName || 'John Smith',
        insurance: selectedInsurance,
        status: 'Pending',
        lastUpdated: new Date().toISOString().split('T')[0],
        procedure: 'Lumbar Epidural Steroid Injection'
      };
      setAuthRecords((prev) => [newRecord, ...prev]);
      setIsSubmitting(false);
      setCurrentView('dashboard');
      resetWizard();
    }, 2500);
  };

  const startNewAuth = () => {
    setCurrentView('newAuth');
    resetWizard();
  };

  if (currentView === 'dashboard-2') {
    return (
      <DashboardView
        authRecords={authRecords}
        dashboardStats={dashboardStats}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
        startNewAuth={startNewAuth}
        variant="classic"
        statCardStyle="modern"
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <DashboardView
        authRecords={authRecords}
        dashboardStats={dashboardStats}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
        startNewAuth={startNewAuth}
        statCardStyle="legacy"
      />
    );
  }

  return (
    <NewAuthWizard
      step={step}
      setStep={setStep}
      setCurrentView={setCurrentView}
      patientName={patientName}
      setPatientName={setPatientName}
      selectedInsurance={selectedInsurance}
      setSelectedInsurance={setSelectedInsurance}
      uploadedFile={uploadedFile}
      setUploadedFile={setUploadedFile}
      uploadProgress={uploadProgress}
      isDragging={isDragging}
      handleDrop={handleDrop}
      handleDragOver={handleDragOver}
      handleDragLeave={handleDragLeave}
      simulateFileUpload={simulateFileUpload}
      handleAnalysis={handleAnalysis}
      isAnalyzing={isAnalyzing}
      analysisStage={analysisStage}
      chatHistory={chatHistory}
      isTyping={isTyping}
      userInput={userInput}
      setUserInput={setUserInput}
      handleChatSubmit={handleChatSubmit}
      chatEndRef={chatEndRef}
      docScrollRef={docScrollRef}
      fieldRefs={fieldRefs}
      documentData={documentData}
      documentQuestions={documentQuestions}
      currentField={currentField}
      highlightedField={highlightedField}
      isComplete={isComplete}
      generatedOutputs={generatedOutputs}
      expandedSection={expandedSection}
      setExpandedSection={setExpandedSection}
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
    />
  );
}
