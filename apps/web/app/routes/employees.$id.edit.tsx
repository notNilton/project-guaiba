import type { Route } from "./+types/employees.$id.edit";
import { EmployeeFormScreen } from "../modules/employees/pages/EmployeeForm";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Editar Funcionário - Valkyrie System" },
  ];
}

export default function EditEmployee() {
  return <EmployeeFormScreen />;
}
