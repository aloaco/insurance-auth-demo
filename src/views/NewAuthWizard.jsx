import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import ChatMessage from '../components/ChatMessage';
import DocumentSection from '../components/DocumentSection';
import TypingIndicator from '../components/TypingIndicator';

const STEPS = ['Upload', 'Insurance', 'Details', 'Review'];

export default function NewAuthWizard({
  step,
  setStep,
  setCurrentView,
  patientName,
  setPatientName,
  selectedInsurance,
  setSelectedInsurance,
  uploadedFile,
  setUploadedFile,
  uploadProgress,
  isDragging,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  simulateFileUpload,
  handleAnalysis,
  isAnalyzing,
  analysisStage,
  chatHistory,
  isTyping,
  userInput,
  setUserInput,
  handleChatSubmit,
  chatEndRef,
  docScrollRef,
  fieldRefs,
  documentData,
  documentQuestions,
  currentField,
  highlightedField,
  isComplete,
  generatedOutputs,
  expandedSection,
  setExpandedSection,
  isSubmitting,
  handleSubmit
}) {
  const isSplitView = step === 3 && !isComplete;
  const completionCount = Object.values(documentData).filter((value) => value !== null).length;

  return (
    <div
      className={`flex min-h-screen flex-col bg-[#fafafa] ${isSplitView ? 'h-screen overflow-hidden' : ''
        }`}
    >
      <div className="bg-[#fafafa] px-8 py-5">
        <div className="mx-auto max-w-[600px]">
          <div className="mb-5 flex justify-start">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="rounded-full border border-[#e5e5e5] bg-white px-5 py-[10px] text-[13px] font-normal text-[#666]"
            >
              Back to Dashboard
            </button>
          </div>
          <div className="mb-3 flex items-center justify-between">
            {STEPS.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepNumber;
              const isDone = step > stepNumber;
              return (
                <div
                  key={label}
                  className={`flex items-center gap-2 ${isDone ? 'text-[#22c55e]' : isActive ? 'text-[#1a1a1a]' : 'text-[#ccc]'
                    }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-normal ${isDone
                        ? 'bg-[#22c55e] text-white'
                        : isActive
                          ? 'bg-[#1a1a1a] text-white'
                          : 'bg-[#e5e5e5] text-[#999]'
                      }`}
                  >
                    {isDone ? '✓' : stepNumber}
                  </div>
                  <span className="text-[14px] font-normal">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#e5e5e5]">
            <div
              className="h-full rounded-full bg-[#1a1a1a] transition-[width] duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <main
        className={`mx-auto ${isSplitView
            ? 'flex h-full w-full max-w-none flex-1 overflow-hidden p-0'
            : 'w-full max-w-[600px] px-8 py-10'
          }`}
      >
        {step === 1 && (
          <div>
            <h1 className="mb-2 text-[28px] font-semibold text-[#1a1a1a]">Upload Visit Notes</h1>
            <p className="mb-8 text-[16px] text-[#666]">
              Enter patient information and upload clinical documentation.
            </p>
            <div className="mb-6">
              <label className="mb-2 block text-[14px] font-normal text-[#1a1a1a]">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
                placeholder="e.g., John Smith"
                className="w-full rounded-xl border border-[#e5e5e5] bg-white px-5 py-4 text-[16px] outline-none"
              />
            </div>
            <div className="mb-8">
              <label className="mb-2 block text-[14px] font-normal text-[#1a1a1a]">
                Clinical Notes
              </label>
              {uploadProgress && !uploadedFile && (
                <div className="rounded-2xl border border-[#e5e5e5] bg-white p-10 text-center">
                  <div className="relative mx-auto mb-5 h-12 w-12">
                    <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#e5e5e5] border-t-[#1a1a1a]" />
                  </div>
                  <p className="mb-1 text-[16px] font-normal text-[#1a1a1a]">
                    {uploadProgress === 'uploading'
                      ? 'Uploading document...'
                      : 'Processing document...'}
                  </p>
                  <p className="text-[14px] text-[#666]">
                    {uploadProgress === 'uploading' ? 'Please wait' : 'Extracting text content'}
                  </p>
                  <div className="mt-6 h-[6px] overflow-hidden rounded-full bg-[#e5e5e5]">
                    <div
                      className="h-full rounded-full bg-[#1a1a1a] transition-[width] duration-[1500ms] ease-out"
                      style={{ width: uploadProgress === 'uploading' ? '45%' : '80%' }}
                    />
                  </div>
                </div>
              )}
              {!uploadedFile && !uploadProgress && (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => simulateFileUpload()}
                  className={`cursor-pointer rounded-2xl border bg-white px-6 py-12 text-center ${isDragging ? 'border-2 border-dashed border-[#1a1a1a]' : 'border-dashed border-[#ccc]'
                    }`}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#e5e5e5] bg-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                  </div>
                  <p className="mb-1 text-[16px] font-normal text-[#1a1a1a]">
                    {isDragging ? 'Drop file here' : 'Drop files here or click to upload'}
                  </p>
                  <p className="text-[14px] text-[#999]">Supports PDF, DOC, TXT</p>
                </div>
              )}
              {uploadedFile && (
                <div className="flex items-center gap-4 rounded-2xl border border-[#bbf7d0] bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#bbf7d0] bg-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-[15px] font-normal text-[#166534]">
                      {uploadedFile.name}
                    </p>
                    <p className="text-[13px] text-[#22c55e]">
                      {uploadedFile.size} • Uploaded
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="p-2 text-[20px] leading-none text-[#22c55e]"
                  >
                    ×
                  </button>
                </div>
              )}
              <p className="mt-3 text-center text-[13px] text-[#999]">
                For this demo, sample clinical notes will be loaded automatically
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full rounded-full bg-[#1a1a1a] px-6 py-4 text-[16px] font-normal text-white"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="mb-2 text-[28px] font-semibold text-[#1a1a1a]">Select Insurance</h1>
            <p className="mb-8 text-[16px] text-[#666]">
              Choose the patient's insurance provider.
            </p>
            <div className="mb-8 flex flex-col gap-3">
              {['Medicare', 'UnitedHealthcare', 'Aetna', 'Blue Cross'].map((insurance) => {
                const isSelected = selectedInsurance === insurance;
                return (
                  <button
                    key={insurance}
                    onClick={() => setSelectedInsurance(insurance)}
                    className={`flex w-full items-center justify-between rounded-2xl bg-white px-6 py-5 text-left ${isSelected ? 'border-2 border-[#1a1a1a]' : 'border border-[#e5e5e5]'
                      }`}
                  >
                    <div>
                      <p className="text-[16px] font-normal text-[#1a1a1a]">{insurance}</p>
                      <p className="mt-1 text-[13px] text-[#666]">
                        {insurance === 'Medicare' && 'Federal health insurance'}
                        {insurance === 'UnitedHealthcare' && 'Commercial payer'}
                        {insurance === 'Aetna' && 'Commercial payer'}
                        {insurance === 'Blue Cross' && 'Regional BCBS plan'}
                      </p>
                    </div>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${isSelected ? 'border-[#1a1a1a] bg-[#1a1a1a]' : 'border-[#e5e5e5] bg-white'
                        }`}
                    >
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-full border border-[#e5e5e5] bg-white px-6 py-4 text-[16px] font-normal text-[#666]"
              >
                Back
              </button>
              <button
                onClick={handleAnalysis}
                disabled={!selectedInsurance}
                className={`flex-[2] rounded-full px-6 py-4 text-[16px] font-normal ${selectedInsurance
                    ? 'cursor-pointer bg-[#1a1a1a] text-white'
                    : 'cursor-not-allowed bg-[#e5e5e5] text-[#999]'
                  }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {isSplitView && (
          <div className="flex h-full">
            <div className="flex w-[400px] flex-shrink-0 flex-col border-r border-[#e5e5e5] bg-white">
              <div className="border-b border-[#e5e5e5] p-6">
                <h2 className="mb-1 text-[18px] font-normal text-[#1a1a1a]">Complete Details</h2>
                <p className="text-[14px] text-[#666]">
                  {selectedInsurance} • {completionCount}/{documentQuestions.length} complete
                </p>
              </div>
              {isAnalyzing ? (
                <div className="flex-1 overflow-y-auto p-6">
                  <ChatMessage
                    isSystem
                    message={
                      <span className="shimmer-text">
                        {analysisStage || 'Analyzing documentation...'}
                      </span>
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    {chatHistory.map((msg, index) => (
                      <ChatMessage key={`${msg.message}-${index}`} message={msg.message} isSystem={msg.isSystem} />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="border-t border-[#e5e5e5] p-5">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={(event) =>
                          event.key === 'Enter' && !isTyping && handleChatSubmit()
                        }
                        placeholder={isTyping ? 'Processing...' : 'Type your response...'}
                        disabled={isTyping}
                        className={`flex-1 rounded-full border border-[#e5e5e5] px-[18px] py-[14px] text-[15px] outline-none ${isTyping ? 'bg-white text-[#999]' : 'bg-white text-[#1a1a1a]'
                          }`}
                      />
                      <button
                        onClick={handleChatSubmit}
                        disabled={!userInput.trim() || isTyping}
                        className={`rounded-full px-6 py-[14px] text-[15px] font-normal ${!userInput.trim() || isTyping
                            ? 'cursor-not-allowed bg-[#e5e5e5] text-[#999]'
                            : 'bg-[#1a1a1a] text-white'
                          }`}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-1 flex-col overflow-hidden bg-white">
              <div className="flex items-center justify-between border-b border-[#e5e5e5] bg-white p-6">
                <div>
                  <h2 className="mb-1 text-[18px] font-normal text-[#1a1a1a]">
                    Clinical Documentation
                  </h2>
                  <p className="text-[14px] text-[#666]">Updates in real-time as you respond</p>
                </div>
              </div>
              <div ref={docScrollRef} className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto max-w-[700px] rounded-2xl border border-[#e5e5e5] bg-white p-8">
                  <div className="mb-8 border-b border-[#e5e5e5] pb-5 text-center">
                    <h3 className="mb-2 text-[14px] font-normal uppercase tracking-[0.5px] text-[#1a1a1a]">
                      Clinical Visit Documentation
                    </h3>
                    <p className="text-[14px] text-[#666]">
                      {patientName || 'John Smith'} • DOS: 01/02/2026 • Provider: Dr. Sarah Chen, MD
                    </p>
                  </div>
                  <DocumentSection
                    title="Chief Complaint"
                    content="Patient presents with chronic lower back pain radiating to left leg, worsening over the past 3 months."
                  />
                  <DocumentSection
                    title="History of Present Illness"
                    content="45-year-old male with progressive lumbar radiculopathy. Pain rated 7/10, aggravated by prolonged sitting and standing. Reports numbness and tingling in L5 distribution."
                  />
                  <div ref={fieldRefs.prior_treatment}>
                    <DocumentSection
                      title="Prior Conservative Treatment"
                      content={documentData.prior_treatment}
                      placeholder="Document previous treatments attempted..."
                      isEditable
                      isFilled={!!documentData.prior_treatment}
                      isHighlighted={highlightedField === 'prior_treatment'}
                      isCurrentField={currentField === 'prior_treatment'}
                    />
                  </div>
                  <DocumentSection
                    title="Physical Examination"
                    content={`• Lumbar spine: Tenderness at L4-L5
• Neurological: Decreased sensation left lateral foot
• Motor: 4/5 strength left ankle dorsiflexion
• Positive straight leg raise at 45 degrees`}
                  />
                  <DocumentSection
                    title="Imaging"
                    content="MRI lumbar spine (01/02/2026): L4-L5 disc herniation with moderate neural foraminal stenosis."
                  />
                  <DocumentSection
                    title="Assessment"
                    content={`1. Lumbar radiculopathy secondary to L4-L5 disc herniation
2. Neural foraminal stenosis`}
                  />
                  <div ref={fieldRefs.diagnosis_duration}>
                    <DocumentSection
                      title="Diagnosis Duration"
                      content={documentData.diagnosis_duration}
                      placeholder="Confirm duration of current diagnosis..."
                      isEditable
                      isFilled={!!documentData.diagnosis_duration}
                      isHighlighted={highlightedField === 'diagnosis_duration'}
                      isCurrentField={currentField === 'diagnosis_duration'}
                    />
                  </div>
                  <DocumentSection
                    title="Plan"
                    content="Recommend lumbar epidural steroid injection for pain management. Request prior authorization."
                  />
                  <div ref={fieldRefs.procedure_details}>
                    <DocumentSection
                      title="Procedure Specifications"
                      content={documentData.procedure_details}
                      placeholder="Specify procedure details, dosage, and frequency..."
                      isEditable
                      isFilled={!!documentData.procedure_details}
                      isHighlighted={highlightedField === 'procedure_details'}
                      isCurrentField={currentField === 'procedure_details'}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 border-t border-[#e5e5e5] bg-white px-6 py-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-[4px] border-2 border-[#7c3aed] bg-white" />
                  <span className="text-[13px] text-[#666]">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-[4px] border-2 border-[#22c55e] bg-white" />
                  <span className="text-[13px] text-[#666]">Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-[4px] border-2 border-[#fca5a5] bg-white" />
                  <span className="text-[13px] text-[#666]">Required</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && isComplete && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 rounded-2xl border border-[#bbf7d0] bg-white px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#22c55e] bg-white">
                <span className="text-[18px] font-normal text-[#22c55e]">✓</span>
              </div>
              <div>
                <p className="text-[16px] font-normal text-[#166534]">Documentation Complete</p>
                <p className="text-[14px] text-[#22c55e]">
                  All {selectedInsurance} requirements satisfied
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
              <div className="flex items-center justify-between border-b border-[#e5e5e5] bg-white px-6 py-[18px]">
                <span className="text-[15px] font-normal text-[#1a1a1a]">
                  Clinical Documentation
                </span>
                <span className="text-[13px] text-[#666]">All fields complete</span>
              </div>
              <div className="max-h-[350px] overflow-y-auto px-6 py-6">
                <DocumentSection
                  title="Chief Complaint"
                  content="Patient presents with chronic lower back pain radiating to left leg, worsening over the past 3 months."
                />
                <DocumentSection
                  title="History of Present Illness"
                  content="45-year-old male with progressive lumbar radiculopathy. Pain rated 7/10, aggravated by prolonged sitting and standing. Reports numbness and tingling in L5 distribution."
                />
                <DocumentSection
                  title="Prior Conservative Treatment"
                  content={documentData.prior_treatment}
                  isFilled
                  isEditable
                />
                <DocumentSection
                  title="Physical Examination"
                  content={`• Lumbar spine: Tenderness at L4-L5
• Neurological: Decreased sensation left lateral foot
• Motor: 4/5 strength left ankle dorsiflexion
• Positive straight leg raise at 45 degrees`}
                />
                <DocumentSection
                  title="Imaging"
                  content="MRI lumbar spine (01/02/2026): L4-L5 disc herniation with moderate neural foraminal stenosis."
                />
                <DocumentSection
                  title="Assessment"
                  content={`1. Lumbar radiculopathy secondary to L4-L5 disc herniation
2. Neural foraminal stenosis`}
                />
                <DocumentSection
                  title="Diagnosis Duration"
                  content={documentData.diagnosis_duration}
                  isFilled
                  isEditable
                />
                <DocumentSection
                  title="Plan"
                  content="Recommend lumbar epidural steroid injection for pain management."
                />
                <DocumentSection
                  title="Procedure Specifications"
                  content={documentData.procedure_details}
                  isFilled
                  isEditable
                />
              </div>
            </div>

            {[
              { title: 'Prior Authorization Summary', content: generatedOutputs.summary, type: 'text' },
              { title: 'CPT Code Recommendations', content: generatedOutputs.cptCodes, type: 'codes' },
              { title: 'ICD-10 Code Recommendations', content: generatedOutputs.icdCodes, type: 'codes' },
              { title: 'Medical Necessity Narrative', content: generatedOutputs.narrative, type: 'text' },
              {
                title: 'Peer-to-Peer Talking Points',
                content: generatedOutputs.talkingPoints,
                type: 'bullets',
                expandable: true
              }
            ].map((section, index) => {
              const isExpanded = !section.expandable || expandedSection === index;
              return (
                <div
                  key={section.title}
                  className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
                >
                  <button
                    onClick={() =>
                      section.expandable && setExpandedSection(expandedSection === index ? null : index)
                    }
                    className={`flex w-full items-center justify-between bg-white px-6 py-[18px] text-left ${section.expandable ? 'cursor-pointer' : 'cursor-default'
                      } ${section.expandable && expandedSection !== index
                        ? 'border-b-0'
                        : 'border-b border-[#e5e5e5]'
                      }`}
                  >
                    <span className="text-[15px] font-normal text-[#1a1a1a]">
                      {section.title}
                    </span>
                    {section.expandable && (
                      <span className="inline-flex items-center text-[#666]">
                        {expandedSection === index ? (
                          <IconChevronDown size={16} stroke={1.8} aria-hidden="true" />
                        ) : (
                          <IconChevronRight size={16} stroke={1.8} aria-hidden="true" />
                        )}
                      </span>
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-6 py-5">
                      {section.type === 'text' && (
                        <pre className="whitespace-pre-wrap text-[14px] leading-[1.7] text-[#1a1a1a]">
                          {section.content}
                        </pre>
                      )}
                      {section.type === 'codes' && (
                        <div className="flex flex-col gap-3">
                          {section.content.map((code) => (
                            <div
                              key={code.code}
                              className="flex items-center gap-4 rounded-xl bg-white px-4 py-[14px]"
                            >
                              <code className="rounded-lg border border-[#e5e5e5] bg-white px-3 py-1.5 font-mono text-[14px] font-normal text-[#1a1a1a]">
                                {code.code}
                              </code>
                              <span className="text-[14px] text-[#666]">{code.description}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.type === 'bullets' && (
                        <ul className="m-0 list-none p-0">
                          {section.content.map((point) => (
                            <li
                              key={point}
                              className="mb-3 flex items-start gap-3 rounded-xl bg-white px-4 py-[14px] text-[14px] leading-[1.6] text-[#1a1a1a]"
                            >
                              <span className="flex h-[22px] min-w-[22px] flex-shrink-0 items-center justify-center rounded-full border border-[#bbf7d0] bg-white text-[12px] font-normal text-[#22c55e]">
                                ✓
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-[18px] text-[16px] font-normal text-white ${isSubmitting ? 'cursor-not-allowed bg-[#666]' : 'bg-[#1a1a1a]'
                }`}
            >
              {isSubmitting && (
                <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-[rgba(255,255,255,0.3)] border-t-white" />
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Prior Authorization'}
            </button>
            <p className="text-center text-[14px] text-[#666]">
              {isSubmitting
                ? `Securely transmitting to ${selectedInsurance}...`
                : `By submitting, this request will be sent to ${selectedInsurance} for review`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
