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
  const approvedCount = authRecords.filter((record) => record.status === 'Approved').length;
  const pendingCount = authRecords.filter((record) => record.status === 'Pending').length;
  const approvalRate =
    authRecords.length > 0 ? Math.round((approvedCount / authRecords.length) * 100) : 0;

  const dashboardStats = [
    {
      label: 'Action Needed',
      value: actionNeededRecords.length,
      subtitle: 'Denied & peer-to-peer calls',
      valueClassName: 'text-[#dc2626]'
    },
    {
      label: 'Pending Review',
      value: pendingCount,
      subtitle: 'Awaiting provider action',
      valueClassName: 'text-[#ca8a04]'
    },
    {
      label: 'Total Requests',
      value: authRecords.length,
      subtitle: 'Requests for the last month',
      valueClassName: 'text-[#1a1a1a]'
    },
    {
      label: 'Approval Rate',
      value: approvalRate,
      suffix: '%',
      subtitle: 'Requests for the last month',
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
