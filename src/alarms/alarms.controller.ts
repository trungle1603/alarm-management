import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ChangeAlarmSeverityCommand } from './commands/change-alarm-severity.command';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { RenameAlarmCommand } from './commands/rename-alarm.command';
import { ChangeAlarmSeverityDto } from './dtos/change-alarm-severity.dto';
import { CreateAlarmDto } from './dtos/create-alarm.dto';
import { RenameAlarmDto } from './dtos/rename-alarm.dto';
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

  @Patch(':id/rename')
  async renameAlarm(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: RenameAlarmDto,
  ) {
    return this.commandBus.execute(new RenameAlarmCommand(id, body.name));
  }

  @Patch(':id/severity')
  async changeAlarmSeverity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ChangeAlarmSeverityDto,
  ) {
    return this.commandBus.execute(
      new ChangeAlarmSeverityCommand(id, body.severity),
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
