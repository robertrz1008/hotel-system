import { appendChildList, closeModalForm, openModalForm, setButton, setDiv, setInputForm, setInputSelect, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { getClientListedRequest } from "../../api/clientRequest.js"
import { clientReportRequest } from "../../api/reportPDFRequest.js"
import clientReport from "../../components/ModalInfo/clientReport.js"
import clientReportTable from "../../components/tables/clientReportTable.js"
import { credential } from "../system/settingTemplate.js"

function clientListedTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Listado de Clientes")

    const formDiv = setDiv("listed-form-con")

    const rangoDiv = setDiv("form-rango-con")
    const rengoTitle = setTitleOrP("h4", "Filtros")
    const rangoDivName = setDiv("form-rangosub-con")
    const rangoDivLasName = setDiv("form-rangosub-con")
    const rangoDivId = setDiv("form-rangosub-con")
    const rangoDivIdTitle = setTitleOrP("h4", "Id")
    const rangoDivNameTitle = setTitleOrP("h4", "Nombre")
    const rangoDivLasNameTitle = setTitleOrP("h4", "Apellido")
    const tfIdDesde = setInputForm("Desde", "number", "")
    const tfIdHasta = setInputForm("Hasta", "number", "")
    const tfNameDesde = setInputForm("Desde", "text", "")
    const tfNameHasta = setInputForm("Hasta", "text", "")
    const tfLastNameDesde = setInputForm("Desde", "text", "")
    const tfLastNameHasta = setInputForm("Hasta", "text", "")
    const ordenTitle = setTitleOrP("h4", "Ordenamiento")
    const selectDiv = setDiv("form-select-con")
    const selectDiv1 = setDiv("lidted-form-select-div")
    const selectDiv2 = setDiv("lidted-form-select-div")
    const inputSelect = setInputSelect([
        {value: "1", name: "Id"},
        {value: "2", name: "Nombre y Apellido"},
        {value: "3", name: "Direccion"}
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

    function clear(){
        tfIdDesde.lastElementChild.firstElementChild.value = "";
        tfIdHasta.lastElementChild.firstElementChild.value = ""
        tfNameDesde.lastElementChild.firstElementChild.value =""
        tfNameHasta.lastElementChild.firstElementChild.value = ""
        tfLastNameDesde.lastElementChild.firstElementChild.value = ""
        tfLastNameHasta.lastElementChild.firstElementChild.value = ""
        inputSelect.value = "1"
        inputSelectOrder.value= "1"
    }
    // async function clientReportBuild(route, credential, clients){
    //     const response = await clientReportRequest(route, credential, clients)

    //     if(!response) throw new Error("no se ha podido generar el reporte")

    //     closeModalForm()
    // }
    async function getClientListed(filter){
        listed= await getClientListedRequest(filter)
        const data = credential[0]
        await clientReportRequest(data, listed)
        // openModalForm(clientReport({ filter, listed, clientReportBuild}))
    }

    btnAdd.addEventListener("click", () =>{
        let clientFiltro ={
            idDesde: tfIdDesde.lastElementChild.firstElementChild.value,
            idHasta: tfIdHasta.lastElementChild.firstElementChild.value,
            nameDesde: tfNameDesde.lastElementChild.firstElementChild.value,
            nameHasta: tfNameHasta.lastElementChild.firstElementChild.value,
            lastNameDesde: tfLastNameDesde.lastElementChild.firstElementChild.value,
            lastNameHasta: tfLastNameHasta.lastElementChild.firstElementChild.value,
            orderBy: inputSelect.value,
            order: inputSelectOrder.value
        }
        getClientListed(clientFiltro)
    })
    btnClear.addEventListener("click", () => {
        clear()
    })

    appendChildList(rangoDivId,[rangoDivIdTitle, tfIdDesde, tfIdHasta])
    appendChildList(rangoDivName,[rangoDivNameTitle, tfNameDesde, tfNameHasta])
    appendChildList(rangoDivLasName,[rangoDivLasNameTitle, tfLastNameDesde, tfLastNameHasta])

    appendChildList(selectDiv1, [inputSelect])
    appendChildList(selectDiv2, [inputSelectOrder])
    appendChildList(selectDiv, [selectDiv1, selectDiv2])

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(rangoDiv, [rangoDivId, rangoDivName, rangoDivLasName])
    appendChildList(formDiv,[ rengoTitle, rangoDiv, ordenTitle, selectDiv, btnDiv1])
    appendChildList(div,[titleDiv, formDiv])
    return div
}
export default clientListedTemplate
