const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');

router.post('/finalizarVenda', async function (req, res) {
  const jsonDados = { ...req.body };
  try {
    console.log(jsonDados);
    const response = libSat.vendaSat(JSON.stringify(jsonDados));
    const resData = JSON.parse(response)
    console.log(resData)
    res.send(`${response}`);
   /* if (resData.response === '6000') {
      try {
        db.raw(`Select Coalesce(Max(id),0) + 1 as id  from Venda v`).then(data => {
          const id = data[0].id;
          const id_turno = jsonDados.ID_TURNO;
          console.log(jsonDados)
          db.raw(`insert into Venda (Id, Id_Turno , Status_Venda, Data_Movimento, Cod_AV, Valor_PL, Valor_AV, Valor_DescPL, Valor_DescAV, Valor_Frete, Valor_Venda ) 
                  values (${id},
                          ${id_turno},
                          '${'F'}',
                          '${new Date().toLocaleDateString()}',
                          '${jsonDados.COD_AV}',
                           ${jsonDados.VALOR_ITENS_PL},
                           ${jsonDados.VALOR_ITENS_AV},
                           ${jsonDados.VALOR_DESCONTO_PL},
                           ${jsonDados.VALOR_DESCONTO_AV},
                           ${jsonDados.VALOR_FRETE},
                           ${jsonDados.VALOR_TOTAL} ) `)
            .then()
            .catch((err) => res.status(500).send(err));

          if (jsonDados.ID_VENDA !== 0) {
            db.raw(` update Venda Set Status_Venda = 'V' Where Id = ${jsonDados.ID_VENDA}`).then()
          }


          let NumSeqIte = 1;
          jsonDados.ITENS.map((itens) => (
            db.raw(` insert into Venda_Item (Id, Num_SeqIte, Descricao, Cod_Ean, Sku, Valor_Unitario, Quantidade, Valor_DescBalcao, Valor_DescBalcaoRateio, Valor_Frete, Valor_Total, Item_AV, Ncm_Produto, Id_Produto)
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
               ${itens.ITEM_AV},
               '${itens.NCM}',
              ${itens.ID_PRODUTO}
             )`)
              .then()
              .catch((err) => res.status(500).send(err))
          ))

          let NumSeqPagto = 1;
          jsonDados.PAGAMENTO.map((pagamento) => (
            db.raw(` insert into Venda_Pagto (Id, Num_SeqPagto, Tipo_Pagto, Valor_Pagto, Nsu, Bandeira, Total_Parcelas, Rede_Adquirente, Rede_CnpjAdq)
                    Values(
                      ${id},
                      ${NumSeqPagto++},
                      '${pagamento.DESCRICAO_PAGAMENTO}',
                      ${pagamento.VALOR_PAGAMENTO},
                      '${pagamento.NSU_PAGAMENTO}',
                      '${pagamento.BANDEIRA}',
                      '${pagamento.NUM_PARCELA}')`)
              .then()
              .catch((err) => res.status(500).send(err))
          ))

          jsonDados.PAGAMENTO.map((pagamento) => (
            db.raw(` insert into cxmov (Id_Venda, Id_Turno,Data_Movimento, Tipo_Mov, Tipo_Pagamento, Valor) values ( 
              ${id},
              ${id_turno},
              '${new Date().toLocaleDateString()}',
              'VENDA',
              '${pagamento.DESCRICAO_PAGAMENTO}',
               ${pagamento.VALOR_PAGAMENTO})`
            ).then()
          ))
        })
        res.send(`${response}`)
      } catch (error) {

      }
    } else {
      db.raw(` Insert Into logpdv(Tipo_Transacao, Mensagem, Json_Transacao) Values('Venda', '${response}' , '${JSON.stringify(jsonDados)}')`).then(res.send(`${response}`));
    } */
  } catch (error) {
    return res.status(500).send(`Erro ao faturar SAT: ${response}`); 
  } 
   
}); 

module.exports = router;