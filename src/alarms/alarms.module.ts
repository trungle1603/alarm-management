import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmsController } from './alarms.controller';
import { Alarm } from './alarms.entity';
import { CreateAlarmHandler } from './commands/handlers/created-alarm.command-handler';
import { GetAlarmByIdHandler } from './queries/handlers/get-alarm-by-id.query-handler';
import { GetAlarmsHandler } from './queries/handlers/get-alarms.query-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm])],
  controllers: [AlarmsController],
  providers: [
    // Command Handlers
    CreateAlarmHandler,

    // Query Handlers
    GetAlarmByIdHandler,
    GetAlarmsHandler,
  ],
})
export class AlarmsModule {}
