import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import { clientsFound, getClientByFilter } from "../../views/tables/clientTemplate.js";
import clientForm from "../form/ClientForm.js";
import clientsList from "../list/clientList.js";

function  clientsTable(parent, clients){

    const div = setDiv("table-con")
    const tableHead = setDiv("table-heade")
    const tfSeach = setInput("text", "Buscar...")
    const btn = setButton("Nuevo Cliente", "btn-add", "fa-solid fa-plus")
    const tbody = document.createElement("tbody")

    tfSeach.addEventListener("click", () =>{
        tfSeach.classList.add("input-select")
      })
    window.addEventListener("click", (e) => {
        const child = tfSeach.firstElementChild
        if(e.target != child){
            tfSeach.classList.remove("input-select")
        }
    })

    btn.addEventListener("click", () =>{
        openModalForm(clientForm("Guardar", "btn-form-add"))
    })

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tr = document.createElement("tr")
    

    //cabezera de la tabla
    appendThList(tr, ["Id", "Cedula", "Nombre", "Apellido", "Dirección", "Telefono", "Accion"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    clientsList(table, tbody, clients)

    async function renderList(filter){
        await getClientByFilter(filter)
        tbody.innerHTML = ""
        clientsList(table, tbody, clientsFound)
    }

    tfSeach.addEventListener("keyup", () =>{
        const filter = tfSeach.firstChild.value
        renderList(filter)
    })

    appendChildList(tableHead, [
        tfSeach,
        btn
    ])
    appendChildList(div, [
        tableHead,
        table,
    ])
    parent.appendChild(div)
}
export default clientsTable
