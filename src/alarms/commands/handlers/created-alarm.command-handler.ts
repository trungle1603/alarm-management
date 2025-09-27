import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Alarm } from '../../alarms.entity';
import { AlarmCreatedEvent } from '../../events/alarm-created.event';
import { CreateAlarmCommand } from '../create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmHandler implements ICommandHandler<CreateAlarmCommand> {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    // Create alarm and save to db
    const alarm = this.alarmRepo.create({
      id: uuid(),
      name: command.name,
      severity: command.severity,
    });
    await this.alarmRepo.save(alarm);

    // Publish domain event
    this.eventBus.publish(
      new AlarmCreatedEvent(alarm.id, alarm.name, alarm.severity),
    );

    return alarm;
  }
}
