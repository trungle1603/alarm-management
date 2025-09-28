import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AlarmsModule } from './alarms/alarms.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mariadb',
          host: 'localhost',
          port: 3307,
          username: 'mariadb_admin',
          password: 'Admin@123',
          database: 'appdb',
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AlarmsModule,
    EventsModule,
  ],
})
export class AppModule {}
