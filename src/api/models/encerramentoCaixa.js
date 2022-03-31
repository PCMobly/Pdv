const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');

router.post('/encerrarCaixa', async function (req, res) {
  let jsonDados = {...req.body}
  try {
    console.log(jsonDados);

    jsonDados.ENCERRAMENTO.map((encerramento) => (
      db.raw(` insert into encerramento_caixa (Id_Turno, Tipo_Pagto, Valor) values ( 
         ${jsonDados.ID_TURNO},
         '${encerramento.TIPO_PAGTO}',
         ${encerramento.VALOR})`)
        .then((pcfin) => res.json(pcfin))
        .catch((err) => res.status(500).send(err))
    ))
  } catch (error) {
    handleError(error);
  }

  });

router.get('/encerrarCaixa/:idTurno', async function (req, res) {
  let id = req.params.idTurno;
  try {
    db.raw(` update turno set Status_Caixa = 'F' , DataHora_Fechamento = '${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}'
            where Id_Turno = ${id}`)
     .then((pcfin) => res.json(pcfin))
     .catch((err) => res.status(500).send(err))
    const response = libSat.impComprovanteEncerramento(parseInt(id));
    console.log(response)
    res.send(`${response}`)
  } catch (error) {
    handleError(error);
  }
  });
  
  module.exports = router;