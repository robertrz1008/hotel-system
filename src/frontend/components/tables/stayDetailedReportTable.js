import { appendThList } from "../../../utils/functionsGlobal.js";
import roomsReportList from "../list/roomReportList.js";
import stayDitailedReportList from "../list/stayDetailedReportList.js";

function  stayDetailedReportTable( div,list ){

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    table.innerHTML = "" 

    //cabezera de la tabla

    appendThList(tr, ["Id", "Cliente", "Cedula", "Habitacion", "Estado", "MontoDia", "Entrada", "Salida", "total", "Cons."])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    stayDitailedReportList(table, tbody, list)

    div.appendChild(table)
}
export default stayDetailedReportTable