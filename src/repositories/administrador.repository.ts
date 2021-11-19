import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Empresa, Asesor} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {AsesorRepository} from './asesor.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Administrador.prototype.id>;

  public readonly asesores: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Administrador, dataSource);
    this.asesores = this.createHasManyRepositoryFactoryFor('asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesores', this.asesores.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
