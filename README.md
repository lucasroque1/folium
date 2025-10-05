# Folium

## Objetivo do Projeto
O Folium é uma aplicação inspirada na Netflix, mas voltada para o universo dos livros, mangás e HQs.
Seu objetivo é oferecer uma plataforma interativa e intuitiva onde os usuários possam navegar, explorar e gerenciar suas obras favoritas.
A aplicação busca unir praticidade e design moderno, permitindo que cada usuário tenha sua própria biblioteca personalizada, com recursos de autenticação e organização.

## Tecnologias Utilizadas
### Front-end

React

React Router DOM (para controle de rotas)

Axios (para comunicação com a API)

CSS (para estilização)

### Back-end

Node.js com Express

Dotenv (para gerenciamento de variáveis de ambiente)

### Banco de Dados

PostgreSQL

### Criptografia

bcrypt (para criptografar senhas dos usuários)

### Containerização

Docker

Docker Compose

### Arquitetura da Aplicação

Arquitetura Full-Stack com integração entre Front-end (React) e Back-end (Node.js + Express) via API REST

Organização modular de componentes no Front-end

Rotas protegidas para garantir o acesso apenas de usuários autenticados


## Descrição do objetivo do código-fonte feito
O código desenvolvido corresponde ao módulo de **Back-end** da aplicação **Folium**, implementado em **Node.js** com **Express**.  

O objetivo principal deste módulo é prover a **API REST** que dará suporte ao Front-end, cuidando de autenticação, autorização, persistência de dados e lógica de negócio relacionada ao catálogo de livros, HQs e mangás.

---

## Funcionalidades implementadas

### 1. Autenticação e Segurança
- **Registro de usuários** (`POST /api/auth/register`) com hash de senha usando **bcrypt**.
- **Login** (`POST /api/auth/login`) que retorna **JWT** para autenticação.
- **Validação de token** (`GET /api/auth/validate`) para confirmar a validade do token.
- **Middleware de proteção** (`authMiddleware`) que valida o JWT e protege rotas que exigem autenticação.

### 2. CRUD do Catálogo
- **Listagem** de itens (livros, HQs, mangás): `GET /api/books`
- **Detalhe** de item: `GET /api/books/:id`
- **Criação** de item (rota protegida): `POST /api/books`
- **Atualização** de item (rota protegida): `PUT /api/books/:id`
- **Remoção** de item (rota protegida): `DELETE /api/books/:id`

### 3. Recomendação simples (IA local)
- Endpoint de recomendação por similaridade de tags/gêneros: `GET /api/books/:id/recommend`
- Implementação **content-based** (Jaccard + combinação de scores) para devolver itens semelhantes.