import { appendChildList, closeModalForm, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import validateRoom from "../../schema/roomSchema.js";
import { clearform } from "../../views/tables/clientTemplate.js";
import {createRoom, idRoom, tfDescripcion, tfMontoDia, tfobservacion, updateRoom} from "../../views/tables/roomTemplate.js"

function roomForm(btnText, btnClass) {
    const form = setForm("area-form")
    const title = setTitleOrP("H4", "Datos de la habitacion")
    const btnDiv = setDiv("btn-form-con")
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
        const validate = validateRoom(tfDescripcion, tfMontoDia, tfobservacion)

        if(!validate) return
        
        if(btnSubmit.textContent == "Modificar"){
            updateRoom({
                id: idRoom,
                descripcion:  tfDescripcion.lastElementChild.firstElementChild.value,
                montoDia: tfMontoDia.lastElementChild.firstElementChild.value,
                observacion: tfobservacion.lastElementChild.firstElementChild.value
            })
            return
        }

        btnSubmit.textContent = "Guardando..."
        createRoom({
            descripcion:  tfDescripcion.lastElementChild.firstElementChild.value,
            montoDia: tfMontoDia.lastElementChild.firstElementChild.value,
            observacion: tfobservacion.lastElementChild.firstElementChild.value
        })
    }
    
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        handleSubmit()
    })
    btnReset.addEventListener("click", () => {
        clearform()
        closeModalForm()
    })

    appendChildList(btnDiv, [
        btnReset,
        btnSubmit
    ])
    appendChildList(form, [
        title, 
        tfMontoDia,
        tfobservacion,
        tfDescripcion,
        btnDiv
    ])
    

    return form
}

export default roomForm