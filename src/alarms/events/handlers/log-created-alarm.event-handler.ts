import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../alarm-created.event';

@EventsHandler(AlarmCreatedEvent)
export class LogAlarmCreatedHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  handle(event: AlarmCreatedEvent) {
    console.log(
      `📢 Alarm created: [${event.id}] ${event.name} (severity=${event.severity})`,
    );
  }
}
