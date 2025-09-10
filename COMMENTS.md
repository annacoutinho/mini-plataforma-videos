## Decisões Técnicas do Projeto
# Backend

- TypeScript

Usei TypeScript no backend porque dá mais segurança e clareza no código. Com as interfaces e tipos, consigo evitar muito erro bobo de parâmetro errado ou retorno inesperado. Além disso, facilita a manutenção, com isso outra pessoa consegue entender melhor o contrato de cada parte.

- Express.js

Escolhi o Express porque é direto ao ponto. Instala, cria as rotas e pronto, sem perder tempo com configuração pesada. Posso dizer que é um framework bem minimalista em relação aos demais como o nest.

- Arquitetura em camadas

Organizei em Domain, Infra, Service e HTTP. Cada camada tem sua função:

Domain: entidades (Video, Feedback, Rating) e interfaces dos repositórios

Infra: implementações concretas (primeiro InMemory, depois JSON)

Service: regras de negócio (validações, criação de feedbacks, etc.)

HTTP: rotas simples que só chamam os services

Essa divisão deixa o projeto limpo e preparado para crescer. Se amanhã eu trocar JSON por Postgres, só mexo na Infra, assim como fiz mudando do inMemory para o Json.

- Validação com Zod

Não quis poluir o código com vários if. O Zod me permite declarar o schema e pronto, sendo assim se algo não bater, já retorna erro. É mais enxuto e confiável.

- Value Object: Rating

Criei o Rating como um Value Object pra garantir que a nota sempre seja entre 1 e 5. Assim não corro o risco de salvar um “rating 10” perdido no banco.

- Repositórios (InMemory -> JSON)

Comecei com InMemory porque era rápido pra validar. Depois passei pra JSON, que já garante persistência simples sem precisar configurar banco real. Se fosse produção, iria de PostgreSQL.

- Swagger

Adicionei Swagger no /docs pra documentar os endpoints e facilitar os testes. É ótimo pra quem vai revisar ou consumir a API.

- Middleware de erros

Implementei um middleware global pra lidar com erros. Isso evita repetição de código e mantém as respostas padronizadas.

## Frontend

# Stack

Usei React + Vite + TypeScript.

React porque é o que tenho mais familiaridade.

Vite porque é muito rápido e tem setup limpo.

TypeScript pela tipagem forte, que me ajuda tanto no front quanto no back.

- Tailwind

Escolhi Tailwind porque acelera muito. Em vez de criar CSS na mão, já uso classes utilitárias e mantenho consistência no design.

- Componentização

Dividi em componentes pequenos (ex.: NotaSelector, FeedbackForm). Isso deixa a interface organizada e facilita reuso.

- Navegação

Implementei com React Router, separando em páginas (Home, VideoPage, FeedbacksPage, NovoFeedbackPage). A navegação fica clara e o código mais estruturado.

- Axios

Usei Axios pras chamadas HTTP. É simples, confiável e já preparado caso precise de interceptors depois (autenticação, logs, etc).
