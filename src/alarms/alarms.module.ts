import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { AlarmsController } from './alarms.controller';
import { Alarm } from './alarms.entity';
import { ChangeAlarmSeverityHandler } from './commands/handlers/change-alarm-severity.command.handler';
import { CreateAlarmHandler } from './commands/handlers/created-alarm.command-handler';
import { RenameAlarmHandler } from './commands/handlers/rename-alarm.command-handler';
import { LogAlarmCreatedHandler } from './events/handlers/log-created-alarm.event-handler';
import { GetAlarmByIdHandler } from './queries/handlers/get-alarm-by-id.query-handler';
import { GetAlarmsHandler } from './queries/handlers/get-alarms.query-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm]), EventsModule],
  controllers: [AlarmsController],
  providers: [
    // Command Handlers
    CreateAlarmHandler,
    RenameAlarmHandler,
    ChangeAlarmSeverityHandler,

    // Query Handlers
    GetAlarmByIdHandler,
    GetAlarmsHandler,

    // Event Handlers
    LogAlarmCreatedHandler,
  ],
})
export class AlarmsModule {}
