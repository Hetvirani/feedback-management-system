import React from 'react';
import { Users, Star, TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Feedbacks',
      value: stats.totalCount,
      icon: Users,
      color: 'blue',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Average Rating',
      value: stats.avgRating,
      icon: Star,
      color: 'yellow',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Positive Feedbacks',
      value: stats.positiveCount,
      icon: TrendingUp,
      color: 'green',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Negative Feedbacks',
      value: stats.negativeCount,
      icon: TrendingDown,
      color: 'red',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  if (loading) {
    return (
      <div className="stats-container">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card loading-card">
            <div className="skeleton"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-container">
      {cards.map((card, index) => (
        <div key={index} className="stat-card" style={{ background: card.gradient }}>
          <div className="stat-icon">
            <card.icon size={30} />
          </div>
          <div className="stat-content">
            <h3>{card.title}</h3>
            <p className="stat-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
