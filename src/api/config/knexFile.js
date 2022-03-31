const sqlite3 = require('sqlite3').verbose();
const { app } = require('electron');
const path = require("path");

let execPath;
execPath = path.dirname(app.getPath('exe'));

const db = new sqlite3.Database(execPath + '\\pdv.db');

db.serialize(function () {
  db.run("Create Table if not exists cxmov(Id_Venda Integer, Id_Turno Integer , Data_Movimento datetime, Tipo_Mov Text, Tipo_Pagamento Text, Valor Real(18,4))")
  db.run(`Create Table if not exists param(Num_Sequen Integer, Valor_Sangria Real(18,4), Codigo_AtvSat Text, Cod_AssSat Text, Dest_dllSat Text, Regime_Tributario Char(1), ambiente_Sat Char(1),
           Num_Caixa Text, Descricao_Empresa Text, Fantasia Text, Endereco_Empresa Text, CEP Text, CNPJ Text, IE Text, Fone Text)`)
  db.run(`Create Table if not exists turno(Id_Turno Integer, Status_Caixa Char(1), Data_Movimento datetime, Num_caixa Integer, Cod_Operador Integer, DataHora_Abertura datetime, DataHora_Fechamento datetime)`)
  db.run(`Create Table if not exists vendas_xml(Id_Venda Integer, Data_Movimento datetime, xml_venda Text, xml_cancelamento Text)`)
  db.run(`Create Table if not exists Venda(Id Integer Primary Key, Id_Turno Integer, Status_Venda Char(1), Data_Movimento DateTime, Cod_Vendedor Text, Cod_Operador Text, Cod_AV Text, Valor_PL Real(18,4), Valor_AV Real(18,4), Valor_DescPL Real(18,4), Valor_DescAV Real(18,4), Valor_Frete Real(18,4), Valor_Venda Real(18,4))`)
  db.run(`Create Table if not exists Venda_Item(Id Integer, Num_SeqIte Integer , Descricao Text,Cod_Ean Text, Sku Text, Valor_Unitario Real(18,4), Quantidade Integer,Valor_DescVourche Real(18,4), Valor_DescSite Real(18,4), Valor_DescValeTroca Real(18,4), Valor_DescBalcao Real(18,4), Valor_DescBalcaoRateio Real(18,4), Valor_Frete Real(18,4), Valor_Total Real(18,4), Item_Av Boolean, KEY_ReservaProdBob Text, Cod_Vendedor Integer,PRIMARY KEY(Id, Num_SeqIte) ,FOREIGN KEY(Id) REFERENCES Venda(Id))`)
  db.run(`Create Table if not exists Venda_Pagto(Id Integer, Num_SeqPagto Integer, Tipo_Pagto Text, Valor_Pagto Real(18,4), Nsu Text, Bandeira Text, Total_Parcelas Integer, PRIMARY KEY(Id, Num_SeqPagto), FOREIGN KEY(Id) REFERENCES Venda(Id))`)
  db.run(`Create Table if not exists encerramento_caixa(Id_Turno Integer, Tipo_Pagto Text, Valor Real(18,4))`)
  db.all(`select COUNT(*) as chave_venda from pragma_table_info('vendas_xml') Where name = 'chave_venda'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.chave_venda === 0) {
        db.run(`Alter Table vendas_xml add column chave_venda text`)
      }
    });
  })
  db.all(`select COUNT(*) as chave_cancelamento from pragma_table_info('vendas_xml') Where name = 'chave_cancelamento'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.chave_cancelamento === 0) {
        db.run(`Alter Table vendas_xml add column chave_cancelamento text`)
      }
    });
  })
  db.run(`Create Table if not exists logpdv(Tipo_Transacao Text, Mensagem Text, Json_Transacao Text )`)
  db.all(`select COUNT(*) as Num_Loja from pragma_table_info('param') Where name = 'Num_Loja'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Num_Loja === 0) {
        db.run(`Alter Table param add column Num_Loja text`)
      }
    });
  })
  db.all(`select COUNT(*) as Ncm_produto from pragma_table_info('Venda_Item') Where name = 'Ncm_produto'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Ncm_produto === 0) {
        db.run(`Alter Table Venda_Item add column Ncm_produto text`)
      }
    });
  })
  db.all(`select COUNT(*) as Id_produto from pragma_table_info('Venda_Item') Where name = 'Id_produto'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Id_produto === 0) {
        db.run(`Alter Table Venda_Item add column Id_produto integer`)
      }
    });
  })
  db.all(`select COUNT(*) as Rede_Adquirente from pragma_table_info('Venda_Pagto') Where name = 'Rede_Adquirente'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Rede_Adquirente === 0) {
        db.run(`Alter Table Venda_Pagto add column Rede_Adquirente Text`)
      }
    });
  })
  db.all(`select COUNT(*) as Rede_CnpjAdq from pragma_table_info('Venda_Pagto') Where name = 'Rede_CnpjAdq'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Rede_CnpjAdq === 0) {
        db.run(`Alter Table Venda_Pagto add column Rede_CnpjAdq Text`)
      }
    });
  })
  db.all(`select COUNT(*) as Bairro from pragma_table_info('param') Where name = 'Bairro'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Bairro === 0) {
        db.run(`Alter Table param add column Bairro Text`)
      }
    });
  })
  db.all(`select COUNT(*) as Cidade from pragma_table_info('param') Where name = 'Cidade'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Cidade === 0) {
        db.run(`Alter Table param add column Cidade Text`)
      }
    });
  })
  db.all(`select COUNT(*) as Uf from pragma_table_info('param') Where name = 'Uf'`, [], (err, rows) => {
    rows.forEach((row) => {
      if (row.Uf === 0) {
        db.run(`Alter Table param add column Uf Text`)
      }
    });
  })

})

db.close;

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: execPath + '\\pdv.db'
  },
  migrations: {
    tablename: 'knex_migations'
  }
}