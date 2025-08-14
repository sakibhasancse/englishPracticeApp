import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/writing/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboard(res.data);
      } catch (err) {
        setError('Failed to load dashboard');
      }
    };
    fetchDashboard();
  }, []);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!dashboard) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="mb-4">Total Writings: {dashboard.total}</div>
      <div className="mb-4">Average Score: {dashboard.avgScore}</div>
      {/* Add chart components here for progress visualization */}
    </div>
  );
}

export default Dashboard;
