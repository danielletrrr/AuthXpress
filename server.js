
//conectando mongo db no servidor 
const express = require('express'); // Framework que facilita o gerenciamento de rotas e respostas HTTP.
const mongoose = require('mongoose'); //mongoose é uma library que ajuda a conectar com o mongodb
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config(); //vai carregar as variáveis de arquivo do dotenv (contem infos sensíveis) database credentials

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { //conecta url com as variaveis de ambiente
    useNewUrlParser: true, //função que analisa entrada de dados 
    useUnifiedTopology: true,
})

.then(() => console.log('Connected to MongoDB')) //Quando uma Promise é resolvida (ou seja, a operação assíncrona é concluída com sucesso), o .then() permite que você execute uma função específica com o resultado da Promise.
.catch((error) => console.log(error));

// Rotas de autenticação
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});


//fazendo req
app.get('/', (req, res) => { //metodo express.js
    res.send('API is running');
}); 

//start server express
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
