const router = require('express').Router();
const libSat = require('./../../../build/Release/nodesat.node');
const db = require('./../config/db');

router.post('/sangriaSuprimento', async function (req, res) {
    const jsonDados = { ...req.body }; 
    try {
        const response = libSat.impComprovante(JSON.stringify(jsonDados));
        res.json(`{"response":"${response}"}`)

        db.raw(` insert into cxmov (Id_Turno, Data_Movimento, Tipo_Mov, Tipo_Pagamento, Valor) values ( 
          '${jsonDados.ID_TURNO}',
          '${new Date().toLocaleDateString()}',
          '${jsonDados.TIPO_COMPROVANTE.replace(' ', '')}',
          'Dinheiro',
           ${parseFloat(jsonDados.VALOR_COMPROVANTE.replace('R$ ', '').replace('R$', '').replace('.', '').replace(',', '.'))})`
         ).then((pagto) => res.json(pagto))  
      } catch (error) {
        handleError(error);
      } 
   
  });

module.exports = router;
