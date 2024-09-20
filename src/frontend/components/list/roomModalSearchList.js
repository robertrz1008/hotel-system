import { setDiv } from "../../../utils/functionsGlobal.js"

function roomList( {listCon, roomFound, buttonEnabled}){
    const listbody = setDiv("list-con-body")

    listCon.innerHTML = ""

    roomFound.map((data) => {
        const li = document.createElement("section")
        const roomNameLasName  = data.descripcion
        li.textContent = roomNameLasName

        li.addEventListener("click", () => {
            buttonEnabled({
                name: roomNameLasName,
                id: data.id,
                montoDia: data.montoDia
            })
        })

        listbody.appendChild(li)
    })
    listCon.appendChild(listbody)
}
export default roomList