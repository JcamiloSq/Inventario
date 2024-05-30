import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'json2csv';
import { FacturaVenta } from 'src/Entities/Factura.entity';
import { FacturaProducto } from 'src/Entities/FacturaProducto.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(FacturaVenta)
    private facturaRepository: Repository<FacturaVenta>,
  ) {}
  async sendDataFactura(id: number) {
    const factura = await this.facturaRepository.findOneBy({
      IdFacturaVenta: id,
    });
    const facturaDetalle = await this.dataSource
      .createQueryBuilder()
      .select([
        'pr.codigo as codigoProducto',
        'pr.Descripcion as descripcionProducto',
        'p.PrecioUnitario as precioUnitario',
        'p.Cantidad as cantidad',
      ])
      .from(FacturaProducto, 'p')
      .innerJoin('Producto', 'pr', 'p.IdProducto = pr.IdProducto')
      .where('p.IdFacturaVenta = :documento', { documento: id })
      .getRawMany();

    const invoiceData = {
      cliente: factura.Cliente,
      documentoreferencia: factura.DocumentoReferencia,
      consecutivo: factura.IdFacturaVenta,
      detalles: facturaDetalle,
    };

    return await this.generateInvoiceFile(invoiceData);
  }

  async generateInvoiceFile(invoiceData: any): Promise<Buffer> {
    // Expandir los detalles de productos en la factura
    const flattenDetails = invoiceData.detalles.map((detalle, index) => ({
      [`codigoProducto${index + 1}`]: detalle.codigoProducto,
      [`descripcionProducto${index + 1}`]: detalle.descripcionProducto,
      [`cantidad${index + 1}`]: detalle.cantidad,
      [`precioUnitario${index + 1}`]: detalle.precioUnitario,
    }));

    // Combinar datos básicos de la factura con detalles aplanados
    const flatInvoiceData = {
      cliente: invoiceData.cliente,
      documentoreferencia: invoiceData.documentoreferencia,
      consecutivo: invoiceData.consecutivo,
      ...flattenDetails.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    };

    const fields = [
      'cliente',
      'documentoreferencia',
      'consecutivo',
      ...Object.keys(
        flattenDetails.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      ),
    ];

    const opts = { fields };
    try {
      const csv = parse(flatInvoiceData, opts);
      return Buffer.from(csv);
    } catch (err) {
      throw new Error(err);
    }
  }
}
