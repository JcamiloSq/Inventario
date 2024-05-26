import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from 'src/Entities/Proveedor.entity';
import { ProveedorDto } from '../Dto/Proveedor.dto';
import { Categoria } from 'src/Entities/Categoria.entity';
import { isNotIn } from 'class-validator';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
    private dataSource: DataSource,
  ) {}

  async obtenerProveedorPorId(id: number) {
    return await this.proveedorRepository.findOneBy({ IdProveedor: id });
  }
  //Consulta con leftJoin
  async obtenerProveedor() {
    return await this.dataSource.createQueryBuilder(Proveedor, "p").getMany();
  }

  async crearProveedor(createDto: ProveedorDto) {
    const exist = await this.proveedorRepository.findOneBy({ Nit: createDto.Nit});
      if (exist){
        throw new ConflictException("Ya existe un proveedor con este mismo Nit");
      }
    const newProveedor = this.proveedorRepository.create(createDto);
    return this.proveedorRepository.save(newProveedor);
  }

  async actualizarProveedor(id: number, updateDto: ProveedorDto) {
    const proveedorExistente = await this.proveedorRepository.findOne({
      where: { IdProveedor: id },
    });

    if (!proveedorExistente) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    const exist = await this.proveedorRepository.findOneBy({ Nit: updateDto.Nit, IdProveedor: Not(id)});
    if (exist){
      throw new ConflictException("Ya existe un proveedor con este mismo Nit");
    }
    const proveedorActualizado = this.proveedorRepository.merge(
      proveedorExistente,
      updateDto,
    );

    return this.proveedorRepository.save(proveedorActualizado);
  }

  async borrarProveedor(id: number) {
    return await this.proveedorRepository.delete({ IdProveedor: id });
  }

  async ListProveedores() {
    return await this.dataSource.createQueryBuilder(Proveedor, 'p').select(['p.IdProveedor AS value','p.Nombre AS label']).getRawMany();
  }
}
