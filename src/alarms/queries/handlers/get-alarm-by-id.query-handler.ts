import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from '../../alarms.entity';
import { GetAlarmByIdQuery } from '../get-alarm-by-id.query';

@QueryHandler(GetAlarmByIdQuery)
export class GetAlarmByIdHandler implements IQueryHandler<GetAlarmByIdQuery> {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,
  ) {}

  async execute(query: GetAlarmByIdQuery): Promise<Alarm | null> {
    return await this.alarmRepo.findOne({ where: { id: query.id } });
  }
}
