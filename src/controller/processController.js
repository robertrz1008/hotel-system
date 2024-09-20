const connectdb = require("../db/conectiondb")
const { nextLetter,  obtenerFechaSiguiente } = require("../lib/date")

const createStay = async (stay, state) =>{
    const {cli_id, hab_id, total, estado, observacion, entrada} = stay
    try {
        const sqlQuery = {
            "0": `insert into estadias(cli_id, hab_id, total, estado, observacion) values(?, ?, ?, ?, ?)`,
            "1": `insert into estadias(cli_id, hab_id, total, estado, observacion, entrada) values(?, ?, ?, ?, ?, ?)`
        }
        function isState(){
            if(state == "0") return [cli_id, hab_id, total, estado, observacion]
            return [cli_id, hab_id, total, estado, observacion, entrada]
        }
        await connectdb.query(sqlQuery[state], isState());
        const response = await connectdb.query("select max(id) AS 'id' from estadias;")
        return response[0]
    } catch (error) { 
        console.log(error)
    }
}
const updateStay = async (stay) => {
    const {id, total, estado} = stay
    try {
        const sqlQuery = ` update estadias set total = ?, estado = ? where id = ?`
        await connectdb.query(sqlQuery, [total, estado, id])
        console.log("room updated")
        return true
      } catch (error) {
        console.log(error)
        return false
      }
}
const setStayFinalized = async (stay) =>{
    const {id, salida,} = stay
    try {
        const sqlQuery = ` update estadias set salida = ? where id = ?`
        await connectdb.query(sqlQuery, [salida, id])
        console.log("estadia finalizada")
        return true
      } catch (error) {
        console.log(error)
        return false
      }
}
const getStays = async () => {
    try {
        const response = connectdb.query("select * from estadias")
        return response[0]
    } catch (error) {
        console.log(response)
    }
}

