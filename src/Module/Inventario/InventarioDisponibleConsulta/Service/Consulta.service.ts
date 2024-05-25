import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/Entities/Producto.entity';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Producto)
    private dataSource: DataSource,
  ) {}

  //Consulta con leftJoin
  async obtenerConsulta() {
    return await this.dataSource.query(
      `SELECT
            S.IdStock'id',
            A.codigo'codigo',
            A.Descripcion'descripcion',
            CA.NombreCategoria 'categoria',
            S.Cantidad 'cantidad',
            A.Precio'precio',
            S.Cantidad * A.Precio 'precioTotal',
            S.Proveedor 'proveedor'
            FROM Producto AS A
            INNER JOIN Categoria AS CA ON A.IdCategoria = CA.IdCategoria
            INNER JOIN Stock AS S ON A.IdProducto = S.IdProducto`,
    );
  }
}
