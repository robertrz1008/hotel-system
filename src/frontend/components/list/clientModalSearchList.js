import { setDiv } from "../../../utils/functionsGlobal.js"

function clientList( {listCon, clientFound, buttonEnabled}){
    const listbody = setDiv("list-con-body")

    listCon.innerHTML = ""

    clientFound.map((data) => {
        const li = document.createElement("section")
        const clientNameLasName  = data.nombre+" "+data.apellido
        li.textContent = clientNameLasName

        li.addEventListener("click", () => {
            buttonEnabled({
                name: clientNameLasName,
                id: data.id
            })
        })

        listbody.appendChild(li)
    })
    listCon.appendChild(listbody)
}
export default clientList