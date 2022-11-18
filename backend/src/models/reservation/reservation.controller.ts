import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOkResponse({ type: ReservationDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() reservationDto: ReservationDto): Promise<ReservationDto> {
    const reservation = await this.reservationService.create(reservationDto);
    return new ReservationDto(reservation.toObject());
  }

  @Get()
  @ApiOkResponse({ type: [ReservationDto] })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<ReservationDto[]> {
    return (await this.reservationService.findAll()).map((reservationDocument) => new ReservationDto(reservationDocument.toObject()));
  }

  @Get(':id')
  @ApiOkResponse({ type: ReservationDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<ReservationDto> {
    const reservation = await this.reservationService.findOne(id);
    return new ReservationDto(reservation.toObject());
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReservationDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() reservationDto: ReservationDto): Promise<ReservationDto> {
    const updatedReservation = await this.reservationService.update(id, reservationDto);
    return new ReservationDto(updatedReservation.toObject());
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReservationDto })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('id') id: string): Promise<ReservationDto> {
    const deletedReservation = await this.reservationService.remove(id);
    return new ReservationDto(deletedReservation.toObject());
  }
}
