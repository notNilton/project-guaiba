import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from '@project-valkyrie/dtos';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from './upload.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

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
        photoUrl: createEmployeeDto.photoUrl,
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
        photoUrl: updateEmployeeDto.photoUrl,
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

    // Delete employee photo if exists
    if (employee.photoUrl) {
      await this.uploadService.deleteEmployeePhoto(employee.photoUrl);
    }

    return this.prisma.employee.delete({
      where: { id },
    });
  }

  /**
   * Upload de foto do funcionário
   */
  async uploadPhoto(id: string, file: Express.Multer.File): Promise<Employee> {
    const employee = await this.findOne(id);

    // Delete old photo if exists
    if (employee.photoUrl) {
      await this.uploadService.deleteEmployeePhoto(employee.photoUrl);
    }

    // Upload new photo
    const photoUrl = await this.uploadService.uploadEmployeePhoto(file, id);

    // Update employee with new photo URL
    return this.prisma.employee.update({
      where: { id },
      data: { photoUrl },
    });
  }

  /**
   * Remove foto do funcionário
   */
  async deletePhoto(id: string): Promise<void> {
    const employee = await this.findOne(id);

    if (!employee.photoUrl) {
      throw new BadRequestException('Employee does not have a photo');
    }

    // Delete photo file
    await this.uploadService.deleteEmployeePhoto(employee.photoUrl);

    // Update employee to remove photo URL
    await this.prisma.employee.update({
      where: { id },
      data: { photoUrl: null },
    });
  }
}
