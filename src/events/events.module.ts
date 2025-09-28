import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreService } from './event-store.service';
import { Events } from './events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventsModule {}
