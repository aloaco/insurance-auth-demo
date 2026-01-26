import StatusBadge from '../components/StatusBadge';

const STATUS_ORDER = {
  Denied: 0,
  'Needs Peer-to-Peer': 1,
  Pending: 2,
  Approved: 3
};

function DetailModal({ record, onClose }) {
  if (!record) return null;

  const isDenied = record.status === 'Denied' && record.denial;
  const isPeerReview = record.status === 'Needs Peer-to-Peer' && record.peerToPeer;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(17,17,17,0.45)] px-5 py-6">
      <div className="max-h-[90vh] w-full max-w-[560px] overflow-auto rounded-[20px] border border-[#ebe7e1] bg-white shadow-[0_20px_45px_rgba(17,17,17,0.18)]">
        <div className="flex items-center justify-between gap-4 border-b border-[#ebe7e1] bg-white px-6 py-[22px]">
          <div>
            <h2 className="mb-1 text-[22px] font-normal text-[#1a1a1a]">
              {record.patientName}
            </h2>
            <p className="text-[14px] text-[#5f5f5f]">
              {record.procedure} • {record.insurance}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={record.status} />
            <button
              onClick={onClose}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#ebe7e1] bg-white text-[20px] text-[#5f5f5f]"
            >
              ×
            </button>
          </div>
        </div>

        {isDenied && (
          <div>
            <div className="border-b border-[#f1c8ce] bg-white px-6 py-5">
              <p className="mb-2 text-[14px] font-normal text-[#9b2c2c]">
                Denial Code: {record.denial.denialCode}
              </p>
              <p className="text-[15px] leading-[1.6] text-[#5f5f5f]">
                {record.denial.denialReason}
              </p>
              <p className="mt-3 text-[14px] font-normal text-[#9b2c2c]">
                Appeal Deadline: {record.denial.appealDeadline}
              </p>
            </div>
            <div className="border-b border-[#ebe7e1] px-6 py-6">
              <h3 className="mb-4 text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                Required for Resubmission
              </h3>
              <div className="flex flex-col gap-3">
                {record.denial.requiredForResubmission.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full border border-[#ebe7e1] bg-white text-[11px] text-[#5f5f5f]">
                      {index + 1}
                    </span>
                    <span className="text-[15px] leading-[1.5] text-[#1a1a1a]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-[#ebe7e1] bg-white px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                  Dispute Call Script
                </h3>
                <a
                  href={`tel:${record.denial.phoneNumber}`}
                  className="rounded-full border border-[#ebe7e1] bg-white px-5 py-2 text-[14px] font-normal text-[#1a1a1a]"
                >
                  {record.denial.phoneNumber}
                </a>
              </div>
              <div className="flex flex-col gap-3">
                {record.denial.disputeScript.map((point, index) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-[#ebe7e1] bg-white px-4 py-[14px]"
                  >
                    <span className="text-[14px] font-normal text-[#1a1a1a]">
                      {index + 1}.
                    </span>
                    <span className="text-[14px] leading-[1.5] text-[#1a1a1a]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] text-[#5f5f5f]">
                Fax additional documentation: {record.denial.appealFaxNumber}
              </p>
            </div>
            <div className="flex gap-3 px-6 py-6">
              <button className="flex-1 rounded-full bg-[#111111] px-5 py-[14px] text-[15px] font-normal text-white">
                Start Resubmission
              </button>
              <button className="rounded-full border border-[#ebe7e1] bg-white px-5 py-[14px] text-[15px] font-normal text-[#1a1a1a]">
                Download
              </button>
            </div>
          </div>
        )}

        {isPeerReview && (
          <div>
            <div className="border-b border-[#e0d7fb] bg-white px-6 py-6">
              <p className="mb-1 text-[13px] font-normal text-[#5531c5]">
                Peer-to-Peer Review Scheduled
              </p>
              <p className="mb-2 text-[22px] font-normal text-[#5531c5]">
                {record.peerToPeer.scheduledDate} at {record.peerToPeer.scheduledTime}
              </p>
              <p className="text-[15px] text-[#1a1a1a]">
                {record.peerToPeer.reviewerName}, {record.peerToPeer.reviewerSpecialty}
              </p>
              <p className="mt-1 text-[13px] text-[#5f5f5f]">
                Case #{record.peerToPeer.caseNumber}
              </p>
            </div>
            <div className="border-b border-[#ebe7e1] px-6 py-6">
              <h3 className="mb-3 text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                Clinical Summary
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#1a1a1a]">
                {record.peerToPeer.clinicalNotes}
              </p>
            </div>
            <div className="border-b border-[#ebe7e1] bg-white px-6 py-6">
              <h3 className="mb-4 text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                Talking Points
              </h3>
              <div className="flex flex-col gap-3">
                {record.peerToPeer.talkingPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-[#ebe7e1] bg-white px-4 py-[14px]"
                  >
                    <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full border border-[#d6f0dd] bg-white text-[12px] font-normal text-[#2f6b3c]">
                      ✓
                    </span>
                    <span className="text-[14px] leading-[1.5] text-[#1a1a1a]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-[#ebe7e1] px-6 py-6">
              <div>
                <p className="text-[15px] font-normal text-[#1a1a1a]">
                  Join Peer-to-Peer Call
                </p>
                <p className="text-[13px] text-[#5f5f5f]">
                  Dial-in for scheduled review
                </p>
              </div>
              <a
                href={`tel:${record.peerToPeer.phoneNumber}`}
                className="rounded-full border border-[#ebe7e1] bg-white px-6 py-3 text-[15px] font-normal text-[#1a1a1a]"
              >
                {record.peerToPeer.phoneNumber}
              </a>
            </div>
            <div className="flex gap-3 px-6 py-6">
              <button className="flex-1 rounded-full bg-[#111111] px-5 py-[14px] text-[15px] font-normal text-white">
                Add to Calendar
              </button>
              <button className="rounded-full border border-[#ebe7e1] bg-white px-5 py-[14px] text-[15px] font-normal text-[#1a1a1a]">
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardView({
  authRecords,
  dashboardStats,
  selectedRecord,
  setSelectedRecord,
  startNewAuth
}) {
  const sortedRecords = [...authRecords].sort((a, b) => {
    return (STATUS_ORDER[a.status] ?? 4) - (STATUS_ORDER[b.status] ?? 4);
  });

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <main className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[15px] font-semibold text-[#1a1a1a]">Prior Authorizations</h1>
            <button
              onClick={startNewAuth}
              className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-[10px] py-2 text-[13px] font-normal text-white shadow-[0_1px_0_rgba(17,17,17,0.04),_0_12px_30px_rgba(17,17,17,0.06)]"
            >
              <span>New Authorization</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {dashboardStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-[18px]"
              >
                <div className="mb-2">
                  <p className="text-[11px] font-normal text-[#6b7280]">{stat.label}</p>
                </div>
                <p
                  className={`mb-[6px] text-[34px] font-semibold leading-none ${stat.valueClassName}`}
                >
                  {stat.value}
                  <span className="text-[20px] font-normal">{stat.suffix || ''}</span>
                </p>
                <p className="text-[11px] text-[#6b7280]">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          <div
            id="recent-requests"
            className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#e5e7eb] bg-white px-6 py-[18px]">
              <div>
                <h2 className="text-[15px] font-normal text-[#1a1a1a]">Recent Requests</h2>
                <p className="mt-1 text-[13px] text-[#8f8f8f]">
                  {authRecords.length} total requests
                </p>
              </div>
              <span className="text-[13px] text-[#5f5f5f]">Last updated today</span>
            </div>
            <div className="border-b border-[#e5e7eb] bg-white px-6 py-[10px]">
              <div className="grid grid-cols-[1.4fr_1.5fr_0.8fr_0.9fr] gap-4 text-[11px] uppercase tracking-[0.6px] text-[#8f8f8f]">
                <span>Patient</span>
                <span>Procedure</span>
                <span className="text-left">Status</span>
                <span className="text-right">Action</span>
              </div>
            </div>
            <div>
              {sortedRecords.map((record) => {
                const hasDetails =
                  (record.status === 'Denied' && record.denial) ||
                  (record.status === 'Needs Peer-to-Peer' && record.peerToPeer);

                return (
                  <div
                    key={record.id}
                    onClick={() => hasDetails && setSelectedRecord(record)}
                    className={`grid grid-cols-[1.4fr_1.5fr_0.8fr_0.9fr] items-center gap-4 border-b border-[#e5e7eb] px-6 py-[18px] transition-colors last:border-b-0 ${
                      hasDetails ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div>
                      <p className="text-[14px] font-normal text-[#1a1a1a]">
                        {record.patientName}
                      </p>
                      <p className="mt-1 text-[13px] text-[#8f8f8f]">
                        Updated {record.lastUpdated}
                      </p>
                    </div>
                    <div>
                      <p className="text-[14px] font-normal text-[#1a1a1a]">
                        {record.procedure}
                      </p>
                      <p className="mt-1 text-[13px] text-[#8f8f8f]">
                        {record.insurance}
                      </p>
                    </div>
                    <div>
                      <StatusBadge status={record.status} />
                    </div>
                    <div className="flex justify-end">
                      {hasDetails ? (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedRecord(record);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#e0dbd3] bg-white px-[14px] py-2 text-[13px] font-normal text-[#1a1a1a]"
                        >
                          View details →
                        </button>
                      ) : (
                        <span className="text-[13px] text-[#8f8f8f]">No action</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {selectedRecord && (
        <DetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </div>
  );
}
