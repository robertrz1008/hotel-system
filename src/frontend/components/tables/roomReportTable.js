import { appendThList } from "../../../utils/functionsGlobal.js";
import roomsReportList from "../list/roomReportList.js";

function  roomsReportTable( div,list ){

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    table.innerHTML = ""

    //cabezera de la tabla

    appendThList(tr, ["Id", "Descripcion", "Observacion", "MontoDia"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    roomsReportList(table, tbody, list)

    div.appendChild(table)
}
export default roomsReportTable