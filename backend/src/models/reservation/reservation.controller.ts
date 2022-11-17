import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() ReservationDto: ReservationDto) {
    return this.reservationService.create(ReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ReservationDto: ReservationDto) {
    return this.reservationService.update(+id, ReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
