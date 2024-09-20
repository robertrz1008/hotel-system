import { appendChildList, closeModalForm, openModalForm, setButton, setDiv, setInputForm, setInputSelect, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { roomsReportRequest } from "../../api/reportPDFRequest.js"
import { getRoomsListedRequest } from "../../api/roomRequest.js"
import roomsReport from "../../components/ModalInfo/roomReport.js"
import { credential } from "../system/settingTemplate.js"

function roomsListedTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Listado de Habitaciones")

    const formDiv = setDiv("listed-form-con")

    const rangoDiv = setDiv("form-rango-con")
    const rengoTitle = setTitleOrP("h4", "Filtros")
    const rangoDivDescription = setDiv("form-rangosub-con")
    const rangoDivMontoDia = setDiv("form-rangosub-con")
    const rangoDivId = setDiv("form-rangosub-con")
    const rangoDivIdTitle = setTitleOrP("h4", "Id")
    const rangoDivDescriptionTitle = setTitleOrP("h4", "Descripcion")
    const rangoDivMonsotDiaTitle = setTitleOrP("h4", "MontoDia")
    const tfIdDesde = setInputForm("Desde", "number", "")
    const tfIdHasta = setInputForm("Hasta", "number", "")
    const tfDescriptionDesde = setInputForm("Desde", "text", "")
    const tfDescriptionHasta = setInputForm("Hasta", "text", "")
    const tfMontoDiaDesde = setInputForm("Desde", "number", "")
    const tfMontoDiaHasta = setInputForm("Hasta", "number", "")
    const ordenTitle = setTitleOrP("h4", "Ordenamiento")
    const selectDiv = setDiv("form-select-con")
    const selectDiv1 = setDiv("lidted-form-select-div")
    const selectDiv2 = setDiv("lidted-form-select-div")
    const inputSelect = setInputSelect([
        {value: "1", name: "Id"},
        {value: "2", name: "Descripcion"},
        {value: "3", name: "MontoDia"}
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
        tfDescriptionDesde.lastElementChild.firstElementChild.value =""
        tfDescriptionHasta.lastElementChild.firstElementChild.value = ""
        tfMontoDiaDesde.lastElementChild.firstElementChild.value = ""
        tfMontoDiaHasta.lastElementChild.firstElementChild.value = ""
        inputSelect.value = "1"
        inputSelectOrder.value= "1"
    }
    // async function roomReportBuild(route, credential, clients){
    //     await roomsReportRequest(route, credential, clients)

    //     closeModalForm()
    // }
    async function getRoomsListed(filter){
        listed= await getRoomsListedRequest(filter)
        const data = credential[0]
        await roomsReportRequest(data, listed)
        console.log(listed)
        // openModalForm(roomsReport({ filter, listed, roomReportBuild}))
    }

    btnAdd.addEventListener("click", () =>{
        const roomFiltro ={
            idDesde: tfIdDesde.lastElementChild.firstElementChild.value,
            idHasta: tfIdHasta.lastElementChild.firstElementChild.value,
            descriptionDesde: tfDescriptionDesde.lastElementChild.firstElementChild.value,
            descriptionHasta: tfDescriptionHasta.lastElementChild.firstElementChild.value,
            montoDiaDesde: tfMontoDiaDesde.lastElementChild.firstElementChild.value,
            montoDiaHasta: tfMontoDiaHasta.lastElementChild.firstElementChild.value,
            orderBy: inputSelect.value,
            order: inputSelectOrder.value
        }
        getRoomsListed(roomFiltro)
    })
    btnClear.addEventListener("click", () => {
        clear()
    })

    appendChildList(rangoDivId,[rangoDivIdTitle, tfIdDesde, tfIdHasta])
    appendChildList(rangoDivDescription,[rangoDivDescriptionTitle, tfDescriptionDesde, tfDescriptionHasta])
    appendChildList(rangoDivMontoDia,[rangoDivMonsotDiaTitle, tfMontoDiaDesde, tfMontoDiaHasta])

    appendChildList(selectDiv1, [inputSelect])
    appendChildList(selectDiv2, [inputSelectOrder])
    appendChildList(selectDiv, [selectDiv1, selectDiv2])

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(rangoDiv, [rangoDivId, rangoDivDescription, rangoDivMontoDia])
    appendChildList(formDiv,[ rengoTitle, rangoDiv, ordenTitle, selectDiv, btnDiv1])
    appendChildList(div,[titleDiv, formDiv])
    return div
}
export default roomsListedTemplate