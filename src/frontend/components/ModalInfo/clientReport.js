import { appendChildList, closeModalForm, openConfirmModal, setButton, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { credential, pathPDF } from "../../views/system/settingTemplate.js"
import processMsg from "../confirmContext/processMessage.js"
import clientReportTable from "../tables/clientReportTable.js"

const setValue = v => v? v : "Vacio"

function clientReport({ filter, listed, clientReportBuild}){
    const orderobj={
        "1":"Id",
        "2": "nombre, apellido",
        "3": "direccion"
    }
    const orderDirection = {
        "1":"Ascencente",
        "2": "Descendente",
    }

    const div = setDiv("report-con")
    const title = setTitleOrP("h3", "Listado de Clientes")
    title.classList.add("report-con-title")
    const btnDiv1 = setDiv("listed1-btn-con")
    const btnDiv = setDiv("listed-btn-con")
    const tablediv = setDiv("report-table-con")
    const btnAdd = setButton("Imprimir", "process-btn-submit")
    const paramTitle = setTitleOrP("h4", "Filtros")
    const btnClear = setButton("Cancelar", "process-btn-reset")
    const paramDiv = setDiv("param-div")
    const paramDiv2 = setDiv("param2-con")
    const idText = setTitleOrP("p", "Id: "+setValue(filter.idDesde)+" - "+setValue(filter.idHasta))
    const nameText = setTitleOrP("p", "Nombre: "+setValue(filter.nameDesde)+" - "+setValue(filter.nameHasta))
    const lastNametext = setTitleOrP("p", "Apellido: "+setValue(filter.lastNameDesde)+" - "+setValue(filter.lastNameHasta))
    const orderText = setTitleOrP("p", "Ordenado por: "+orderobj[filter.orderBy]+" - "+orderDirection[filter.order])

    clientReportTable(tablediv, listed)

    btnClear.addEventListener("click", () => {
        closeModalForm()
    })
    btnAdd.addEventListener("click", () => {
        const data = credential[0]
        if(!pathPDF) return openConfirmModal(processMsg("Define la ruta para la generacion del reporte"))
        clientReportBuild(pathPDF, data, listed)
    })

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(paramDiv,[idText, nameText, lastNametext])
    paramDiv2.appendChild(orderText)
    appendChildList (div, [title, paramTitle, paramDiv, paramDiv2,tablediv, btnDiv1])
    return div
}

export default clientReport