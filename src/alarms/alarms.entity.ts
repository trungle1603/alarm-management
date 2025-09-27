import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EAlarmsSeverity } from './alarms.enum';

@Entity('alarms')
export class Alarm {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Object.values(EAlarmsSeverity) })
  severity: EAlarmsSeverity;
}
