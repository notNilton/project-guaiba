import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CreateEmployeeDto, UpdateEmployeeDto } from "@project-valkyrie/dtos";
import { useEmployees, useEmployee } from "../hooks/employees.hook";
import { useAuth } from "../../auth/context/auth.context";
import { EmployeeForm, type EmployeeFormData } from "../components/EmployeeForm";
import { Loader2, ArrowLeft } from "lucide-react";
import "./EmployeesCrud.css";

export function EmployeesCrudScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditing = Boolean(id);

  const { createEmployee, updateEmployee } = useEmployees();
  const { employee, loading: loadingEmployee } = useEmployee(id || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Partial<EmployeeFormData>>({});

  useEffect(() => {
    if (employee && isEditing) {
      setInitialData({
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

  const handleSubmit = async (data: EmployeeFormData) => {
    setError(null);

    const companyId = (user as any)?.companyId || localStorage.getItem('companyId');

    if (!companyId) {
      setError("Empresa não identificada. Por favor, faça login novamente.");
      return;
    }

    setSubmitting(true);

    try {
      if (isEditing && id) {
        const updateData: UpdateEmployeeDto = {
          fullName: data.fullName,
          rg: data.rg || undefined,
          birthDate: data.birthDate || undefined,
          address: data.address || undefined,
          phone: data.phone || undefined,
          jobTitle: data.jobTitle,
          admissionDate: data.admissionDate || undefined,
        };
        await updateEmployee(id, updateData);
      } else {
        const createData: CreateEmployeeDto = {
          fullName: data.fullName,
          cpf: data.cpf,
          rg: data.rg || undefined,
          birthDate: data.birthDate || undefined,
          address: data.address || undefined,
          phone: data.phone || undefined,
          jobTitle: data.jobTitle,
          admissionDate: data.admissionDate,
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
      <div className="employees-crud-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="employees-crud-container">
      <header className="page-header-simple">
        <button
          onClick={() => navigate("/employees")}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Voltar para lista
        </button>
        <h1 className="page-title">
          {isEditing ? "Editar Funcionário" : "Novo Funcionário"}
        </h1>
        <p className="page-subtitle">
          {isEditing ? "Atualize as informações do funcionário" : "Preencha as informações para adicionar um novo funcionário"}
        </p>
      </header>

      {error && (
        <div className="error-banner mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="content-card form-card">
        <EmployeeForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/employees")}
          isLoading={submitting}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}

