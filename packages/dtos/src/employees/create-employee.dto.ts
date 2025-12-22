import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
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
  @IsOptional()
  admissionDate?: string;

  @IsString()
  @IsNotEmpty()
  companyId!: string;
}
