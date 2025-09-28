import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EventStoreService } from '../../../events/event-store.service';
import { Alarm } from '../../alarms.entity';
import { AlarmCreatedEvent } from '../../events/alarm-created.event';
import { CreateAlarmCommand } from '../create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmHandler implements ICommandHandler<CreateAlarmCommand> {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,
    private readonly eventBus: EventBus,
    private readonly eventStoreService: EventStoreService,
  ) {}

  // async execute(command: CreateAlarmCommand): Promise<Alarm> {
  //   // Create alarm and save to db
  //   const alarm = this.alarmRepo.create({
  //     id: uuid(),
  //     name: command.name,
  //     severity: command.severity,
  //   });
  //   await this.alarmRepo.save(alarm);

  //   // Publish domain event
  //   this.eventBus.publish(
  //     new AlarmCreatedEvent(alarm.id, alarm.name, alarm.severity),
  //   );

  //   return alarm;
  // }

  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    const aggregateId = uuid();
    const event = new AlarmCreatedEvent(
      aggregateId,
      command.name,
      command.severity,
    );

    // 1. Save event
    await this.eventStoreService.save(
      aggregateId,
      AlarmCreatedEvent.name,
      event,
    );

    // 2. Update projection (read model)
    const alarm = this.alarmRepo.create({
      id: aggregateId,
      name: event.name,
      severity: event.severity,
    });
    await this.alarmRepo.save(alarm);

    // 3. Publish domain event (for subscribers, notifications, etc.)
    this.eventBus.publish(event);

    return event;
  }
}
