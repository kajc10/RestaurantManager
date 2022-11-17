import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() ReservationDto: ReservationDto) {
    return this.reservationService.create(ReservationDto);
  }

  @Get()
  @ApiOkResponse({ type: [ReservationDto] })
  @ApiBearerAuth()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() ReservationDto: ReservationDto) {
    return this.reservationService.update(+id, ReservationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
