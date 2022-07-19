import { Module } from '@nestjs/common';
import { ClientModule } from './ClientModule';
import { LocalModule } from './LocalModule';
import { PersonModule } from './PersonModule';

@Module({
  imports: [PersonModule, ClientModule, LocalModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
