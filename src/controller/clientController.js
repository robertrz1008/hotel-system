
const connectdb = require("../db/conectiondb.js")
const conectiondb = require("../db/conectiondb.js")
const { leftLetter, nextLetter } = require("../lib/date.js")

const getClients = async () =>{
  try {
    const response = await conectiondb.query("select * from clientes")
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createClient = async (client) =>{
  const {cedula, nombre, apellido, direccion, telefono} = client
  try{
    const sqlQuery = "insert into clientes(cedula, nombre, apellido, direccion, telefono) values(?, ?, ?, ?, ?)"
    await conectiondb.query(sqlQuery, [cedula, nombre, apellido, direccion, telefono])
    console.log("Se ha creado nueva Clientes")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

const deleteClient = async (id) =>{
  try {
    const query= ` delete from clientes where id = ?`
    await conectiondb.query(query, [id])
    console.log("producto eliminado con exito")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateClients = async (clients) =>{
  const {id, cedula, nombre, apellido, direccion, telefono} = clients
  try {
    const sqlQuery = `update clientes set cedula = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ? where id = ?`
    await conectiondb.query(sqlQuery, [cedula, nombre, apellido, direccion, telefono, id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const getClientByFilter = async (filter) =>{
  try {
    const sqlQuery = `select * from clientes where cedula like "%${filter}%" or nombre like "%${filter}%"`
    const response = await conectiondb.query(sqlQuery)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const clientsListed = async(filter) => {
  function sqlQuiery(filtro){

    const orderobj={
        "1":"Id",
        "2": "nombre",
        "3": "direccion"
    }
    const orderDirection = {
        "1":"asc",
        "2": "desc",
    }

    let script = `select * from clientes where nombre like "%%" `
    
    if(filtro.idDesde && filtro.idHasta){
        script += `and id between ${filtro.idDesde} and ${filtro.idHasta} `
    }
    if(filtro.nameDesde && filtro.nameHasta){
        script += `and nombre between "${filtro.nameDesde}" and "${nextLetter(filtro.nameHasta)}" `
    }
    if(filtro.lastNameDesde && filtro.lastNameHasta){
        script += `and apellido between "${filtro.lastNameDesde}" and "${nextLetter(filtro.lastNameHasta)}" `
    }
    script += `order by ${orderobj[filtro.orderBy]} ${orderDirection[filtro.order]}`
    return script
  }
  try {
    const response = await connectdb.query(sqlQuiery(filter))
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports={
  getClients,
  getClientByFilter,
  createClient,
  deleteClient,
  updateClients,
  clientsListed
}