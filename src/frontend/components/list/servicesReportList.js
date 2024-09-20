import { appendChildList, setTd } from "../../../utils/functionsGlobal.js"

function servicesReportList(parent,body, list){

    body.innerHTML = ""

    list.map((data) =>{
        const trB = document.createElement("tr") 
        const td0 = setTd(data.id)
        const td = setTd(data.descripcion)
        const td2 = setTd(data.observacion)
        const td3 = setTd(data.monto)

        trB.className= "trb"
        td0.className = "td0"


        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default servicesReportList