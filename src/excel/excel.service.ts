import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Reparacion } from '../modules/reparaciones/entities/reparaciones.entity';

@Injectable()
export class ExcelService {
  async generateReparacionesReport(reparaciones: Reparacion[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reparaciones');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Cliente', key: 'nombreCliente', width: 30 },
      { header: 'Equipo', key: 'equipo', width: 30 },
      { header: 'Descripción de Falla', key: 'descripcionFalla', width: 40 },
      { header: 'Estado', key: 'estado', width: 20 },
      { header: 'Técnico Asignado', key: 'tecnicoAsignado', width: 30 },
      { header: 'Fecha de Ingreso', key: 'fechaIngreso', width: 20 },
      { header: 'Fecha de Entrega', key: 'fechaEntrega', width: 20 },
    ];

    // Agregar datos
    reparaciones.forEach((reparacion) => {
      worksheet.addRow({
        id: reparacion.id,
        nombreCliente: reparacion.nombreCliente,
        equipo: reparacion.equipo,
        descripcionFalla: reparacion.descripcionFalla,
        estado: reparacion.estado,
        tecnicoAsignado: reparacion.tecnicoAsignado || 'No asignado',
        fechaIngreso: reparacion.fechaIngreso
          ? new Date(reparacion.fechaIngreso).toISOString().split('T')[0]
          : 'Sin fecha',
        fechaEntrega: reparacion.fechaEntrega
          ? new Date(reparacion.fechaEntrega).toISOString().split('T')[0]
          : 'Pendiente',
      });
    });

    // Generar el archivo en memoria
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer); // Devuelve un Buffer válido
  }
}
