import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from '@project-valkyrie/dtos';
import { PrismaService } from '../prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Verify company exists
    const company = await this.prisma.company.findUnique({
      where: { id: createEmployeeDto.companyId },
    });

    if (!company) {
      throw new BadRequestException('Invalid company ID');
    }

    // Check if CPF already exists in this company
    const existingEmployee = await this.prisma.employee.findFirst({
      where: {
        cpf: createEmployeeDto.cpf,
        companyId: createEmployeeDto.companyId,
      },
    });

    if (existingEmployee) {
      throw new BadRequestException('Employee with this CPF already exists in this company');
    }

    return this.prisma.employee.create({
      data: {
        fullName: createEmployeeDto.fullName,
        cpf: createEmployeeDto.cpf,
        rg: createEmployeeDto.rg,
        birthDate: createEmployeeDto.birthDate ? new Date(createEmployeeDto.birthDate) : null,
        address: createEmployeeDto.address,
        phone: createEmployeeDto.phone,
        jobTitle: createEmployeeDto.jobTitle,
        admissionDate: createEmployeeDto.admissionDate ? new Date(createEmployeeDto.admissionDate) : new Date(),
        company: { connect: { id: createEmployeeDto.companyId } },
      },
    });
  }

  async findAll(companyId?: string): Promise<Employee[]> {
    const where = companyId ? { companyId } : {};

    return this.prisma.employee.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        contracts: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // Verify employee exists
    await this.findOne(id);

    return this.prisma.employee.update({
      where: { id },
      data: {
        fullName: updateEmployeeDto.fullName,
        rg: updateEmployeeDto.rg,
        birthDate: updateEmployeeDto.birthDate ? new Date(updateEmployeeDto.birthDate) : undefined,
        address: updateEmployeeDto.address,
        phone: updateEmployeeDto.phone,
        jobTitle: updateEmployeeDto.jobTitle,
        admissionDate: updateEmployeeDto.admissionDate ? new Date(updateEmployeeDto.admissionDate) : undefined,
      },
    });
  }

  async remove(id: string, companyId: string): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Verify employee belongs to the company
    if (employee.companyId !== companyId) {
      throw new BadRequestException('Employee does not belong to this company');
    }

    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
