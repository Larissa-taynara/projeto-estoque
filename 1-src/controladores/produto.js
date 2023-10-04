let listaProdutos = require('../bancoDeDados/listaProdutos');
const fs = require('fs');
const saidaDeItens = require('../bancoDeDadosSaida/saidaDeProdutos');



const TotalDeItensEstoque = (req, res) => {
    res.status(200).json(listaProdutos);

}

//CONTROLE DO ESTOQUE - KANBAN
const estoqueBaixo = (req, res) => {
    const estoqueMinimoUrgente = listaProdutos.filter((produto) => produto.quantidade <= 5);
    return res.status(200).json({ "Necessário reposição urgente (vermelho)": estoqueMinimoUrgente });

}

const estoqueBaixoreposicao = (req, res) => {
    const estoqueMinimoReposicao = listaProdutos.filter((produto) => produto.quantidade >= 6 && produto.quantidade < 10);
    return res.status(200).json({ "Necessário reposição (amarelo)": estoqueMinimoReposicao });

}

const estoqueSuficiente = (req, res) => {
    const estoqueMinimoOK = listaProdutos.filter((produto) => produto.quantidade >= 10);
    return res.status(200).json({ "Estoque com itens suficientes (verde)": estoqueMinimoOK });

}

//CONTROLE DE CADASTRO/ENTRADAS/SAÍDAS/ALTERAÇÃO/EXCLUSÃO DE ITENS
const saidaDeProduto = (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    try {
        let encontrarProduto = listaProdutos.find((encontrar) => {
            return encontrar.id === Number(id)
        });

        if (!encontrarProduto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        if (quantidade <= 0 || quantidade > encontrarProduto.quantidade) {
            return res.status(400).json({ mensagem: "Verifique o estoque pois não há a quantidade disponível" });
        }

        if (encontrarProduto) {
            let encontrarMaiorID = saidaDeItens.reduce((maxID, encontrar) => {
                return encontrar.id > maxID ? encontrar.id : maxID;
            }, 0);

            let novoIDEncontrar = encontrarMaiorID + 1;

            let saidaDeProdutos = {
                id: novoIDEncontrar,
                descrição: encontrarProduto.descrição,
                valorUnitário: encontrarProduto.valorUnitário,
                quantidade: quantidade,
                estoquista: encontrarProduto.estoquista,
                fornecedor: encontrarProduto.fornecedor,
                data: new Date().toLocaleString("pt-BR")
            };

            saidaDeItens.push(saidaDeProdutos)

            encontrarProduto.quantidade -= quantidade;
            fs.writeFileSync('./1-src/bancoDeDados/listaProdutos.js', 'module.exports = ' + JSON.stringify(listaProdutos, null, 2), 'utf-8');
            fs.writeFileSync('./1-src/bancoDeDadosSaida/saidaDeProdutos.js', `module.exports = ${JSON.stringify(saidaDeItens, null, 2)};`, 'utf-8');

            return res.status(200).json({ mensagem: "Saída de produto realizada" });
        }
    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}

const cadastrarProduto = (req, res) => {
    const { descrição, valorUnitário, quantidade, estoquista, fornecedor } = req.body;

    try {
        if (!descrição || !valorUnitário || !quantidade || !estoquista || !fornecedor) {
            return res.status(400).json({ mensagem: "É necessário que todos os itens estejam preenchidos" })
        }

        if (isNaN(valorUnitário) || isNaN(quantidade)) {
            return res.status(400).json({ mensagem: "Esse valor precisa ser um número" })
        }

        if (typeof estoquista !== 'string') {
            return res.status(400).json({ mensagem: "O item é obrigatório ser preenchido corretamente" })
        }

        let verificarSistema = listaProdutos.find((encontrar) => encontrar.descrição === descrição && encontrar.fornecedor === fornecedor);

        if (verificarSistema) {
            verificarSistema.quantidade += quantidade;
            fs.writeFileSync('./1-src/bancoDeDados/listaProdutos.js', `module.exports = ${JSON.stringify(listaProdutos, null, 2)};`, 'utf-8');
            return res.status(200).json({ mensagem: "Produto já esta cadastrado no sistema, a quantidade foi alterada" });
        };

        let encontrarMaiorID = 0;
        listaProdutos.forEach((encontrar) => {
            if (encontrar.id > encontrarMaiorID) {
                return encontrarMaiorID = encontrar.id;
            }
        })

        let novoID = encontrarMaiorID + 1;

        const novoProduto = {
            id: novoID,
            descrição,
            valorUnitário,
            quantidade,
            estoquista,
            fornecedor,
            data: new Date().toLocaleString("pt-BR")
        }

        listaProdutos.push(novoProduto);

        fs.writeFileSync('./1-src/bancoDeDados/listaProdutos.js', `module.exports = ${JSON.stringify(listaProdutos, null, 2)};`, 'utf-8')
        res.status(200).json();

    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}

const alterarProduto = (req, res) => {
    const { id } = req.params;
    const { descrição, valorUnitário, quantidade, estoquista, fornecedor } = req.body;

    try {
        if (!descrição || !valorUnitário || !quantidade || !estoquista || !fornecedor) {
            return res.status(400).json({ mensagem: "É necessário que todos os itens estejam preenchidos" })
        }

        if (isNaN(valorUnitário) || isNaN(quantidade)) {
            return res.status(400).json({ mensagem: "Esse valor precisa ser um número" })
        }

        if (typeof estoquista !== 'string') {
            return res.status(400).json({ mensagem: "O item é obrigatório ser preenchido corretamente" })
        }

        const index = listaProdutos.findIndex((produto) => produto.id === Number(id));

        if (index !== -1) {
            listaProdutos[index] = {
                id: Number(id),
                descrição: descrição,
                valorUnitário: valorUnitário,
                quantidade: quantidade,
                estoquista: estoquista,
                fornecedor: fornecedor,
                data: new Date().toLocaleString("pt-BR"),
            };

            fs.writeFileSync('./1-src/bancoDeDados/listaProdutos.js', `module.exports = ${JSON.stringify(listaProdutos, null, 2)};`, 'utf-8')
            return res.status(200).send();
        }

        return res.status(404).json({ mensagem: "Produto não encontrado, analise se o preenchimento esta correto, caso esteja cadastre o produto" });

    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }

}

const deletarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        let encontrarProduto = listaProdutos.findIndex(encontrar => encontrar.id === Number(id));

        if (isNaN(id)) {
            return res.status(400).json({ mensagem: "O ID deve ser um número válido." })
        }

        if (encontrarProduto < 0) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        listaProdutos.splice(encontrarProduto, 1)
        fs.writeFileSync('./1-src/bancoDeDados/listaProdutos.js', `module.exports = ${JSON.stringify(listaProdutos, null, 2)};`, 'utf-8')

        return res.status(200).json({ mensagem: "Produto apagado !" })

    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}


//CONTROLE DE FORNECEDORES E ESTOQUISTAS
const procurarFornecedor = (req, res) => {
    const { fornecedor } = req.body;

    try {
        let encontrarFornecedor = listaProdutos.filter((encontrar) => {
            return encontrar.fornecedor === fornecedor
        });

        if (encontrarFornecedor.length > 0) {
            return res.status(200).json({ "Fornecedor encontrado": encontrarFornecedor })
        }

        return res.status(200).json({ mensagem: "Fornecedor não encontrado" })

    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }

}

const procurarEstoquista = (req, res) => {
    const { estoquista } = req.body;

    try {
        let encontrarEstoquista = listaProdutos.filter((encontrar) => {
            return encontrar.estoquista === estoquista
        });

        if (encontrarEstoquista.length > 0) {
            return res.status(200).json({ mensagem: `Estoquista encontrado - Estes são os itens movimentados pelo(a) estoquista ${estoquista}`, encontrarEstoquista })
        }

        return res.status(200).json({ mensagem: "Estoquista não encontrado" })

    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}


//CONTROLE DE CUSTOS DOS ITENS
const custoTotalItensNoEstoque = (req, res) => {

    try {
        const custoTotal = listaProdutos.reduce((total, produto) => {
            return total + produto.valorUnitário * produto.quantidade

        }, 0)

        return res.status(200).json({ mensagem: `O custo total de todos os itens que estão no estoque é de ${custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` })
    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }

}

const custoTotalSaidaDeItens = (req, res) => {

    try {
        const custoSaida = saidaDeItens.reduce((total, produto) => {
            return total + produto.valorUnitário * produto.quantidade

        }, 0)
        return res.status(200).json({ mensagem: `O custo total de todos os itens que sairam do estoque é de ${custoSaida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` })

    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }

}

const custoTotalPorFornecedor = (req, res) => {
    const { fornecedor } = req.body;
    try {
        const encontrarFornecedor = listaProdutos.filter((encontrar) => encontrar.fornecedor === fornecedor);

        if (encontrarFornecedor.length > 0) {
            const custoFornecedor = encontrarFornecedor.reduce((total, produto) => {
                return total + produto.valorUnitário * produto.quantidade

            }, 0)

            return res.status(200).json({ mensagem: `O custo para o fornecedor ${fornecedor} é de ${custoFornecedor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` })
        }

        return res.status(404).json({ mensagem: "O fornecedor procurado não esta cadastrado" })
    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}

//FILTRAR MOVIMENTAÇÃO ESTOQUE POR MÊS
const filtroMesEntrada = (req, res) => {
    const { data } = req.body;

    try {
        const filtroDoMes = data.split('/')[1];
        const mes = listaProdutos.filter((encontrar) => {
            if (encontrar.data) {
                const dataProduto = encontrar.data.split('/');
                const mesProduto = dataProduto[1]
                return mesProduto === filtroDoMes
            }
        });

        if (mes.length === 0) {
            return res.status(404).json({ mensagem: "Este mês não foi encontrado na base de dados" })
        }
        return res.status(200).json({ mes })
    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}

const filtroMesSaida = (req, res) => {
    const { data } = req.body;

    try {
        const filtroDoMes = data.split('/')[1];
        const mes = saidaDeItens.filter((encontrar) => {
            if (encontrar.data) {
                const dataProduto = encontrar.data.split('/');
                const mesProduto = dataProduto[1]
                return mesProduto === filtroDoMes
            }
        });

        if (mes.length === 0) {
            return res.status(404).json({ mensagem: "Este mês não foi encontrado na base de dados de itens que sairam do estoque" })
        }
        return res.status(200).json({ mes })
    } catch (erro) {
        return res.json(`Erro: ${erro.mensagem}`);
    }
}


module.exports = {
    TotalDeItensEstoque,
    estoqueBaixo,
    estoqueBaixoreposicao,
    estoqueSuficiente,
    saidaDeProduto,
    cadastrarProduto,
    alterarProduto,
    deletarProduto,
    procurarFornecedor,
    procurarEstoquista,
    custoTotalItensNoEstoque,
    custoTotalSaidaDeItens,
    custoTotalPorFornecedor,
    filtroMesEntrada,
    filtroMesSaida,
}

