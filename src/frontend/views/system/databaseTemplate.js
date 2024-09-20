import {appendChildList,closeConfirmModal,closeModalForm,openConfirmModal,openModalForm,setButton,setDiv,setInputForm,setTitleOrP,} from "../../../utils/functionsGlobal.js";
import { clearDbRequest } from "../../api/credentialRequest.js";
import clearDBContext from "../../components/confirmContext/clearDBContext.js";
import credentialForm from "../../components/form/credentialForm.js";
import { tablesCountFromHome } from "../home.js";
import { renderStay } from "../processes/stayTemplate.js";
import { renderClient } from "../tables/clientTemplate.js";
import { getRoomByState } from "../tables/roomTemplate.js";
import { renderService } from "../tables/servicesTemplate.js";

function dbTemplate(){
    const div = setDiv("area-table-con");
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Inicializacion de la base de datos")
    const formDiv = setDiv("listed-form-con")
    const rangoDiv = setDiv("formdb-rango-con")
    const subTitle = setTitleOrP("h4", "Borrar todos los datos ")
    const btnAdd = setButton("Borrar", "btn-form-add");

    async function clearDB(){
        const response = await clearDbRequest()

        if(!response) throw new Error("no se pudo borrar los datos")

       closeConfirmModal()
       renderClient()
       renderService()
       renderStay(),
       getRoomByState()
       tablesCountFromHome();

       openModalForm(credentialForm("Guardar", "btn-form-add"))
    }

    btnAdd.addEventListener("click", ()=> {
        openConfirmModal(clearDBContext({clearDB}))
    })

    titleDiv.appendChild(title);
    appendChildList(rangoDiv, [subTitle, btnAdd])
    appendChildList(formDiv,[rangoDiv])
    appendChildList(div, [titleDiv, formDiv])
    return div
}

export default dbTemplate