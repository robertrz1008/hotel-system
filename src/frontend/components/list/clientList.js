import { appendChildList, openConfirmModal, openModalForm, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import { updateMode } from "../../views/tables/clientTemplate.js"
import deleteClient from "../confirmContext/deleteClient.js"
import clientForm from "../form/ClientForm.js"

function clientsList(parent,body, list){

    body.innerHTML = ""

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(data.id)
        const td = setTd(data.cedula)
        const td2 = setTd(data.nombre)
        const td3 = setTd(data.apellido)
        const td4 = setTd(data.direccion)
        const td5 = setTd(data.telefono)

        const tdAction = document.createElement("td")
        const iconDel = setIcon(["fa-solid", "fa-trash", "btn-del", "table-icon"])
        const iconUpd = setIcon(["fa-solid", "fa-pen", "btn-upd", "table-icon"])

        trB.className= "trb"
        td0.className = "td0"
        tdAction.className = "tdAction"

        appendChildList(tdAction, [
            iconDel,
            iconUpd
        ])

        iconDel.addEventListener("click", () =>{
            openConfirmModal(deleteClient("Decea eliminar a este cliente", data.id))
        })
        iconUpd.addEventListener("click", () => {
            updateMode({
                id: data.id,
                cedula: data.cedula,
                nombre: data.nombre,
                apellido: data.apellido,
                direccion: data.direccion,
                telefono: data.telefono
            })
            openModalForm(clientForm("Modificar", "btn-form-upd"))
        })

        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
            td4,
            td5,
            tdAction
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default clientsList