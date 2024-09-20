import { hashTxt } from "../../utils/validator.js";

function validateCredential(empresa, direccion, telefono ){

    var elementosAEliminar = document.getElementsByClassName("error-mesage");
    var elementosArray = Array.from(elementosAEliminar);
    elementosArray.forEach(function(elemento) {
        elemento.remove();
    });
    
    const vEmpresa = hashTxt(empresa, "El nombre es requerido")
    const vDireccion = hashTxt(direccion, "La direccion es requerida")
    const vTelefono = hashTxt(telefono, "El telefono es requerido")

    const items = [vEmpresa, vDireccion, vTelefono]
    const callback = (x) => x == false

    if(items.some(callback)){
         return false
    }

    return true
}

export default validateCredential