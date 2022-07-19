import { Module } from '@nestjs/common';
import { ClientService } from 'src/useCases/client/client.service';
import { ClientController } from '../../presentation/http/controllers/ClientController';

@Module({
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule { }
