import { appendChildList, closeConfirmModal, setButton, setDiv, setIcon, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { deleteClientById } from "../../views/tables/clientTemplate.js"

export default function deleteClient(msg, id){
    const messaage = setTitleOrP("p", msg)
    const modalCon = setDiv("modalC-con")
    const btnDiv = setDiv("btn-form-con")
    const btnReset = setButton("Cancelar", "btn-form-res") 
    const btnAccept = setButton("Eliminar", "btn-form-add")
    const alertIconDiv = setDiv("icon-alert-div")
    const alertIcon = setIcon(["fa-solid", "fa-exclamation", "alert-Icon"])

    //los botones
    btnReset.addEventListener("click", () => {
        closeConfirmModal()
    })
    btnAccept.addEventListener("click", () => {
        deleteClientById(id)
    })

    alertIconDiv.appendChild(alertIcon)


    appendChildList(btnDiv, [
        btnReset,
        btnAccept
    ])
    appendChildList(alertIconDiv, [
        alertIcon,
    ])
    appendChildList(modalCon, [
        alertIconDiv,
        messaage,
        btnDiv
    ])

    return modalCon
}