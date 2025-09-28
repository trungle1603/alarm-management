import { EAlarmsSeverity } from '../alarms.enum';

export class AlarmSeverityChangedEvent {
  constructor(
    public readonly id: string,
    public readonly newSeverity: EAlarmsSeverity,
  ) {}
}
