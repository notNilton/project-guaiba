import type { Route } from "./+types/employees-edit";
import { EmployeesCrudScreen } from "../modules/employees/pages/EmployeesCrud";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Editar Funcionário - Valkyrie System" },
  ];
}

export default function EditEmployee() {
  return <EmployeesCrudScreen />;
}
