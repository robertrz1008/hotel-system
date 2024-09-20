import { closeCnfModal, openCnfModal } from "../frontend/Components/comfirmModal.js";
import { closeModal, openModal } from "../frontend/Components/modal.js";

export function navigation(hash) {
    window.location.hash = hash
}

export function itemSelect( selectRoute){
    
    let items = document.getElementsByClassName("tr")
        let arr = [...items]

        for (let i = 0; i < arr.length; i++) {
            let titleItem = arr[i].firstElementChild.firstElementChild.lastElementChild.textContent
            let conItem = arr[i].firstElementChild

            if(titleItem == selectRoute){
                conItem.classList.add("tr-selected")
                console.log(titleItem)
            }
            if(titleItem != selectRoute && conItem.classList.contains("tr-selected")){
                conItem.classList.remove("tr-selected")
            }
        }

}

export function removeErrorMessage(arr){
    for (const i of arr) {
        i.lastElementChild.classList.remove("input-error")
    }
}

export function setElementStyle(el, cssObj ) {
    if(typeof cssObj !== "object")  throw new Error("es segundo parametro debe ser un objeto")
    for (const property in cssObj) {
        el.style[property] = cssObj[property]
    }
}
export function replaceClass(elem, strOwl, strNew){
    elem.classList.remove(strOwl);
    elem.classList.add(strNew);
}
//modals
export const openModalForm = (form) => {
    openModal(form)
}
export const closeModalForm = () => {
    closeModal()
}
export const openConfirmModal = (context) => {
    openCnfModal(context)
}
export const closeConfirmModal = () =>{
    closeCnfModal()
}

// create element
export function setForm(classe){
    const form = document.createElement("form")
    form.className = classe
    return form
}

export function setIcon(clases){ 
    const icon = document.createElement("i")
    icon.classList.add(...clases)
    return icon
}

export function setTitleOrP(elm, text){
    let element = document.createElement(elm)
    element.textContent = text
    return element
}
export function setDiv(clase){
    let element = document.createElement("div")
    element.className = clase
    return element
}
export function setButton(text,clase, iconClass) {
    const element = document.createElement("button");
    element.className = clase;
    element.innerHTML = `
        <i class="${iconClass}"></i>
        ${text}
    `
    return element;
}
export function setButtonLink(linkClass, iconClass, name, number) {
    const element = document.createElement("button");
    element.className = linkClass;
    element.innerHTML = `
        <div>
            <h1>${number}</h1>
            <h4>${name}</h4>
        </div>  
        <i class="${iconClass}"></i>
    `
    return element;
}

export function appendChildList(parent, elements){
    for (const elem of elements) {
        parent.appendChild(elem)
    }
}

export function appendThList(parent, array){
    for (const i of array) {
        let th = document.createElement("th")
        th.textContent = i
        if(i =="#"){
            th.className = "th-num"
        }else{
            th.className = "th-"+i
        }
        parent.appendChild(th)
    }
}

export function setTd(str, clase){
    const element = document.createElement("td")
    element.textContent = str
    element.className = clase
    return element
}

export function setInput(typ, placeh){
    const div = document.createElement("div")
    const element = document.createElement("input")

    div.className= "input-con"

    element.type = typ
    element.placeholder = placeh
    element.className="input-root"

    appendChildList(div, [
        element
    ])

    div.addEventListener("click", () =>{
        div.classList.add("input-select")
        console.log("clickeado en el buscador")
      })

    // window.addEventListener("click", (e) => {
    //     const child = div.firstElementChild
    //     const lastChild = div.lastElementChild
    //     if(e.target = child || e.target != lastChild){
    //         div.classList.remove("input-select")
    //     }
    // })

    return div
}
export function setBoxLink(linkClass, iconClass, name, number){
    const div = setDiv(linkClass)
    const textDiv = setDiv("text-div")
    const iconDiv = setDiv("icon-div")

    let num = document.createElement("h1")
    num.textContent = number
    let text = setTitleOrP("h4", name)
    let icon = setIcon(iconClass)

    appendChildList(textDiv, [
        num,
        text
    ])
    iconDiv.appendChild(icon)
    appendChildList(div, [
        textDiv,
        iconDiv
    ])

    return div
}

export function setInputForm(label, type, placeholder) {
    const title = setTitleOrP("h4", label)
    const div = setDiv("inputform-con")
    const inputDiv = setDiv("texfiel-con")
    const element = document.createElement("input")

    inputDiv.classList.add("input-con")
    title.className = "inputForm-label"
    element.type = type
    element.className="input-root"

    inputDiv.addEventListener("click", () =>{
        inputDiv.classList.add("input-select")
      })
    window.addEventListener("click", (e) => {
        const child = inputDiv.firstElementChild
        if(e.target != child){
            inputDiv.classList.remove("input-select")
        }
    })

    inputDiv.appendChild(element)
    appendChildList(div, [
        title,
        inputDiv
    ])
    return div
}
export function setTextArea(label){
    const title = setTitleOrP("h4", label)
    const div = setDiv("inputform-con")
    const inputDiv = setDiv("txtArea-con")
    const element = document.createElement("textarea")

    inputDiv.classList.add("input-con")
    title.className = "inputForm-label"
    element.className="inputArea-root"

    inputDiv.addEventListener("click", () =>{
        inputDiv.classList.add("input-select")
      })
    window.addEventListener("click", (e) => {
        const child = inputDiv.firstElementChild
        if(e.target != child){
            inputDiv.classList.remove("input-select")
        }
    })

    inputDiv.appendChild(element)
    appendChildList(div, [
        title,
        inputDiv
    ])
    return div
}

export function setAlertMesages(parent, mesages){
    if(mesages.length == 0){
        parent.innerHTML = ""
        parent.classList.remove("alert-con")
        return
    }
    parent.innerHTML = ""
    parent.classList.add("alert-con")
    for (const i of mesages) {
        const p = setTitleOrP("p", i)
        parent.appendChild(p)
    }
}
export function setInputSelect(items) {
    const input = document.createElement("select")
    input.className = "input-select-form"
    for (const item of items) {
        const option = document.createElement("option")
        option.value = item.value
        option.textContent = item.name
        input.appendChild(option)
    }
    return input
}
export function setTogleButton(title){
    const div = setDiv("checkbox-con")
    const p = setTitleOrP("h4", title)
    const input = document.createElement("input")
    const label = document.createElement("label")

    input.type = "checkbox"
    input.id="check"
    label.htmlFor = "check"
    label.className = "button"

    appendChildList(div, [
        p,
        input,
        label
    ])
    return div
}

export function setDetailText(title, text){
    const div = setDiv("detail-text-con")
    const detailTitle = setTitleOrP("h4", title)
    detailTitle.className = "detail-text-con-title"
    const detailText = setTitleOrP("p", text)
    detailText.className = "detail-text-con-p"

    appendChildList(div, [
        detailTitle, 
        detailText
    ])

    return div
}