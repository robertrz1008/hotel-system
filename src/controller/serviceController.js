const conectiondb = require("../db/conectiondb.js")
const { nextLetter } = require("../lib/date.js")

const getServices = async () =>{
  try {
    const response = await conectiondb.query("select * from servicios")
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createService = async (service) =>{
  const { descripcion, monto, observacion } = service
  try{
    const sqlQuery = "insert into servicios(descripcion, monto,observacion) values(?, ?, ?)"
    await conectiondb.query(sqlQuery, [ descripcion, monto,observacion ])
    console.log("Se ha creado nueva Clientes")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

const deleteService = async (id) =>{
  try {
    const query= ` delete from servicios where id = ?`
    await conectiondb.query(query, [id])
    console.log("producto eliminado con exito")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateServices = async (clients) =>{
  const {id, descripcion, monto, observacion } = clients
  try {
    const sqlQuery = `update servicios set descripcion = ?, monto = ?, observacion = ? where id = ?`
    await conectiondb.query(sqlQuery, [descripcion, monto, observacion, id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
const getServicesByFilter = async (filter) =>{
  try {
    const sqlQuery = `select * from servicios where descripcion like "%${filter}%" or monto like "%${filter}%"`
    const response = await conectiondb.query(sqlQuery)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const servicesListed = async(filter) => {
  function sqlQuiery(filtro){

    const orderobj={
        "1":"Id",
        "2": "descripcion",
        "3": "monto"
    }
    const orderDirection = {
        "1":"asc",
        "2": "desc",
    }

    let script = `select * from servicios where descripcion like "%%" `
    
    if(filtro.idDesde && filtro.idHasta){
        script += `and id between ${filtro.idDesde} and ${filtro.idHasta} `
    }
    if(filtro.descriptionDesde && filtro.descriptionHasta){
        script += `and descripcion between "${filtro.descriptionDesde}" and "${nextLetter(filtro.descriptionHasta)}" `
    }
    if(filtro.montoDesde && filtro.montoHasta){
        script += `and monto between ${filtro.montoDesde} and ${filtro.montoHasta} `
    }
    script += `order by ${orderobj[filtro.orderBy]} ${orderDirection[filtro.order]}`
    return script
  }
  try {
    const response = await conectiondb.query(sqlQuiery(filter))
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getServices,
  getServicesByFilter,
  createService,
  deleteService,
  updateServices,
  servicesListed
}