import { Command } from '@nestjs/cqrs';
import { Alarm } from '../alarms.entity';
import { EAlarmsSeverity } from '../alarms.enum';

export class ChangeAlarmSeverityCommand extends Command<Alarm> {
  constructor(
    public readonly id: string,
    public readonly newSeverity: EAlarmsSeverity,
  ) {
    super();
  }
}
