import { appendChildList, setDiv } from "../../utils/functionsGlobal.js"

export function openModal(children){
    const modalBackground = document.createElement("div")
    const modal = document.createElement("div")

    modalBackground.id = "modalBg"
    modalBackground.className = "modal-backgroud"
    modal.className = "DivHijo"

    //se cierra el modal al clickear fuera de la misma
//     window.addEventListener("click", (e) => {
//     if(e.target == modalBackground){
//         closeModal()
//     }
// })

    appendChildList(modal, [
        children,
    ])
    modalBackground.appendChild(modal)
    document.body.appendChild(modalBackground)
}
export function closeModal(){
    let modalBackground = document.getElementById("modalBg")
    document.body.removeChild(modalBackground)
}
