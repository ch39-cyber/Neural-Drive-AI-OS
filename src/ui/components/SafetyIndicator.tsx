import React from 'react';
import './SafetyIndicator.css';

interface SafetyIndicatorProps {
  safetyLevel: string;
}

const SafetyIndicator: React.FC<SafetyIndicatorProps> = ({ safetyLevel }) => {
  const getSafetyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'safe':
        return '#34d399';
      case 'caution':
        return '#fbbf24';
      case 'warning':
        return '#f97316';
      case 'critical':
        return '#ef4444';
      default:
        return '#00ffff';
    }
  };

  return (
    <div className="safety-indicator">
      <div className="indicator-header">
        <span className="safety-icon">⚠️</span>
        <h3>Safety Status</h3>
      </div>
      <div className="indicator-content">
        <div className="safety-badge" style={{ borderColor: getSafetyColor(safetyLevel) }}>
          <div className="safety-dot" style={{ backgroundColor: getSafetyColor(safetyLevel) }}></div>
          <span className="safety-text">{safetyLevel}</span>
        </div>
        <div className="safety-details">
          <div className="detail-item">
            <span>🚫</span>
            <span>Collision Avoidance: 95%</span>
          </div>
          <div className="detail-item">
            <span>🛣️</span>
            <span>Lane Keeping: Active</span>
          </div>
          <div className="detail-item">
            <span>📡</span>
            <span>Traffic Awareness: On</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyIndicator;
