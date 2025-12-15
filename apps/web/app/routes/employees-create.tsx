import type { Route } from "./+types/employees-create";
import { EmployeeFormScreen } from "../modules/employees/pages/EmployeeForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Novo Funcionário - Valkyrie System" },
  ];
}

export default function CreateEmployee() {
  return <EmployeeFormScreen />;
}
