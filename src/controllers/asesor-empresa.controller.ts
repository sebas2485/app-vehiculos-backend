import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asesor,
  Empresa,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorEmpresaController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Asesor.prototype.id,
  ): Promise<Empresa> {
    return this.asesorRepository.empresa(id);
  }
}
