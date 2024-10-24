import {config} from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ClienteEntity } from './entities/cliente.entity';
import { TransacaoEntity } from './entities/transacao.entity';
import { ProdutoEntity } from './entities/produto.entity';

config();

const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: '.db/sql',
    entities: [ClienteEntity, TransacaoEntity, ProdutoEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false 
}

export default new DataSource(dataSourceOptions)