import { appendChildList, closeConfirmModal, setButton, setDiv, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js"
import serviceAmoutSchema from "../../schema/serviceAmoutSchema.js"
import { updateAmountDetail, updateDetailFromDB } from "../../views/processes/stayTemplate.js"

function detailAmaunt(description, amount, id, serviceId){
    const div = setDiv("detailAmount-con")
    const title = setTitleOrP("h4", "Cantidad del servicio")
    const formCon = setDiv("detail-Amount-form-con")
    const subTitle = setTitleOrP("h3", description)
    const tfCantidadAdd = setInputForm("","number", "")
    const btnDiv = setDiv("btn-form-con")
    const btnReset = setButton("Cancelar", "btn-form-res") 
    const btnAccept = setButton("Aceptar", "btn-form-add")
    
    tfCantidadAdd.lastElementChild.firstElementChild.value = amount

    div.innertHtml = ""

    console.log(serviceId)

    function updateServiceIfFromDB() {
        if(typeof serviceId == "undefined") {
            updateAmountDetail(id, tfCantidadAdd.lastElementChild.firstElementChild.value)
            closeConfirmModal()
            return
        }
        updateDetailFromDB(id, tfCantidadAdd.lastElementChild.firstElementChild.value)
        closeConfirmModal()
    }

    function hanldeSubmit(){
        const validate = serviceAmoutSchema(tfCantidadAdd)
        if(!validate) return 
        updateServiceIfFromDB()
    }

    btnReset.addEventListener("click", () =>{
        closeConfirmModal()
    })
    btnAccept.addEventListener("click", () => {
        hanldeSubmit()
    })

    appendChildList(formCon, [
        subTitle,
        tfCantidadAdd
    ])
    appendChildList(btnDiv, [
        btnReset,
        btnAccept
    ])

    appendChildList(div, [
        title,
        formCon,
        btnDiv
    ])
    return div
}

export default detailAmaunt