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

<<<<<<< HEAD
## Descrição do objetivo do código-fonte feito Módulo de Front-end (React)

README – Módulo de Front-end (React)

O código desenvolvido corresponde ao módulo de Front-end da aplicação Folium, implementado em React.
O principal objetivo foi estruturar a interface gráfica do usuário, permitindo navegação entre páginas e interação com os recursos principais da aplicação.

As páginas criadas incluem:

Catálogo – exibe os itens disponíveis (livros, HQs, mangás).

Login e Registro – responsáveis pela autenticação e cadastro de novos usuários.

Biblioteca Pessoal (rota protegida) – acessível somente por usuários autenticados, garantindo segurança com o uso de ProtectedRoute.

Além disso, foram desenvolvidos componentes reutilizáveis como o Header (barra de navegação) e o BookCard (exibição de cada item).

Integração no projeto final

No projeto em grupo, este módulo será responsável por consumir as rotas do Back-end (já implementadas por outro integrante), exibindo dinamicamente os dados para o usuário final.
Dessa forma, o Front-end será a camada visual e interativa, permitindo que o usuário:

Acesse o catálogo em tempo real.

Realize login/registro para autenticação.

Gerencie sua biblioteca pessoal, que é salva no banco de dados via API.

## Diagrama de arquitetura da aplicação

    ┌───────────────────────────┐
    │         Usuário           │
    │ (Navegador / Desktop)     │
    └─────────────┬─────────────┘
                  │
                  ▼
    ┌───────────────────────────┐
    │      Frontend React      │
    │  • Interface do usuário  │
    │  • Rotas                 │
    │  • Consome API Rest      │
    ─────────────┬─────────────┘
                 │ Requisições HTTP (GET/POST/PUT/DEL)
                 ▼
    ┌────────────────────────────────────────────────┐
    │               Backend Node.js                  │
    │                 (Express.js)                   │
    │  • Endpoints REST                              │
    │  • Lógica de negócio                           │
    │  • Autenticação/Autorização                    │
    │  • Validação de dados                          │
    │  • Integração com APIs externas (ex: Google)   │
    └─────────────┬──────────────────────────────────┘
                  │ Consultas SQL
                  ▼
    ┌──────────────────────────────────────┐
    │        Banco de Dados Relacional		 │
    │              (PostgreSQL)            │
    │ • Tabelas de usuários                │
    │ • Tabelas de livros/mangás           │
    │ • Histórico e favoritos              │
    │ • Registros de avaliações            │
    └──────────────────────────────────────┘
