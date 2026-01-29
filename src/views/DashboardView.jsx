import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert01Icon,
  Archive01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  BarChartIcon,
  Cancel01Icon,
  ChartDownIcon,
  ChartUpIcon,
  Clock01Icon,
  DashboardSquare01Icon,
  File01Icon,
  Menu02Icon,
  PhoneCheckIcon,
  Plug01Icon,
  Setting06Icon,
  Shield01Icon,
  Tick01Icon,
  UserGroupIcon,
  UserIcon
} from '@hugeicons/core-free-icons';
import { useState } from 'react';
import StatusBadge from '../components/StatusBadge';

const STATUS_ORDER = {
  Denied: 0,
  'Needs Peer-to-Peer': 1,
  Pending: 2,
  Approved: 3
};

const SIDEBAR_PRIMARY_ITEMS = [
  { label: 'Dashboard', icon: DashboardSquare01Icon, isActive: true },
  { label: 'Patients', icon: UserIcon },
  { label: 'Team', icon: UserGroupIcon },
  { label: 'Analytics', icon: BarChartIcon },
  { label: 'Integrations', icon: Plug01Icon },
  { label: 'Archive', icon: Archive01Icon }
];

const SIDEBAR_FOOTER_ITEMS = [{ label: 'Settings', icon: Setting06Icon }];

