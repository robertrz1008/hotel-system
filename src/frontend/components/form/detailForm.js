import { appendChildList, closeModalForm, openConfirmModal, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import detailServiceTable from "../tables/processServiceDetailTable.js";
import { addServiceBtn, btnAdd, table, tbIsActive, tbody, Tablediv, tHead, moneyP, btnClear } from "../../views/processes/stayTemplate.js";
import serviceModalSearch from "../modalSearch/serviceModalSearch.js";

function detailForm({ formServicesDiv, addService, detailServices }) {
    const div = setDiv("stay-form")
    const title = setTitleOrP("h4", "Detalle de consumición")
    addServiceBtn.classList.add("process-detail-btn") 
    const btnDiv = setDiv("process-btn-con")
    const togleMoneyDiv = setDiv("togle-money-con")
    const moneyDiv = setDiv("money-con")
    //table


    div.innerHTML = ""

    function renderDetailList(serv) {
        addService(serv)
    }

    addServiceBtn.addEventListener("click", () => {
        openConfirmModal(serviceModalSearch({
            renderDetailList
        }))
    })

    // dom insert Element
    appendChildList(div, [
        title, 
        addServiceBtn
    ])
    detailServiceTable({
        Tablediv,
        table,
        tHead,
        div
    })

    moneyDiv.appendChild(moneyP)
    appendChildList(togleMoneyDiv, [
        // tbIsActive,
        moneyDiv
    ])
    appendChildList(btnDiv, [
        btnClear,
        btnAdd
    ])
    appendChildList(div, [
        togleMoneyDiv,
        btnDiv
    ])
    
    formServicesDiv.appendChild(div)
}

export default detailForm