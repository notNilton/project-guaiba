import type { Route } from "./+types/employees.$id";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalhes do Funcionário - Valkyrie System" },
  ];
}

export default function EmployeeDetails() {
  const { id } = useParams();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white">Detalhes do Funcionário</h1>
      <p className="text-gray-400">ID: {id}</p>
      <p className="text-gray-400 mt-4">Página em desenvolvimento...</p>
    </div>
  );
}
