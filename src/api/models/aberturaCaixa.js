const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');

router.get('/idTurno', async function (req, res) {
    db.raw(`select Id_Turno from turno t where Status_Caixa = 'A' `)
        .then((param) => {
            res.json(param)
        })
        .catch((err) => res.status(500).send(err));
});

router.post('/fundoDeTroco', async function (req, res) {
    const jsonDados = { ...req.body };
    console.log(JSON.stringify(jsonDados))
    const response = libSat.impComprovante(JSON.stringify(jsonDados));
    try {
        db.raw(`select Coalesce(Max(Id_Turno),0) + 1 Id_Turno from turno t`).then(data => {
            const id = data[0].Id_Turno;
            console.log(id)
            db.raw(`insert into Turno (Id_Turno , Status_Caixa, Data_Movimento, Num_Caixa, Cod_Operador,DataHora_Abertura ) 
              values (${id},
                      '${'A'}',
                      '${new Date().toLocaleDateString()}',
                      '${jsonDados.NUM_CAIXA}',
                       1,
                       '${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}') `)
                .then((pcfin) => console.log(pcfin))
                .catch((err) => res.status(500).send(err));

                db.raw(`insert into cxmov (Id_Turno , Data_Movimento, Tipo_Mov, Tipo_Pagamento, Valor) 
                values (${id},
                        '${new Date().toLocaleDateString()}',
                        'FUNDO DE TROCO',
                        'Dinheiro',
                        ${parseFloat(jsonDados.VALOR_COMPROVANTE.replace('R$ ', '').replace('R$', '').replace('.', '').replace(',', '.'))} ) `)
                  .then((pcfin) => res.send(`{"response":${id}}`))
                  .catch((err) => res.status(500).send(err));
        })
     // res.json(`{"response":${id}}`)
    } catch (error) {

    }

});

module.exports = router;