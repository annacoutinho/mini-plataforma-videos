# Mini Plataforma de Vídeos

Este projeto é uma aplicação fullstack composta por **backend (Node.js + Express)** e **frontend (React + Vite + TailwindCSS)**.

O objetivo é disponibilizar uma plataforma simples onde usuários possam:

- Listar vídeos disponíveis  
- Assistir aos vídeos  
- Registrar feedbacks (nota e comentário)  
- Visualizar feedbacks enviados por outros usuários  

O frontend está hospedado em produção na Vercel:  
[https://mini-plataforma-videos.vercel.app](https://mini-plataforma-videos.vercel.app)

A documentação da API está disponível localmente em:  
[http://localhost:3000/docs](http://localhost:3000/docs)

---

## Requisitos

- **Node.js**: versão 20.x ou superior  
- **npm**: versão 10.x ou superior (para o backend)  
- **yarn**: versão 1.22.x ou superior (para o frontend)  

---

## Estrutura do projeto

mini-plataforma-videos/
´
├── api/ → Backend (Node.js + Express + Swagger)
└── web/ → Frontend (React + Vite + TailwindCSS)`


---

## Backend (API)

### Tecnologias principais
- Node.js  
- Express  
- TypeScript  
- Swagger (documentação da API)  
- Zod (validação de dados)  
- UUID  
- CORS  

### Instalação e execução
```bash
# Acesse a pasta do backend
cd api

# Instale as dependências
npm install

# Inicie em modo desenvolvimento
npm run dev

# API disponível em http://localhost:3000
# Documentação Swagger em http://localhost:3000/docs
Endpoints disponíveis
GET /videos → Lista todos os vídeos

POST /feedback → Cria um novo feedback

GET /feedback/:videoId → Lista feedbacks de um vídeo específico

Frontend (Web)
Tecnologias principais
React 19

Vite

TypeScript

TailwindCSS

React Router DOM

Axios

Instalação e execução
bash
Copiar código
# Acesse a pasta do frontend
cd web

# Instale as dependências
yarn install

# Inicie em modo desenvolvimento
yarn dev

# Frontend disponível em http://localhost:5173
