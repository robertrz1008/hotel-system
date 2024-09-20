import { appendChildList, openConfirmModal, openModalForm, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import deleteDetailServiceC from "../confirmContext/deleteDetailService.js"
import detailAmaunt from "../form/detailAmaunt.js"

function detailServicesInfoList(parent,body, list){

    body.innerHTML = ""

    console.log(list)

    list.map((data) =>{
        const trB = document.createElement("tr") 
        const td0 = setTd(data.cantidad)
        const td = setTd(data.descripcion)
        const td2 = setTd(data.costo)
        const td3 = setTd(data.subtotal)

        trB.className= "trb"
        td0.className = "td0"
        td2.className = "td-monto"
        td3.className = "td-monto"

        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default detailServicesInfoList