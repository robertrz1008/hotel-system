const conectiondb = require("../db/conectiondb.js")
const { nextLetter } = require("../lib/date.js")

const getRooms = async () =>{
  try {
    const response = await conectiondb.query("select * from habitaciones")
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createRoom = async (room) =>{
  const { descripcion, montoDia, observacion } = room
  try{
    const sqlQuery = "insert into habitaciones(descripcion, montoDia,observacion) values(?, ?, ?)"
    await conectiondb.query(sqlQuery, [ descripcion, montoDia,observacion ])
    console.log("Se ha creado nueva Clientes")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

const deleteRoom = async (id) =>{
  try {
    const query= ` delete from habitaciones where id = ?`
    await conectiondb.query(query, [id])
    console.log("habitacion eliminado con exito")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateRoom = async (room) =>{
  const {id, descripcion, montoDia, observacion } = room
  try {
    const sqlQuery = ` update habitaciones set descripcion = ?, montoDia = ?, observacion = ? where id = ?`
    await conectiondb.query(sqlQuery, [descripcion, montoDia, observacion, id])
    console.log("room updated")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
const changeRoomState = async(room) => {
  const {id, state} = room
  try {
    const sqlQuery = `update habitaciones set estado = ? where id = ?`
    await conectiondb.query(sqlQuery, [state, id])
    console.log("cambiando estado de la habitacion")
    console.log(room)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const getRoomsByFilter = async (filter) =>{
  try {
    const sqlQuery = `select * from habitaciones where descripcion like "%${filter}%" or montoDia like "%${filter}%"`
    const response = await conectiondb.query(sqlQuery)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const roomsListed = async(filter) => {
  function sqlQuiery(filtro){

    const orderobj={
        "1":"Id",
        "2": "descripcion",
        "3": "montoDia"
    }
    const orderDirection = {
        "1":"asc",
        "2": "desc",
    }

    let script = `select * from habitaciones where descripcion like "%%" `
    
    if(filtro.idDesde && filtro.idHasta){
        script += `and id between ${filtro.idDesde} and ${filtro.idHasta} `
    }
    if(filtro.descriptionDesde && filtro.descriptionHasta){
        script += `and descripcion between "${filtro.descriptionDesde}" and "${filtro.descriptionHasta}" `
    }
    if(filtro.montoDiaDesde && filtro.montoDiaHasta){
        script += `and montoDia between ${filtro.montoDiaDesde} and ${filtro.montoDiaHasta} `
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
  getRooms,
  getRoomsByFilter,
  createRoom,
  deleteRoom,
  updateRoom,
  changeRoomState,
  roomsListed
}