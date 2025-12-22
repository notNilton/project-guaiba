import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import "./EmployeeForm.css";

export interface EmployeeFormData {
    fullName: string;
    cpf: string;
    rg: string;
    birthDate: string;
    address: string;
    phone: string;
    jobTitle: string;
    admissionDate: string;
}

interface EmployeeFormProps {
    initialData?: Partial<EmployeeFormData>;
    onSubmit: (data: EmployeeFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
    isEditing?: boolean;
}

export function EmployeeForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
    isEditing = false,
}: EmployeeFormProps) {
    const [formData, setFormData] = useState<EmployeeFormData>({
        fullName: "",
        cpf: "",
        rg: "",
        birthDate: "",
        address: "",
        phone: "",
        jobTitle: "",
        admissionDate: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
            }));
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
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
                    onClick={onCancel}
                    className="btn-secondary"
                    disabled={isLoading}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
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
    );
}
