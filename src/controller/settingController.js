const connectdb = require("../db/conectiondb.js")

const createCredential = async (credential) => {
    const {empresa, telefono, direccion} = credential
    try {
        const sqlQuery = `insert into configuracion(empresa, telefono, direccion) VALUES(?, ?, ?);`
        await connectdb.query(sqlQuery, [empresa, telefono, direccion])
        return true
     } catch (error) {
        console.log(error)
        return false
    }
}
const getCredential = async () => {
    try {
        const response = await connectdb.query("select * from configuracion")
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
const updateCredential = async (credential) => {
    const {id, empresa, telefono, direccion} = credential
    try {
        const sqlQuery = `update configuracion set empresa = ?, telefono = ?, direccion = ? where id = ?`
        await connectdb.query(sqlQuery, [empresa, telefono, direccion, id])
        console.log("se ha modificado los datos de la empresa")
        return true
     } catch (error) {
        console.log(error)
        return false
    }
}
const clearDB = async () => {
    try {
        await connectdb.query("delete from detalles")
        await connectdb.query("delete from estadias")
        await connectdb.query("delete from clientes")
        await connectdb.query("delete from servicios")
        await connectdb.query("delete from habitaciones")
        await connectdb.query("delete from configuracion")

        console.log("se ha borrado todos los datos")
        return true
     } catch (error) {
        console.log(error)
        return false
    }
}
module.exports = {
    createCredential,
    getCredential,
    updateCredential,
    clearDB
}