import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async () => ({
            type: 'sqlite',
            database: '.db/sql',
            entities: [__dirname + '/entities/**'],
            migrations: [__dirname + '/migrations/*.ts'],
            synchronize: false
        })
    })
    ]
})
export class DbModule {
}
