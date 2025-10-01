# Folium

## Objetivo do Projeto
O projeto Folium consiste em criar um aplicativo inspirado na Netflix, mas voltado para livros, incluindo mangás e HQs. 
O objetivo é oferecer uma plataforma onde os usuários possam navegar, explorar e acompanhar suas leituras favoritas de forma prática e interativa.

## Módulo de Front-end (React)

O desenvolvimento realizado nesta parte do projeto corresponde ao Front-end da aplicação, utilizando React com React Router para gerenciar as rotas. O objetivo foi estruturar as principais páginas da aplicação, incluindo: 

Página de Catálogo (/) – exibe os itens disponíveis. 

Página de Login (/login) – responsável pela autenticação de usuários. 

Página de Registro (/register) – permite o cadastro de novos usuários. 

Biblioteca Pessoal (rota protegida) (/library) – acessível apenas para usuários autenticados, garantindo segurança por meio do componente ProtectedRoute. 

Além disso, foi implementado o componente Header, que funciona como barra de navegação principal da aplicação. 

No projeto final, esse módulo será integrado ao Back-end, consumindo as rotas da API para exibir dinamicamente os dados (como catálogo de livros e recomendações). Assim, o usuário poderá interagir com a aplicação de forma fluida e intuitiva, navegando entre páginas, autenticando-se e acessando suas informações personalizadas. 

Essa implementação facilita a comunicação entre o Front-end e o Back-end, garantindo a base visual e de navegação necessária para que as demais funcionalidades (como recomendações, login e biblioteca) sejam entregues ao usuário final.