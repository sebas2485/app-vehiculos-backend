import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  Empresa,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorEmpresaController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Empresa> {
    return this.administradorRepository.empresa(id);
  }
}
