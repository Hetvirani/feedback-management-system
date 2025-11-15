import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitFeedback = (feedbackData) => {
  return api.post('/feedback', feedbackData);
};

export const getFeedbacks = () => {
  return api.get('/feedback');
};

export const getStats = () => {
  return api.get('/stats');
};

export const searchFeedbacks = (rating) => {
  return api.get(`/feedback/search?rating=${rating}`);
};

export const exportFeedbacks = () => {
  return api.get('/feedback/export', {
    responseType: 'blob',
  });
};

export default api;
