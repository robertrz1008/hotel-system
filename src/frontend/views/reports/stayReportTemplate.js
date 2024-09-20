import { appendChildList, closeModalForm, openModalForm, setButton, setDiv, setInputForm, setInputSelect, setTitleOrP } from "../../../utils/functionsGlobal.js"
import formatDate from "../../../utils/getDate.js"
import { getDetailsByStayRequest, getStaysDetailedListedRequest, getStaysListedRequest } from "../../api/processRequest.js"
import { detailservicesReportRequest, staysDetailedReportRequest, staysSummarizedReportRequest } from "../../api/reportPDFRequest.js"
import { credential, pathPDF } from "../system/settingTemplate.js"

export async function detailServiceReportBuild(stay){
    const detailServices = await getDetailsByStayRequest(stay.id)
    console.log(stay)
    await detailservicesReportRequest(pathPDF, credential[0], stay, detailServices)
    closeModalForm()
}

function stayReportTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Informe de Movimientos")

    const formDiv = setDiv("listed-form-con")

    const rangoDiv = setDiv("form-rango-con")
    const rengoTitle = setTitleOrP("h4", "Filtros")
    const rangoDivClient = setDiv("form-rangosub-con")
    const rangoDivId = setDiv("form-rangosub-con")
    const rangoDivRoom = setDiv("form-rangosub-con")
    const rangoDivFechaTitle = setTitleOrP("h4", "Fecha")
    const rangoDivClientTitle = setTitleOrP("h4", "Cliente")
    const rangoDivRoomTitle = setTitleOrP("h4", "Habitacion")
    const tfRoomDesde = setInputForm("Desde", "text", "")
    const tfRoomHasta = setInputForm("Hasta", "text", "")
    const tfFechaDesde = setInputForm("Hasta", "date", "")
    const tfFechaHasta = setInputForm("Hasta", "date", "")
    const tfClienteDesde = setInputForm("Desde", "text", "")
    const tfClienteHasta = setInputForm("Hasta", "text", "")
    const stateTitle = setTitleOrP("h4", "Estado")
    const stateSelect = setInputSelect([
        {value: "4", name: "Todo"},
        {value: "0", name: "Ocupado"},
        {value: "1", name: "Reservado"},
        {value: "2", name: "Anulado"},
        {value: "3", name: "Finalizado"},
    ])
    const typeTitle = setTitleOrP("h4", "Tipo")
    const typeSelect = setInputSelect([
        {value: "1", name: "Detallado"},
        {value: "2", name: "Resumido"},
    ])
    const ordenTitle = setTitleOrP("h4", "Ordenamiento")
    const selectDiv = setDiv("form-select-con")
    const select1div = setDiv("form-select-con")
    const selectDiv1 = setDiv("lidted-form-select-div")
    const selectDiv2 = setDiv("lidted-form-select-div")
    const selectDiv0 = setDiv("lidted-form-select-div")
    const typeselectDiv = setDiv("lidted-form-select-div")
    const inputSelect = setInputSelect([
        {value: "1", name: "id"},
        {value: "2", name: "cliente"},
        {value: "3", name: "habitacion"},
        {value: "4", name: "Monto Total"},
        {value: "5", name: " fecha"}
    ])
    const inputSelectOrder = setInputSelect([
        {value: "1", name: "Ascendente"},
        {value: "2", name: "Descendente"},
    ])
    const btnDiv1 = setDiv("listed1-btn-con")
    const btnDiv = setDiv("listed-btn-con")
    const btnAdd = setButton("Filtrar", "process-btn-submit")
    const btnClear = setButton("Limpiar", "process-btn-reset")
    

    titleDiv.appendChild(title)
    let listed=[]

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

    function clear(){
        tfFechaDesde.lastElementChild.firstElementChild.value= ""
        tfFechaHasta.lastElementChild.firstElementChild.value = ""
        tfClienteDesde.lastElementChild.firstElementChild.value = ""
        tfClienteHasta.lastElementChild.firstElementChild.value = ""
        tfRoomDesde.lastElementChild.firstElementChild.value = ""
        tfRoomHasta.lastElementChild.firstElementChild.value = ""
        stateSelect.value= "4"
        inputSelect.value = "1"
        inputSelectOrder.value = "1"

    }

    //report
    async function staysDetaildeReportBuild( filter){
        listed= await getStaysDetailedListedRequest(filter) //se lista la estadia
        const data = credential[0]
        let newList = [ ...listed]
        for (const i of newList) {
            const entradaDate = formatDate(i.entrada)
            const salidaDate = formatDate(i.salida)
            i.entrada = entradaDate.fecha
            i.salida = salidaDate.fecha
            i.estado = formatStatus(i.estado)
            i.servicio = !i.servicio? "": i.servicio
            i.cantidad = !i.cantidad? "": i.cantidad
            i.subtotal = !i.subtotal? "": i.subtotal
        }
       await staysDetailedReportRequest( data, newList)

    }
    async function staysSummarizedReportBuild( filter){
        listed= await getStaysListedRequest(filter) //se lista la estadia
        const data = credential[0]
        let newList = [ ...listed]
        for (const i of newList) {
            const entradaDate = formatDate(i.entrada)
            const salidaDate = formatDate(i.salida)
            i.entrada = entradaDate.fecha
            i.salida = salidaDate.fecha
            i.estado = formatStatus(i.estado)
        }
        await staysSummarizedReportRequest(data, newList)
     }

     //list
    function hanldeListed(filter){
        
        if(typeSelect.value == "1"){
            // openModalForm(staysDetiledReport({ filter, listed, staysDetaildeReportBuild}))
            staysDetaildeReportBuild(filter)
            return
        }
        // openModalForm(staysSummarizedReport({ filter, listed, staysSummarizedReportBuild}))
        staysSummarizedReportBuild(filter)
    }

    btnAdd.addEventListener("click", () =>{
        let filters ={
            fechaDesde: tfFechaDesde.lastElementChild.firstElementChild.value,
            fechaHasta: tfFechaHasta.lastElementChild.firstElementChild.value,
            clientDesde: tfClienteDesde.lastElementChild.firstElementChild.value,
            clientHasta: tfClienteHasta.lastElementChild.firstElementChild.value,
            roomDesde: tfRoomDesde.lastElementChild.firstElementChild.value,
            roomHasta: tfRoomHasta.lastElementChild.firstElementChild.value,
            state: stateSelect.value,
            orderBy: inputSelect.value,
            order: inputSelectOrder.value,
        }
        console.log(filters)
        hanldeListed(filters)
    })
    btnClear.addEventListener("click", () => {
        clear()
    })

    appendChildList(rangoDivId,[rangoDivFechaTitle, tfFechaDesde, tfFechaHasta])
    appendChildList(rangoDivClient,[rangoDivClientTitle, tfClienteDesde, tfClienteHasta])
    appendChildList(rangoDivRoom,[rangoDivRoomTitle, tfRoomDesde, tfRoomHasta])

    appendChildList(selectDiv0, [stateTitle, stateSelect])
    appendChildList(typeselectDiv, [typeTitle, typeSelect])
    appendChildList(selectDiv1, [inputSelect])
    appendChildList(selectDiv2, [inputSelectOrder])

    appendChildList(selectDiv, [selectDiv1, selectDiv2])
    appendChildList(select1div, [selectDiv0, typeselectDiv])

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(rangoDiv, [rangoDivId, rangoDivClient, rangoDivRoom])
    appendChildList(formDiv,[ rengoTitle, rangoDiv, select1div,ordenTitle, selectDiv, btnDiv1])
    appendChildList(div,[titleDiv, formDiv])
    return div
}
export default stayReportTemplate
