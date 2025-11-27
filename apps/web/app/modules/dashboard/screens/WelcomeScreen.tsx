import { StatsCard } from "../components/StatsCard";

export function WelcomeScreen() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back to your control center.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Total Revenue", value: "$124,592", change: "+12.5%", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30", text: "text-green-400" },
          { title: "Active Users", value: "8,549", change: "+24.2%", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", text: "text-blue-400" },
          { title: "Server Status", value: "99.9%", change: "Optimal", color: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/30", text: "text-purple-400" },
        ].map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                  📝
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-white">New transaction recorded</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
                <span className="text-xs text-gray-500">View</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-6">System Health</h3>
          <div className="space-y-6">
            {[
              { label: "CPU Usage", value: 45, color: "bg-blue-500" },
              { label: "Memory", value: 72, color: "bg-purple-500" },
              { label: "Storage", value: 28, color: "bg-green-500" },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{metric.label}</span>
                  <span className="text-white">{metric.value}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${metric.color} rounded-full transition-all duration-1000`} 
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
