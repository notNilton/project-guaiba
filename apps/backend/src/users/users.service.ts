import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@project-valkyrie/dtos';
import { IUserResponse, UserRole, UserStatus } from '@project-valkyrie/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const company = await this.prisma.company.findUnique({
      where: { companyKey: createUserDto.companyKey },
    });

    if (!company) {
      throw new BadRequestException('Invalid company hash');
    }

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        company: { connect: { id: company.id } },
      },
    });

    return this.mapToResponse(user);
  }

  async findAll(): Promise<IUserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.mapToResponse(user));
  }

  async findOne(id: string): Promise<IUserResponse | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.mapToResponse(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUserResponse | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return this.mapToResponse(user);
  }

  async remove(id: string): Promise<IUserResponse | null> {
    const user = await this.prisma.user.delete({ where: { id } });
    return this.mapToResponse(user);
  }

  private mapToResponse(user: User): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as unknown as UserRole,
      status: user.status as unknown as UserStatus,
    };
  }
}
