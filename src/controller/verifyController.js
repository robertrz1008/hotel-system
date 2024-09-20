const connectdb = require("../db/conectiondb")


const isCedula = async (cedula) => {
    const sqlQuery = `select * from clientes where cedula = ?`
    try {
        
        const response = await connectdb.query(sqlQuery, [cedula])
        if(response[0].length == 0) return false

        return true
    } catch (error) {
        console.log(error)
    }
}

const isTelephone = async (telefono) => {
    const sqlQuery = `select * from clientes where telefono = ?`
    try {
        
        const response = await connectdb.query(sqlQuery, [telefono])
        if(response[0].length == 0) return false
        return true
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    isCedula,
    isTelephone
}