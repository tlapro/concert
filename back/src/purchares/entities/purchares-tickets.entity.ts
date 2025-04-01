import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
} from 'typeorm';

import { Ticket } from 'src/tickets/entities/tickets.entity';
import { Purchase } from './purchares.entity';

@Entity({ name: 'purchase_tickets' })
export class PurchaseTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseTickets)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @ManyToOne(() => Ticket, (ticket) => ticket.purchaseTickets)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @Column()
  quantity: number;
}
