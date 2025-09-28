export class AlarmRenamedEvent {
  constructor(
    public readonly id: string,
    public readonly newName: string,
  ) {}
}
