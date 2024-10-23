# Sistema de Reservas de Salas

Este projeto é um sistema de reservas de salas, desenvolvido utilizando **Laravel** no backend e **ReactJS** no frontend. Ele permite criar, editar, excluir e desativar reservas de salas. Aqui estão as instruções para configurar e rodar o projeto localmente.

## Resultado esperado:

![Home](resources/img/index.png)

## Pré-requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- **PHP 8.x**
- **Composer**
- **Node.js** (recomendado versão 16 ou superior)
- **npm** (instalado junto com Node.js)
- **XAMPP** ou **PostgreSQL** (se estiver usando um banco de dados local)

## Configuração do Backend (Laravel)

1. Clone o repositório do projeto:

   ```bash
   git clone https://github.com/PatrickDeAlmeidaLima/teste
   ```

2. Navegue até o diretório do backend:

   ```bash
   cd sistema-de-reservas/backend
   ```

3. Instale as dependências do Laravel:

   ```bash
   composer install
   ```

4. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

5. Abra o arquivo `.env` e configure as seguintes variáveis de banco de dados (usando **PostgreSQL** como exemplo):

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=reserva-salas-db
   DB_USERNAME=postgres
   DB_PASSWORD=
   ```

6. Gere a chave da aplicação Laravel:

   ```bash
   php artisan key:generate
   ```

7. Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   php artisan migrate
   ```

8. Inicie o servidor Laravel:

   ```bash
   php artisan serve
   ```

   O servidor estará rodando em `http://localhost:8000`.

## Configuração do Frontend (React)

1. Navegue até o diretório do frontend:

   ```bash
   cd sistema-de-reservas/frontend
   ```

2. Instale as dependências do React:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do React:

   ```bash
   npm start
   ```

   O servidor estará rodando em `http://localhost:3000`.

## Funcionalidades do Sistema

- Criar novas reservas de salas.
- Editar reservas existentes.
- Excluir reservas permanentemente.
- Desativar reservas (sem excluir do banco de dados).

## Configurações e Estilização

O sistema possui estilização moderna usando **Material-UI**, com diferenciação visual entre reservas ativas e inativas.

## Endpoints da API

- `GET /api/reservas`: Lista todas as reservas.
- `GET /api/reservas/{id}`: Exibe detalhes de uma reserva específica.
- `POST /api/reservas`: Cria uma nova reserva.
- `PUT /api/reservas/{id}`: Atualiza uma reserva existente.
- `DELETE /api/reservas/{id}`: Exclui uma reserva.
- `PUT /api/reservas/{id}/desativar`: Desativa uma reserva (mantém no banco, mas marca como inativa).

## Observações

- As reservas inativas aparecem com coloração diferente e texto riscado no frontend.
- Caso queira resetar o banco de dados, basta rodar o comando:

   ```bash
   php artisan migrate:refresh
   ```
