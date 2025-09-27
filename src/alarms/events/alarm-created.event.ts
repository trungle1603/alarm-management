import { EAlarmsSeverity } from '../alarms.enum';

export class AlarmCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly severity: EAlarmsSeverity,
  ) {}
}
