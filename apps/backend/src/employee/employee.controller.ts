import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeeService } from './employee.service';
import { UploadService } from './upload.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '@project-valkyrie/dtos';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('companyId') companyId?: string) {
    return this.employeeService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('companyId') companyId: string) {
    return this.employeeService.remove(id, companyId);
  }

  /**
   * Upload de foto do funcionário
   */
  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    return this.employeeService.uploadPhoto(id, file);
  }

  /**
   * Remove foto do funcionário
   */
  @Delete(':id/photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePhoto(@Param('id') id: string) {
    return this.employeeService.deletePhoto(id);
  }

  /**
   * Obter metadados de uma imagem (útil para validação no frontend)
   */
  @Post('validate-photo')
  @UseInterceptors(FileInterceptor('photo'))
  async validatePhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    return this.uploadService.getImageMetadata(file);
  }
}
