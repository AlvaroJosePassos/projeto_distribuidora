# Projeto de Gerenciamento de Transações, Produtos e Clientes

## Descrição

Este projeto é uma API web desenvolvida usando o framework [NestJS](https://nestjs.com/), um framework progressivo de Node.js construído com TypeScript. A aplicação gerencia transações, produtos e clientes, incluindo autenticação baseada em JWT (JSON Web Token).

## Funcionalidades

- **Autenticação e Autorização**
  - Login de usuários utilizando `JWT`.
  - Proteção de rotas utilizando `AuthGuard`.

- **Gerenciamento de Transações**
  - Criação, listagem, atualização e remoção de transações.
  - Filtro de transações por data, email do comprador e produto.

- **Gerenciamento de Produtos**
  - Criação, listagem, atualização e remoção de produtos.
  - Identificação de produtos perecíveis com base na data de validade.

- **Gerenciamento de Clientes**
  - Criação, listagem, atualização e remoção de clientes.
  - Hashing seguro de senhas utilizando bcrypt.

## Tecnologias Utilizadas

- **NestJS**
- **TypeScript**
- **JWT**
- **bcrypt**
- **uuid**
- **class-validator** e **class-transformer**

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/AlvaroJosePassos/projeto_distribuidora.git
   cd projeto_distribuidora

2. **Instale as dependências:**
   ```bash
   npm install

3. **Configure as variáveis de ambiente:**
    Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
     - JWT_SECRET=your_jwt_secret
     - JWT_EXPIRATION_TIME=3600

4. **Inicie a aplicação:**
   ```bash
   npm run start

A aplicação estará disponível na porta 3000.

## Endpoints

  **Autenticação:**
  - **POST /auth/login:** Login do usuário.
    - Body: { "email": "string", "senha": "string" }
    - Response: { "token": "string", "expiresIn": number }

  **Transações:**
  - **GET /transacao:** Lista todas as transações com filtros opcionais.
    - Query Params: data_da_transacao, email_comprador, produto
    - Response: TransacaoDto[ ] (lista de todas as transações com os respectivos filtros)
    
  - **POST /transacao:** Cria uma nova transação.
    - Body: TransacaoDto
    - Response: void

  - **PUT /transacao:** Atualiza uma transação para entregue.
    - Body: TransacaoDto
    - Response: void
   
  - **DELETE /transacao/:** Remove uma transação.
    - Params: id
    - Response: void

  **Produtos**
  - **POST /produto:** Cria um novo produto.
    - Body: ProdutoDto
    - Response: void
    
  - **PUT /produto:** Atualiza um produto existente.
    - Body: ProdutoDto
    - Response: void
   
  - **DELETE /produto/:** Remove um produto.
    - Params: id
    - Response: void

  **Clientes**
  - **POST /cliente:** Cria um novo cliente.
    - Body: ClienteDto
    - Response: void
    
  - **PUT /cliente:** Atualiza um cliente existente.
    - Body: ClienteDto
    - Response: void
   
  - **DELETE /cliente/:** Remove um cliente.
    - Params: id
    - Response: void

## Estrutura do Projeto

  **auth:** Módulo de autenticação.
  - auth.controller.ts
  - auth.service.ts
  - auth.guard.ts
  - auth.dto.ts
    
  **transacao:** Módulo de transações.
  - transacao.controller.ts
  - transacao.service.ts
  - transacao.dto.ts

  **produto:** Módulo de produtos.
  - produto.controller.ts
  - produto.service.ts
  - produto.dto.ts

  **cliente:** Módulo de clientes
  - cliente.controller.ts
  - cliente.service.ts
  - cliente.dto.ts



  
