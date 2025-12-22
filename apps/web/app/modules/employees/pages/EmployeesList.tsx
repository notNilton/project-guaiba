import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useEmployees } from "../hooks/employees.hook";
import { useAuth } from "../../auth/context/auth.context";
import { Users, Loader2, AlertCircle, Trash2, Edit } from "lucide-react";
import "./EmployeesList.css";

export function EmployeesListScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const companyId = user?.companyId;

  const { employees, loading, error, deleteEmployee } = useEmployees(companyId);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (!companyId) {
      alert('Empresa não identificada');
      return;
    }

    setDeleting(true);
    try {
      await deleteEmployee(id, companyId);
      setDeleteConfirm(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar funcionário');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (loading && employees.length === 0) {
    return (
      <div className="employees-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="employees-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Funcionários</h1>
          <p className="page-subtitle">Gerencie a equipe da sua empresa</p>
        </div>
        <Link
          to="/employees-create"
          className="btn-primary"
        >
          <span className="mr-2">+</span>
          Novo Funcionário
        </Link>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={20} />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="content-card">
        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Nome</th>
                <th className="table-header-cell">CPF</th>
                <th className="table-header-cell">Cargo</th>
                <th className="table-header-cell">Admissão</th>
                <th className="table-header-cell text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  onClick={() => navigate(`/employees/${employee.id}`)}
                >
                  <td className="table-cell">
                    <div className="employee-info">
                      <div className="employee-avatar">
                        {employee.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="employee-name">{employee.fullName}</p>
                        {employee.phone && (
                          <p className="employee-email">{employee.phone}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="table-cell table-cell-text">
                    {employee.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                  </td>
                  <td className="table-cell table-cell-text">{employee.jobTitle}</td>
                  <td className="table-cell table-cell-text">
                    {formatDate(employee.admissionDate)}
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        className="btn-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/employees/${employee.id}`);
                        }}
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-icon-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm(employee.id);
                        }}
                        title="Deletar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {employees.length === 0 && !loading && (
          <div className="empty-state">
            <Users size={48} className="text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg mb-2">Nenhum funcionário cadastrado</p>
            <p className="text-gray-500 text-sm mb-6">Comece adicionando o primeiro funcionário da sua empresa</p>
            <Link to="/employees-create" className="btn-primary">
              Adicionar Funcionário
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Excluindo...
                  </>
                ) : (
                  'Excluir'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
