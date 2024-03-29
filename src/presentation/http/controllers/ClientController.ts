import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClientService } from 'src/useCases/client/client.service';
import { BulkUpdateClientDto } from 'src/useCases/client/dto/BulkUpdateClientDTO';
import { CreateClientDto } from '../../../useCases/client/dto/CreateClientDTO';
import { UpdateClientDto } from '../../../useCases/client/dto/UpdateClientDTO';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/selected')
  selectClients() {
    return this.clientService.selectClients();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Put('')
  bulkUpdate(@Body() bulkUpdateClientDto: BulkUpdateClientDto) {
    return this.clientService.bulkUpdate(bulkUpdateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
