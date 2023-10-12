const express = require('express');
const app = express();
const mainRouter = require("./routes/index")
const morgan = require("morgan")

app.use(express.json());
app.use(morgan("dev"))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});
app.use("/rickandmorty", mainRouter);

module.exports = app

/* const http = require("http");
const { getCharById } = require('./controllers/getCharById')


http
    .createapp((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');


        if (req.url.includes('/rickandmorty/character')) {
            const id = req.url.split("/").at(-1)
            getCharById(res, +id)
        }

    }).listen(3001, "localhost") */