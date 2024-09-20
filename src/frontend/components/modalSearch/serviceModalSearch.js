import { appendChildList, closeConfirmModal, replaceClass, setButton, setDiv, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js"
import {getServicesByFilterRequest} from "../../api/serviceRequest.js"
import serviceList from "../list/serviceModalSearchList.js"

function serviceModalSearch({renderDetailList}) {
    const div = setDiv("modal-search-con")
    const title = setTitleOrP("h4", "Agregar consumicion")
    const tfSearch = setInputForm("","text", "buscar...")
    const listCon = setDiv("list-con")
    const nameDiv = setDiv("name-con")
    const nameP = setTitleOrP("p", `Seleccionado: `)
    const button = setButton("Agregar", "modal-search-btn-disable")
    let serviceFound;
    let serviceDesciption = ""
    let serviceId;
    let serviceMonto;

    div.innerHTML = ""
    button.disabled = true

    function buttonEnabled(serviceFound){
        button.disabled = false;
        replaceClass(button, "modal-search-btn-disable", "modal-search-btn")
        serviceDesciption = serviceFound.descripcion
        nameP.textContent = "Seleccionado: "+ serviceDesciption
        serviceId = serviceFound.id
        serviceMonto = serviceFound.monto
    }

    const renderList = async (filter) =>{
        serviceFound = await getServicesByFilterRequest(filter)
        serviceList({
            listCon, 
            serviceFound,
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
        renderDetailList({
            id: serviceId,
            cantidad: 1,
            descripcion: serviceDesciption,
            costo: serviceMonto
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

export default serviceModalSearch