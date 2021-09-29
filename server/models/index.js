const listsModel = require('./lists.js');
const itemsModel=require('./items.js');

require('dotenv').config();

const Sequelize=require('sequelize');

const sequelize= new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const db = {};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.lists=listsModel(sequelize,Sequelize);
db.items=itemsModel(sequelize, Sequelize);

module.exports=db;