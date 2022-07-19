import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LocalService } from '../../../useCases/local/local.service';
import { CreateLocalDto } from '../../../useCases/local/dto/CreateLocalDTO';
import { UpdateLocalDto } from '../../../useCases/local/dto/UpdateLocalDTO';
import { BulkUpdateLocalDto } from 'src/useCases/local/dto/BulkUpdateLocalDTO';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  create(@Body() createLocalDto: CreateLocalDto) {
    return this.localService.create(createLocalDto);
  }

  @Get()
  findAll() {
    return this.localService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.localService.update(+id, updateLocalDto);
  
  }
  @Put('')
  bulkUpdate(@Body() bulkUpdateLocalDto: BulkUpdateLocalDto) {
    return this.localService.bulkUpdate(bulkUpdateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localService.remove(+id);
  }
}
