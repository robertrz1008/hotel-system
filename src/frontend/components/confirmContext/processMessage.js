import { appendChildList, closeConfirmModal, setButton, setDiv, setIcon, setTitleOrP } from "../../../utils/functionsGlobal.js"

function processMsg(msg){
    const title = setTitleOrP("h2", "Error")
    const messaage = setTitleOrP("h3", msg)
    const modalCon = setDiv("modalC-con")
    const btnDiv = setDiv("btn-form-con")
    const btnReset = setButton("Cancelar", "btn-form-res")
    const btnAccept = setButton("Aceptar", "btn-form-add")
    const alertIconDiv = setDiv("icon-alert-div")
    const alertIcon = setIcon(["fa-solid", "fa-exclamation", "alert-Icon"])

    //los botones
    btnAccept.addEventListener("click", () => {
        closeConfirmModal()
    })

    alertIconDiv.appendChild(alertIcon)

    appendChildList(btnDiv, [
        // btnReset,
        btnAccept
    ])
    appendChildList(modalCon, [
        alertIconDiv,
        title,
        messaage,
        btnDiv
    ])

    return modalCon
}

export default processMsg