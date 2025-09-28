import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';

@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
  ) {}

  async save(aggregateId: string, type: string, payload: any) {
    await this.eventsRepository.save({
      aggregateId,
      type,
      payload: JSON.stringify(payload),
      occurred_at: new Date(),
    });
  }

  async load(aggregateId: string) {
    const events = await this.eventsRepository.find({
      where: { aggregateId },
      order: { id: 'ASC' },
    });

    return events.map((r) => ({
      type: r.type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload: JSON.parse(r.payload as string),
      occurredAt: r.occurredAt,
    }));
  }
}
