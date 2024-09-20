import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import detailServicesInfoList from "../list/serviceDetailInfoList.js";

function  detailServiceInfoTable( div,list ){

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    table.innerHTML = ""

    //cabezera de la tabla

    appendThList(tr, ["Cant.", "Consumición", "Monto", "Subtotal"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    detailServicesInfoList(table, tbody, list)

    div.appendChild(table)
}
export default detailServiceInfoTable