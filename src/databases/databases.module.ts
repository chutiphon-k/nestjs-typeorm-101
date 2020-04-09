import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as config from './databases.config';
import { UserRepository } from './repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [TypeOrmModule],
})
export class DatabasesModule {}
