
# 🎨 Frontend - SoftSolutions

> Interface web desenvolvida e projetada para interagir com o backend da plataforma SoftSolutions.


## 🚀 Como Executar

### ⚙️ Pré-requisitos

- **Node.js** >= 18.x
- **Angular CLI** >= 15.x
- **Docker** >= 20.x
- **Docker Compose** >= 2.x


### 🐳 Execução com Docker (Recomendado)

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd front-softsolutions-develop
   ```

2. **Construa e suba os containers**
   ```bash
   docker-compose up -d --build
   ```

3. **Acesse a aplicação**
   - **Frontend**: http://localhost:4200


### 💻 Execução local sem Docker

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd front-softsolutions-develop
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   ng serve
   ```

4. **Acesse a aplicação**
   - Abra o navegador e acesse: `http://localhost:4200`


## 🐋 Comandos Docker úteis

```bash
docker-compose up -d --build    # Subir containers
docker-compose down             # Parar containers
docker-compose logs -f          # Visualizar logs
docker exec -it front bash      # Acessar o container (caso tenha nomeado como 'front')
```


## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
ng serve                         # Servidor local Angular

# Produção
ng build                         # Build para produção

# Testes
ng test                          # Executar testes unitários
ng e2e                           # Executar testes end-to-end (caso configurado)

# Lint
ng lint                          # Verificação de estilo e boas práticas
```


## 🧰 Tecnologias Utilizadas

- **Framework**: Angular
- **Linguagem**: TypeScript
- **Estilos**: CSS
- **Empacotamento**: Angular CLI
- **Containerização**: Docker
- **CI/CD**: GitHub Actions


## 📂 Estrutura do Projeto

```bash
src/
├── app/                     # Componentes principais da aplicação
├── assets/                  # Imagens, fontes, etc.
├── main.ts                  # Ponto de entrada
├── index.html               # HTML base
└── styles.css               # Estilo global
```

---
## Equipe

| Função          | Membro                   |  Conecte-se                  |
|-----------------|--------------------------|----------------------------------------------------------------------------------------------------------------------|
|  Desenvolvedor  | Caio Henrique Rodrigues  | [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/CaioRodrigues12)              |
|  Desenvolvedor  | Évellin de Lima Jacinto  | [![GitHub Badge](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github)](https://github.com/evllinlima)  |
|  Desenvolvedor  | Lucas Salvador Notaro    | [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/LucasNotaro)     |
|  Desenvolvedor  | Lucas Santo Gomes        | [![GitHub Badge](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github)](https://github.com/lucassantosgomes02) |
|  Desenvolvedor  | Rafael da Costa Castro   | [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/RafaelCostaCastro)        |
