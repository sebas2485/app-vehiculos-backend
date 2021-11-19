import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Administrador, Asesor} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly administradores: HasManyRepositoryFactory<Administrador, typeof Empresa.prototype.id>;

  public readonly asesores: HasManyRepositoryFactory<Asesor, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Empresa, dataSource);
    this.asesores = this.createHasManyRepositoryFactoryFor('asesores', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesores', this.asesores.inclusionResolver);
    this.administradores = this.createHasManyRepositoryFactoryFor('administradores', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradores', this.administradores.inclusionResolver);
  }
}
