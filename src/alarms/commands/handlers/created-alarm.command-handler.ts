import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Alarm } from '../../alarms.entity';
import { CreateAlarmCommand } from '../create-alarm.command';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmHandler implements ICommandHandler<CreateAlarmCommand> {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,
  ) {}

  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmRepo.create({
      id: uuid(),
      name: command.name,
      severity: command.severity,
    });
    return await this.alarmRepo.save(alarm);
  }
}
