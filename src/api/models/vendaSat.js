const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');

router.post('/finalizarSat', async function(req, res) {
    const jsonDados = { ...req.body };
    console.log(JSON.stringify(jsonDados))
  
    try {
      const response = libSat.vendaSat(JSON.stringify(jsonDados));
    } catch (error) {
      return res.status(500).send('Erro ao faturar SAT');
    }
})

module.exports = router;