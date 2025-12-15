import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CreateEmployeeDto, UpdateEmployeeDto } from "@project-valkyrie/dtos";
import { useEmployees, useEmployee } from "../hooks/useEmployees";
import { useAuth } from "../../auth/context/auth.context";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import "./EmployeeForm.css";

export function EmployeeFormScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditing = Boolean(id);

  const { createEmployee, updateEmployee } = useEmployees();
  const { employee, loading: loadingEmployee } = useEmployee(id || "");

  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    rg: "",
    birthDate: "",
    address: "",
    phone: "",
    jobTitle: "",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (employee && isEditing) {
      setFormData({
        fullName: employee.fullName,
        cpf: employee.cpf,
        rg: employee.rg || "",
        birthDate: employee.birthDate
          ? new Date(employee.birthDate).toISOString().split("T")[0]
          : "",
        address: employee.address || "",
        phone: employee.phone || "",
        jobTitle: employee.jobTitle,
        admissionDate: new Date(employee.admissionDate).toISOString().split("T")[0],
      });
    }
  }, [employee, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Get companyId - for now using a fallback, but should come from user context
    const companyId = (user as any)?.companyId || localStorage.getItem('companyId');
    
    if (!companyId) {
      setError("Empresa não identificada. Por favor, faça login novamente.");
      return;
    }

    setSubmitting(true);

    try {
      if (isEditing && id) {
        const updateData: UpdateEmployeeDto = {
          fullName: formData.fullName,
          rg: formData.rg || undefined,
          birthDate: formData.birthDate || undefined,
          address: formData.address || undefined,
          phone: formData.phone || undefined,
          jobTitle: formData.jobTitle,
          admissionDate: formData.admissionDate || undefined,
        };
        await updateEmployee(id, updateData);
      } else {
        const createData: CreateEmployeeDto = {
          fullName: formData.fullName,
          cpf: formData.cpf,
          rg: formData.rg || undefined,
          birthDate: formData.birthDate || undefined,
          address: formData.address || undefined,
          phone: formData.phone || undefined,
          jobTitle: formData.jobTitle,
          admissionDate: formData.admissionDate,
          companyId,
        };
        await createEmployee(createData);
      }
      navigate("/employees");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar funcionário");
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditing && loadingEmployee) {
    return (
      <div className="form-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <header className="form-header">
        <button
          onClick={() => navigate("/employees")}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1 className="form-title">
          {isEditing ? "Editar Funcionário" : "Novo Funcionário"}
        </h1>
      </header>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-grid">
          {/* Full Name */}
          <div className="form-group full-width">
            <label htmlFor="fullName" className="form-label">
              Nome Completo *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* CPF */}
          <div className="form-group">
            <label htmlFor="cpf" className="form-label">
              CPF *
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="form-input"
              placeholder="000.000.000-00"
              required
              disabled={isEditing}
            />
          </div>

          {/* RG */}
          <div className="form-group">
            <label htmlFor="rg" className="form-label">
              RG
            </label>
            <input
              type="text"
              id="rg"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Birth Date */}
          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Telefone
            </label>
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

          {/* Job Title */}
          <div className="form-group">
            <label htmlFor="jobTitle" className="form-label">
              Cargo *
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Admission Date */}
          <div className="form-group">
            <label htmlFor="admissionDate" className="form-label">
              Data de Admissão *
            </label>
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Address */}
          <div className="form-group full-width">
            <label htmlFor="address" className="form-label">
              Endereço
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input form-textarea"
              rows={3}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="btn-secondary"
            disabled={submitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2" size={18} />
                {isEditing ? "Atualizar" : "Criar"} Funcionário
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
