import React from 'react';
import './NavigationPanel.css';

interface NavigationPanelProps {
  destination: string;
  eta: number;
  distance: number;
  trafficLevel: string;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  destination,
  eta,
  distance,
  trafficLevel,
}) => {
  return (
    <div className="navigation-panel">
      <div className="panel-header">
        <span className="panel-icon">🧭</span>
        <h2>NAVIGATION</h2>
      </div>
      <div className="nav-content">
        <div className="destination-box">
          <div className="label">Destination</div>
          <div className="value">{destination}</div>
        </div>
        <div className="route-stats">
          <div className="stat">
            <span className="stat-label">ETA</span>
            <span className="stat-value">{eta} min</span>
          </div>
          <div className="stat">
            <span className="stat-label">Distance</span>
            <span className="stat-value">{distance.toFixed(1)} km</span>
          </div>
        </div>
        <div className="traffic-indicator">
          <span className="traffic-label">Traffic</span>
          <span className={`traffic-level traffic-${trafficLevel.toLowerCase()}`}>
            {trafficLevel}
          </span>
        </div>
        <div className="reroute-button">
          <button>🔄 Reroute Suggested</button>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
