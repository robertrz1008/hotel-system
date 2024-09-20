import { appendChildList, openConfirmModal, openModalForm, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import deleteDetailServiceC from "../confirmContext/deleteDetailService.js"
import detailAmaunt from "../form/detailAmaunt.js"

function detailServicesList(parent,body, list){

    body.innerHTML = ""

    console.log(list)

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(data.cantidad)
        const td = setTd(data.descripcion)
        const td2 = setTd(data.costo)
        const td3 = setTd(data.subtotal)

        const tdAction = document.createElement("td")
        const iconDel = setIcon(["fa-solid", "fa-trash", "btn-del", "table-icon"])
        const iconMore = setIcon(["fa", "fa-clone", "btn-upd", "table-iocn"])

        trB.className= "trb"
        td0.className = "td0"
        tdAction.className = "tdAction"
        td2.className = "td-monto"
        td3.className = "td-monto"

        appendChildList(tdAction, [
            iconDel,
            iconMore
        ])

        iconDel.addEventListener("click", () =>{
            openConfirmModal(deleteDetailServiceC("Decea eliminar el detalle", data.id, data.servicio_id))
        })
        iconMore.addEventListener("click", () => {
            openConfirmModal(detailAmaunt(data.despcripcion, data.cantidad, data.id, data.servicio_id))
        })

        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
            tdAction
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default detailServicesList