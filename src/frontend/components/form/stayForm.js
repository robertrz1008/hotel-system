import { appendChildList, closeModalForm, setButton, setDiv, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import { clientBtn, clientInput, clientText, entryDate, entryP, inputDateDiv, inputSelect, roomBtn, roomInput, roomText, tfDate, tfObservacion } from "../../views/processes/stayTemplate.js";

function stayForm(parent) {
    const form = setDiv("stay-form")
    const title = setTitleOrP("h4", "Datos de la transacion")
    const dateTimeDiv = setDiv("date-time-div")
    const clientDiv = setDiv("date-time-div")
    const roomDiv = setDiv("date-time-div")

    form.innerHTML = ""

    //dom
    entryDate.appendChild(entryP)
    inputDateDiv.appendChild(tfDate)
    clientInput.appendChild(clientText)
    roomInput.appendChild(roomText)

    appendChildList(clientDiv,[
        clientInput,
        clientBtn
    ])
    appendChildList(roomDiv, [
        roomInput,
        roomBtn
    ])
    appendChildList(dateTimeDiv, [
        entryDate,
        inputDateDiv
    ])
    appendChildList(form, [
        title, 
        dateTimeDiv,
        clientDiv,
        roomDiv,
        tfObservacion,
        inputSelect
    ])
    

    parent.appendChild(form)
}

export default stayForm