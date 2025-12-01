import { StatsCard } from "../components/StatsCard";
import { 
  Users, 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import "./Dashboard.style.css";

export function DashboardScreen() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Visão Geral</h1>
        <p className="dashboard-subtitle">Monitoramento em tempo real de contratos e equipe.</p>
      </header>

      <div className="stats-grid">
        <StatsCard 
          title="Contratos Ativos" 
          value="156" 
          change="+12 este mês" 
          color="card-blue" 
          text="text-blue" 
          // @ts-ignore - We will update StatsCard to accept icon next
          icon={<FileText size={24} className="text-blue-400" />}
        />
        <StatsCard 
          title="Funcionários Totais" 
          value="48" 
          change="3 em férias" 
          color="card-purple" 
          text="text-purple"
          // @ts-ignore
          icon={<Users size={24} className="text-purple-400" />}
        />
        <StatsCard 
          title="Batidas Hoje" 
          value="42/45" 
          change="93% presença" 
          color="card-green" 
          text="text-green"
          // @ts-ignore
          icon={<Clock size={24} className="text-green-400" />}
        />
      </div>

      <div className="content-grid">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title mb-0">Últimas Batidas de Ponto</h3>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Ver todas</button>
          </div>
          <div className="activity-list">
            {[
              { name: "Ana Silva", time: "08:02", type: "Entrada", status: "success" },
              { name: "Carlos Oliveira", time: "08:15", type: "Entrada", status: "warning" },
              { name: "Mariana Santos", time: "07:55", type: "Entrada", status: "success" },
              { name: "Roberto Costa", time: "08:00", type: "Entrada", status: "success" },
            ].map((log, i) => (
              <div key={i} className="activity-item">
                <div className={`activity-icon ${log.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                  <Clock size={18} />
                </div>
                <div className="activity-details">
                  <p className="activity-text">{log.name}</p>
                  <p className="activity-time">{log.type} às {log.time}</p>
                </div>
                <span className={`text-xs font-medium ${log.status === 'success' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {log.status === 'success' ? 'No horário' : 'Atraso'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title mb-0">Próximos Vencimentos de Contrato</h3>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Gerenciar</button>
          </div>
          <div className="health-list">
            {[
              { client: "TechSolutions Ltda", date: "15/12/2025", days: 14, value: "R$ 12.500" },
              { client: "Comércio Silva", date: "20/12/2025", days: 19, value: "R$ 4.200" },
              { client: "Indústria Beta", date: "05/01/2026", days: 35, value: "R$ 25.000" },
            ].map((contract, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors border border-gray-700/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{contract.client}</p>
                    <p className="text-xs text-gray-400">Vence em {contract.days} dias</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{contract.value}</p>
                  <p className="text-xs text-gray-500">{contract.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <h4 className="text-sm font-medium text-gray-300 mb-4">Alertas do Sistema</h4>
            <div className="flex gap-3">
              <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-400 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-400">Ponto Pendente</p>
                  <p className="text-xs text-gray-400 mt-1">3 funcionários sem registro hoje.</p>
                </div>
              </div>
              <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-3">
                <Calendar size={18} className="text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-yellow-400">Férias Próximas</p>
                  <p className="text-xs text-gray-400 mt-1">2 funcionários saem em 5 dias.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
