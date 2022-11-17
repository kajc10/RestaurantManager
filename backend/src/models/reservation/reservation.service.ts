import { Injectable } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  create(ReservationDto: ReservationDto) {
    return 'This action adds a new reservation';
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, ReservationDto: ReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
