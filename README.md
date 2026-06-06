# 🎨 Frontend SoftSolutions

> Interface web da plataforma SoftSolutions, desenvolvida em Angular para consumir a API do projeto e entregar suas funcionalidades.

## 📚 Links e documentação

> 📘 **Documentação completa do projeto:**  
> [Acesse a documentação oficial do SoftSolutions](https://github.com/SoftSolutionsProject/Documentacao/blob/main/README.md)

### Links úteis

- [🌐 Frontend em produção na Azure](https://softsolutions-front-prod-brs-ewgbctepdgggewde.canadacentral-01.azurewebsites.net)
- [☁️ API em produção na Azure](https://softsolutions-api-prod-brs-fycdfxh4b2g7evgn.canadacentral-01.azurewebsites.net)
- [📘 Swagger da API na Azure](https://softsolutions-api-prod-brs-fycdfxh4b2g7evgn.canadacentral-01.azurewebsites.net/api)
- [🌐 Frontend em produção na Vercel](https://solutionssoft.vercel.app)
- [🚀 API em produção no Render](https://api-softsolutions.onrender.com)

## 🚀 Como executar

### ⚙️ Pré-requisitos

- **Node.js** >= 18.x
- **Angular CLI** >= 17.x
- **Docker** >= 20.x
- **Docker Compose** >= 2.x

### 💻 Execução local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SoftSolutionsProject/front-softsolutions
   cd front-softsolutions
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Confira a URL da API local**

   O ambiente local usa a API em:

   ```ts
   http://localhost:4000
   ```

   Essa configuração fica em:

   ```bash
   src/environments/environment.ts
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

5. **Acesse a aplicação**
   ```bash
   http://localhost:4200
   ```

### 🐳 Execução com Docker

1. **Construa e suba os containers**
   ```bash
   docker-compose up -d --build
   ```

2. **Acesse a aplicação**
   ```bash
   http://localhost:4200
   ```

3. **Pare os containers quando necessário**
   ```bash
   docker-compose down
   ```

## 📜 Scripts disponíveis

```bash
# Desenvolvimento
npm start              # Inicia o Angular em modo desenvolvimento
npm run watch          # Executa build em modo watch

# Build
npm run build          # Gera build de produção

# Qualidade
npm run lint           # Executa lint do projeto
npm run test           # Executa testes unitários
npm run test:ci        # Executa testes em modo CI com ChromeHeadless
```

## 🧰 Tecnologias utilizadas

- **Framework**: Angular 17
- **Linguagem**: TypeScript
- **UI**: Angular Material e Bootstrap
- **Gráficos**: ApexCharts
- **SSR**: Angular SSR com Express
- **Estilos**: CSS
- **Build**: Angular CLI
- **Containerização**: Docker
- **CI/CD**: GitHub Actions

## 🌐 Ambientes

O frontend possui arquivos de ambiente para apontar a aplicação para APIs diferentes:

```bash
src/environments/
├── environment.ts          # Desenvolvimento local
├── environment.prod.ts     # Produção padrão
├── environment.azure.ts    # Produção na Azure
└── environment.docker.ts   # Execução com Docker Compose
```

Na Azure, o frontend consome a API publicada em:

```bash
https://softsolutions-api-prod-brs-fycdfxh4b2g7evgn.canadacentral-01.azurewebsites.net
```

## 📂 Estrutura do projeto

```bash
src/
├── app/
│   ├── _guard/             # Guards de autenticação e proteção de rotas
│   ├── _service/           # Serviços de integração com a API
│   ├── aulas-curso/        # Tela e lógica de aulas do curso
│   ├── busca-semantica/    # Interface da busca semântica
│   ├── chatbot/            # Interface do chatbot
│   ├── cursos-lista/       # Listagem de cursos
│   ├── detalhes-curso/     # Detalhes de um curso
│   ├── dashboard/          # Área do usuário
│   ├── certificados/       # Emissão e visualização de certificados
│   ├── login/              # Autenticação
│   ├── cadastro/           # Cadastro de usuários
│   ├── profile/            # Perfil do usuário
│   ├── interfaces/         # Tipagens compartilhadas
│   ├── app.routes.ts       # Rotas da aplicação
│   └── app.config.ts       # Configuração principal do Angular
├── assets/                 # Imagens e arquivos estáticos
├── environments/           # Configurações por ambiente
├── main.ts                 # Entrada da aplicação no navegador
├── main.server.ts          # Entrada para SSR
├── index.html              # HTML base
└── styles.css              # Estilos globais
```

## Equipe

| Função          | Membro                   |  Conecte-se                  |
|-----------------|--------------------------|----------------------------------------------------------------------------------------------------------------------|
|  Desenvolvedor  | Caio Henrique Rodrigues  | [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/CaioRodrigues12)              |
|  Desenvolvedor  | Évellin de Lima Jacinto  | [![GitHub Badge](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github)](https://github.com/evllinlima)  |
|  Desenvolvedor  | Lucas Salvador Notaro    | [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/LucasNotaro)     |
|  Desenvolvedor  | Lucas Santo Gomes        | [![GitHub Badge](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github)](https://github.com/lucassantosgomes02) |
|  Desenvolvedor  | Rafael da Costa Castro   | [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/RafaelCostaCastro)        |
