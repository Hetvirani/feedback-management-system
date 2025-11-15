import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackTable from './components/FeedbackTable';
import StatsCards from './components/StatsCards';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFeedbacks, getStats } from './services/api';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    totalCount: 0,
    avgRating: 0,
    positiveCount: 0,
    negativeCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [feedbacksData, statsData] = await Promise.all([
        getFeedbacks(),
        getStats()
      ]);
      setFeedbacks(feedbacksData.data);
      setStats(statsData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <StatsCards stats={stats} loading={loading} />
        
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            Submit Feedback
          </button>
          <button 
            className={`tab-button ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            View Feedbacks
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'form' ? (
            <FeedbackForm onFeedbackSubmit={fetchData} />
          ) : (
            <FeedbackTable feedbacks={feedbacks} loading={loading} />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
