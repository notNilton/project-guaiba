import type { Route } from "./+types/employees-create";
import { EmployeesCrudScreen } from "../modules/employees/pages/EmployeesCrud";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Novo Funcionário - Valkyrie System" },
  ];
}

export default function CreateEmployee() {
  return <EmployeesCrudScreen />;
}
