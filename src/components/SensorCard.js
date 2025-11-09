import React from 'react';

const SensorCard = ({ 
  title, 
  value, 
  unit, 
  status, 
  min, 
  max, 
  optimalRange, 
  description, 
  icon, 
  type 
}) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'optimal': return 'Optimal';
      case 'warning': return 'Perhatian';
      case 'attention': return 'Perlu Monitor';
      case 'loading': return 'Memuat...';
      default: return 'Unknown';
    }
  };

  const calculatePercentage = (value, min, max) => {
    if (value === null || value === undefined) return 0;
    return ((value - min) / (max - min)) * 100;
  };

  const progressPercentage = calculatePercentage(value, min, max);

  const displayValue = value !== null && value !== undefined ? value.toFixed(1) : 'Loading...';

  return (
    <div className={`sensor-card ${type}`}>
      <div className="sensor-header">
        <div className="sensor-icon">
          {icon}
        </div>
        <div className="sensor-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="sensor-value">
        <span className="value">{displayValue}</span>
        {value !== null && value !== undefined && (
          <span className="unit">{unit}</span>
        )}
        <div className={`status ${status}`}>
          {getStatusText(status)}
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-label">
          <span>{min}{unit}</span>
          <span>Rentang Optimal: {optimalRange.min}-{optimalRange.max}{unit}</span>
          <span>{max}{unit}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;