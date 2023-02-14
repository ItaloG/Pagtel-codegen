# Install

``` bash
npm install -G @italog/codegen
```

## Usage

**--help** show all commands
``` bash
npx codegen --help
```

*****

## Commands

- factory: Generate a factory with middleware/controller;
- middleware: Generate a middleware with DomainUseCase;
- controller: Generate a controller;
- useCase: Generate a usecase with DomainUseCase and DataProtocol;
- repository: Generate a repository extending the Repository class;
- service: Generate a service with DataProtocol;

### Examples

- factory: `npx codegen factory --factory-type middleware --name GetDog --scope dog`; [Factory types](#factorytypes)
- middleware: `npx codegen middleware --name GetDog --scope dog`;
- controller: `npx codegen controller --name GetDog --scope dog`;
- useCase: `npx codegen usecase --usecase-type db --name GetDog --scope dog`; [UseCase types](#usecasetypes)
- repository: `npx codegen repository --repository-type mssql --database Animal --schema mammals --name dog`; [Repository types](#repositorytypes)
- service: `npx codegen service --name GetDog --scope dog`;


*****

## UseCaseTypes

- db
- http
- mq

## RepositoryTypes

- mssql
- mongo
  
## FactoryTypes

- middleware
- controller
