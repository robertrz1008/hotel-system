import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd, setTitleOrP } from "../../../utils/functionsGlobal.js";
import { getProcessByFilterRequest } from "../../api/processRequest.js";
import { stayfilterSelect } from "../../views/processes/stayTemplate.js";
import processList from "../list/processList.js";

function  processTable(parent, stays){

    const div = setDiv("stay-table-con")
    const tableHead = setDiv("stay-table-head")
    const tfSeach = setInput("text", "Buscar...")
    const tbody = document.createElement("tbody")
    let stayFound = []
    const tableDiv = setDiv("stay-table-div")
    //filtro
    const stateFilterDiv = setDiv("stay-state-filter-con")
    const filterSubT = setTitleOrP("p", "Filtrar: ")
    const stateInputDiv = setDiv("stay-state-input")

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tr = document.createElement("tr")
    

    //cabezera de la tabla
    appendThList(tr, ["Id", "Cliente", "Habitación", "Total", "Det."])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    processList(table, tbody, stays) 
    
    async function renderList(filter){
        stayFound = await getProcessByFilterRequest(filter)
        tbody.innerHTML = ""
        processList(table, tbody, stayFound) 
    }

    tfSeach.addEventListener("click", () =>{
        tfSeach.classList.add("input-select")
    })

    window.addEventListener("click", (e) => {
        const child = tfSeach.firstElementChild
        if(e.target != child){
            tfSeach.classList.remove("input-select")
        }
    })


    tfSeach.addEventListener("keyup", () =>{
        const value = tfSeach.firstChild.value
        renderList(value)
    })

    stateInputDiv.appendChild(stayfilterSelect)
    appendChildList(stateFilterDiv, [
        filterSubT,
        stateInputDiv
    ])
    appendChildList(tableHead, [
        tfSeach,
        stateFilterDiv,
    ])
    tableDiv.appendChild(table)
    appendChildList(div, [
        tableHead,
        tableDiv
    ])
    parent.appendChild(div)
}
export default processTable
