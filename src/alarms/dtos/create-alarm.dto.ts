import { EAlarmsSeverity } from '../alarms.enum';

export class CreateAlarmDto {
  name: string;
  severity: EAlarmsSeverity;
}
