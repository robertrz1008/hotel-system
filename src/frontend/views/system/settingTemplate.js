import {appendChildList,closeModalForm,openModalForm,setButton,setDiv,setInputForm,setTitleOrP,} from "../../../utils/functionsGlobal.js";
import { createCredentialRequest, getCredentialRequest, updateCredentialRequest } from "../../api/credentialRequest.js";
import credentialForm from "../../components/form/credentialForm.js";

const div = setDiv("area-table-con");
const titleDiv = setDiv("title-con");
const title = setTitleOrP("h3", "Registro de Habitaciones");
const formDiv = setDiv("setting-con");
const formDiv2 = setDiv("setting-con2");

const credentialTitle = setTitleOrP("h4", "Credenciales");
const credentialDiv = setDiv("credential-con");
const credentialTextsDiv = setDiv("credential-texts-con");
const empresaTitle = setTitleOrP("h4", "Empresa");
const telefonoTitle = setTitleOrP("h4", "Telefono");
const direccionTitle = setTitleOrP("h4", "Direccion");
const empresaDiv = setDiv("credencial-text-con");
const telefonoDiv = setDiv("credencial-text-con");
const direccionDiv = setDiv("credencial-text-con");
const empresaText = setTitleOrP("p", "Las venturas");
const telefonoText = setTitleOrP("p", "0987675678");
const direccionText = setTitleOrP("p", "Madhattan");
const btnDiv = setDiv("setting-btn-con");
const btnAdd = setButton("Modificar", "btn-form-add");

export const tfEmpresa = setInputForm("Empresa", " ");
export const tfTelefono = setInputForm("Telefono", " ");
export const tfDireccion = setInputForm("Direccion", " ");

const pathTTitle = setTitleOrP("h4", "Ruta para generacion de reportes");
const pathDiv = setDiv("route-con")
const tfPathDiv = setDiv("tfrouter-con")
const tfPath = setInputForm("", "text", "")
const btnPath = setButton("Definir", "btn-form-add");

export let credential;
export let pathPDF= "";
export let credentialId;
let pathId;


async function renderCredential() {
    credential = await getCredentialRequest()
    if(credential.length == 0) return
    empresaText.textContent = credential[0].empresa
    telefonoText.textContent = credential[0].telefono
    direccionText.textContent = credential[0].direccion
    credentialId = credential[0].id

    if(credential.length == 2){
      pathPDF = credential[1].direccion
      tfPath.lastElementChild.firstElementChild.value = pathPDF
      pathId = credential[1].id
    }
}

async function definirRuta(path){
  const response = await createCredentialRequest({
    id: credentialId,
    empresa: "+++++++",
    telefono: "++++++++",
    direccion: path.replace(/\\/g, "/")
  });

  if (!response) return console.log("error");

  clear();
  renderCredential()
}
async function updatePath(path){
  const response = await updateCredentialRequest({
    id: pathId,
    empresa: "+++++++",
    telefono: "++++++++",
    direccion: path.replace(/\\/g, "/")
  });
  if (!response) return console.log("error");

  clear();
  renderCredential()
}

function clear() {
  tfEmpresa.lastElementChild.firstElementChild.value = "";
  tfTelefono.lastElementChild.firstElementChild.value = "";
  tfDireccion.lastElementChild.firstElementChild.value = "";
}

export async function createCredential(credential) {
  const response = await createCredentialRequest(credential);

  if (!response) return console.log("error");

  clear();
  renderCredential()
  closeModalForm()
}
async function updateMode(){
    tfEmpresa.lastElementChild.firstElementChild.value = credential[0].empresa;
    tfTelefono.lastElementChild.firstElementChild.value = credential[0].telefono;
    tfDireccion.lastElementChild.firstElementChild.value = credential[0].direccion;
}
export async function updateCredential(credential){
    const response =  await updateCredentialRequest(credential)
    if(!response) throw new Error("No se pudo modificar la credencial")
    renderCredential()
    clear()
    closeModalForm()
}

function settingTemplate() {
  renderCredential()
  btnDiv.appendChild(btnAdd);
  titleDiv.appendChild(title);

  btnAdd.addEventListener("click", () => {
    updateMode()
    openModalForm(credentialForm("Modificar", "btn-form-upd"))
  })
  btnPath.addEventListener("click", () => {
    if(pathId) return updatePath(tfPath.lastElementChild.firstElementChild.value)
      definirRuta(tfPath.lastElementChild.firstElementChild.value)
  })

  appendChildList(empresaDiv, [empresaTitle, empresaText]);
  appendChildList(telefonoDiv, [telefonoTitle, telefonoText]);
  appendChildList(direccionDiv, [direccionTitle, direccionText]);

  appendChildList(tfPathDiv, [tfPath])
  appendChildList(pathDiv, [tfPathDiv, btnPath])

  appendChildList(credentialTextsDiv, [empresaDiv, telefonoDiv, direccionDiv]);
  appendChildList(credentialDiv, [credentialTextsDiv]);
  appendChildList(formDiv, [credentialTitle, credentialDiv, btnDiv]);
  // appendChildList(formDiv2, [pathTTitle, pathDiv]);

  appendChildList(div, [titleDiv, formDiv]);

  return div;
}
export default settingTemplate;
