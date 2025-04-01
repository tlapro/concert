import { PurchaseTicket } from 'src/purchares/entities/purchares-tickets.entity';
import { Purchase } from 'src/purchares/entities/purchares.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  event_date: Date;

  @Column()
  state: boolean;

  @OneToMany(() => Purchase, (purchase) => purchase.ticket)
  purchases: Purchase[];

  @OneToMany(() => PurchaseTicket, (purchaseTicket) => purchaseTicket.ticket)
  purchaseTickets: PurchaseTicket[];
}
