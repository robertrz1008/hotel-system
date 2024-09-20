import { appendChildList, closeConfirmModal, replaceClass, setButton, setDiv, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js"
import {getClientByFilterRequest} from "../../api/clientRequest.js"
import { getProcessRequest } from "../../api/processRequest.js"
import clientList from "../list/clientModalSearchList.js"

function clientModalSearch({clientNameSelect}) {
    const div = setDiv("modal-search-con")
    const title = setTitleOrP("h4", "Agregar cliente")
    const tfSearch = setInputForm("","text", "buscar...")
    const listCon = setDiv("list-con")
    const nameDiv = setDiv("name-con")
    const nameP = setTitleOrP("p", `Seleccionado: `)
    const button = setButton("Agregar", "modal-search-btn-disable")
    let clientFound=[];
    let clientName = ""
    let clientId;
    div.innerHTML = ""
    button.disabled = true

    function buttonEnabled(clientFound){
        button.disabled = false;
        replaceClass(button, "modal-search-btn-disable", "modal-search-btn")
        clientName = clientFound.name
        nameP.textContent = "Seleccionado: "+clientFound.name 
        clientId = clientFound.id
    }

    const renderList = async (filter) =>{
        let clientsOcuppedId = []
        let clientsReservedId = []

        const stays = await getProcessRequest();
        clientFound = await getClientByFilterRequest(filter)

        let staysOcupped = stays.filter((data) => data.estado == 0);
        let staysReserved = stays.filter((data) => data.estado == 1);

        console.log(staysOcupped)
        console.log(staysReserved)

        for (const stay of staysOcupped) {
            clientsOcuppedId.push(stay.cliente_id);
        }
        for (const stay of staysReserved) {
            clientsReservedId.push(stay.cliente_id);
        }
        clientFound = clientFound.filter(data => clientsOcuppedId.includes(data.id) == false)
        clientFound = clientFound.filter(data => clientsReservedId.includes(data.id) == false)
        clientList({
            listCon, 
            clientFound,
            buttonEnabled
        })
    }
    function handleSearch(value){
        listCon.innerHTML = ""
        if(value.trim() == ""){
            return
        }
        renderList(value)
    }

    // events
    tfSearch.addEventListener("keyup", (e) => {
        const searchValue = tfSearch.lastElementChild.firstElementChild.value
        handleSearch(searchValue)
    })
    //
    button.addEventListener("click",() => {
        closeConfirmModal()
        clientNameSelect({
            id: clientId,
            name: clientName,
        })
    })


    //dom
    nameDiv.appendChild(nameP)
    appendChildList(div, [
        title,
        tfSearch,
        listCon,
        nameDiv,
        button
    ])
    return div
}

export default clientModalSearch