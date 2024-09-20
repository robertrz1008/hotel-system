import router from "../router/router.js"
import { hash, selectRoute} from "../utils/config.js"
import { itemSelect, navigation, openModalForm } from "../utils/functionsGlobal.js"
import { getCredentialRequest } from "./api/credentialRequest.js";
import credentialForm from "./components/form/credentialForm.js";

let credential = [];
async function verifyCredential(){
  credential = await getCredentialRequest()

  if(credential.length == 0) return openModalForm(credentialForm("Guardar", "btn-form-add"))
}


window.addEventListener("load", () => {
  navigation(hash.home)
  verifyCredential()
  router(window.location.hash)
})

window.addEventListener("hashchange", () =>{
  router(window.location.hash)
})
