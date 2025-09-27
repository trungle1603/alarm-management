import { Command } from '@nestjs/cqrs';
import { Alarm } from '../alarms.entity';
import { EAlarmsSeverity } from '../alarms.enum';

export class CreateAlarmCommand extends Command<Alarm> {
  constructor(
    public readonly name: string,
    public readonly severity: EAlarmsSeverity,
  ) {
    super();
  }
}
