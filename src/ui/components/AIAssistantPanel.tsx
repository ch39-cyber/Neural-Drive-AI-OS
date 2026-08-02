import React, { useState } from 'react';
import './AIAssistantPanel.css';

const AIAssistantPanel: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'I detected heavy traffic ahead.' },
    { type: 'ai', text: 'Rerouting to save 5 min.' },
  ]);

  const quickCommands = [
    { icon: '⚡', label: 'Find Charging Station' },
    { icon: '🎵', label: 'Play Relax Music' },
    { icon: '🌡️', label: 'Adjust Cabin Temp' },
  ];

  return (
    <div className="ai-assistant-panel">
      <div className="panel-header">
        <span className="panel-icon">🤖</span>
        <h2>AI ASSISTANT</h2>
        <span className="online-indicator">🟢 Online</span>
      </div>

      <div className="assistant-content">
        <div className="messages-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="quick-commands">
          {quickCommands.map((cmd, idx) => (
            <button key={idx} className="quick-cmd-btn" title={cmd.label}>
              <span>{cmd.icon}</span>
              <span className="cmd-label">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
