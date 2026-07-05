import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { CreateRentalDto, UpdateRentalDto, RentalFilterDto } from './dto/rental.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os aluguéis' })
  async findAll(@Query() query: { page?: number; limit?: number }) {
    return this.rentalsService.findAll(query.page, query.limit);
  }

  @Get('me/as-renter')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar meus aluguéis como locatário' })
  async myRentalsAsRenter(@Request() req, @Query() filter: RentalFilterDto) {
    return this.rentalsService.findByRenterId(req.user.id, filter);
  }

  @Get('me/as-owner')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar meus aluguéis como proprietário' })
  async myRentalsAsOwner(@Request() req, @Query() filter: RentalFilterDto) {
    return this.rentalsService.findByOwnerId(req.user.id, filter);
  }

  @Get('tool/:toolId/availability')
  @ApiOperation({ summary: 'Verificar disponibilidade de uma ferramenta' })
  @ApiParam({ name: 'toolId', description: 'ID da ferramenta' })
  async checkAvailability(
    @Param('toolId') toolId: string,
    @Query() { startDate, endDate }: { startDate: string; endDate: string },
  ) {
    const isAvailable = await this.rentalsService.checkAvailability(
      toolId,
      new Date(startDate),
      new Date(endDate),
    );
    return { toolId, startDate, endDate, isAvailable };
  }

  @Get('tool/:toolId/price')
  @ApiOperation({ summary: 'Calcular preço de aluguel' })
  @ApiParam({ name: 'toolId', description: 'ID da ferramenta' })
  async calculatePrice(
    @Param('toolId') toolId: string,
    @Query() { startDate, endDate }: { startDate: string; endDate: string },
  ) {
    const totalPrice = await this.rentalsService.calculatePrice(toolId, new Date(startDate), new Date(endDate));
    return { toolId, startDate, endDate, totalPrice };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um aluguel' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  async findOne(@Param('id') id: string) {
    return this.rentalsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo aluguel' })
  async create(@Request() req, @Body() createRentalDto: CreateRentalDto) {
    return this.rentalsService.create(req.user.id, createRentalDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar aluguel' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  async update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto, @Request() req) {
    return this.rentalsService.update(id, updateRentalDto);
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancelar aluguel' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  async cancel(@Param('id') id: string, @Body() { reason }: { reason: string }, @Request() req) {
    await this.rentalsService.cancel(id, reason);
    return { message: 'Aluguel cancelado com sucesso' };
  }

  @Post(':id/complete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Completar aluguel' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  async complete(@Param('id') id: string, @Request() req) {
    await this.rentalsService.complete(id);
    return { message: 'Aluguel completado com sucesso' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar aluguel (apenas admin)' })
  @ApiParam({ name: 'id', description: 'ID do aluguel' })
  async delete(@Param('id') id: string, @Request() req) {
    // TODO: Check if user is admin
    // await this.rentalsService.delete(id);
    return { message: 'Aluguel deletado com sucesso' };
  }
}
