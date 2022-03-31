const router = require('express').Router();

router.get('/consultaProduto/:EAN', async function (req, res) {
    switch (req.params.EAN) {
        case '1':
            res.send(`{ 
                  "id":"1",
                  "VALOR_UNITARIO": 999.00, 
                   "barcode_ean": "7896714273006" ,
                  "sku_simple": "PET-332532",
                   "name": "Guarda-Roupa Casal Platinium 2PT Neve",
                   "Ncm": "69111010",
                   "ARMAZEM": "03",
                   "FRETE": 1,
                   "ENTREGA": 3,
                   "REVERSA_ID": "",
                   "REVERSA_CLASSIFICACAO": ""}`);
            break;
        case '2':
            res.send('{"VALOR_UNITARIO": 2000.95, ' +
                '  "SKU": "PET-115896",' +
                '   "DESCRICAO": "Sofá-Cama cinza 3 lugares",' +
                '   "ARMAZEM": "03",' +
                '   "FRETE": 1,' +
                '   "ENTREGA": 3,' +
                '   "REVERSA_ID": "",' +
                '   "REVERSA_CLASSIFICACAO": ""}');
            break;
        case '3':
            res.send('{"Response":"Ok", "Item" : { "VALOR_UNITARIO": 1300.00, ' +
                '  "SKU": "PET-113456",' +
                '   "EAN": "7891000294093" ,'+
                '   "DESCRICAO": "Cadeira Gamer Mobly",' +
                '   "ARMAZEM": "03",' +
                '   "FRETE": 1,' +
                '   "ENTREGA": 3,' +
                '   "REVERSA_ID": "",' +
                '   "REVERSA_CLASSIFICACAO": ""}}');
            break;
        default:
            res.send('{"Response":"Produto não encontrado"}');
    }
});

module.exports = router;
