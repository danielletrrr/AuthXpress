//conectando mongo db no servidor 
const express = require('express');
const mongoose = require('mongoose'); //mongoose é uma library que ajuda a conectar com o mongodb
const dotenv = require('dotenv');

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

//fazendo req
app.get('/', (req, res) => { //metodo express.js
    res.send('API is running');
}); 

//start server express
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});