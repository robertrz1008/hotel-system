import {appendChildList, closeConfirmModal, closeModalForm, openConfirmModal, setDiv, setInputForm, setTextArea, setTitleOrP, } from "../../../utils/functionsGlobal.js"
import { closeModal } from "../../Components/modal.js"
import { createServiceRequest, deleteServiceRequest, getServicesByFilterRequest, getServicesRequest, updateServiceRequest } from "../../api/serviceRequest.js"
import processMsg from "../../components/confirmContext/processMessage.js"
import servicesTable from "../../components/tables/serviceTable.js"
import { tablesCountFromHome } from "../home.js"

const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const title = setTitleOrP("h3", "Registro de Consumiciones")

//form inputs
export const tfMonto = setInputForm("Monto", "number","")
export const tfDescripcion = setTextArea("Descripción")
export const tfobservacion = setInputForm("Observaciòn", "text", "agregar Observacion")

export let services = []
export let servicesFound = []
export let idService;

const renderList = async () => {
    services = await getServicesRequest()
    console.log("listando servicios")
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    servicesTable(div, services)  
}
export const renderService = () => renderList()

export const getServiceByFilter = async (filter) => {
    servicesFound = await getServicesByFilterRequest(filter)

    if(!servicesFound) throw new Error("501 error")
}

export function updateModeService(service) {
    const {id, descripcion, monto, observacion} = service
    
    idService = id
    tfMonto.lastElementChild.firstElementChild.value = monto
    tfDescripcion.lastElementChild.firstElementChild.value = descripcion
    tfobservacion.lastElementChild.firstElementChild.value = observacion
}

export function clearServiceform(){
    tfMonto.lastElementChild.firstElementChild.value = 0
    tfDescripcion.lastElementChild.firstElementChild.value = ""
    tfobservacion.lastElementChild.firstElementChild.value = ""
}
export const updateService = async(service) => {
    const response = await updateServiceRequest(service)
    
    if(!response) throw new Error("No se pudo actualizar")

    idService = 0;
    renderList()
    clearServiceform()
    closeModal()
}

export const createService = async(service) =>{
    const response = await createServiceRequest(service)

    if(!response) throw new Error("Error 501")

    renderList()
    clearServiceform()
    closeModal()
    tablesCountFromHome()
}
export const deleteService = async(id) => {
    const response = await deleteServiceRequest(id)

    if(!response){
        closeConfirmModal()
        openConfirmModal(processMsg("la consumicion ya esta relacionado en una transaccion"))
        return 
    }

    renderList()
    closeConfirmModal()
    tablesCountFromHome()
}

function servicesTemplate(){
    renderList()
    return div
}

export default servicesTemplate
