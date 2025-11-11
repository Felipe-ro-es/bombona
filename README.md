♻️ Sistema de Rastreamento de Bombonas

Aplicação web para rastreamento de bombonas, permitindo visualizar, atualizar localizações via leitura de QR Code, registrar status e controlar movimentação.

✅ Funcionalidades

✔ Listagem de bombonas
✔ Geração de QR Code por bombona
✔ Leitura de QR Code (câmera do celular)
✔ Atualização de local via nome do local, não ID
✔ Histórico de movimentação
✔ Interface simples e responsiva

🛠️ Tecnologias
Frontend

React + Vite

Axios

qrcode.react

react-qr-reader

CSS Modular

Backend

Node.js

Express

MongoDB

Mongoose

📁 Estrutura das pastas
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── app.js
  └── server.js

/frontend
  ├── src/
  │   ├── components/
  │   │   ├── BottleItem.jsx
  │   │   ├── QRReader.jsx
  │   ├── pages/
  │   │   ├── Home.jsx
  │   │   ├── UpdateLocation.jsx
  │   ├── services/
  │   │   ├── api.js
  │   ├── App.jsx
  │   ├── main.jsx
  ├── public/
  └── package.json

⚙️ Instalação e Execução
📌 Backend
cd backend
npm install
npm start

📌 Frontend
cd frontend
npm install
npm run dev

🔗 API Endpoints
Bombonas
Método	Rota	Descrição
GET	/bombonas	Lista todas bombonas
GET	/bombonas/:id	Retorna uma bombona
POST	/bombonas	Cria nova
PATCH	/bombonas/update-location	Atualiza local
DELETE	/bombonas/:id	Remove
📷 Atualização por QR Code

Usuário abre a página de leitura

Escaneia o QR

Sistema identifica a bombona

Usuário seleciona o nome do local

Local é atualizado

✅ Exemplo de payload para atualizar local
{
  "bottleId": "673183",
  "locationName": "Farmácia A"
}

🚀 Build para produção

Frontend:

npm run build
