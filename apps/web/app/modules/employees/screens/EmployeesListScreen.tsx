import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./EmployeesList.style.css";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  department: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    role: "Desenvolvedora Frontend",
    status: "active",
    department: "Engenharia",
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos.santos@empresa.com",
    role: "Product Manager",
    status: "active",
    department: "Produto",
  },
  {
    id: "3",
    name: "Mariana Costa",
    email: "mariana.costa@empresa.com",
    role: "Designer UX/UI",
    status: "inactive",
    department: "Design",
  },
];

export function EmployeesListScreen() {
  const navigate = useNavigate();
  const [employees] = useState<Employee[]>(MOCK_EMPLOYEES);

  return (
    <div className="employees-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Funcionários</h1>
          <p className="page-subtitle">Gerencie a equipe da sua empresa</p>
        </div>
        <Link 
          to="/employees/new"
          className="btn-primary"
        >
          <span className="mr-2">+</span>
          Novo Funcionário
        </Link>
      </header>

      <div className="content-card">
        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Nome</th>
                <th className="table-header-cell">Cargo</th>
                <th className="table-header-cell">Departamento</th>
                <th className="table-header-cell">Status</th>
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
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="employee-name">{employee.name}</p>
                        <p className="employee-email">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell table-cell-text">{employee.role}</td>
                  <td className="table-cell table-cell-text">{employee.department}</td>
                  <td className="table-cell">
                    <span
                      className={`status-badge ${
                        employee.status === "active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {employee.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="table-cell text-right">
                    <button 
                      className="btn-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/employees/${employee.id}`);
                      }}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {employees.length === 0 && (
          <div className="empty-state">
            Nenhum funcionário encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
