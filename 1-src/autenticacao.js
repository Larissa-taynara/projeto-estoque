const autenticacao = (req, res, next) => {
    const senha = req.query.senha

    if (!senha || senha !== 'admin') {
        return res.status(401).json({ mesagem: "É necessário inserir uma senha para entrar no sistema" });
    }
    next();

}



module.exports = {
    autenticacao,
}