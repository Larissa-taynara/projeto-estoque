const express = require('express');
const produto = require('./controladores/produto')
const rotas = express();


rotas.get('/produto', produto.TotalDeItensEstoque);
rotas.post('/produto', produto.cadastrarProduto);
rotas.put('/produto/:id', produto.alterarProduto);
rotas.delete('/produto/:id', produto.deletarProduto);
rotas.patch('/produto/:id/quantidade', produto.saidaDeProduto);
rotas.get('/produto/quantidadeurgente', produto.estoqueBaixo);
rotas.get('/produto/quantidadereposicao', produto.estoqueBaixoreposicao);
rotas.get('/produto/quantidadesuficiente', produto.estoqueSuficiente);
rotas.get('/produto/fornecedor', produto.procurarFornecedor);
rotas.get('/produto/estoquista', produto.procurarEstoquista);
rotas.get('/produto/custototal', produto.custoTotalItensNoEstoque);
rotas.get('/produto/filtroMesEntrada', produto.filtroMesEntrada);
rotas.get('/produto/custoSaida', produto.custoTotalSaidaDeItens);
rotas.get('/produto/custoFornecedor', produto.custoTotalPorFornecedor);
rotas.get('/produto/filtroMesSaida', produto.filtroMesSaida);

module.exports = rotas