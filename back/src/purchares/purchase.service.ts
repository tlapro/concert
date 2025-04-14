import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Purchase } from './entities/purchares.entity';
import { PurchaseTicket } from './entities/purchares-tickets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { UserTicket } from 'src/users/entities/users-tickets.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    @InjectRepository(PurchaseTicket)
    private readonly purchasesTicketsRepository: Repository<PurchaseTicket>,
    @InjectRepository(UserTicket)
    private readonly userTicketsRepository: Repository<UserTicket>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async getAllPurchases() {
    return this.purchasesRepository.find({
      relations: ['user', 'ticket', 'purchaseTickets'],
    });
  }

  async getPurchaseById(id: string) {
    return this.purchasesRepository.findOne({
      where: { id: id },
      relations: ['user', 'ticket', 'purchaseTickets'],
    });
  }

  async createPurchase(
    userId: string,
    ticketsToBuy: { ticketId: string; quantity: number }[],
  ) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log(ticketsToBuy);
    try {
      const purchase = this.purchasesRepository.create({
        user,
        purchase_date: new Date(),
        state: true,
        quantity_common: 0,
        quantity_vip: 0,
      });

      let totalCommon = 0;
      let totalVip = 0;

      await queryRunner.manager.save(purchase);

      for (const item of ticketsToBuy) {
        console.log(
          `Procesando ticket con ID: ${item.ticketId} y cantidad: ${item.quantity}`,
        );

        const ticket = await queryRunner.manager.findOne(Ticket, {
          where: { id: item.ticketId, state: true },
        });

        if (!ticket)
          throw new NotFoundException(
            `Ticket ${item.ticketId} no encontrado o inactivo`,
          );

        console.log(`Tipo de ticket: ${ticket.type}`);

        const purchaseTicket = this.purchasesTicketsRepository.create({
          purchase,
          ticket,
          quantity: item.quantity,
        });
        await queryRunner.manager.save(purchaseTicket);

        if (ticket.type === 'common') {
          totalCommon += item.quantity;
        } else if (ticket.type === 'vip') {
          totalVip += item.quantity;
        } else {
          console.error(`Tipo de ticket desconocido: ${ticket.type}`);
        }

        for (let i = 0; i < item.quantity; i++) {
          const userTicket = this.userTicketsRepository.create({
            user,
            ticket,
            purchase,
            used: false,
            code: this.generateUniqueCode(),
          });
          await queryRunner.manager.save(userTicket);
        }
      }

      purchase.quantity_common = totalCommon;
      purchase.quantity_vip = totalVip;
      await queryRunner.manager.save(purchase);

      await queryRunner.commitTransaction();

      return {
        message: 'Compra realizada con éxito',
        purchaseId: purchase.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private generateUniqueCode(): string {
    return 'TCK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
