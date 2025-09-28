import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsolationLevel, Transactional } from 'typeorm-transactional';
import { EventStoreService } from '../../../events/event-store.service';
import { Alarm } from '../../alarms.entity';
import { AlarmRenamedEvent } from '../../events/alarm-renamed.event';
import { RenameAlarmCommand } from '../rename-alarm.command';

@CommandHandler(RenameAlarmCommand)
export class RenameAlarmHandler implements ICommandHandler<RenameAlarmCommand> {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,

    private readonly eventStore: EventStoreService,
    private readonly eventBus: EventBus,
  ) {}

  @Transactional({ isolationLevel: IsolationLevel.READ_COMMITTED })
  async execute(command: RenameAlarmCommand) {
    const aggregateId = command.id;
    const event = new AlarmRenamedEvent(aggregateId, command.newName);

    // Save event
    await this.eventStore.save(aggregateId, AlarmRenamedEvent.name, event);

    // Update projection
    const alarm = await this.alarmRepo.findOneOrFail({
      where: { id: aggregateId },
    });
    await this.alarmRepo.update({ id: alarm.id }, { name: event.newName });

    // Publish event
    this.eventBus.publish(event);

    return { ...alarm, name: event.newName };
  }
}
