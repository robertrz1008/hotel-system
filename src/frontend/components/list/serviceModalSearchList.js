import { setDiv } from "../../../utils/functionsGlobal.js"

function serviceList( { listCon, serviceFound, buttonEnabled }){
    const listbody = setDiv("list-con-body")

    listCon.innerHTML = ""

    serviceFound.map((data) => {
        const li = document.createElement("section")
        const serviceDescription  = data.descripcion
        li.textContent = serviceDescription

        li.addEventListener("click", () => {
            buttonEnabled({
                descripcion: serviceDescription,
                id: data.id,
                monto: data.monto
            })
        })

        listbody.appendChild(li)
    })
    listCon.appendChild(listbody)
}
export default serviceList