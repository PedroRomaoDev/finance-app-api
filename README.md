# Finance-App API

Finance-App API é um projeto pessoal de estudo focado no desenvolvimento de uma API para controle de finanças pessoais. O objetivo é aplicar boas práticas de desenvolvimento, arquitetura limpa, testes automatizados e documentação de API.

## 🦰 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Clean Architecture
- ESLint + Prettier
- Jest (para testes)
- Swagger (para documentação)
- GitHub Actions (para CI/CD)
- JWT (para autenticação e autorização)
- Render (implantação da API)

## 📁 Estrutura do Projeto

A arquitetura adotada segue os princípios da **Clean Architecture**, **SOLID** e **Adapter Pattern**, garantindo separação clara de responsabilidades e fácil manutenção.

```
finance-app-api/
│
├── .github/            # Workflows do GitHub Actions (CI/CD)
├── .husky/             # Git hooks para lint, testes e formatação
├── docs/               # Documentação Swagger
│   └── swagger.json
├── prisma/             # Migrations e schema do Prisma
│   └── schema.prisma
├── src/                # Código-fonte principal
│   ├── adapters/       # Adaptadores (Adapter Pattern)
│   ├── controllers/    # Controladores HTTP e tratamento de requisições
│   ├── errors/         # Classes e utilitários de erro
│   ├── factories/      # Fábricas para montagem de casos de uso
│   ├── repositories/   # Repositórios (implementações de acesso a dados)
│   ├── routes/         # Definição de endpoints da API
│   ├── schemas/        # Validações de entrada (Zod)
│   ├── use-cases/      # Regras de negócio (interactors)
│   └── app.js          # Configuração e instância do Express
│
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
├── .lintstagedrc.json  # Configuração do lint-staged
├── .prettierrc.json    # Configuração do Prettier
├── eslint.config.js    # Configuração do ESLint
├── docker-compose.yml  # Orquestração Docker (DB + API)
├── package.json        # Dependências e scripts NPM
└── index.js            # Ponto de entrada da aplicação
```

## 🚀 Como Executar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/PedroRomaoDev/finance-app-api.git
cd finance-app-api
```

### 2. Criar o arquivo `.env`

```bash
cp .env.example .env
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar as migrations

```bash
npx prisma migrate dev
```

### 5. Executar com Docker

```bash
docker-compose up -d
```

### 6. Iniciar a aplicação

```bash
npm run start:dev
```

### 7. Documentação da API

Após iniciar a aplicação, a documentação da API estará disponível em:  
[http://localhost:8080/docs](http://localhost:8080/docs)

## 🌐 Link do Deploy

A API está disponível publicamente em:  
👉 [https://finance-app-api-k48s.onrender.com/docs](https://finance-app-api-k48s.onrender.com/docs)

```

## 📦 Coleção Postman

Você pode testar todos os endpoints usando a coleção abaixo:

👉 [Baixar coleção Finance-App API - Postman](https://github.com/PedroRomaoDev/finance-app-api/blob/master/docs/FinanceApp.postman_collection.json)

---
```
