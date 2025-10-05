# Folium

## Objetivo do Projeto
O projeto Folium consiste em criar um aplicativo inspirado na Netflix, mas voltado para livros, incluindo mangás e HQs. 
O objetivo é oferecer uma plataforma onde os usuários possam navegar, explorar e acompanhar suas leituras favoritas de forma prática e interativa.

## Módulo de Front-end (React)

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

Essa implementação garante a base visual do sistema, possibilitando a integração fluida com as demais partes do projeto.