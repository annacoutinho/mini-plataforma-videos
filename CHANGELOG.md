# Changelog

Todas as mudanças notáveis deste projeto serão documentadas aqui.
O formato segue um estilo próximo ao [Keep a Changelog](https://keepachangelog.com/) e versionamento semântico.

---
## [0.3.0] - 2025-09-08
### Added
- Documentação automática da API com Swagger/OpenAPI disponível em `/docs`
- Camada de **services** para organizar regras de negócio:
 - `FeedbackService` para criação e busca de feedbacks
 - `VideoService` para listagem e detalhamento de vídeos
- Configuração de variáveis de ambiente (`.env`) para `PORT` e `CORS_ORIGIN`

## [0.2.0] - 2025-09-07
### Added
- Rotas de feedback:
  - `POST /feedback` para criar feedback de um vídeo
  - `GET /feedback/:videoId` para listar feedbacks de um vídeo
- Entidade `Feedback` e value object `Rating`, com repositório em memória
- Tipo `Feedback` no frontend para tipagem forte
- Página **FeedbacksPage** para visualizar feedbacks de cada vídeo
- Página **NovoFeedbackPage** para envio de feedback através de formulário
- Componente **NotaSelector** (botões 1–5) para seleção visual da nota
- Rota `GET /videos/:id` para detalhar informações de um vídeo específico

### Changed
- Entidade `Video` agora expõe um DTO limpo (`toDTO`) em vez do wrapper `{ props: ... }`
- Página **Home** com botões padronizados e consistentes
- Botão de voltar atualizado para usar ícone Lucide em todas as páginas
- Página de novo feedback exibe o título do vídeo em vez do ID

### Fixed
- Erro 404 no frontend ao acessar vídeos resolvido com normalização de DTO
- Conflitos de merge resolvidos em `videos.routes.ts` e `InMemoryVideoRepository.ts`

---

## [0.1.1] - 2025-09-06
### Added
- Configuração inicial do frontend (React + Vite + TypeScript)
- Integração do frontend com a API usando `axios` (`src/api/index.ts`)
- Página **Home** consumindo `GET /videos` e listando vídeos
- Página **VideoPage** consumindo `GET /videos/:id` (versão inicial)
- Configuração de alias `@` no `tsconfig` para facilitar imports

### Changed
- Backend configurado para permitir CORS de `http://localhost:5173`
- Variáveis e funções no frontend renomeadas para nomes mais claros
- Helpers `unwrap` e `desembrulhar` criados para lidar com respostas `{ props: ... }`

### Fixed
- Correção no `package.json` (nome inválido impedia instalação de pacotes)
- Ajuste no JSON retornado pela entidade `Video` (normalização de DTO)
- Correções de import de tipos (`Video`) no frontend

---

## [0.1.0] - 2025-09-06
### Added
- Estrutura inicial do backend com Express
- Rota `/health` para verificar disponibilidade do servidor
- Entidade `Video` e contrato `VideoRepository`
- Repositório em memória de vídeos com seed inicial
- Rota `GET /videos` consumindo repositório em memória
- Estrutura de pastas inicial organizada em `domain`, `infra` e `http`
