const router = require('express').Router();
const db = require('./../config/db');

router.get('/alertasangria/:idTurno', async function (req, res) {
    let id = req.params.idTurno;
    console.log(`o turno eh: ${id} `)
    db.raw(`Select COALESCE((Select Sum(Valor) as Valor 
            From cxmov where Tipo_Pagamento = "Dinheiro" 
            And Tipo_Mov = "VENDA"
            And Id_Turno = ${id} ),0) - 
            COALESCE((Select Sum(Valor) as Valor 
            From cxmov where Tipo_Pagamento = "Dinheiro" 
            And Tipo_Mov = "SANGRIA"
            And Id_Turno = ${id} ),0) as Valor
            `)
      
      .then((param) => {        
        res.json(param)
      }).first
      .catch((err) => res.status(500).send(err));
  });
  
  module.exports = router;