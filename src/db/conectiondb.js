const mysql = require("mysql2/promise")

const connectdb = mysql.createPool({
    host: "localhost",
    port: "3300",
    user: "root",
    password: "1234567890",
    database: "hoteldb"
})



module.exports =  connectdb 