import { Module } from '@nestjs/common';
import { PersonService } from '../../useCases/person/person.service';
import { PersonController } from '../../presentation/http/controllers/PersonController';

@Module({
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule { }
