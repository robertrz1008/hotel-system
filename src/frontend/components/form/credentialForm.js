import { appendChildList, closeModalForm, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import validateCredential from "../../schema/credentialShema.js";
import { createCredential, credentialId, tfDireccion, tfEmpresa, tfTelefono, updateCredential } from "../../views/system/settingTemplate.js";

function credentialForm(btnText, btnClass) {
    const form = setForm("area-form")
    const title = setTitleOrP("H2", "Datos de la Empresa")
    const btnDiv = setDiv("btn-form-con")
    const btnReset = document.createElement("button")
    const alertDiv = setDiv("")
    //botones
    const btnSubmit = document.createElement("button")
    btnSubmit.textContent = btnText
    btnSubmit.classList.add(btnClass)
    
    btnReset.type = "reset"
    btnReset.classList.add("btn-form-res")
    btnReset.textContent = "Cancelar"
    btnReset.disabled = true
    btnReset.classList.add("btn-disabled")

    form.innerHTML = ""

    if(btnSubmit.textContent == "Modificar"){
        btnReset.disabled = false
        btnReset.classList.remove("btn-disabled")
    }
    function clear(){
        tfEmpresa.lastElementChild.firstElementChild.value= "",
        tfTelefono.lastElementChild.firstElementChild.value= "",
        tfDireccion.lastElementChild.firstElementChild.value= ""
    }

    function handleSubmit(){
        const credentialObj = {
            id: credentialId,
            empresa: tfEmpresa.lastElementChild.firstElementChild.value,
            telefono: tfTelefono.lastElementChild.firstElementChild.value,
            direccion: tfDireccion.lastElementChild.firstElementChild.value
        }
        if(btnSubmit.textContent == "Modificar"){
            updateCredential(credentialObj)

            btnSubmit.textContent = "Guardar"
            return
        }
        alertDiv.innerHTML = ""
        alertDiv.classList.remove("alert-con")
        const validate = validateCredential(tfEmpresa, tfDireccion, tfTelefono)

        if(!validate) return

        btnSubmit.textContent = "Guardando..."
    
        createCredential(credentialObj)
    }
    
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        handleSubmit()
    })

    btnReset.addEventListener("click", () => {
        closeModalForm()
    })

    appendChildList(btnDiv, [
        btnReset,
        btnSubmit
    ])
    appendChildList(form, [
        title, 
        tfEmpresa,
        tfTelefono,
        tfDireccion,
        btnDiv
    ])
    

    return form
}

export default credentialForm