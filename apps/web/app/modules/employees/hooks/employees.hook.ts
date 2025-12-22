import { useState, useEffect } from 'react';
import { CreateEmployeeDto, EmployeeDto, UpdateEmployeeDto } from '@project-valkyrie/dtos';
import { employeesApi } from '../services/employees.service';

export function useEmployees(companyId?: string) {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeesApi.getAll(companyId);
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [companyId]);

  const createEmployee = async (data: CreateEmployeeDto) => {
    setLoading(true);
    setError(null);
    try {
      const newEmployee = await employeesApi.create(data);
      setEmployees((prev) => [newEmployee, ...prev]);
      return newEmployee;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create employee';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: string, data: UpdateEmployeeDto) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await employeesApi.update(id, data);
      setEmployees((prev) => prev.map((emp) => (emp.id === id ? updated : emp)));
      return updated;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update employee';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string, companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      await employeesApi.delete(id, companyId);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete employee';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}

export function useEmployee(id: string) {
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployee = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeesApi.getById(id);
      setEmployee(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  return {
    employee,
    loading,
    error,
    refetch: fetchEmployee,
  };
}
