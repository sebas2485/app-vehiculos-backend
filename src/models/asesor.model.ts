import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Cliente} from './cliente.model';
import {Solicitud} from './solicitud.model';
import {Administrador} from './administrador.model';

@model()
export class Asesor extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @belongsTo(() => Empresa)
  empresaId: string;
  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
