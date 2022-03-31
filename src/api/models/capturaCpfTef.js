const router = require('express').Router();
const libSat = require('./../../../build/Release/nodesat.node');

router.get('/capturaCpf', async function (req, res) {
    try {
        const response = libSat.capturaCpf(``);
        console.log(response)
        res.send(`${response}`)
    } catch (error) {
        handleError(error);
    }
});

module.exports = router;