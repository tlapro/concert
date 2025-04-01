import { Ticket } from 'src/tickets/entities/tickets.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchaseTicket } from './purchares-tickets.entity';

@Entity({
  name: 'purchases',
})
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.purchases)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @OneToMany(() => PurchaseTicket, (purchaseTicket) => purchaseTicket.purchase)
  purchaseTickets: PurchaseTicket[];

  @Column()
  purchase_date: Date;

  @Column()
  quantity_common: number;

  @Column()
  quantity_vip: number;

  @Column()
  state: boolean;
}
