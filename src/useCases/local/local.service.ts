import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { redisClient } from 'src/infra/redis/RedisClient';
import { BulkUpdateLocalDto } from './dto/BulkUpdateLocalDTO';
import { CreateLocalDto } from './dto/CreateLocalDTO';
import { UpdateLocalDto } from './dto/UpdateLocalDTO';

@Injectable()
export class LocalService {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(createLocalDto: CreateLocalDto) {
    const created = await this.prisma.locals.create({
      data: {
        name: createLocalDto.name,
        clientId: createLocalDto.clientId,
        createdBy: createLocalDto.createdBy,
        updatedBy: createLocalDto.createdBy,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await redisClient.setRedis('locals', undefined)

    if (created) return created
  }

  async findAll() {
    const cachedLocals = await redisClient.getRedis('locals');

    if (cachedLocals) {
      return JSON.parse(cachedLocals);
    }

    const locals = await this.prisma.locals.findMany()

    if (locals) await redisClient.setRedis('locals', JSON.stringify(locals));

    return locals
  }

  async findOne(id: number) {
    const locals = await this.prisma.locals.findUnique({ where: { id } })

    if (!locals) throw new Error('Local not found')

    return locals
  }

  async update(id: number, updateLocalDto: UpdateLocalDto) {
    const update = await this.prisma.locals.update({ where: { id }, data: { ...updateLocalDto, updatedAt: new Date() } })

    if (!update) throw new Error('Local not found')

    await redisClient.setRedis('locals', undefined)

    return update
  }

  async bulkUpdate(bulkUpdateLocalDto: BulkUpdateLocalDto) {
    await this.prisma.locals.updateMany({
      where: {
        id: {
          in: bulkUpdateLocalDto.ids
        }
      },
      data: {
        updatedBy: bulkUpdateLocalDto.updatedBy,
        name: bulkUpdateLocalDto.name,
        clientId: bulkUpdateLocalDto.clientId,
        updatedAt: new Date()
      }
    })

    await redisClient.setRedis('locals', undefined)

    return this.prisma.locals.findMany({ where: { id: { in: bulkUpdateLocalDto.ids } } })
  }

  async remove(id: number) {
    const deleted = await this.prisma.locals.deleteMany({ where: { id } })

    if (deleted.count > 0) return true

    await redisClient.setRedis('locals', undefined)

    throw new Error('Local not found')
  }
}
