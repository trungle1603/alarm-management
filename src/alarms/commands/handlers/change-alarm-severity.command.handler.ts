import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventStoreService } from '../../../events/event-store.service';
import { Alarm } from '../../alarms.entity';
import { AlarmSeverityChangedEvent } from '../../events/alarm-severity-changed.event';
import { ChangeAlarmSeverityCommand } from '../change-alarm-severity.command';

@CommandHandler(ChangeAlarmSeverityCommand)
export class ChangeAlarmSeverityHandler
  implements ICommandHandler<ChangeAlarmSeverityCommand>
{
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,

    private readonly eventStore: EventStoreService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ChangeAlarmSeverityCommand) {
    const aggregateId = command.id;
    const event = new AlarmSeverityChangedEvent(
      aggregateId,
      command.newSeverity,
    );

    // Save event
    await this.eventStore.save(
      aggregateId,
      AlarmSeverityChangedEvent.name,
      event,
    );

    // Update projection
    const alarm = await this.alarmRepo.findOneOrFail({
      where: { id: aggregateId },
    });
    await this.alarmRepo.update(
      { id: alarm.id },
      { severity: event.newSeverity },
    );

    // Publish event
    this.eventBus.publish(event);

    return { ...alarm, severity: event.newSeverity };
  }
}
