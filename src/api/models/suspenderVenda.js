const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');
const { response } = require('express');

router.post('/suspenderVenda', async function (req, res) {
    const jsonDados = { ...req.body };
    console.log(JSON.stringify(jsonDados))
    try {
        db.raw(`Select Coalesce(Max(id),0) + 1 as id  from Venda v`).then(data => {
            const id = data[0].id;
            db.raw(`insert into Venda (Id, Status_Venda, Data_Movimento, Cod_AV, Valor_PL, Valor_AV, Valor_DescPL, Valor_DescAV, Valor_Frete, Valor_Venda ) 
              values (${id},
                      '${'S'}',
                      '${new Date().toLocaleDateString()}',
                      '${jsonDados.COD_AV}',
                       ${jsonDados.VALOR_VENDA_PL},
                       ${jsonDados.VALOR_VENDA_AV},
                       ${jsonDados.VALOR_DESCONTO_PL},
                       ${jsonDados.VALOR_DESCONTO_AV},
                       ${jsonDados.VALOR_FRETE},
                       ${jsonDados.VALOR_TOTAL} ) `)
                .then((pcfin) => res.json(pcfin))
                .catch((err) => res.status(500).send(err));

            let NumSeqIte = 1;
            jsonDados.ITENS.map((itens) => (
                db.raw(` insert into Venda_Item (Id, Num_SeqIte, Descricao, Cod_Ean, Sku, Valor_Unitario, Quantidade, Valor_DescBalcao, Valor_DescBalcaoRateio, Valor_Frete, Valor_Total, Item_AV)
         Values(
           ${id},
           ${NumSeqIte++},
           '${itens.DESCRICAO}',
           '${itens.EAN}',
           '${itens.SKU}',
           ${itens.VALOR_UNITARIO},
           ${itens.QUANTIDADE},
           ${itens.DESCONTO},
           ${itens.DESCONTO_RATEIO},
           ${itens.VALOR_FRETE},
           ${itens.VALOR_ITEM},
           ${itens.ITEM_AV}
         )`)
                    .then((pcfin) => res.json(pcfin))
                    .catch((err) => res.status(500).send(err))
            ))

        })

    } catch (error) {

    }
});

router.get('/suspenderVendaCab', async function (req, res) {
    let JsonVenda = { Venda: [] }
    db.raw(`Select * from Venda v WHERE Status_Venda = 'S'And (Valor_PL > 0 or Valor_AV > 0)`).then(data => {
        data.map(venda => {
            JsonVenda.Venda.push({
                ID_VENDA: venda.Id, COD_AV: venda.Cod_AV, VALOR_VENDA_AV: venda.Valor_AV,
                VALOR_VENDA_PL: venda.Valor_PL, VALOR_FRETE: venda.Valor_Frete, VALOR_TOTAL: venda.Valor_Venda,
                VALOR_DESCONTO_PL: venda.Valor_DescPL, VALOR_DESCONTO_AV: venda.Valor_DescAV, ITENS: []
            })
        })
        res.json(JsonVenda)
    })
})

router.get('/suspenderVendaIte/:Id_Venda', async function (req, res) {
    let JsonItem = [];
    db.raw(`Select * From Venda_Item vi Where Id = ${req.params.Id_Venda}`).then(data => {
        data.map(item => {
            JsonItem.push({
                DESCRICAO: item.Descricao, SKU: item.Sku, EAN: item.Cod_Ean, KEY_RESERVAPROD: item.KEY_ReservaProdBob,
                QUANTIDADE: item.Quantidade, VALOR_UNITARIO: item.Valor_Unitario, VALOR_FRETE: item.Valor_Frete,
                DESCONTO: item.Valor_DescBalcao, DESCONTO_RATEIO: item.Valor_DescBalcaoRateio, VALOR_ITEM: item.Valor_Total,
                ITEM_AV: item.Item_Av
            })
        })
        res.json(JsonItem)
    })
})

router.put('/suspenderVenda/:Id_Venda', async function (req, res) {
    db.raw(` update Venda Set Status_Venda = 'V' Where Id = ${req.params.Id_Venda}`).then((pcfin) => res.json(pcfin))
})

module.exports = router;