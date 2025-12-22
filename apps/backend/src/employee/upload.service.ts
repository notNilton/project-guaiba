import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class UploadService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads', 'employees');
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  constructor() {
    this.ensureUploadDir();
  }

  /**
   * Garante que o diretório de upload existe
   */
  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Valida o arquivo enviado
   */
  private validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Tipo de arquivo não permitido. Use: ${this.allowedMimeTypes.join(', ')}`);
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(`Arquivo muito grande. Tamanho máximo: ${this.maxFileSize / 1024 / 1024}MB`);
    }
  }

  /**
   * Processa e salva a imagem
   * - Redimensiona para 800x800 (mantendo proporção)
   * - Converte para WebP para economia de espaço
   * - Retorna o caminho relativo do arquivo
   */
  async uploadEmployeePhoto(file: Express.Multer.File, employeeId: string): Promise<string> {
    this.validateFile(file);

    const fileName = `${employeeId}-${Date.now()}.webp`;
    const filePath = path.join(this.uploadDir, fileName);

    try {
      // Processar imagem com Sharp
      await sharp(file.buffer)
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toFile(filePath);

      // Retorna o caminho relativo (para armazenar no banco)
      return `/uploads/employees/${fileName}`;
    } catch (error) {
      throw new BadRequestException(`Erro ao processar imagem: ${(error as Error).message}`);
    }
  }

  /**
   * Remove uma foto antiga
   */
  async deleteEmployeePhoto(photoUrl: string): Promise<void> {
    if (!photoUrl) return;

    try {
      const filePath = path.join(process.cwd(), photoUrl);
      await fs.unlink(filePath);
    } catch (error) {
      // Ignora erros se o arquivo não existir
      console.warn(`Erro ao deletar foto: ${(error as Error).message}`);
    }
  }

  /**
   * Extrai metadados da imagem
   */
  async getImageMetadata(file: Express.Multer.File): Promise<{
    width: number;
    height: number;
    format: string;
    size: number;
  }> {
    try {
      const metadata = await sharp(file.buffer).metadata();
      return {
        width: metadata.width || 0,
        height: metadata.height || 0,
        format: metadata.format || 'unknown',
        size: file.size,
      };
    } catch (error) {
      throw new BadRequestException(`Erro ao ler metadados da imagem: ${(error as Error).message}`);
    }
  }
}
