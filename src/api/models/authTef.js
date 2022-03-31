const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');

router.get('/iniciarTef', async function (req, res) {
    console.log('entrou aqui')
    const response = libSat.iniciarTef('');
    res.send(`{"response":"ok"}`)
})

router.post('/transacaoTef', async function (req, res) {
    const JsonTef = {...req.body} 
    try {
        const response = libSat.vendaTef(JSON.stringify(JsonTef));
        res.send(`${response}`)
    } catch (error) {
        
    }    
})

router.post('/cancelarPagtoTef', async function (req, res) {
    const JsonTef = {...req.body} 
    console.log(JSON.stringify(JsonTef))
    try {
        const response = libSat.cancelarPagtoTef(JSON.stringify(JsonTef));
        console.log(response)
        res.send(`${response}`)
    } catch (error) {
        
    }    
})

router.get('/menuTef', async function (req, res) {
    const JsonTef = {...req.body} 
    try {
        const response = libSat.menuTef('');
        res.send(`{"response":"ok"}`)
    } catch (error) {
        
    }    
})

module.exports = router;