import { appendChildList, openConfirmModal, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import formatDate, { calculateDaysElapsed, setDate } from "../../../utils/getDate.js"
import { Tablediv, entryDate, udpateProcessMode } from "../../views/processes/stayTemplate.js"
import processDetailModal from "../ModalInfo/processDetail.js"

function processList(parent,body, list){

    body.innerHTML = ""

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(data.id)
        const name = data.nombre + " " +data.apellido
        const td = setTd(name)
        const td2 = setTd(data.descripcion)
        const td3 = setTd(data.total)
        const tdAction = document.createElement("td")
        const iconDetail = setIcon(["fa", "fa-info-circle", "btn-del", "table-icon"])
        const iconUpd = setIcon(["fa-solid", "fa-pen", "btn-upd", "table-icon"])

        trB.className= "trb"
        td0.className = "td0"
        tdAction.className = "tdAction"
        td3.className = "td-monto"

        iconDetail.addEventListener("click", () => {
            openConfirmModal(processDetailModal(data))
        })
        iconUpd.addEventListener("click", () => {
            udpateProcessMode(data)
        })

        function isIconUpd(){
            //si el proceso esta finalizado no se podra modificar
            if(data.estado == "3" || data.estado == "2")   return [iconDetail]
            return [iconUpd, iconDetail]
        }

        appendChildList(tdAction, isIconUpd())

        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
            tdAction
        ])
        body.appendChild(trB)
    })
    
    Tablediv
    parent.appendChild(body)

}

export default processList