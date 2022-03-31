const appexp = require("express")();
const SatTef = require("bindings")("./../../../build/Release/nodesat");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./config/db');
const { app } = require ('electron');

appexp.use(bodyParser.json());
appexp.use(cors());

let execPath;
execPath = path.dirname (app.getPath ('exe'));

appexp.db = db;
appexp.use('/', [
  require('./models/capturaCpfTef'),
  require('./models/configPdv'),
  require('./models/alertaSangria'),
  require('./models/aberturaCaixa'),
  require('./models/encerramentoCaixa'),
  require('./models/sangriaSuprimento'),
  require('./models/consultaSat'),
  require('./models/vendaSat'),
  require('./models/pedido'),
  require('./models/produtos'),
  require('./models/vendas'),
  require('./models/suspenderVenda'),
  require('./models/authTef')
]) 

appexp.listen(3333, () => {
  SatTef.carregarDLL(execPath+'\\libmobly.dll');
  console.log("Backend Executando...");
});

module.exports = appexp;
