const app = require("./app")
const { conn } = require("./DB_connection")
const PORT = 3001;

app.listen(PORT, () => {
    conn.sync({ force: false })
    console.log('app raised in port: ' + PORT);
});
