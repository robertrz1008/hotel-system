import {appendChildList, closeConfirmModal, openConfirmModal, setDiv, setInputForm, setTitleOrP, } from "../../../utils/functionsGlobal.js"
import { openModal, closeModal } from "../../Components/modal.js"
import { getClientsRequest,createClientRequest, updateClientRequest, getClientByFilterRequest, verifyCedula, verifyTelephone, deleteClientRequest } from "../../api/clientRequest.js"
import processMsg from "../../components/confirmContext/processMessage.js"
import clientsTable from "../../components/tables/clientTable.js"
import { tablesCountFromHome } from "../home.js"

const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const title = setTitleOrP("h3", "Registro de Clientes")

//form inputs
export const tfCedula = setInputForm("Cedula", "text", "agregar Descripcion")
export const tfNombre = setInputForm("Nombre", "text", "agregar Observacion")
export const tfApellido = setInputForm("Apellido", "text", "agregar Observacion")
export const tfDireccion = setInputForm("Direccion", "text", "agregar Observacion")
export const tfTelefono = setInputForm("Telefono", "text", "agregar Observacion")

export let clientsList = []
export let clientsFound = []
export let idClient;
export let verificationMesages = []

export function updateMode(client) {
    const {id, cedula, nombre, apellido, direccion, telefono} = client
    
    idClient = id
    tfCedula.lastElementChild.firstElementChild.value = cedula
    tfNombre.lastElementChild.firstElementChild.value = nombre
    tfApellido.lastElementChild.firstElementChild.value = apellido
    tfDireccion.lastElementChild.firstElementChild.value = direccion
    tfTelefono.lastElementChild.firstElementChild.value = telefono
}

export function clearform(){
    tfCedula.lastElementChild.firstElementChild.value = ""
    tfNombre.lastElementChild.firstElementChild.value = ""
    tfApellido.lastElementChild.firstElementChild.value = ""
    tfDireccion.lastElementChild.firstElementChild.value = ""
    tfTelefono.lastElementChild.firstElementChild.value = ""
}

export const deleteClientById = async (id) => {
    const response = await deleteClientRequest(id)

    if(!response){
        closeConfirmModal()
        openConfirmModal(processMsg("Este cliente ya esta regsitrado en los reportes de movimientos"))
        return 
    }

    renderList()
    closeConfirmModal()
    tablesCountFromHome()
}

export const getClientByFilter = async (filter) => {
    clientsFound = await getClientByFilterRequest(filter)

    if(!clientsFound) throw new Error("no se ha encontrado resultado")

}

export const updateClient = async (client) => {
    const response = await updateClientRequest(client)

    if(!response) throw new Error("Hubo un problema al realizar la peticion a la db")

    idClient = 0;
    renderList()
    clearform()
    closeModal()
}

export const renderList = async () => {
    clientsList = await getClientsRequest() 
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    clientsTable(div, clientsList)  
} 

export const renderClient = () => renderList()


export const createClient = async(client) =>{
    const response = await createClientRequest(client)

    if(!response) throw new Error("Error 501")

    renderList()
    clearform()
    closeModal()
    tablesCountFromHome()
}

export const verifyDates = async() => {
    const hashCedula = await verifyCedula(tfCedula.lastElementChild.firstElementChild.value)
    const hashTelephone = await verifyTelephone(tfTelefono.lastElementChild.firstElementChild.value)

    verificationMesages = []

    console.log("verificando")
    if(hashCedula){ //SI LA CEDULA TIPEADA YA ESTA REGISTRADA
        tfCedula.lastElementChild.classList.add("input-error")
        verificationMesages.push("El Nº de cedula ya està registrada en otro cliente")
    } else{
        tfCedula.lastElementChild.classList.remove("input-error")
    }
    if(hashTelephone){ //SI EL TELEFONO TIPEADO YA ESTA REGISTRADO
        tfTelefono.lastElementChild.classList.add("input-error")
        verificationMesages.push("El Nº de telefono ya està registrado en otro cliente")
    }else{
        tfTelefono.lastElementChild.classList.remove("input-error")
    }

    let arr = [hashCedula, hashTelephone]
    console.log(arr)

         if(arr.some((x) => x == true)) {
            return false
         }else{
            return true
         }
}

function clientTableTemplate(){
    renderList()
    return div
}

export default clientTableTemplate 
