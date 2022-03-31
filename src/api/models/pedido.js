const router = require('express').Router();

router.get('/consultaVenda/:CPF', async function (req, res) {
  switch (req.params.CPF) {
    case '02209827329':
      res.send('{ ' +
        '   "Orcamento": [' +
        '   {' +
        '   "ID_ORCAMENTO": 1, ' +
        '   "DT_EMISSAO": "30082021", ' +
        '   "DT_VALIDADE": "30082021", ' +
        '   "DESCONTO_1": 0, ' +
        '   "DESCONTO_2": 0, ' +
        '   "DESCONTO_3": 0, ' +
        '   "DESCONTO_4": 0, ' +
        '   "CLIENTE_TIPO": "F", ' +
        '   "CLIENTE_CNPJ_CPF": "02209827329", ' +
        '   "INSCRE": "", ' +
        '   "CLIENTE_NOME": "PAULO ROBERTO REBOUÇAS CASTRO", ' +
        '   "CLIENTE_NREDUZ": "PAULO CASTRO", ' +
        '   "CLIENTE_DTNASC": "24071987", ' +
        '   "CLIENTE_EMAIL": "PAULOREBOUCAS@GMAIL.COM", ' +
        '   "CLIENTE_ENDERECO": "RUA JULIAO CAVALCANTE", ' +
        '   "CLIENTE_ENDNUM": "283", ' +
        '   "CLIENTE_ENDIBGE": "", ' +
        '   "CLIENTE_ENDESTADO": "PE", ' +
        '   "CLIENTE_ENDMUNICIPIO": "GARANHUNS", ' +
        '   "CLIENTE_ENDBAIRRO": "MAGANO", ' +
        '   "CLIENTE_ENDCEP": "55294210", ' +
        '   "CLIENTE_ENDREFERENCIA": "DEPOSITO ELETROPISO", ' +
        '   "CLIENTE_ENDCOMPLEMENTO": "BLOCO 03 APTO 104", ' +
        '   "CLIENTE_TELEFONE1": "", ' +
        '   "CLIENTE_TELEFONE2": "", ' +
        '   "CLIENTE_CELULAR": "87996194586", ' +
        '   "VOUCHER": "", ' +
        '   "ITENS": [ ' +
        '   { ' +
        '        "QUANTIDADE": 1, ' +
        '           "VALOR_UNITARIO": 1500.00, ' +
        '           "DESCONTO": 0, ' +
        '           "TIPO_PRODUTO": "1",' +
        '           "SKU": "PET-332532",' +
        '           "DESCRICAO": "Guarda-Roupa Casal Platinium 2PT Neve",' +
        '           "ARMAZEM": "03",' +
        '           "FRETE": 1,' +
        '           "VALOR_FRETE": 62.24,' +
        '           "ENTREGA": 3,' +
        '           "REVERSA_ID": "",' +
        '           "REVERSA_CLASSIFICACAO": ""' +
        '       },' +
        '       {' +
        '           "QUANTIDADE": 1,' +
        '           "VALOR_UNITARIO": 243.99,' +
        '           "DESCONTO": 0,' +
        '           "TIPO_PRODUTO": "1",' +
        '           "SKU": "PET-518815",' +
        '           "DESCRICAO": "Cabeceira Casal Rubi Branco 143 cm",' +
        '           "ARMAZEM": "03",' +
        '           "FRETE": 1,' +
        '           "VALOR_FRETE": 11.16,' +
        '           "ENTREGA": 3,' +
        '           "REVERSA_ID": "",' +
        '           "REVERSA_CLASSIFICACAO": ""' +
        '       },' +
        '       {' +
        '           "QUANTIDADE": 1,' +
        '           "VALOR_UNITARIO": 278.40,' +
        '           "DESCONTO": 0,' +
        '           "TIPO_PRODUTO": "1",' +
        '           "SKU": "SERV-362",' +
        '           "DESCRICAO": "Valor total da montagem",' +
        '           "ARMAZEM": "0",' +
        '           "FRETE": 0,' +
        '           "VALOR_FRETE": 0' +
        '       }' +
        '   ]' +
        '   },' +
        '   {' +
        '   "ID_ORCAMENTO": 2, ' +
        '   "DT_EMISSAO": "30082021", ' +
        '   "DT_VALIDADE": "30082021", ' +
        '   "DESCONTO_1": 0, ' +
        '   "DESCONTO_2": 0, ' +
        '   "DESCONTO_3": 0, ' +
        '   "DESCONTO_4": 0, ' +
        '   "CLIENTE_TIPO": "F", ' +
        '   "CLIENTE_CNPJ_CPF": "02209827329", ' +
        '   "INSCRE": "", ' +
        '   "CLIENTE_NOME": "PAULO ROBERTO REBOUÇAS CASTRO", ' +
        '   "CLIENTE_NREDUZ": "PAULO CASTRO", ' +
        '   "CLIENTE_DTNASC": "24071987", ' +
        '   "CLIENTE_EMAIL": "PAULOREBOUCAS@GMAIL.COM", ' +
        '   "CLIENTE_ENDERECO": "RUA JULIAO CAVALCANTE", ' +
        '   "CLIENTE_ENDNUM": "283", ' +
        '   "CLIENTE_ENDIBGE": "", ' +
        '   "CLIENTE_ENDESTADO": "PE", ' +
        '   "CLIENTE_ENDMUNICIPIO": "GARANHUNS", ' +
        '   "CLIENTE_ENDBAIRRO": "MAGANO", ' +
        '   "CLIENTE_ENDCEP": "55294210", ' +
        '   "CLIENTE_ENDREFERENCIA": "DEPOSITO ELETROPISO", ' +
        '   "CLIENTE_ENDCOMPLEMENTO": "BLOCO 03 APTO 104", ' +
        '   "CLIENTE_TELEFONE1": "", ' +
        '   "CLIENTE_TELEFONE2": "", ' +
        '   "CLIENTE_CELULAR": "87996194586", ' +
        '   "VOUCHER": "", ' +
        '   "ITENS": [ ' +
        '   { ' +
        '        "QUANTIDADE": 1, ' +
        '           "VALOR_UNITARIO": 1500.00, ' +
        '           "DESCONTO": 0, ' +
        '           "TIPO_PRODUTO": "1",' +
        '           "SKU": "PET-332532",' +
        '           "DESCRICAO": "Guarda-Roupa Casal Platinium 2PT Neve",' +
        '           "ARMAZEM": "03",' +
        '           "FRETE": 1,' +
        '           "VALOR_FRETE": 62.24,' +
        '           "ENTREGA": 3,' +
        '           "REVERSA_ID": "",' +
        '           "REVERSA_CLASSIFICACAO": ""' +
        '       },' +
        '       {' +
        '           "QUANTIDADE": 1,' +
        '           "VALOR_UNITARIO": 243.99,' +
        '           "DESCONTO": 0,' +
        '           "TIPO_PRODUTO": "1",' +
        '           "SKU": "PET-518815",' +
        '           "DESCRICAO": "Cabeceira Casal Rubi Branco 143 cm",' +
        '           "ARMAZEM": "03",' +
        '           "FRETE": 1,' +
        '           "VALOR_FRETE": 11.16,' +
        '           "ENTREGA": 3,' +
        '           "REVERSA_ID": "",' +
        '           "REVERSA_CLASSIFICACAO": ""' +
        '       },' +
        '       {' +
        '           "QUANTIDADE": 1,' +
        '           "VALOR_UNITARIO": 278.40,' +
        '           "DESCONTO": 0,' +
        '           "TIPO_PRODUTO": "1",' +
        '           "SKU": "SERV-362",' +
        '           "DESCRICAO": "Valor total da montagem",' +
        '           "ARMAZEM": "0",' +
        '           "FRETE": 0,' +
        '           "VALOR_FRETE": 0' +
        '       }' +
        '   ]' +
        '   }' +
        ' ]' +
        ' }')
      break;
    case '123':
      res.send('{"response":"Cpf 123"}');
      break;
    default:
      res.send('{"response":"não existe pedido para o CPF selecionado"}');
  } 
});

module.exports = router;
