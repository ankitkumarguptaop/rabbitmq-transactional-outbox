// import { DataSource, DataSourceOptions } from "typeorm";
// import { ConfigService } from '@nestjs/config';
// import { SeederOptions } from 'typeorm-extension';

// export const dataSourceOptions = (
//     configService: ConfigService,
// ): DataSourceOptions & SeederOptions => ({
//     type: "postgres", 
//     username: 'postgres',
//     password: 'Ankit@1234',
//     database: 'ecommerce',
//     host: 'database', // 'localhost'
//     port: 5432, //db port 
//     entities: ["dist/src/domain/**/*.entity.js"],
//     synchronize: false, // this is 
//     migrationsTableName: 'custom_migration_table', 
//     migrations: ['dist/src/infrastructure/database/migrations/*{.ts,.js}'], // for migration create 
//     logging:true
// })

// export const dataSource = new DataSource(dataSourceOptions(new ConfigService()),)

// dataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })





    import { DataSource, DataSourceOptions } from 'typeorm';
    import { SeederOptions } from 'typeorm-extension';
    import { ConfigService } from '@nestjs/config';
    import {
      initializeTransactionalContext,
      addTransactionalDataSource,
    } from 'typeorm-transactional';
    require('dotenv').config();
    
    initializeTransactionalContext();
    
    let dataSourceInstance: DataSource | null = null;
    
    export const dataSourceOptions = (
      configService: ConfigService,
    ): DataSourceOptions & SeederOptions => {
      const isProduction = configService.get<string>('NODE_ENV') === 'production';
    
      return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: ['dist/src/domain/**/*.entity.js'],
        synchronize: false,
        ssl: isProduction
          ? {
              ca: configService.get<string>('DB_CERTIFICATE'),
            }
          : false, // Disable SSL for local environments
        migrationsTableName: 'migrations',
        migrations: ['dist/src/infrastructure/database/migrations/*.js'],
        seedTableName: 'seeds',
        seedName: 'seeder',
        seeds: ['dist/src/infrastructure/database/seeders/*.js'],
        seedTracking: true,
      };
    };
    
    export const dataSource = (() => {
      if (!dataSourceInstance) {
        dataSourceInstance = new DataSource(dataSourceOptions(new ConfigService()));
        return addTransactionalDataSource(dataSourceInstance);
      }
      return dataSourceInstance;
    })();
    