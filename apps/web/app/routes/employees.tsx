import type { Route } from "./+types/employees";
import { EmployeesListScreen } from "../modules/employees/pages/EmployeesList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Funcionários - Valkyrie System" },
  ];
}

export default function Employees() {
  return <EmployeesListScreen />;
}
