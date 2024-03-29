import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { redisClient } from 'src/infra/redis/RedisClient';
import { BulkUpdatePersonDto } from './dto/BulkUpdatePersonDTO';
import { CreatePersonDto } from './dto/CreatePersonDTO';
import { UpdatePersonDto } from './dto/UpdatePersonDTO';

@Injectable()
export class PersonService {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(createPersonDto: CreatePersonDto) {
    const created = await this.prisma.people.create({
      data: {
        name: createPersonDto.name,
        documentNumber: createPersonDto.documentNumber,
        clientId: createPersonDto.clientId,
        createdBy: createPersonDto.createdBy,
        updatedBy: createPersonDto.createdBy,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await redisClient.setRedis('people', undefined)

    if (created) return created
  }

  async findAll() {
    const cachedPeople = await redisClient.getRedis('people');

    if (cachedPeople) {
      return JSON.parse(cachedPeople);
    }

    const people = await this.prisma.people.findMany()

    if (people) await redisClient.setRedis('people', JSON.stringify(people));

    return people
  }

  async findOne(id: number) {
    const people = await this.prisma.people.findUnique({ where: { id } })

    if (!people) throw new Error('Person not found')


    return people
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const update = await this.prisma.people.update({ where: { id }, data: { ...updatePersonDto, updatedAt: new Date() } })

    if (!update) throw new Error('Person not found')

    await redisClient.setRedis('people', undefined)

    return update
  }

  async bulkUpdate(bulkUpdatePersonDto: BulkUpdatePersonDto) {
    await this.prisma.people.updateMany({
      where: {
        id: {
          in: bulkUpdatePersonDto.ids
        }
      },
      data: {
        documentNumber: bulkUpdatePersonDto.documentNumber,
        updatedBy: bulkUpdatePersonDto.updatedBy,
        name: bulkUpdatePersonDto.name,
        updatedAt: new Date()
      }
    })

    await redisClient.setRedis('people', undefined)

    return this.prisma.people.findMany({ where: { id: { in: bulkUpdatePersonDto.ids } } })
  }

  async remove(id: number) {
    const deleted = await this.prisma.people.deleteMany({ where: { id } })

    if (deleted.count > 0) return true

    await redisClient.setRedis('people', undefined)

    throw new Error('Person not found')
  }
}
