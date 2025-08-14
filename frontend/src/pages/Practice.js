
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Practice() {
  const [mode, setMode] = useState('guided');
  const [prompt, setPrompt] = useState('');
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState('');


  useEffect(() => {
    if (mode === 'guided') {
      fetchPrompt();
    } else {
      setPrompt('');
    }
    // eslint-disable-next-line
  }, [mode]);

  const fetchPrompt = async () => {
    setPrompt('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/feedback/prompt`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrompt(res.data.prompt);
    } catch (err) {
      setError('Failed to load prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/feedback`, { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedback(res.data.feedback);
      // Save writing to history
      await axios.post(`${process.env.REACT_APP_API_URL}/writing`, {
        mode,
        prompt,
        text,
        feedback: res.data.feedback
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      setError('Failed to get feedback');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Practice Writing</h1>
      <div className="mb-4">
        <button className={`mr-2 px-4 py-2 rounded ${mode === 'guided' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setMode('guided')}>Guided</button>
        <button className={`px-4 py-2 rounded ${mode === 'free' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setMode('free')}>Free</button>
      </div>
      {mode === 'guided' && <div className="mb-4 p-2 bg-gray-100 rounded">Prompt: {prompt || 'Loading...'}</div>}
      <form onSubmit={handleSubmit}>
        <textarea className="w-full p-2 border rounded mb-4" rows={8} value={text} onChange={e => setText(e.target.value)} placeholder="Write your response here..." required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {feedback && (
        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h2 className="text-xl mb-2">AI Feedback</h2>
          <pre className="whitespace-pre-wrap">{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default Practice;
