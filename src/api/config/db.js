const config = require('./knexFile');
const knex = require('knex')(config)

module.exports = knex