import { appendChildList, closeModalForm, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import validateService from "../../schema/serviceSchema.js";
import {tfMonto, tfobservacion, tfDescripcion, clearServiceform, createService, updateService, idService} from "../../views/tables/servicesTemplate.js"

function serviceForm(btnText, btnClass) {
    const form = setForm("area-form")
    const title = setTitleOrP("H3", "Datos de la Consumicion")
    const btnDiv = setDiv("btn-form-con")
    const alertDiv = setDiv("")
    //botones
    const btnSubmit = document.createElement("button")
    btnSubmit.textContent = btnText
    btnSubmit.classList.add(btnClass)
    const btnReset = document.createElement("button")
    btnReset.type = "reset"
    btnReset.classList.add("btn-form-res")
    btnReset.textContent = "Cancelar"

    form.innerHTML = ""

    function handleSubmit(){
        alertDiv.innerHTML = ""
        alertDiv.classList.remove("alert-con")
        const validate = validateService(tfDescripcion, tfMonto, tfobservacion)

        if(!validate) return
        
        if(btnSubmit.textContent == "Modificar"){
            updateService({
                id: idService,
                descripcion: tfDescripcion.lastElementChild.firstElementChild.value,
                monto: tfMonto.lastElementChild.firstElementChild.value,
                observacion: tfobservacion.lastElementChild.firstElementChild.value
            })
            btnSubmit.textContent = "Guardar"
            return
        }
        btnSubmit.textContent = "Guardando..."

        createService({
            descripcion: tfDescripcion.lastElementChild.firstElementChild.value,
            monto: tfMonto.lastElementChild.firstElementChild.value,
            observacion: tfobservacion.lastElementChild.firstElementChild.value
        })
    }
    
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        handleSubmit()
    })

    btnReset.addEventListener("click", () => {
        clearServiceform()
        closeModalForm()
    })

    appendChildList(btnDiv, [
        btnReset,
        btnSubmit
    ])
    appendChildList(form, [
        title, 
        tfMonto,
        tfobservacion,
        tfDescripcion,
        btnDiv
    ])
    

    return form
}

export default serviceForm