import {appendChildList, closeConfirmModal, openConfirmModal, replaceClass, setButton, setDiv,  setInputForm, setInputSelect, setTextArea, setTitleOrP, setTogleButton, } from "../../../utils/functionsGlobal.js"
import formatDate, { setDate } from "../../../utils/getDate.js"
import { createDetailRequest, createStayRequest, deleteDetailRequest, getDetailsByStayRequest, getProcessByStatusRequest, getProcessRequest, stayFinalizedRequest, updateDateStayReservedRequest, updateDetailRequest, updateStayRequest} from "../../api/processRequest.js"
import processMsg from "../../components/confirmContext/processMessage.js"
import detailForm from "../../components/form/detailForm.js"
import stayForm from "../../components/form/stayForm.js"
import detailServicesList from "../../components/list/detailServiceList.js"
import clientModalSearch from "../../components/modalSearch/clientModalSearch.js"
import roomModalSearch from "../../components/modalSearch/roomModalSearch.js"
import processTable from "../../components/tables/processTable.js"
import { tablesCountFromHome } from "../home.js"
import { getRoomByState } from "../tables/roomTemplate.js"


const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const processDiv = setDiv("process-con")
const title = setTitleOrP("h3", "Transacción-Estadias") 
const formDiv = setDiv("process-form-con")
const formServicesDiv = setDiv("process-formser-con")
const processTableDiv = setDiv("process-table-div")
//form inputs
export const entryP = setTitleOrP("h4", "Entada")
export const entryDate = setDiv("inp-date")
export const inputDateDiv = setDiv("inp-date-div")
export const clientInput = setDiv("stay-input-div")
export const clientBtn = setButton("buscar", "process-btn")
export const clientText = setTitleOrP("h4", "Cliente")
export const roomInput = setDiv("stay-input-div")
export const roomBtn = setButton("buscar", "process-btn")
export const addServiceBtn = setButton("agregar", "process-btn")
export const roomText = setTitleOrP("h4", "habitación")
export const tfObservacion = setTextArea()
export const tfDate = setInputForm("", "date", "")
export const inputSelect = setInputSelect([
    { value: "0", name: "Ocupado"},
    { value: "1", name: "Reservado"},
    { value: "2", name: "Anulado"},
    { value: "3", name: "Finalizado"},
])
export const stayfilterSelect = setInputSelect([
    { value: "", name: "Todos"},
    { value: "0", name: "Ocupados"},
    { value: "1", name: "Reservados"},
    { value: "2", name: "Anulados"},
    { value: "3", name: "Finalizados"},
])
//detailForm
export const tbIsActive = setTogleButton("Activo")
export const btnAdd = setButton("Guardar", "process-btn-submit")
export const btnClear = setButton("Limpiar", "process-btn-reset")
let monto = 0
export const moneyP = setTitleOrP("h3", "Total: "+monto)

export const Tablediv = setDiv("process-table-con")
export const table = document.createElement("table")
export const tHead = document.createElement("thead")
export const tbody = document.createElement("tbody")


let clientSelectId = 0;
let roomtSelectId = 0;
let roomMonto = 0;

