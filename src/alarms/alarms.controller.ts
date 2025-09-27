import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { CreateAlarmDto } from './dtos/create-alarm.dto';
import { GetAlarmByIdQuery } from './queries/get-alarm-by-id.query';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Controller('alarms')
export class AlarmsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateAlarmDto) {
    return this.commandBus.execute(
      new CreateAlarmCommand(body.name, body.severity),
    );
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetAlarmByIdQuery(id));
  }
}
