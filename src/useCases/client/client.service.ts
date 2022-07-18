import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  prisma: PrismaClient
  
  constructor() {
    this.prisma = new PrismaClient()
  }
  
  async create(createClientDto: CreateClientDto) {
    const created = await this.prisma.clients.create({data: {
      name: createClientDto.name,
      clientTypeId: createClientDto.clientTypeId,
      createdBy: createClientDto.createdBy,
      updatedBy: createClientDto.createdBy,
      createdAt: new Date(),  
      updatedAt: new Date()  
    }})
    
    if (created) return created
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
