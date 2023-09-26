require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, } = process.env;

const defineBooks = require ('./models/Book'); 

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/books`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

defineBooks(sequelize); 

const { Book } = sequelize.models; 

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// Driver.belongsToMany(Team, {through: 'Driver_Team'});    // PENDIENTES DE AJUSTAR SI USAMOS MÁS DE UN MODELO 
// Team.belongsToMany(Driver, {through: 'Driver_Team'});    // PENDIENTES DE AJUSTAR SI USAMOS MÁS DE UN MODELO 

// sequelize.sync({ force: false }) // Cambiar a true si deseo que se eliminen y vuelvan a crear las tablas
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error syncing database:', err);
//   });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};


