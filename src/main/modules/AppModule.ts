import { Module } from '@nestjs/common';
import { ClientModule } from './ClientModule';
import { PersonModule } from './PersonModule';

@Module({
  imports: [PersonModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
