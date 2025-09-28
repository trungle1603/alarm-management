import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'aggregate_id', type: 'varchar', length: 36 })
  aggregateId: string;

  @Column()
  type: string;

  @Column('json')
  payload: any;

  @CreateDateColumn()
  occurredAt: Date;
}
