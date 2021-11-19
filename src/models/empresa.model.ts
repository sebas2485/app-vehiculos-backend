import {Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

@model()
export class Empresa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  porcentajeParticipacion: number;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @hasMany(() => Administrador)
  administradores: Administrador[];

  @hasMany(() => Asesor)
  asesores: Asesor[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
