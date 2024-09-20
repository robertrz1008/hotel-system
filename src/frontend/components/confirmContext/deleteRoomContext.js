import { appendChildList, closeConfirmModal, setButton, setDiv, setIcon, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { deleteRoom } from "../../views/tables/roomTemplate.js"

export default function deleteRoomC(msg, id){
    const messaage = setTitleOrP("h3", msg)
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
        deleteRoom(id)
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