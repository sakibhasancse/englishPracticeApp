import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [writings, setWritings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/writing`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWritings(res.data);
      } catch (err) {
        setError('Failed to load history');
      }
    };
    fetchWritings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Writing History</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {writings.map(w => (
          <li key={w._id} className="mb-4 p-4 border rounded">
            <div><strong>Date:</strong> {new Date(w.createdAt).toLocaleDateString()}</div>
            <div><strong>Mode:</strong> {w.mode}</div>
            <div><strong>Prompt:</strong> {w.prompt}</div>
            <div><strong>Score:</strong> {w.feedback?.score}</div>
            <div><strong>Text:</strong> {w.text}</div>
            <div><strong>Feedback:</strong> {w.feedback?.overall}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
