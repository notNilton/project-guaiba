import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./EmployeesCrud.css";

interface Employee {
  id?: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  admissionDate: string;
  phone: string;
}

const MOCK_EMPLOYEE: Employee = {
  name: "",
  email: "",
  role: "",
  department: "",
  status: "active",
  admissionDate: "",
  phone: "",
};

export function EmployeesCrudScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState<Employee>(MOCK_EMPLOYEE);

  useEffect(() => {
    if (isEditing && id) {
      // Simulate fetching data
      // In a real app, this would be an API call
      if (id === "1") {
        setFormData({
          id: "1",
          name: "Ana Silva",
          email: "ana.silva@empresa.com",
          role: "Desenvolvedora Frontend",
          department: "Engenharia",
          status: "active",
          admissionDate: "2023-01-15",
          phone: "(11) 99999-9999",
        });
      }
    }
  }, [isEditing, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Saving employee:", formData);
    navigate("/employees");
  };

  return (
    <div className="employees-crud-container">
      <header className="page-header-simple">
        <button 
          onClick={() => navigate("/employees")}
          className="back-button"
        >
          ← Voltar para lista
        </button>
        <h1 className="page-title">
          {isEditing ? "Editar Funcionário" : "Novo Funcionário"}
        </h1>
        <p className="page-subtitle">
          {isEditing ? "Atualize as informações do funcionário" : "Preencha as informações para adicionar um novo funcionário"}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="content-card form-card">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: João Silva"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Corporativo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="joao@empresa.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">Cargo</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
              placeholder="Ex: Desenvolvedor Senior"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Departamento</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Selecione...</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Produto">Produto</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Vendas">Vendas</option>
              <option value="RH">RH</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admissionDate" className="form-label">Data de Admissão</label>
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span className="radio-text">Ativo</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span className="radio-text-inactive">Inativo</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-submit"
          >
            {isEditing ? "Salvar Alterações" : "Criar Funcionário"}
          </button>
        </div>
      </form>
    </div>
  );
}
