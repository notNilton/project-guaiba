import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteEmployeeDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  companyId!: string;
}
