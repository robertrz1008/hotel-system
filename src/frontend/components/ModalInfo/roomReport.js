import { appendChildList, closeModalForm, setButton, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { credential, pathPDF } from "../../views/system/settingTemplate.js"
import clientReportTable from "../tables/clientReportTable.js"
import roomsReportTable from "../tables/roomReportTable.js"

const setValue = v => v? v : "Vacio"
const orderobj={
    "1":"Id",
    "2": "Descripcion",
    "3": "Monto"
}
const orderDirection = {
    "1":"Ascencente",
    "2": "Descendente",
}

function roomsReport({ filter, listed, roomReportBuild}){
    const div = setDiv("report-con")
    const title = setTitleOrP("h4", "Listado de Habitaciones")
    title.classList.add("report-con-title")
    const btnDiv1 = setDiv("listed1-btn-con")
    const btnDiv = setDiv("listed-btn-con")
    const tablediv = setDiv("report-table-con")
    const btnAdd = setButton("Imprimir", "process-btn-submit")
    const btnClear = setButton("Cancelar", "process-btn-reset")
    const paramTitle = setTitleOrP("h4", "Filtros")
    const paramDiv = setDiv("param-div")
    const paramDiv2 = setDiv("param2-con") 
    const idText = setTitleOrP("p", "Id: "+setValue(filter.idDesde)+" - "+setValue(filter.idHasta))
    const nameText = setTitleOrP("p", "Descripcion: "+setValue(filter.descriptionDesde)+" - "+setValue(filter.descriptionHasta))
    const lastNametext = setTitleOrP("p", "MontoDia: "+setValue(filter.montoDiaDesde)+" - "+setValue(filter.montoDiaHasta))
    const orderText = setTitleOrP("p", "Ordenado por: "+orderobj[filter.orderBy]+" - "+orderDirection[filter.order])

    roomsReportTable(tablediv, listed)

    btnClear.addEventListener("click", () => {
        closeModalForm()
    })
    btnAdd.addEventListener("click", () => {
        const data = credential[0]
        console.log(pathPDF)
        console.log(data)
        console.log(listed)
        roomReportBuild(pathPDF, data, listed)
    })

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(paramDiv,[idText, nameText, lastNametext, orderText])
    paramDiv2.appendChild(orderText)
    appendChildList (div, [title, paramTitle, paramDiv, paramDiv2,tablediv, btnDiv1])
    return div
}

export default roomsReport