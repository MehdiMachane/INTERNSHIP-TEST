const express = require('express')
const app = express()
const cors = require('cors');

const PORT = 5000

app.use(express.json());
app.use(cors());


const studentRoutes = require('./routes/student');


app.use('/student', studentRoutes);


var db = require("./models/index");

db.sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});