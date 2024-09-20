import { appendChildList, closeModalForm, setButton, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js"
import formatDate from "../../../utils/getDate.js"
import { credential, pathPDF } from "../../views/system/settingTemplate.js"
import stayDetailedReportTable from "../tables/stayDetailedReportTable.js"

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
function formatStatus(number){
    let stat = [
    {value: "0", name: "Ocupado"},
    { value: "1", name: "Reservado"},
    { value: "2", name: "Anulado"},
    { value: "3", name: "Finalizado"}
    ]
    let newS = stat.filter(data => data.value == number)

    return newS[0].name
}

function staysDetiledReport({ filter, listed, staysDetaildeReportBuild}){
    const div = setDiv("report-stay-con")
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

    stayDetailedReportTable(tablediv, listed)

    btnClear.addEventListener("click", () => {
        closeModalForm()
    })
    btnAdd.addEventListener("click", () => {
        const data = credential[0]

        let newList = [ ...listed]
        for (const i of newList) {
            const entradaDate = formatDate(i.entrada)
            const salidaDate = formatDate(i.salida)
            i.entrada = entradaDate.fecha
            i.salida = salidaDate.fecha
            i.estado = formatStatus(i.estado)
        }
        console.log(newList)
        staysDetaildeReportBuild( data, newList)
    })

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(paramDiv,[idText, nameText, lastNametext, orderText])
    paramDiv2.appendChild(orderText)
    appendChildList (div, [title, paramTitle, paramDiv, paramDiv2,tablediv, btnDiv1])
    return div
}

export default staysDetiledReport