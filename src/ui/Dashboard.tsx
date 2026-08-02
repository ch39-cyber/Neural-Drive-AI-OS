import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import NavigationPanel from './components/NavigationPanel';
import CarStatusPanel from './components/CarStatusPanel';
import AIAssistantPanel from './components/AIAssistantPanel';
import SystemOverviewPanel from './components/SystemOverviewPanel';
import SafetyIndicator from './components/SafetyIndicator';

interface DashboardState {
  speed: number;
  speedLimit: number;
  battery: number;
  range: number;
  temperature: number;
  mode: string;
  safetyLevel: string;
  destination: string;
  eta: number;
  trafficLevel: string;
  gpuLoad: number;
  activeTasks: number;
}

const Dashboard: React.FC = () => {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    speed: 78,
    speedLimit: 80,
    battery: 67,
    range: 312,
    temperature: 24,
    mode: 'D',
    safetyLevel: 'Autonomous',
    destination: 'BMW HQ Munich',
    eta: 18,
    trafficLevel: 'Heavy',
    gpuLoad: 68,
    activeTasks: 4,
  });

  const [time, setTime] = useState('10:42 PM');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));

      // Simulate state updates
      setDashboardState(prev => ({
        ...prev,
        speed: Math.max(0, Math.min(120, prev.speed + (Math.random() - 0.5) * 5)),
        battery: Math.max(0, prev.battery - 0.001),
        range: Math.max(0, prev.range - 0.001),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.1,
        gpuLoad: Math.max(40, Math.min(100, prev.gpuLoad + (Math.random() - 0.5) * 3)),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-brand">
          <span className="bmw-icon">🚗</span>
          <span className="brand-name">NEURALDRIVE AI OS</span>
          <span className="brand-subtitle">Connected Neural Network</span>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">GPU Load</span>
            <span className="stat-value">{dashboardState.gpuLoad.toFixed(0)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active AI Tasks</span>
            <span className="stat-value">{dashboardState.activeTasks} Running</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Latency</span>
            <span className="stat-value">23 ms</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mode</span>
            <span className="stat-value-mode">Autonomous</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Safety Level</span>
            <span className="stat-value-safety">High</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Cloud Sync</span>
            <span className="stat-value-connected">Connected</span>
          </div>
          <div className="header-time">{time}</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Section - Navigation */}
        <div className="left-section">
          <NavigationPanel
            destination={dashboardState.destination}
            eta={dashboardState.eta}
            distance={12.4}
            trafficLevel={dashboardState.trafficLevel}
          />
          <SafetyIndicator safetyLevel={dashboardState.safetyLevel} />
        </div>

        {/* Center Section - Main Display */}
        <div className="center-section">
          <div className="speed-display">
            <div className="speedometer">
              <svg viewBox="0 0 200 200" className="speedometer-svg">
                <circle cx="100" cy="100" r="95" className="speedometer-bg" />
                <path d="M 100 20 A 80 80 0 0 1 160 160" className="speedometer-arc" />
                <g className="speed-needle" style={{ transform: `rotate(${(dashboardState.speed / 120) * 180 - 90}deg)` }}>
                  <line x1="100" y1="100" x2="100" y2="40" strokeWidth="3" stroke="#00ffff" />
                </g>
              </svg>
              <div className="speed-text">
                <div className="speed-value">{dashboardState.speed.toFixed(0)}</div>
                <div className="speed-unit">km/h</div>
              </div>
            </div>
            <div className="speed-info">
              <div className="info-row">
                <span>Speed Limit</span>
                <span>{dashboardState.speedLimit}</span>
              </div>
              <div className="info-row">
                <span>Mode</span>
                <span className="mode-badge">{dashboardState.mode}</span>
              </div>
            </div>
          </div>

          {/* Central Car 3D View */}
          <div className="car-view-center">
            <div className="car-outline">🚗</div>
            <div className="road-markers">
              <div className="marker"></div>
              <div className="marker"></div>
              <div className="marker"></div>
            </div>
          </div>
        </div>

        {/* Right Section - AI Assistant & System Info */}
        <div className="right-section">
          <AIAssistantPanel />
          <SystemOverviewPanel gpuLoad={dashboardState.gpuLoad} />
        </div>
      </div>

      {/* Bottom Section - Car Status */}
      <div className="bottom-section">
        <CarStatusPanel
          battery={dashboardState.battery}
          range={dashboardState.range}
          temperature={dashboardState.temperature}
          tirePressure={2.3}
        />
      </div>
    </div>
  );
};

export default Dashboard;
