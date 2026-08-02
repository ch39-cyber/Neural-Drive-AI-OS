import React from 'react';
import './SystemOverviewPanel.css';

interface SystemOverviewPanelProps {
  gpuLoad: number;
}

const SystemOverviewPanel: React.FC<SystemOverviewPanelProps> = ({ gpuLoad }) => {
  const tasks = [
    { name: 'Obstacle Detection', priority: 'HIGH', status: '✓' },
    { name: 'Navigation AI', priority: 'HIGH', status: '✓' },
    { name: 'Driver Monitoring', priority: 'MEDIUM', status: '✓' },
    { name: 'Voice Assistant', priority: 'LOW', status: '⏸' },
    { name: 'Entertainment System', priority: 'LOW', status: '⏸' },
  ];

  const getResourceColor = (load: number) => {
    if (load < 50) return '#34d399';
    if (load < 75) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <div className="system-overview-panel">
      <div className="panel-header">
        <span className="panel-icon">⚙️</span>
        <h2>AI SYSTEM OVERVIEW</h2>
      </div>

      <div className="overview-content">
        {/* GPU Load */}
        <div className="gpu-section">
          <div className="gpu-title">Task Priority Queue</div>
          <div className="task-list">
            {tasks.map((task, idx) => (
              <div key={idx} className="task-item">
                <span className="task-number">{idx + 1}</span>
                <span className="task-name">{task.name}</span>
                <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className="task-status">{task.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GPU Allocation */}
        <div className="gpu-allocation">
          <div className="allocation-title">GPU Allocation</div>
          <div className="allocation-item">
            <span>Vision Model</span>
            <div className="allocation-bar">
              <div
                className="allocation-fill"
                style={{ width: '42%', backgroundColor: 'rgba(0, 212, 255, 0.8)' }}
              ></div>
            </div>
            <span>42%</span>
          </div>
          <div className="allocation-item">
            <span>Navigation AI</span>
            <div className="allocation-bar">
              <div
                className="allocation-fill"
                style={{ width: '28%', backgroundColor: 'rgba(124, 58, 237, 0.8)' }}
              ></div>
            </div>
            <span>28%</span>
          </div>
          <div className="allocation-item">
            <span>Driver Monitoring</span>
            <div className="allocation-bar">
              <div
                className="allocation-fill"
                style={{ width: '12%', backgroundColor: 'rgba(251, 191, 36, 0.8)' }}
              ></div>
            </div>
            <span>12%</span>
          </div>
          <div className="allocation-item">
            <span>LLM Assistant</span>
            <div className="allocation-bar">
              <div
                className="allocation-fill"
                style={{ width: '12%', backgroundColor: 'rgba(34, 197, 94, 0.8)' }}
              ></div>
            </div>
            <span>12%</span>
          </div>
          <div className="allocation-item">
            <span>Other Tasks</span>
            <div className="allocation-bar">
              <div
                className="allocation-fill"
                style={{ width: '6%', backgroundColor: 'rgba(168, 85, 247, 0.8)' }}
              ></div>
            </div>
            <span>6%</span>
          </div>
        </div>

        {/* Resource Routing */}
        <div className="resource-routing">
          <div className="routing-title">Resource Routing</div>
          <div className="routing-item">
            <span>Edge (In-Car)</span>
            <span className="routing-value">54%</span>
          </div>
          <div className="routing-item">
            <span>Cloud GPU</span>
            <span className="routing-value">46%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverviewPanel;
