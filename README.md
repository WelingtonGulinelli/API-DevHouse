# API DevHouse

Esta API foi desenvolvida para gerenciar reservas de casas por diferentes usuários, utilizando MongoDB como banco de dados. A API permite criar, listar e excluir reservas, além de gerenciar usuários e casas.

## 📌 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB com Mongoose
- Multer (para upload de arquivos)
- Cors
- Nodemon (para desenvolvimento)

## 📥 Instalação

1. Clone este repositório:

```sh
git clone https://github.com/seu-usuario/api-devhouse.git
cd api-devhouse
```

2. Instale as dependências do projeto:

```sh
npm install
```

## 📦 Dependências

Caso precise instalar manualmente, utilize:

```sh
npm install cors express mongodb mongoose multer nodemon
```

## 🚀 Como Rodar a Aplicação

1. Inicie o servidor de desenvolvimento com Nodemon:

```sh
nodemon server.js
```

2. A API estará disponível em `http://localhost:3333/`

## 🛠️ Endpoints Disponíveis

### 🏠 House (Casas)
- `POST /houses` - Adiciona uma nova casa
- `GET /houses` - Lista todas as casas
- `PUT /houses/:id` - Edita uma casa
- `DELETE /houses/:id` - Remove uma casa

### 📅 Reserves (Reservas)
- `POST /reserves` - Cria uma nova reserva
- `GET /reserves` - Lista todas as reservas
- `DELETE /reserves/:id` - Cancela uma reserva

### 👤 Sessions (Usuários)
- `POST /sessions` - Cria uma sessão para um usuário

## 🔗 Conectando ao MongoDB

A API utiliza o MongoDB para armazenar os dados. De forma mais prática, vá até o site https://cloud.mongodb.com , crie sua conta e um cluster. O usuário pode ter acesso até a 500mb gratuitos pela plataforma. Pegue o link de conexao do seu banco e coloque no arquivo app.js em "mongo.connect"

```env
mongoose.connect('Sua URL do mongo db aqui. Nao esqueca da Senha!!')
```