const createDetail = async (detail) => {
    const {estadia_id, servicio_id, costo, subtotal, cantidad} = detail
    console.log(detail)
    try {
        const sqlQuery = ` insert into detalles(estadia_id, servicio_id, costo, subtotal, cantidad) values(?, ?, ?, ?, ?);`
        await connectdb.query(sqlQuery, [estadia_id, servicio_id, costo, subtotal, cantidad])
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
const getDetailsByStay = async (stayId) => {
    try {
        const sqlQuery = `
        select det.id, det.estadia_id, det.servicio_id, ser.descripcion, det.cantidad , det.costo, det.subtotal 
        from servicios as ser join detalles as det 
        on ser.id = det.servicio_id 
        where det.estadia_id = ?
        `
        const response = await connectdb.query(sqlQuery, [stayId])
        return response[0]
    } catch (error) {
        console.log(response)
    }
}
const deleteDetail = async (id) => {
    try {
        const res = await connectdb.query("select * from detalles where id = ?", [id])
        //obtenemos el subtotal y el id de estadia del detalle a eliminar
        const detailSubtotal= res[0][0].subtotal
        const estadiaId = res[0][0]. estadia_id

        const stay = await connectdb.query("select * from estadias where id = ?", [estadiaId])
        //restamos el total de la estadias - el subtotal del detalleServicio que se va a elliminar
        const result = stay[0][0].total - detailSubtotal
        //modificamos el total por el total menos el subtotal del detalle 
        await connectdb.query("update estadias set total = ? where id =  ?", [result, estadiaId])
        const query= ` delete from detalles where id = ?`
        await connectdb.query(query, [id])
        return true
      } catch (error) {
        console.log(error)
        return false
      }
}
const updateAmountDetail = async (detail) => {
    const {id, estadiaId, cantidad, subtotal} = detail
    try {
         //modificamos el detalle
        await connectdb.query("update detalles set cantidad = ?, subtotal = ? where id = ?", [cantidad, subtotal, id])
        //obtenemos todos los detalles posteriormente
        const detail = await connectdb.query("select * from detalles where estadia_id = ?", [estadiaId])
        //obtenemos la estadia
        const stays = await connectdb.query("select * from estadias where id = ?", [estadiaId])
        //obtenemos la habitacion para obtener su monto 
        const room = await connectdb.query("select * from habitaciones where id = ?", [stays[0][0].hab_id])
        const newTotal = detail[0].reduce((con, el) => con + el.subtotal, 0) + room[0][0].montoDia
        await connectdb.query("update estadias set total = ? where id = ?", [newTotal, estadiaId])
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
const getProcess = async () => {
    const sqlQuery = `
    select 
        es.id,  
        cli.id as "cliente_id",
        cli.nombre, 
        cli.apellido, 
        cli.cedula, 
        hab.id as "habitacion_id",
        hab.descripcion, 
        hab.montoDia,
        es.entrada, 
        es.estado, 
        es.entrada, 
        es.observacion,
        es.salida, 
        es.observacion AS "est_observacion",
        es.total
    from estadias as es 
        JOIN clientes as cli
    on es.cli_id = cli.id
        JOIN habitaciones as hab 
    on es.hab_id = hab.id
    order by id;
    `
    try {
        const response = await connectdb.query(sqlQuery)
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
const getProcessByStatus = async (status) => {
    const sqlQuery = `
    select 
        es.id,  
        cli.id as "cliente_id",
        cli.nombre, 
        cli.apellido, 
        cli.cedula, 
        hab.id as "habitacion_id",
        hab.descripcion, 
        hab.montoDia,
        es.entrada, 
        es.observacion,
        es.estado, 
        es.entrada, 
        es.salida, 
        es.observacion AS "est_observacion",
        es.total
    from estadias as es 
        JOIN clientes as cli
    on es.cli_id = cli.id
        JOIN habitaciones as hab 
    on es.hab_id = hab.id
    where es.estado = ?
    order by id;
    `
    try {
        const response = await connectdb.query(sqlQuery, [status])
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
const getProcessByFilter = async (filter) => {
    const sqlQuery = `
    select 
    es.id,  
    cli.id as "cliente_id",
    cli.nombre, 
    cli.apellido, 
    cli.cedula, 
    hab.id as "habitacion_id",
    hab.descripcion, 
    hab.montoDia,
    es.entrada, 
    es.observacion,
    es.estado, 
    es.entrada, 
    es.salida, 
    es.observacion AS "est_observacion",
    es.total
from estadias as es 
    JOIN clientes as cli
on es.cli_id = cli.id
    JOIN habitaciones as hab 
on es.hab_id = hab.id
where cli.nombre like "%${filter}%"`
    try {
        const response = await connectdb.query(sqlQuery)
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
const updateDateStayReserved = async (stay) => {
    const {id, entrada} = stay
    try {
        const sqlQuery = ` update estadias set entrada = ? where id = ?`
        await connectdb.query(sqlQuery, [entrada, id])
        console.log("stay reserved updated")
        return true
      } catch (error) {
        console.log(error)
        return false
      }
}

const staysListed = async (filter) =>{
    function query(filtro){
        let script = ` select 
            es.id,  
            cli.id as "cliente_id",
            cli.nombre, 
            cli.apellido,
            cli.cedula, 
            hab.descripcion, 
            hab.montoDia,
            es.observacion,
            es.estado, 
            es.entrada, 
            es.salida, 
            es.observacion AS "est_observacion",
            es.total
        from estadias as es 
            JOIN clientes as cli
        on es.cli_id = cli.id
            JOIN habitaciones as hab 
        on es.hab_id = hab.id
        where cli.nombre like "%%" ` 
        const orderobj={
            "1":"es.id",
            "2": "cli.nombre",
            "3": "hab.descripcion",
            "4": "es.total",
            "5": "es.entrada"
        }
        const orderDirection = {
            "1":"asc",
            "2": "desc",
        }

        if(filtro.fechaDesde && filtro.fechaHasta){
            script += `and es.entrada between "${filtro.fechaDesde}" and "${obtenerFechaSiguiente(filtro.fechaHasta)}" `
        }
        if(filtro.clientDesde && filtro.clientHasta){
            script += `and cli.nombre between "${filtro.clientDesde}" and "${nextLetter(filtro.clientHasta)}" `
        }
        if(filtro.roomHasta && filtro.roomHasta){
            script += `and hab.descripcion between "${filtro.roomDesde}" and "${filtro.roomHasta}" `
        }
        if(filtro.state != 4){
            script += `and es.estado = ${filtro.state} `
        }
        script += `order by ${orderobj[filtro.orderBy]} ${orderDirection[filtro.order]}`

        return script
    }
    try {
        const response = await connectdb.query(query(filter))
        return response[0]
      } catch (error) {
        console.log(error)
      }
}
const staysDetailedListed = async (filter) =>{
    function query(filtro){
        let script = ` select 
        es.id,
        cli.nombre,
        cli.apellido,
        hab.descripcion as habitacion,
        es.estado,
        es.entrada,
        es.salida,
        ser.descripcion as servicio,
        det.cantidad,
        det.subtotal,
        es.total
        FROM 
            estadias as es
        JOIN 
            clientes as cli ON es.cli_id = cli.id
        JOIN 
            habitaciones as hab ON es.hab_id = hab.id
        LEFT JOIN 
            detalles as det ON es.id = det.estadia_id
        LEFT JOIN 
            servicios as ser ON det.servicio_id = ser.id 
        WHERE
            cli.nombre like "%%" ` 
        const orderobj={
            "1":"es.id",
            "2": "cli.nombre",
            "3": "hab.descripcion",
            "4": "es.total",
            "5": "es.entrada"
        }
        const orderDirection = {
            "1":"asc",
            "2": "desc",
        }

        if(filtro.fechaDesde && filtro.fechaHasta){
            script += `and es.entrada between "${filtro.fechaDesde}" and "${obtenerFechaSiguiente(filtro.fechaHasta)}" `
        }
        if(filtro.clientDesde && filtro.clientHasta){
            script += `and cli.nombre between "${filtro.clientDesde}" and "${nextLetter(filtro.clientHasta)}" `
        }
        if(filtro.roomHasta && filtro.roomHasta){
            script += `and hab.descripcion between "${filtro.roomDesde}" and "${filtro.roomHasta}" `
        }
        if(filtro.state != "4"){
            script += `and es.estado = ${filtro.state} `
        }
        script += `order by ${orderobj[filtro.orderBy]} ${orderDirection[filtro.order]}`

        console.log(script)
        return script
    }
    try {
        const response = await connectdb.query(query(filter))
        return response[0]
      } catch (error) {
        console.log(error)
      }
}

module.exports = {
    createStay,
    updateStay,
    setStayFinalized,
    getDetailsByStay,
    createDetail,
    deleteDetail,
    updateAmountDetail,
    getProcess,
    getProcessByStatus,
    getProcessByFilter,
    getStays,
    staysListed,
    staysDetailedListed,
    updateDateStayReserved
}