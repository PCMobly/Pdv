const router = require('express').Router();
const libSat = require('./../../../build/Release/nodesat.node');
const db = require('../config/db');
const { app } = require('electron');
const path = require("path");
let execPath;
execPath = path.dirname(app.getPath('exe'));

router.get('/consultarSat', async function (req, res) {
  try {
    const response = libSat.consultarSat(`${execPath}\\SAT.dll`);
    console.log(response)
    res.send(`${response}`)
  } catch (error) {
    handleError(error);
  }

});

module.exports = router;