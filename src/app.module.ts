import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'mariadb_admin',
      password: 'Admin@123',
      database: 'appdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AlarmsModule,
  ],
})
export class AppModule {}
