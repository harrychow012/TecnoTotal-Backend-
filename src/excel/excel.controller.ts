import { Controller, Get, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ReparacionesService } from '../modules/reparaciones/services/reparaciones.service';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly reparacionesService: ReparacionesService, // Inyecta el servicio
  ) {}

  @Get('reparaciones')
  async downloadReparacionesReport(@Res() res: Response) {
    const { data: reparaciones } = await this.reparacionesService.findAll();
    const buffer = await this.excelService.generateReparacionesReport(
      reparaciones,
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="reparaciones-report.xlsx"',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.send(buffer);
  }
}
