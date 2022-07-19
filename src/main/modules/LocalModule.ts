import { Module } from '@nestjs/common';
import { LocalService } from '../../useCases/local/local.service';
import { LocalController } from '../../presentation/http/controllers/LocalController';

@Module({
  controllers: [LocalController],
  providers: [LocalService]
})
export class LocalModule { }
