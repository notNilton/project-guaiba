interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  border: string;
  text: string;
}

export function StatsCard({ title, value, change, color, border, text }: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} border ${border} backdrop-blur-md rounded-2xl p-6`}>
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className={`text-sm font-medium ${text}`}>{change}</span>
      </div>
    </div>
  );
}
