import { Command } from '@nestjs/cqrs';
import { Alarm } from '../alarms.entity';

export class RenameAlarmCommand extends Command<Alarm> {
  constructor(
    public readonly id: string,
    public readonly newName: string,
  ) {
    super();
  }
}