// detail service
let detailServices= []
//procesos
let stays = []
let updateMode = false;
let stayState;
let stayId;
//para cargar los campos de cliente y habitacion
function clientNameSelect(client){
    clientText.textContent = client.name
    clientSelectId = client.id
}
//se le suma la cantidad del servicio del detalle
function roomNameSelect(room){
    roomText.textContent = room.name
    roomtSelectId = room.id
    roomMonto = room.montoDia
    monto += roomMonto
    moneyP.textContent = "Total: "+monto 
}
//detail service functions
function detailSubtotal(){
    detailServices = detailServices.map((item) => ({
        ...item,
        subtotal: item.cantidad * item.costo
    }))
}
function detailAddCantidad(p) {
    for (const i of detailServices) {
        if(i.id == p.id){
            i.cantidad += 1
        }
    }
}
function montoSum(arr){
    monto = arr.reduce((cc, el) => cc + el.subtotal, 0)
    monto += roomMonto
    moneyP.textContent = "Total: "+monto 
}
function addService(serviceSelect){
    //si se selecciona el mismo servicio 
    const test = detailServices.some(x => x.id == serviceSelect.id)

    if(test) {
        detailAddCantidad(serviceSelect)
    }else{
        detailServices.push(serviceSelect)
    }
    detailSubtotal()
    detailServicesList(table, tbody, detailServices)
    montoSum(detailServices)
}
export function deleteDetailService(id){
    detailServices = detailServices.filter(data => data.id != id)
    detailServicesList(table, tbody, detailServices)
    montoSum(detailServices)
    closeConfirmModal()
}
export async function deleteDetailFromDB(id){
    const response = await deleteDetailRequest(id)

    if(!response) throw new Error("No se pudo eliminar el detalle")

    //listando los detalles desde el codigo
    detailServices = detailServices.filter(data => data.id != id)
    detailServicesList(table, tbody, detailServices)
    renderList()
    montoSum(detailServices)
    closeConfirmModal()
}
export function updateAmountDetail(id, amount){
    for (const service of detailServices) {
        if(service.id == id){
            service.cantidad = parseInt(amount)
        }
    }
    detailSubtotal()
    detailServicesList(table, tbody, detailServices)
    montoSum(detailServices)
}
export async function updateDetailFromDB(id, amount){
    let response;
    let detailsFromCode=[];
    //se obtiene un objeto con los con las propiedades modificadas del serviocio seleccionado
    for (const service of detailServices) {
        if(service.id == id){
            response = await updateDetailRequest({
                id: service.id,
                estadiaId: stayId,
                cantidad: parseInt(amount),
                subtotal: service.costo * parseInt(amount)
            })
        }
    }
    //sanvando los servicios que no estan registradosp
    for (const detail of detailServices) {
        if(typeof detail.servicio_id == "undefined"){
            detailsFromCode.push({...detail})
        }
    }
    detailServices = await getDetailsByStayRequest(stayId)
    //juntar los detalles de la db con los desde el codigo
    detailServices = detailServices.concat(detailsFromCode)
    detailServicesList(table, tbody, detailServices)
    monto = detailServices.reduce((con, el) => con + el.subtotal, 0) + roomMonto
    moneyP.textContent = "Total: "+monto 
    renderList()

}

function buttonEnabled(){
    clientBtn.disabled = false
    roomBtn.disabled = false
    replaceClass(clientBtn, "process-btn-disabled", "process-btn")
    replaceClass(roomBtn, "process-btn-disabled", "process-btn")
}
function buttonDisabled(){
    clientBtn.disabled = true
    roomBtn.disabled = true
    replaceClass(clientBtn, "process-btn", "process-btn-disabled")
    replaceClass(roomBtn,"process-btn", "process-btn-disabled", )
}

//process functions
function clear() {
    updateMode = false
    entryP.textContent = "Entrada"
    clientText.textContent = "Cliente"
    roomText.textContent = "habitacion"
    buttonEnabled() //activando los botones
    inputSelect.value = "0"
    tfObservacion.lastElementChild.firstElementChild.value = ""
    tfDate.lastElementChild.firstElementChild.disabled = true
    tfDate.lastElementChild.firstElementChild.value = ""
    clientSelectId = 0
    roomtSelectId = 0
    detailServices = []
    //limpiar la tabla de servicios
    detailServicesList(table, tbody, detailServices)
    renderList()
    btnAdd.textContent = "Guardar"
    stayId = 0;
    stayState = ""
    monto = 0
    moneyP.textContent = "Total: "+monto 
} 
const renderList = async () => {
    stays = await getProcessRequest()
    processTableDiv.innerHTML = ""
    processTable(processTableDiv, stays) 
}
export const renderStay = () => renderList()

