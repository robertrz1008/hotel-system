import { appendChildList, openConfirmModal, openModalForm, setIcon, setTd } from "../../../utils/functionsGlobal.js"

function clientReportList(parent,body, list){

    body.innerHTML = ""


    list.map((data) =>{
        const trB = document.createElement("tr") 
        const td0 = setTd(data.id)
        const td = setTd(data.nombre)
        const td2 = setTd(data.apellido)
        const td3 = setTd(data.cedula)
        const td4 = setTd(data.telefono)
        const td5 = setTd(data.direccion)

        trB.className= "trb"
        td0.className = "td0"


        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
            td4,
            td5
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default clientReportList