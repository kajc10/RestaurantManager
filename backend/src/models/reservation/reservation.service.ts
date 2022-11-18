import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from './dto/reservation.dto';
import { Reservation, ReservationDocument } from './schema/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(ReservationDto: ReservationDto): Promise < ReservationDocument > {
    const reservation = new this.reservationModel(ReservationDto);
    return reservation.save();
  }

  async findAll(): Promise < ReservationDocument[] > {
    return this.reservationModel.find()
      .exec();
  }

  async findOne(id: string) {
    return this.reservationModel.findById(id);
  }

  async update(id: string, ReservationDto: ReservationDto): Promise < ReservationDocument > {
    return this.reservationModel.findByIdAndUpdate(id, ReservationDto);
  }

  async remove(id: string) {
    return this.reservationModel.findByIdAndRemove(id);
  }
}
