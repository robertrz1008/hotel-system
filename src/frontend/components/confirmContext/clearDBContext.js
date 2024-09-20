import { appendChildList, closeConfirmModal, setButton, setDiv, setIcon, setTitleOrP } from "../../../utils/functionsGlobal.js"

export default function clearDBContext({clearDB}){
    const messaage = setTitleOrP("p", "¿Desea borrar todos los datos?")
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
        btnAccept.textContent = "Eliminando..."
        clearDB()
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
