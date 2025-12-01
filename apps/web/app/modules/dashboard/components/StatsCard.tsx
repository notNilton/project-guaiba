import type { ReactNode } from "react";
import "./StatsCard.style.css";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  border?: string;
  text: string;
  icon?: ReactNode;
}

export function StatsCard({ title, value, change, color, text, icon }: StatsCardProps) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="stats-card-title mb-0">{title}</h3>
        {icon && <div className="stats-card-icon">{icon}</div>}
      </div>
      <div className="stats-card-content">
        <span className="stats-card-value">{value}</span>
        <span className={`stats-card-change ${text}`}>{change}</span>
      </div>
    </div>
  );
}
