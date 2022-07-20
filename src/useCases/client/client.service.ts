import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { redisClient } from 'src/infra/redis/RedisClient';
import { BulkUpdateClientDto } from './dto/BulkUpdateClientDTO';
import { CreateClientDto } from './dto/CreateClientDTO';
import { UpdateClientDto } from './dto/UpdateClientDTO';

@Injectable()
export class ClientService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(createClientDto: CreateClientDto) {
    const created = await this.prisma.clients.create({
      data: {
        name: createClientDto.name,
        clientTypeId: createClientDto.clientTypeId,
        createdBy: createClientDto.createdBy,
        updatedBy: createClientDto.createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
        people: {
          create: createClientDto.people.map((person) => {
            return ({
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: createClientDto.createdBy,
              updatedBy: createClientDto.createdBy,
              documentNumber: person.documentNumber,
              name: person.name
            })
          })
        }
      }
    })

    await redisClient.setRedis('clients', undefined)
    await redisClient.setRedis('selected_clients', undefined)

    if (created) return created
  }

  async findAll() {
    const cachedClients = await redisClient.getRedis('clients');

    if (cachedClients) {
      return JSON.parse(cachedClients);
    }

    const clients = await this.prisma.clients.findMany()

    if (clients) await redisClient.setRedis('clients', JSON.stringify(clients));

    return clients
  }

  async selectClients() {
    const cachedSelectedClients = await redisClient.getRedis('selected_clients');

    if (cachedSelectedClients) {
      return JSON.parse(cachedSelectedClients);
    }

    const clients = await this.prisma.clients.findMany()

    const selectedClients = clients.map((client) => ({ id: client.id, name: client.name }))

    if (selectedClients) await redisClient.setRedis('selected_clients', JSON.stringify(selectedClients));

    return selectedClients
  }

  async findOne(id: number) {
    const client = await this.prisma.clients.findUnique({ where: { id } })

    if (!client) throw new Error('Client not found')

    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const update = await this.prisma.clients.update({ where: { id }, data: { ...updateClientDto, updatedAt: new Date() } })

    if (!update) throw new Error('Client not found')

    await redisClient.setRedis('clients', undefined)
    await redisClient.setRedis('selected_clients', undefined)

    return update
  }

  async bulkUpdate(bulkUpdateClientDto: BulkUpdateClientDto) {
    await this.prisma.clients.updateMany({
      where: {
        id: {
          in: bulkUpdateClientDto.ids
        }
      },
      data: {
        clientTypeId: bulkUpdateClientDto.clientTypeId,
        updatedBy: bulkUpdateClientDto.updatedBy,
        name: bulkUpdateClientDto.name,
        updatedAt: new Date()
      }
    })

    await redisClient.setRedis('clients', undefined)
    await redisClient.setRedis('selected_clients', undefined)

    return this.prisma.clients.findMany({ where: { id: { in: bulkUpdateClientDto.ids } } })
  }

  async remove(id: number) {
    const deleted = await this.prisma.clients.deleteMany({ where: { id } })

    if (deleted.count > 0) {
      await redisClient.setRedis('clients', undefined)
      await redisClient.setRedis('selected_clients', undefined)

      return true
    }

    throw new Error('Client not found')
  }
}
