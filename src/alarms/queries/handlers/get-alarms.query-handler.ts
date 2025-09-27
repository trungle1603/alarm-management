import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from '../../alarms.entity';
import { GetAlarmsQuery } from '../get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsHandler implements IQueryHandler<GetAlarmsQuery> {
  constructor(
    @InjectRepository(Alarm)
    private readonly alarmRepo: Repository<Alarm>,
  ) {}

  async execute(_: GetAlarmsQuery): Promise<Alarm[]> {
    return await this.alarmRepo.find();
  }
}
