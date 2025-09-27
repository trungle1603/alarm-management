import { Query } from '@nestjs/cqrs';
import { Alarm } from '../alarms.entity';

export class GetAlarmsQuery extends Query<Alarm[]> {}
