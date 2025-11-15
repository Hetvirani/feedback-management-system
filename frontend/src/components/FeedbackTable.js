import React, { useState } from 'react';
import { Star, Search, Download, Filter } from 'lucide-react';
import { searchFeedbacks, exportFeedbacks } from '../services/api';
import './FeedbackTable.css';

const FeedbackTable = ({ feedbacks, loading }) => {
  const [searchRating, setSearchRating] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks);

  React.useEffect(() => {
    setFilteredFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleSearch = async () => {
    if (searchRating) {
      try {
        const response = await searchFeedbacks(searchRating);
        setFilteredFeedbacks(response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setFilteredFeedbacks(feedbacks);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportFeedbacks();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedbacks.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="feedback-table-container">
      <div className="table-header">
        <h2>All Feedbacks</h2>
        <div className="table-actions">
          <div className="search-box">
            <Filter size={20} />
            <select
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
              className="rating-filter"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <button onClick={handleSearch} className="search-btn">
              <Search size={18} />
            </button>
          </div>
          <button onClick={handleExport} className="export-btn">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="no-data">
          <p>No feedbacks yet. Be the first to submit!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>
                    <div className="name-cell">{feedback.name}</div>
                  </td>
                  <td>
                    <div className="email-cell">{feedback.email}</div>
                  </td>
                  <td>
                    <div className="rating-cell">
                      {renderStars(feedback.rating)}
                    </div>
                  </td>
                  <td>
                    <div className="message-cell">{feedback.message}</div>
                  </td>
                  <td>
                    <div className="date-cell">{formatDate(feedback.createdAt)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
