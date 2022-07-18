import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePersonDto } from './dto/CreatePersonDTO';
import { UpdatePersonDto } from './dto/UpdatePersonDTO';

@Injectable()
export class PersonService {
  prisma: PrismaClient
  
  constructor() {
    this.prisma = new PrismaClient()
  }
  
  async create(createPersonDto: CreatePersonDto) {
    const created = await this.prisma.people.create({data: {
      name: createPersonDto.name,
      documentNumber: createPersonDto.documentNumber,
      clientId: createPersonDto.clientId,
      createdBy: createPersonDto.createdBy,
      updatedBy: createPersonDto.createdBy,
      createdAt: new Date(),  
      updatedAt: new Date()  
    }})
    
    if (created) return created
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
