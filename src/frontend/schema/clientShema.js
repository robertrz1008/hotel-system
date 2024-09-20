import { hashTxt } from "../../utils/validator.js"

function validateClient(cedula, nombre, apellido, direccion, telefono, ){

    var elementosAEliminar = document.getElementsByClassName("error-mesage");
    var elementosArray = Array.from(elementosAEliminar);
    elementosArray.forEach(function(elemento) {
        elemento.remove();
    });
    
    const vCedula = hashTxt(cedula, "La cedula es requerida")
    const vNombre = hashTxt(nombre, "El nombre es requerido")
    const vApellido = hashTxt(apellido, "El apellido es requerido")
    const vDireccion = hashTxt(direccion, "La direccion es requerida")
    const vTelefono = hashTxt(telefono, "El telefono es requerido")

    const items = [vCedula, vNombre, vApellido, vDireccion, vTelefono]
    const callback = (x) => x == false

    if(items.some(callback)){
         return false
    }

    return true
}

export default validateClient