const renderListByStatus = async (data) => {
    stays = await getProcessByStatusRequest(data)
    processTableDiv.innerHTML = ""
    processTable(processTableDiv, stays) 
}
function isDateProcessReserved(){
    if(!Boolean(tfDate.lastElementChild.firstElementChild.value)){
        console.log(tfDate.lastElementChild.firstElementChild.value)
        btnAdd.textContent = "Guardar"
        openConfirmModal(processMsg("Ingresa una fecha para la reservacion"))
        return false
    }
    return true
}
async function createProcess(){
    btnAdd.textContent = "Procesando..."
    const stayOccuped = {
        cli_id: clientSelectId,
        hab_id: roomtSelectId,
        total: monto,
        estado: inputSelect.value,
        observacion: tfObservacion.lastElementChild.firstElementChild.value
    }
    const stayReserved = {
        ...stayOccuped, 
        entrada: tfDate.lastElementChild.firstElementChild.value+" 00:00:00"}

    //si el reservado
    if(inputSelect.value == "1"){
        console.log(Boolean(tfDate.lastElementChild.firstElementChild.value))
        if(!isDateProcessReserved()) return

        await createStayRequest(stayReserved, "1")
        getRoomByState()
        clear()
        tablesCountFromHome()
        return
    }
    //se registra la estadia a la db
    const stayresponse = await createStayRequest(stayOccuped, "0")
    const stayId = stayresponse[0].id
    tablesCountFromHome()

    if(detailServices.length == 0) return clear()

    //creaando los detalles de servicio
    for (const detail of detailServices) {
        const response = await createDetailRequest({
            estadia_id: stayId,
            servicio_id: detail.id,
            costo: detail.costo,
            subtotal: detail.subtotal,
            cantidad: detail.cantidad
        })
        if(!response) break
        clear()
    }
    //luego de crear la la transaccion
    clear()
}
function validateProcess(){
    // se valida el cliente y la habitacion 
    if(clientSelectId == 0){
        openConfirmModal(processMsg("Selecciona un cliente para crear la transaccion"))
        return false
    }
    if(roomtSelectId == 0){
        openConfirmModal(processMsg("Selecciona una habitacion para crear la transaccion"))
        return false
    }
    if(inputSelect.value == "2") {
        openConfirmModal(processMsg("Solo se pueden anular estadias reservadas"))
        return false
    }
    if(inputSelect.value == "3") {
        openConfirmModal(processMsg("Solo se pueden finalizar estadias activas"))
        return false
    }
    return true
}
export async function udpateProcessMode(process){
    updateMode = true
    stayState = process.estado
    stayId = process.id

    const entradaDate = formatDate(process.entrada)
    entryP.textContent = entradaDate.fecha
    tfDate.lastElementChild.firstElementChild.disabled = true
    tfDate.lastElementChild.firstElementChild.value = ""
    roomtSelectId = process.habitacion_id
    clientText.textContent = process.nombre+" "+process.apellido
    roomText.textContent = process.descripcion
    clientBtn.disabled = true
    roomBtn.disabled = true
    inputSelect.value = process.estado
    tfObservacion.lastElementChild.firstElementChild.value = process.observacion
    buttonDisabled()

    if(process.estado == "0"){
        stayState = "Ocupado"
    }
    if(process.estado == "1"){
        stayState = "Reservado"
        tfDate.lastElementChild.firstElementChild.disabled = false
    }
    //costo de la transaccion
    monto = process.total
    moneyP.textContent = "Total: "+monto 
    // cargando detalles servicios
    detailServices = await getDetailsByStayRequest(process.id)
    console.log(deleteDetailService)
    detailServicesList(table, tbody, detailServices)
}
function validateProcessOccuped(){
    if(inputSelect.value == "1"){
        openConfirmModal(processMsg("No se pueden reservar estadias activas"))
        btnAdd.textContent = "Guardar"
        return false
    }
    if(inputSelect.value == "2"){
        openConfirmModal(processMsg("Solo se pueden anular estadias reservadas"))
        btnAdd.textContent = "Guardar"
        return false
    }
    return true
}
function validateProcessReserved(){
    if(inputSelect.value == "3"){
        openConfirmModal(processMsg("Solo se pueden finalizar estadias activas"))
        btnAdd.textContent = "Guardar"
        return false
    }
    return true
}
async function updateProcessOccuped(){
    if(!validateProcessOccuped()) return 

    btnAdd.textContent = "Procesando..."
    //finaliza el processo
    if(inputSelect.value == "3") {
        await updateStayRequest({
            id: stayId,
            total: monto,
            estado: inputSelect.value
        })
        //se establece la hora de salida
        await stayFinalizedRequest({
            id: stayId,
            salida: setDate()
        })
        //la habitacion estara disponible
        btnAdd.textContent = "Guardar"
        getRoomByState()
    }
    if(detailServices.length == 0){
        clear()
        return 
    }
    for (const detail of detailServices) {
        if(typeof detail.servicio_id == "undefined"){
            console.log("procesando servicios a la db")
            const response = await createDetailRequest({
                estadia_id: stayId,
                servicio_id: detail.id,
                costo: detail.costo,
                subtotal: detail.subtotal,
                cantidad: detail.cantidad
            })
            if(!response) break
        }
    }
    await updateStayRequest({
        id: stayId,
        total: monto,
        estado: inputSelect.value
    })
    clear()
}
async function updateProcessReserved(){
    if(!validateProcessReserved()) return
    //se anula el processo
    btnAdd.textContent = "Procesando..."

    //si sigue siendo ocupada y se ha tipedo el input de fecha
    if(inputSelect.value == "1" && tfDate.lastElementChild.firstElementChild.value){
        console.log("modificando la fecha entrada")
        await updateDateStayReservedRequest({
            id: stayId,
            entrada: tfDate.lastElementChild.firstElementChild.value+" 00:00:00"
        })
    }
    //si se anula la reservacion
    if(inputSelect.value == "2") {
        await updateStayRequest({
            id: stayId,
            total: monto,
            estado: inputSelect.value
        })
        getRoomByState()
        btnAdd.textContent = "Guardar"
    }
    //si el estado sera ocupada
    if(inputSelect.value == "0"){
        for (const detail of detailServices) {
                console.log("procesando servicios a la db")
                const response = await createDetailRequest({
                    estadia_id: stayId,
                    servicio_id: detail.id,
                    costo: detail.costo,
                    subtotal: detail.subtotal,
                    cantidad: detail.cantidad
                })
                if(!response) break
                
        }
        await updateStayRequest({
            id: stayId,
            total: monto,
            estado: inputSelect.value
        })
        getRoomByState()
    }
   
    clear()
}
function handleUpdateProcess(){
    btnAdd.textContent = "Procesando..."
    if(stayState == "Ocupado") return updateProcessOccuped()
    if(stayState == "Reservado") return updateProcessReserved()
} 

