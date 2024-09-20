import { appendThList } from "../../../utils/functionsGlobal.js";
import staySummarizedReportList from "../list/staySummarizedReportList.js";

function  staySummarizedReportTable( div,list ){

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    table.innerHTML = ""

    //cabezera de la tabla

    appendThList(tr, ["Id", "Cliente","Habitacion", "Estado", "Entrada", "Total", "Cons."])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    staySummarizedReportList(table, tbody, list)

    div.appendChild(table)
}
export default staySummarizedReportTable