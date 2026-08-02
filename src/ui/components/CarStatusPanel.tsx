import React from 'react';
import './CarStatusPanel.css';

interface CarStatusPanelProps {
  battery: number;
  range: number;
  temperature: number;
  tirePressure: number;
}

const CarStatusPanel: React.FC<CarStatusPanelProps> = ({
  battery,
  range,
  temperature,
  tirePressure,
}) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return '#34d399';
    if (level > 20) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <div className="car-status-panel">
      <div className="status-title">
        <span>🚗 CAR STATUS</span>
        <span className="battery-level" style={{ color: getBatteryColor(battery) }}>
          {battery.toFixed(1)}%
        </span>
      </div>

      <div className="status-grid">
        <div className="status-card battery-card">
          <div className="card-header">Battery</div>
          <div className="battery-bar">
            <div
              className="battery-fill"
              style={{ width: `${battery}%`, backgroundColor: getBatteryColor(battery) }}
            ></div>
          </div>
          <div className="card-value">{battery.toFixed(1)}%</div>
        </div>

        <div className="status-card range-card">
          <div className="card-header">Range</div>
          <div className="card-value">{range.toFixed(0)} km</div>
          <div className="card-subtext">Est. remaining</div>
        </div>

        <div className="status-card temp-card">
          <div className="card-header">Temperature</div>
          <div className="card-value">{temperature.toFixed(1)}°C</div>
          <div className="card-subtext">Cabin temp</div>
        </div>

        <div className="status-card pressure-card">
          <div className="card-header">Tire Pressure</div>
          <div className="card-value">{tirePressure} bar</div>
          <div className="card-subtext">2.3 bar avg</div>
        </div>
      </div>
    </div>
  );
};

export default CarStatusPanel;
