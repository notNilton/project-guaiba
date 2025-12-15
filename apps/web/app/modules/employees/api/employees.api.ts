import { CreateEmployeeDto, EmployeeDto, UpdateEmployeeDto } from '@project-valkyrie/dtos';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const employeesApi = {
  async getAll(companyId?: string): Promise<EmployeeDto[]> {
    const url = companyId ? `${API_BASE_URL}/employees?companyId=${companyId}` : `${API_BASE_URL}/employees`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    return response.json();
  },

  async getById(id: string): Promise<EmployeeDto> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }

    return response.json();
  },

  async create(data: CreateEmployeeDto): Promise<EmployeeDto> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create employee');
    }

    return response.json();
  },

  async update(id: string, data: UpdateEmployeeDto): Promise<EmployeeDto> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update employee');
    }

    return response.json();
  },

  async delete(id: string, companyId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}?companyId=${companyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete employee');
    }
  },
};
