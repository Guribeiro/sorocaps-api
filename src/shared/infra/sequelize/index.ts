import {Sequelize} from 'sequelize';

const database = new Sequelize('sorocaps_development', 'docker', 'docker', {
  dialect: 'postgres',
  host: 'database',
  port: 5432,
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  },
});


database.authenticate({}).then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

export default database;
