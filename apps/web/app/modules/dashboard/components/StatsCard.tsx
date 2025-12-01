import "./StatsCard.style.css";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  color: string; // Now expects class names like "card-green"
  border: string; // Not used directly anymore, handled by color class
  text: string; // Now expects class names like "text-green"
}

export function StatsCard({ title, value, change, color, text }: StatsCardProps) {
  return (
    <div className={`stats-card ${color}`}>
      <h3 className="stats-card-title">{title}</h3>
      <div className="stats-card-content">
        <span className="stats-card-value">{value}</span>
        <span className={`stats-card-change ${text}`}>{change}</span>
      </div>
    </div>
  );
}
