import React, { useEffect, useState } from 'react';
import './DashboardUI.css';
import NavigationPanel from './components/NavigationPanel';
import CarStatusPanel from './components/CarStatusPanel';
import AIAssistantPanel from './components/AIAssistantPanel';
import AISystemOverview from './components/AISystemOverview';
import HUDDisplay from './components/HUDDisplay';
import TopMetricsBar from './components/TopMetricsBar';
import ControlsBar from './components/ControlsBar';

interface DashboardState {
  gpuLoad: number;
  activeTasks: number;
  latency: number;
  mode: string;
  safetyLevel: string;
  cloudSync: boolean;
  speed: number;
  speedLimit: number;
  gear: string;
  battery: number;
  range: number;
  temperature: number;
  tirePressure: number;
  destination: string;
  eta: number;
  traffic: string;
  aiAssistantMessage: string;
  taskQueue: Array<{id: number; name: string; priority: string; status: string}>;
  gpuAllocation: {visionModel: number; navigationAI: number; llmAssistant: number; otherTasks: number};
}

const DashboardUI: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardState>({
    gpuLoad: 68,
    activeTasks: 4,
    latency: 23,
    mode: 'Autonomous',
    safetyLevel: 'High',
    cloudSync: true,
    speed: 78,
    speedLimit: 80,
    gear: 'D',
    battery: 67,
    range: 312,
    temperature: 24,
    tirePressure: 2.3,
    destination: 'BMW HQ Munich',
    eta: 18,
    traffic: 'Heavy',
    aiAssistantMessage: 'I detected heavy traffic ahead; rerouting to save ~5 min.',
    taskQueue: [
      {id: 1, name: 'Collision Avoidance', priority: 'HIGH', status: 'running'},
      {id: 2, name: 'Navigation AI', priority: 'HIGH', status: 'running'},
      {id: 3, name: 'Driver Monitoring', priority: 'MEDIUM', status: 'running'},
      {id: 4, name: 'Voice Assistant', priority: 'LOW', status: 'idle'},
      {id: 5, name: 'Entertainment System', priority: 'LOW', status: 'idle'}
    ],
    gpuAllocation: {
      visionModel: 42,
      navigationAI: 28,
      llmAssistant: 18,
      otherTasks: 12
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        speed: Math.min(prev.speed + (Math.random() - 0.5) * 4, 120),
        battery: Math.max(prev.battery - 0.05, 0),
        range: Math.max(prev.range - 0.1, 0),
        gpuLoad: 60 + Math.random() * 20,
        latency: 20 + Math.random() * 10
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="neural-drive-dashboard">
      <TopMetricsBar data={dashboardData} />
      
      <div className="main-content">
        <div className="left-panel">
          <NavigationPanel 
            destination={dashboardData.destination}
            eta={dashboardData.eta}
            traffic={dashboardData.traffic}
          />
        </div>

        <div className="center-display">
          <HUDDisplay data={dashboardData} />
          <CarStatusPanel data={dashboardData} />
        </div>

        <div className="right-panel">
          <AIAssistantPanel message={dashboardData.aiAssistantMessage} />
          <AISystemOverview 
            taskQueue={dashboardData.taskQueue}
            gpuAllocation={dashboardData.gpuAllocation}
          />
        </div>
      </div>

      <ControlsBar temperature={dashboardData.temperature} />
    </div>
  );
};

export default DashboardUI;