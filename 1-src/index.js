const express = require('express');
const rotas = require('./rotas');
const { autenticacao } = require('./autenticacao')
const app = express();


app.use(autenticacao);
app.use(express.json());
app.use(rotas);



app.listen(3000)