function handleSubmit(){
    if(updateMode) return handleUpdateProcess()

    if(!validateProcess()) return
    createProcess()
}

//events
clientBtn.addEventListener("click", ()=> {
    openConfirmModal(clientModalSearch({
        clientNameSelect
    }))
})
roomBtn.addEventListener("click", () => {
    openConfirmModal(roomModalSearch({
        roomNameSelect
    }))
})
btnAdd.addEventListener("click", () => {
    handleSubmit()
})
btnClear.addEventListener("click", () => {
    clear()
})
stayfilterSelect.addEventListener("change", (e) => {
    if(stayfilterSelect.value == "") return renderList()
    renderListByStatus(e.target.value)
})

inputSelect.addEventListener("change", (e) => {
    if(inputSelect.value == "1"){
        tfDate.lastElementChild.firstElementChild.disabled = false
        detailServices = []
        detailServicesList(table, tbody, detailServices)
        return
    }
    tfDate.lastElementChild.firstElementChild.disabled = true
    tfDate.lastElementChild.firstElementChild.value = ""
})

const renderForm = async () => { 
    // rooms = await getRoomsRequest()
    div.innerHTML = ""
    titleDiv.appendChild(title)
    tfDate.lastElementChild.firstElementChild.disabled = true

    stayForm(formDiv)
    detailForm({
        formServicesDiv,
        addService,
        detailServices
    })
    
    appendChildList(processDiv,[
        formDiv,
        formServicesDiv,
        processTableDiv,
    ])
    appendChildList(div, [
        titleDiv,
        processDiv
    ])
} 

function stayProcessTemplate(){
    renderForm()
    renderList()
    return div
}
export default stayProcessTemplate
 