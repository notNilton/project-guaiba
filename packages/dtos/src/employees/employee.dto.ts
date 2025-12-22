import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  cpf!: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsNotEmpty()
  jobTitle!: string;

  @IsDateString()
  @IsNotEmpty()
  admissionDate!: string;

  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt!: string;

  @IsDateString()
  @IsNotEmpty()
  updatedAt!: string;
}

// Alias para compatibilidade
export { EmployeeDto as EmployeeDTO };
