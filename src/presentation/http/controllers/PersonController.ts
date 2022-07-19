import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PersonService } from '../../../useCases/person/person.service';
import { CreatePersonDto } from '../../../useCases/person/dto/CreatePersonDTO';
import { UpdatePersonDto } from '../../../useCases/person/dto/UpdatePersonDTO';
import { BulkUpdatePersonDto } from 'src/useCases/person/dto/BulkUpdatePersonDTO';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Put('')
  bulkUpdate(@Body() bulkUpdatePersonDto: BulkUpdatePersonDto) {
    return this.personService.bulkUpdate(bulkUpdatePersonDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
