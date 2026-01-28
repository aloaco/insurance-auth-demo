import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import DashboardView from './views/DashboardView';
import { initialAuthRecords } from './data/authData';
import './styles/index.css';

function Dashboard2App() {
  const [authRecords] = useState(initialAuthRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);

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

  const startNewAuth = () => {
    window.location.href = '/';
  };

  return (
    <DashboardView
      authRecords={authRecords}
      dashboardStats={dashboardStats}
      selectedRecord={selectedRecord}
      setSelectedRecord={setSelectedRecord}
      startNewAuth={startNewAuth}
      variant="classic"
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard2App />
  </React.StrictMode>
);
