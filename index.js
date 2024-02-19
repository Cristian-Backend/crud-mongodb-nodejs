require('dotenv').config()
const app = require('./server');
const dbConection = require('./database/db')

const port = process.env.PORT || 3000


app.listen(port,()=> {
    dbConection()
console.log("Escuchando en el puerto 3000")
})