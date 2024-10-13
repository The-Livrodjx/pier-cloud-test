
# Projeto Pier Cloud  POR FAVOR LEIA INTEIRO

Este é um projeto composto por dois componentes principais: **pier-cloud-job** e **pier-cloud-worker**.

## Requisitos

Para executar este projeto, você precisará ter instalados os seguintes softwares:

- **Docker** (recomendado) ou **nats-server** instalado localmente
- **Node.js** LTS (Long Term Support)

## Passo a Passo para Configuração

### 1. Instalação do nats-server

#### Opção 1: Usando Docker
Certifique-se de que o Docker está instalado em seu sistema.  
Execute o comando abaixo para baixar e iniciar o contêiner do nats-server:

```bash
docker run -p 4222:4222 nats:latest
```

#### Opção 2: Instalação Local
Baixe o nats-server da página oficial: [https://nats.io/download/](https://nats.io/download/)  
Extraia o arquivo baixado e siga as instruções de instalação específicas do seu sistema operacional.

### 2. Configuração do Ambiente
Clone o repositório do projeto do GitHub:

```bash
git clone https://github.com/The-Livrodjx/pier-cloud-test.git
cd pier-cloud-test
```

Instale as dependências do Node.js:

```bash
cd pier-cloud-job && npm install
cd pier-cloud-worker && npm install
```

### 3. Execução dos Serviços

- Para executar o **pier-cloud-job**:

```bash
cd pier-cloud-job
node app.js
```

- Para executar o **pier-cloud-worker**:

```bash
cd pier-cloud-worker
node app.js
```
## Observações
- Existe um Vendedor com ID 8 e ele não possui nome, nem telefone
- A vontade de participar da equipe foi tanta que eu fiz o teste durante o final de semana