import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import { getServiceByFilter, servicesFound } from "../../views/tables/servicesTemplate.js";
import serviceForm from "../form/serviceForm.js";
import servicesList from "../list/servicesList.js";

function  servicesTable(parent, services){

    const div = setDiv("table-con")
    const tableHead = setDiv("table-heade")
    const tfSeach = setInput("text", "Buscar...")
    const btn = setButton("Nueva Cons.", "btn-add", "fa-solid fa-plus")
    const tbody = document.createElement("tbody")

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tr = document.createElement("tr")
    

    //cabezera de la tabla
    appendThList(tr, ["Id", "descripción", "Observación", "Monto","Accion"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    servicesList(table, tbody, services)

    async function renderList(filter){
        await getServiceByFilter(filter)
        tbody.innerHTML = ""
        servicesList(table, tbody, servicesFound) 
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

    btn.addEventListener("click", () =>{
        openModalForm(serviceForm("Guardar", "btn-form-add"))
    })

    tfSeach.addEventListener("keyup", () =>{
        const value = tfSeach.firstChild.value
        renderList(value)
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
export default servicesTable
