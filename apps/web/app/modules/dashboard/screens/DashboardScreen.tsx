import { StatsCard } from "../components/StatsCard";
import "./Dashboard.style.css";

export function DashboardScreen() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Welcome back to your control center.</p>
      </header>

      <div className="stats-grid">
        {[
          { title: "Total Revenue", value: "$124,592", change: "+12.5%", color: "card-green", border: "", text: "text-green" },
          { title: "Active Users", value: "8,549", change: "+24.2%", color: "card-blue", border: "", text: "text-blue" },
          { title: "Server Status", value: "99.9%", change: "Optimal", color: "card-purple", border: "", text: "text-purple" },
        ].map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="content-grid">
        <div className="dashboard-card">
          <h3 className="card-title">Recent Activity</h3>
          <div className="activity-list">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon">
                  📝
                </div>
                <div className="activity-details">
                  <p className="activity-text">New transaction recorded</p>
                  <p className="activity-time">2 minutes ago</p>
                </div>
                <span className="activity-action">View</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">System Health</h3>
          <div className="health-list">
            {[
              { label: "CPU Usage", value: 45, color: "bg-blue" },
              { label: "Memory", value: 72, color: "bg-purple" },
              { label: "Storage", value: 28, color: "bg-green" },
            ].map((metric, i) => (
              <div key={i}>
                <div className="health-item-header">
                  <span className="health-label">{metric.label}</span>
                  <span className="health-value">{metric.value}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className={`progress-bar-fill ${metric.color}`} 
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
