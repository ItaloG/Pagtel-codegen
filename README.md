# UseCase list

- [] save files as `KebabCase`
- [] save classes as `PascalCase`
- [] save variables as `CamelCase`
- [] the command to create a file must be `project generate <FILE-TYPE>`, [FileTypes](#filetypes)
- [] all creations must have argument `scope`, (`scope` is the argument representing the folder where the file will be created)
- [] all creations must be exported on a `indexes` files
- [] create a factory must have a *factoryType*, like `project generate factory <FACTORY-TYPE>`, [FactoryType](#factorytypes)
- [] all factories must have prefix `make`
- [] create a middleware with handle method and with a `domain useCase` and `ErrorHandler` as dependency
- [] if a middleware creation has argument `--cascade` it must create a middleware and create its `domain useCase` in the same `scope`
- [] create a `UseCase` must have a *UseCaseType*, like `project generate usecase <USECASE-TYPE>`, [UseCaseType](#usecasetypes)
- [] if *UseCaseType* is other it must create a folder with next argument
- [] if *UseCaseType* is db it must have `Db` prefix, implements a `domain usecase` with the next words and has a `Repository` as dependency
- [] if *UseCaseType* is http it must have `Http` prefix, implements a `domain usecase` with the next words and has a `Http Service` as dependency
- [] if *UseCaseType* is mq it must have `Mq` prefix, implements a `domain usecase` with the next words and has a `PublishInExchangeService` as dependency
- [] if a usecase creation has argument `--cascade` it must create a usecase, create its `domain useCase` and its `data protocol` in the same `scope`
- [] create a `Repository` must have a *DatabaseType*, like `project generate repository <DATABASE-TYPE>`, [DatabaseType](#databasetypes)
- [] if *DatabaseType* is mongo it must have `Repository` suffix
- [] if *DatabaseType* is mssql it must have `Repository` suffix and extend *Repository class*
- [] create a `Http Service` must have `Http Service` suffix, implements a `Service Protocol` and has *HttpClient* as dependency
- [] if a http service creation has argument `--cascade` it must create a http service and create its `data protocol` in the same `scope`
  
*****

## Examples

- middleware factory: `project generate --factory-middleware --name GetExample --scope example`
- controller factory: `project generate --factory-controller --name GetExample --scope example`

*****

## Filetypes

- factory
- middleware
- useCase
- repository

## UseCaseTypes

- db
- http
- mq
- other

## DatabaseTypes

- mssql
- mongo
  
## FactoryTypes

- middleware
- controller
