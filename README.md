# Projeto Controle de Estoque - LTSSystem

## 1. Descrição do Projeto

Este projeto foi desenvolvido com o objetivo de criar um controle de estoque de peças.
O sistema permitirá que você cadastre, atualize, delete, altere a quantidade, e tenha acesso aos custos de itens que entraram e sairam do estoque.
O projeto também inclui filtros por fornecedores, filtros por estoquistas e mês.
Foi utilizado o método Kanban para quando seja necessário gerenciar os níveis de abastecimento haja um ponto mínimo, médio e alto.

<p align="center">
  <img src="https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/21630b33-f1ac-4d9d-9173-0ec59958fb33" alt="Nome da Imagem">
</p>

<p align="center">
<img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## 2. Features

#### Controle de cadastro/entrada/saídas/alteração/exclusão de produtos
- [x] Total de produtos
- [x] Cadastro de produtos
- [x] Atualizações de produtos
- [x] Deletar produtos
- [x] Saída de produtos
- [x] Login
- [ ] PDF com as informações das movimentações do mês
- [ ] Aplicativo mobile
- [ ] Indicadores
- [ ] Mensagem instantânea do Kanban

 #### Controle dos níveis - Kanban
- [x] Estoque Baixo - Urgente
- [x] Estoque Baixo - Necessário Reposição
- [x] Estoque Suficiente

 #### Filtro de fornecedores e estoquistas    
- [X] Procurar Fornecedor
- [X] Procurar Estoquista

#### Controle de custos
- [x] Custo total
- [x] Custo saída
- [x] Custo por fornecedor

#### Filtro mês entrada/saída
- [x] Filtro mês entrada
- [x] Filtro mês saída

## 3. Ferramentas e tecnologias utilizadas
- ``Javascript``
- ``Node js``
- ``Git``
- ``Github``
- ``Visual Studio Code``

## 4. Instalação e configuração do projeto

Você vai precisar inicialmente ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como o [VSCode](https://code.visualstudio.com/)

```bash
# Clone este repositório no VSCode
$ git clone <git@github.com:Larissa-taynara/projeto-estoque.git>

# Instale as dependências
$ npm install express
$ npm install nodemon
$ npm init -y

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - instale a ferramenta abaixo para melhor constrole de cada feature:
[insomnia](https://insomnia.rest/download).

```
## 5. Estrutura e imagens do código

O código esta separado por conforme a estrutura abixo:
```text
.
├── node_modules.md
├── README.md
├── package.json
├── .gitignore
├── src
|  ├── bancoDeDados (Produtos no Estoque)
|  |  ├── listaprodutos.js
|  ├── bancoDeDados (Produtos que sairam do Estoque)
|  |  ├── saidaDeProdutos.js
|  ├── controladores
|  |  ├── produtos.js
|  ├── autenticacao.js
|  ├── index.js
|  └── rotas.js
```
📁 Arquivo principal controlador 
![image](https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/6bd6ef68-e93a-4274-accb-c5f297afa5a6)

📁 Biblioteca dos itens que sairam do estoque
![image](https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/b5a04d4a-cafb-48dc-bced-2a002853cd06)


## 6. Método Kanban 

O sistema Kanban visa equilibrar a demanda de trabalho em cada etapa do processo, evitando gargalos e assegurando que a quantidade de trabalho seja distribuída de maneira uniforme. 
Assim, é possível garantir um fluxo de trabalho leve, contínuo e sem sobrecargas. No Kanban, eliminamos os desperdícios e melhoramos a entrega contínua de valor através de um 
sistema puxado.

<p align="center">
<img src="https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/04b86e6c-e27c-4ac1-a730-1249d12fe36b" alt="Nome da Imagem">
</p>
<p align="center">
<img src="https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/63a074c7-a130-4984-9db6-22ed24f32d55" alt="Nome da Imagem">
</p>

## 7. Utilização no insomnia

O insomnia foi utilizado para melhor controle de cada requisição.

![image](https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/3d07ded5-7da3-40df-92a1-b9bbfc0ee5d6)

## 8. Acesso ao projeto

📁 Você pode acessar os arquivos e o código do projeto clicando aqui 👉 (https://github.com/Larissa-taynara/projeto-estoque/tree/main/1-src).


## 9. Autor

<img style="border-radius: 50%;" src="https://github.com/Larissa-taynara/projeto-estoque/assets/138536327/63aafd3f-8949-40ee-8824-cfcd368c0836" width="100px" alt="Descrição da imagem"/>

###### Desenvolvido 💻 por Larissa Taynara, entre em contato 👋🏽! 

[<img src="https://img.shields.io/badge/Linkedin-323330?style=for-the-badge&logo=linkedin&logoColor=blue" alt="LinkedIn" />](https://www.linkedin.com/in/larissa-taynara-b-1a759b65/)

