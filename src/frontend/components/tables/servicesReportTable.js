import { appendThList } from "../../../utils/functionsGlobal.js";
import servicesReportList from "../list/servicesReportList.js";

function  servicesReportTable( div,list ){

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    table.innerHTML = ""

    //cabezera de la tabla
    appendThList(tr, ["Id", "Descripcion", "Observacion", "Monto"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    servicesReportList(table, tbody, list)

    div.appendChild(table)
}
export default servicesReportTable