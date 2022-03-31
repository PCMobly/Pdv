const router = require('express').Router();
const db = require('../config/db');
const { app } = require('electron');
const path = require("path");

let execPath;
execPath = path.dirname(app.getPath('exe'));

router.get('/carregarParametros', async function (req, res) {
  db('param')
    .first()
    .then((param) => res.json(param))
    .catch((err) => res.status(500).send(err));
});

router.put('/salvarParametros', async function (req, res) {
  const jsonDados = { ...req.body };
  db.raw(
    `update param set Valor_Sangria = ${jsonDados.VALOR_SANGRIA},
                        Codigo_AtvSat = '${jsonDados.COD_ATVSAT}',
                        Cod_AssSat = '${jsonDados.ASS_SAT}',
                        Dest_dllSat = '${execPath}\\SAT.dll',
                        Regime_Tributario = '${jsonDados.REGIME_TRIBUTARIO}',
                        ambiente_Sat = '${jsonDados.AMBIENTE_SAT}',
                        Num_Caixa = '${jsonDados.NUM_CAIXA}' ,
                        Descricao_Empresa = '${jsonDados.RAZAO_SOCIAL}',
                        Fantasia = '${jsonDados.FANTASIA}',
                        Endereco_Empresa = '${jsonDados.ENDERECO_EMPRESA}',
                        CEP = '${jsonDados.CEP_EMPRESA}',
                        CNPJ = '${jsonDados.CNPJ_EMPRESA}',
                        IE = '${jsonDados.IE}',
                        Fone = '${jsonDados.FONE_EMPRESA}',
                        Num_Loja = '${jsonDados.COD_LOJA}',
                        Cidade = '${jsonDados.CIDADE}',
                        Uf = '${jsonDados.UF}',
                        Bairro = '${jsonDados.BAIRRO}'

      where Num_Sequen = 1 `
  )
    .then((pcfin) => res.json(pcfin))
    .catch((err) => res.status(500).send(err));
});

router.post('/salvarParametros', async function (req, res) {
  const jsonDados = { ...req.body };
  db.raw(
    `insert into param (Num_Sequen, Valor_Sangria,Codigo_AtvSat,Cod_AssSat,Dest_dllSat,Regime_Tributario,ambiente_Sat,Num_Caixa,Descricao_Empresa,Fantasia,Endereco_Empresa,CEP,CNPJ,IE,Fone,Num_Loja,Bairro, Cidade,Uf)
  values (1,
          ${jsonDados.VALOR_SANGRIA} ,
          '${jsonDados.COD_ATVSAT}' ,
          '${jsonDados.ASS_SAT}' ,
          '${execPath}\\SAT.dll',
          '${jsonDados.REGIME_TRIBUTARIO}' ,
          '${jsonDados.AMBIENTE_SAT}' ,
          '${jsonDados.NUM_CAIXA}' ,
          '${jsonDados.RAZAO_SOCIAL}' ,
          '${jsonDados.FANTASIA}' ,
          '${jsonDados.ENDERECO_EMPRESA}' ,
          '${jsonDados.CEP_EMPRESA}' ,
          '${jsonDados.CNPJ_EMPRESA}' ,
          '${jsonDados.IE}',
          '${jsonDados.FONE_EMPRESA}',
          '${jsonDados.COD_LOJA}',
          '${jsonDados.BAIRRO}',
          '${jsonDados.CIDADE}',
          '${jsonDados.UF}'
           )`
  )
    .then((pcfin) => res.json(pcfin))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;