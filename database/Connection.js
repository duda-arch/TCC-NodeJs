const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'un3oztgbnç',
      database : 'tccNode'
    }
  });
//

  module.exports = knex
  