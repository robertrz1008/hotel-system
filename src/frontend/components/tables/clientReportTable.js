import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import clientReportList from "../list/clientReportList.js";

function  clientReportTable( div,list ){

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    table.innerHTML = ""

    //cabezera de la tabla

    appendThList(tr, ["Id", "Nombre", "Apellido", "CIN", "Telefono", "Direccion"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    clientReportList(table, tbody, list)

    div.appendChild(table)
}
export default clientReportTable