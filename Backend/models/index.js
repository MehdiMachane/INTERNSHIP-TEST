const { Sequelize } = require("sequelize");


const sequelize = new Sequelize("test1", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

const db = {};

const Student = require("./student")(sequelize, Sequelize);

db.Student = Student;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;