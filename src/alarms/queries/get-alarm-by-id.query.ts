import { Query } from '@nestjs/cqrs';
import { Alarm } from '../alarms.entity';

export class GetAlarmByIdQuery extends Query<Alarm | null> {
  constructor(public readonly id: string) {
    super();
  }
}
