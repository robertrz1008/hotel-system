import { appendChildList, closeConfirmModal, setButton, setDiv, setIcon, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { deleteDetailFromDB, deleteDetailService } from "../../views/processes/stayTemplate.js"

export default function deleteDetailServiceC(msg, id, serviceId){
    const messaage = setTitleOrP("h3", msg)
    const modalCon = setDiv("modalC-con")
    const btnDiv = setDiv("btn-form-con")
    const btnReset = setButton("Cancelar", "btn-form-res")
    const btnAccept = setButton("Eliminar", "btn-form-add")
    const alertIconDiv = setDiv("icon-alert-div")
    const alertIcon = setIcon(["fa-solid", "fa-exclamation", "alert-Icon"])

    function deleteServiceIfFromDB() {
        if(typeof serviceId == "undefined") {
            deleteDetailService(id)
        }
        deleteDetailFromDB(id)
    }

    //los botones
    btnReset.addEventListener("click", () => {
    })
    btnAccept.addEventListener("click", () => {
        deleteServiceIfFromDB()
    })

    alertIconDiv.appendChild(alertIcon)

    appendChildList(btnDiv, [
        btnReset,
        btnAccept
    ])
    appendChildList(modalCon, [
        alertIconDiv,
        messaage,
        btnDiv
    ])

    return modalCon
}