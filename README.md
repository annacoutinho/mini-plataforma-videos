# Mini Plataforma de Vídeos

Este projeto é uma aplicação fullstack composta por **backend (Node.js + Express)** e **frontend (React + Vite + TailwindCSS)**.  

O objetivo é disponibilizar uma plataforma simples onde usuários possam:
- Listar vídeos disponíveis  
- Assistir aos vídeos  
- Registrar feedbacks (nota e comentário)  
- Visualizar feedbacks enviados por outros usuários  

---

## Deploy em Produção

- **Frontend (Vercel):**  
  [https://mini-plataforma-videos.vercel.app](https://mini-plataforma-videos.vercel.app)

- **Backend (Render + Swagger):**  
  [https://mini-plataforma-videos.onrender.com/docs](https://mini-plataforma-videos.onrender.com/docs)

---

## Requisitos

- **Node.js**: versão 20.x ou superior  
- **npm**: versão 10.x ou superior (backend)  
- **yarn**: versão 1.22.x ou superior (frontend)  

---

## Estrutura do Projeto
mini-plataforma-videos/

├── api/ → Backend (Node.js + Express + Swagger)

└── web/ → Frontend (React + Vite + TailwindCSS)

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

### Instalação e execução local
```bash
# Acesse a pasta do backend
cd api

# Instale as dependências
npm install

# Inicie em modo desenvolvimento
npm run dev
```
# API disponível em http://localhost:3000
# Documentação Swagger em http://localhost:3000/docs

Endpoints disponíveis

GET /health → Health check da API

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

Instalação e execução local
# Acesse a pasta do frontend
cd web

# Instale as dependências
yarn install

# Inicie em modo desenvolvimento
yarn dev

# Frontend disponível em http://localhost:5173
