import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const roleFound = await this.roleRepository.findOneBy({ id: id });
    if (!roleFound) {
      throw new NotFoundException(`Pas de rôles avec l'id: ${id}`);
    }
    return roleFound;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updateRole = await this.findOne(id);
    return await this.roleRepository.save(updateRole);
  }

  async remove(id: number) {
    const result = await this.roleRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de rôles avec l'id: ${id}`);
    }
    return `le rôle à l'id: ${id} a été supprimée!`;
  }
}
