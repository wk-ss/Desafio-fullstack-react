🚀 Desafio Técnico Fullstack

Desafio técnico Fullstack usando React + Vite, juntamente com TypeScript e MySQL.
Para testar o sistema, atualize o arquivo .env do backend com a senha do banco de dados.

Este projeto foi desenvolvido com o objetivo de demonstrar conhecimentos práticos em desenvolvimento Fullstack, integrando um frontend moderno em React com um backend em Node.js/Express, utilizando TypeScript e persistência de dados em MySQL.

A aplicação permite o gerenciamento de produtos, incluindo listagem, cadastro e controle de informações como preço, quantidade e status.

Para rodar o codigo , entre na pasta /Projeto e rode o seguinte comando no terminal :

cmd   npm run dev
 

🧠 Tecnologias Utilizadas
Frontend

React

Vite

TypeScript

Axios

Backend

Node.js

Express

TypeScript

MySQL

Cors

Dotenv

📂 Estrutura do Banco de Dados

O projeto utiliza a seguinte estrutura no MySQL:

CREATE DATABASE db_produto;

USE db_produto;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

⚙️ Configuração do Backend

Acesse a pasta do backend:

cd backend


Crie um arquivo .env na raiz do backend com a configuração do banco:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA_DO_MYSQL
DB_NAME=db_produto
DB_PORT=3306


Instale as dependências:

npm install


Inicie o servidor:

npm run dev


O backend estará rodando em:

http://localhost:3000

🎨 Configuração do Frontend

Acesse a pasta do frontend:

cd frontend


Instale as dependências:

npm install


Inicie o projeto:

npm run dev


O frontend estará disponível em:

http://localhost:5173

🔗 Integração Frontend + Backend

O frontend consome a API através da rota:

GET http://localhost:3000/api/products


Certifique-se de que o backend esteja rodando antes de iniciar o frontend.

📦 Bibliotecas Instaladas (npm)
Backend
npm install express cors mysql2 dotenv
npm install -D typescript ts-node-dev @types/express @types/cors

Frontend
npm install axios
npm install react-router-dom

✅ Observações Finais

O projeto utiliza TypeScript tanto no frontend quanto no backend, garantindo maior segurança e organização do código.

A arquitetura foi mantida simples e objetiva, facilitando manutenção e entendimento.

Ideal para testes técnicos, estudos e demonstração de integração Fullstack.