import { closeConfirmModal, setTitleOrP } from "../../utils/functionsGlobal.js"

export function openCnfModal(children){
    const modalBackground = document.createElement("div")
    const modal = document.createElement("div")
    const exit = setTitleOrP("h2", "X")
    exit.className = "modal-exit"

    modalBackground.id = "modalBg"
    modalBackground.className = "modal-backgroud"
    modal.className = "DivHijo"

    window.addEventListener("click", (e) => {
        if(e.target == modalBackground){
            closeConfirmModal()
        }
    })
    exit.addEventListener("click", () =>{
        closeConfirmModal()
    })

    modal.appendChild(children)
    // modal.appendChild(exit)

    modalBackground.appendChild(modal)
    document.body.appendChild(modalBackground)
}
export function closeCnfModal(){
    let modalBackground = document.getElementById("modalBg")
    document.body.removeChild(modalBackground)
}