import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import { getRoomsByFilter, roomsFound } from "../../views/tables/roomTemplate.js";
import roomForm from "../form/roomForm.js";
import roomsList from "../list/roomsList.js";

function  roomTable(parent, rooms){

    const div = setDiv("table-con")
    const tableHead = setDiv("table-heade")
    const tfSeach = setInput("text", "Buscar...")
    const btn = setButton("Nueva Habitacion", "btn-add", "fa-solid fa-plus")
    const tbody = document.createElement("tbody")

    async function renderList(filter){
        await getRoomsByFilter(filter)
        tbody.innerHTML = ""
        servicesList(table, tbody, roomsFound) 
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
        openModalForm(roomForm("Guardar", "btn-form-add"))
    })

    tfSeach.addEventListener("keyup", () =>{
        const value = tfSeach.firstChild.value
        renderList(value)
    })

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tr = document.createElement("tr")
    

    //cabezera de la tabla
    appendThList(tr, ["Id", "Descripción", "Observación", "MontoDia", "Accion"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    roomsList(table, tbody, rooms)

    async function renderList(filter){
        await getRoomsByFilter(filter)
        tbody.innerHTML = ""
        roomsList(table, tbody, roomsFound)
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
export default roomTable