const STAT_CARD_META = [
  {
    icon: Alert01Icon,
    trendValue: '+50%',
    trendDirection: 'up',
    trendTone: 'negative'
  },
  {
    icon: Clock01Icon,
    trendValue: '-75%',
    trendDirection: 'down',
    trendTone: 'positive'
  },
  {
    icon: File01Icon,
    trendValue: '+25%',
    trendDirection: 'up',
    trendTone: 'positive'
  },
  {
    icon: Shield01Icon,
    trendValue: '-15%',
    trendDirection: 'down',
    trendTone: 'negative'
  }
];

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const getNextLocalDateString = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function DetailModal({ record, onClose }) {
  if (!record) return null;

  const isDenied = record.status === 'Denied' && record.denial;
  const isPeerReview = record.status === 'Needs Peer-to-Peer' && record.peerToPeer;
  const [showChecklist, setShowChecklist] = useState(false);
  const [showDisputeScript, setShowDisputeScript] = useState(false);
  const [showPeerTalkingPoints, setShowPeerTalkingPoints] = useState(false);
  const checklistItems = record?.denial?.requiredForResubmission || [];
  const peerTalkingPoints = record?.peerToPeer?.talkingPoints || [];
  const checklistId = `resubmission-checklist-${record.id}`;
  const disputeScriptId = `dispute-script-${record.id}`;
  const peerTalkingPointsId = `peer-talking-points-${record.id}`;
  const nextDayDate = getNextLocalDateString();

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
            {!isDenied && !isPeerReview && <StatusBadge status={record.status} />}
            <button
              onClick={onClose}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#ebe7e1] bg-white text-[20px] text-[#5f5f5f]"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={18}
                strokeWidth={1.8}
                color="currentColor"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {isDenied && (
          <div>
            <div className="border-b border-[#f1c8ce] bg-white px-6 py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#9b2c2c]">
                    Denied - Action Required
                  </p>
                  <p className="mt-2 text-[14px] text-[#7a2c2c]">
                    Appeal deadline: {nextDayDate}
                  </p>
                </div>
                <button className="rounded-full bg-[#9b2c2c] px-5 py-[12px] text-[14px] font-normal text-white">
                  Start Resubmission
                </button>
              </div>
            </div>
            <div className="border-b border-[#f1c8ce] bg-white px-6 py-5">
              <p className="mb-2 text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                Denial Details
              </p>
              <p className="mb-2 text-[14px] font-normal text-[#9b2c2c]">
                Denial Code: {record.denial.denialCode}
              </p>
              <p className="text-[15px] leading-[1.6] text-[#5f5f5f]">
                {record.denial.denialReason}
              </p>
            </div>
            <div className="border-b border-[#ebe7e1] px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                    Resubmission Checklist
                  </h3>
                  <p className="mt-2 text-[14px] text-[#5f5f5f]">
                    To resubmit, gather the following {checklistItems.length} items.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChecklist((previous) => !previous)}
                  className="rounded-full border border-[#ebe7e1] bg-white px-4 py-2 text-[13px] font-normal text-[#1a1a1a]"
                  aria-expanded={showChecklist}
                  aria-controls={checklistId}
                >
                  <span className="inline-flex items-center gap-2">
                    {showChecklist ? (
                      <HugeiconsIcon
                        icon={ArrowUp01Icon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}
                    {showChecklist ? 'Hide checklist' : 'View checklist'}
                  </span>
                </button>
              </div>
              {showChecklist && (
                <div id={checklistId} className="mt-4 flex flex-col gap-3">
                  {checklistItems.map((item, index) => (
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
              )}
            </div>
            <div className="border-b border-[#ebe7e1] bg-white px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                    Optional: Dispute by phone
                  </h3>
                  <p className="mt-2 text-[14px] text-[#5f5f5f]">
                    Use this script if you choose to call the payer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDisputeScript((previous) => !previous)}
                  className="rounded-full border border-[#ebe7e1] bg-white px-4 py-2 text-[13px] font-normal text-[#1a1a1a]"
                  aria-expanded={showDisputeScript}
                  aria-controls={disputeScriptId}
                >
                  <span className="inline-flex items-center gap-2">
                    {showDisputeScript ? (
                      <HugeiconsIcon
                        icon={ArrowUp01Icon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}
                    {showDisputeScript ? 'Hide script' : 'View script'}
                  </span>
                </button>
              </div>
              {showDisputeScript && (
                <div id={disputeScriptId} className="mt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[13px] font-semibold tracking-[0.2px] text-[#1a1a1a]">
                      Call script
                    </p>
                    <a
                      href={`tel:${record.denial.phoneNumber}`}
                      className="inline-flex items-center gap-2 text-[14px] font-normal text-[#1a1a1a]"
                    >
                      <HugeiconsIcon
                        icon={PhoneCheckIcon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
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
              )}
            </div>
          </div>
        )}

        {isPeerReview && (
          <div>
            <div className="border-b border-[#e0d7fb] bg-white px-6 py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#5531c5]">
                    Peer-to-Peer Review Scheduled
                  </p>
                  <p className="mt-2 text-[20px] font-normal text-[#5531c5]">
                    {nextDayDate} at {record.peerToPeer.scheduledTime}
                  </p>
                  <p className="mt-2 text-[14px] text-[#1a1a1a]">
                    {record.peerToPeer.reviewerName}, {record.peerToPeer.reviewerSpecialty}
                  </p>
                  <p className="mt-1 text-[13px] text-[#5f5f5f]">
                    Case #{record.peerToPeer.caseNumber}
                  </p>
                </div>
                <a
                  href={`tel:${record.peerToPeer.phoneNumber}`}
                  className="rounded-full bg-[#5531c5] px-5 py-[12px] text-[14px] font-normal text-white"
                >
                  Join Peer-to-Peer Call
                </a>
              </div>
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[11px] font-normal uppercase tracking-[0.5px] text-[#8f8f8f]">
                    Talking Points
                  </h3>
                  <p className="mt-2 text-[14px] text-[#5f5f5f]">
                    Review {peerTalkingPoints.length} points before the call.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPeerTalkingPoints((previous) => !previous)}
                  className="rounded-full border border-[#ebe7e1] bg-white px-4 py-2 text-[13px] font-normal text-[#1a1a1a]"
                  aria-expanded={showPeerTalkingPoints}
                  aria-controls={peerTalkingPointsId}
                >
                  <span className="inline-flex items-center gap-2">
                    {showPeerTalkingPoints ? (
                      <HugeiconsIcon
                        icon={ArrowUp01Icon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}
                    {showPeerTalkingPoints ? 'Hide points' : 'View points'}
                  </span>
                </button>
              </div>
              {showPeerTalkingPoints && (
                <div id={peerTalkingPointsId} className="mt-4 flex flex-col gap-3">
                  {peerTalkingPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-xl border border-[#ebe7e1] bg-white px-4 py-[14px]"
                    >
                      <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full border border-[#d6f0dd] bg-white text-[12px] font-normal text-[#2f6b3c]">
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={12}
                          strokeWidth={2}
                          color="currentColor"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-[14px] leading-[1.5] text-[#1a1a1a]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const sortedRecords = [...authRecords].sort((a, b) => {
    return (STATUS_ORDER[a.status] ?? 4) - (STATUS_ORDER[b.status] ?? 4);
  });

  const sidebarButtonLayout = isSidebarExpanded
    ? 'w-full justify-start gap-3 px-4'
    : 'w-11 justify-center';
  const sidebarBrandLayout = isSidebarExpanded
    ? 'w-full justify-start gap-3 px-4'
    : 'w-10 justify-center';
  const sidebarTransition = isSidebarExpanded ? 'duration-300' : 'duration-400';
  const doubleBorderOuterClassName =
    'rounded-[18px] border border-[#e5e7eb] bg-[#fafafa] p-[6px] shadow-[0_4px_10px_rgba(15,23,42,0.05)]';
  const statCardClassName =
    'h-full rounded-xl border border-[#e5e7eb] bg-white px-5 py-4';
  const statLabelClassName =
    'text-[11px] uppercase tracking-[0.6px] text-[#8f8f8f]';
  const statSubtitleClassName =
    'mt-4 text-[12px] leading-snug text-[#8f8f8f] truncate';
  const tableContainerClassName =
    'overflow-hidden rounded-xl border border-[#e5e7eb] bg-white';
  const tableHeaderClassName =
    'flex items-center justify-between gap-4 border-b border-[#e5e7eb] bg-white px-6 py-[18px]';
  const tableUpdatedClassName = 'text-[13px] text-[#5f5f5f]';
  const getRowClassName = (hasDetails) => {
    const base =
      'grid grid-cols-[1.4fr_1.5fr_0.8fr_0.9fr] items-center gap-4 px-6 py-[18px] transition-colors';
    return `${base} border-b border-[#e5e7eb] last:border-b-0 ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <div className="flex min-h-screen">
        <aside
          className={`flex flex-col border-r border-[#ebe7e1] bg-[#fafafa] py-6 transition-[width] ${sidebarTransition} ${isSidebarExpanded
            ? 'w-[220px] items-stretch px-3'
            : 'w-[84px] items-center'
            }`}
        >
          <div className={`flex items-center ${sidebarBrandLayout}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ebe7e1] text-[#1a1a1a]">
              <span className="text-[16px] font-semibold">P</span>
            </div>
            {isSidebarExpanded && (
              <span className="text-[14px] font-semibold text-[#1a1a1a]">
                Prior Auth
              </span>
            )}
          </div>
          <div className="mt-10 flex flex-1 flex-col items-center gap-4">
            {SIDEBAR_PRIMARY_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.isActive;
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  title={item.label}
                  className={`flex h-11 items-center rounded-[14px] transition ${sidebarButtonLayout} ${isActive
                    ? 'cursor-pointer bg-[#2563eb] text-white'
                    : 'cursor-default text-[#8f8f8f]'
                    }`}
                >
                  <HugeiconsIcon icon={Icon} size={20} strokeWidth={1.8} />
                  {isSidebarExpanded && (
                    <span
                      className={`text-[13px] font-normal ${isActive ? 'text-white' : 'text-[#6b7280]'
                        }`}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-4 pb-2">
            {SIDEBAR_FOOTER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  aria-disabled="true"
                  tabIndex={-1}
                  title={item.label}
                  className={`flex h-11 cursor-default items-center rounded-[14px] text-[#8f8f8f] ${sidebarButtonLayout}`}
                >
                  <HugeiconsIcon icon={Icon} size={20} strokeWidth={1.8} />
                  {isSidebarExpanded && (
                    <span className="text-[13px] font-normal text-[#6b7280]">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[#ebe7e1] bg-[#fafafa]">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSidebarExpanded((previous) => !previous)}
                  aria-label={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#fafafa] text-[#1a1a1a]"
                >
                  <span
                    className={`absolute transition-all duration-300 ${isSidebarExpanded
                      ? 'scale-90 rotate-90 opacity-0'
                      : 'scale-100 rotate-0 opacity-100'
                      }`}
                  >
                    <HugeiconsIcon icon={Menu02Icon} size={18} strokeWidth={1.8} />
                  </span>
                  <span
                    className={`absolute transition-all duration-300 ${isSidebarExpanded
                      ? 'scale-100 rotate-0 opacity-100'
                      : 'scale-90 -rotate-90 opacity-0'
                      }`}
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.8} />
                  </span>
                </button>
                <h1 className="text-[18px] font-normal text-[#1a1a1a]">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={startNewAuth}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-[10px] py-2 text-[13px] font-normal text-white"
                >
                  <span>New Authorization</span>
                </button>
                <span className="text-[11px] uppercase tracking-[0.6px] text-[#8f8f8f]">
                  DEMO
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-[1200px] px-8 py-8">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-4 gap-4">
                  {dashboardStats.map((stat, index) => {
                    const meta = STAT_CARD_META[index] || {};
                    const TrendIcon =
                      meta.trendDirection === 'down' ? ChartDownIcon : ChartUpIcon;
                    const trendChip = meta.trendValue ? (
                      <span
                        className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] font-semibold text-[#111827]`}
                      >
                        <HugeiconsIcon
                          icon={TrendIcon}
                          size={12}
                          strokeWidth={2}
                          className="text-[#111827]"
                          aria-hidden="true"
                        />
                        {meta.trendValue}
                      </span>
                    ) : null;
                    const valueClassName = stat.valueClassName || 'text-[#111827]';

                    return (
                      <div key={stat.label} className={doubleBorderOuterClassName}>
                        <div className={statCardClassName}>
                          <div className="flex items-center justify-between gap-3">
                            <p className={statLabelClassName}>{stat.label}</p>
                            {trendChip}
                          </div>
                          <div className="mb-4 mt-1">
                            <div className="flex items-baseline gap-1.5">
                              <span
                                className={`text-[24px] font-semibold leading-none tracking-tight ${valueClassName}`}
                              >
                                {stat.value}
                              </span>
                              {stat.suffix && (
                                <span className="text-[18px] font-medium text-[#6b7280]">
                                  {stat.suffix}
                                </span>
                              )}
                            </div>
                            {stat.subtitle && (
                              <p className={statSubtitleClassName}>{stat.subtitle}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={doubleBorderOuterClassName}>
                  <div id="recent-requests" className={tableContainerClassName}>
                    <div className={tableHeaderClassName}>
                      <div>
                        <h2 className="text-[15px] font-normal text-[#1a1a1a]">
                          Recent Requests
                        </h2>
                        <p className="mt-1 text-[13px] text-[#8f8f8f]">
                          {authRecords.length} total requests
                        </p>
                      </div>
                      <span className={tableUpdatedClassName}>Last updated today</span>
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
                            className={getRowClassName(hasDetails)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-[#e5e7eb] bg-[#f3f4f6]">
                                {record.avatar ? (
                                  <img
                                    src={record.avatar}
                                    alt={`${record.patientName} avatar`}
                                    className="h-full w-full object-cover object-center"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-[12px] font-semibold text-[#6b7280]">
                                    {getInitials(record.patientName)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-[14px] font-normal text-[#1a1a1a]">
                                  {record.patientName}
                                </p>
                                <p className="mt-1 text-[13px] text-[#8f8f8f]">
                                  Updated {record.lastUpdated}
                                </p>
                              </div>
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
              </div>
            </div>
          </main>
        </div>
      </div>

      {selectedRecord && (
        <DetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </div>
  );
}
