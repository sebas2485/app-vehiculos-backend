import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empresa,
  Administrador,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaAdministradorController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.empresaRepository.administradores(id).find(filter);
  }

  @post('/empresas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    return this.empresaRepository.administradores(id).create(administrador);
  }

  @patch('/empresas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Empresa.Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Partial<Administrador>,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.empresaRepository.administradores(id).patch(administrador, where);
  }

  @del('/empresas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Empresa.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.empresaRepository.administradores(id).delete(where);
  }
}
