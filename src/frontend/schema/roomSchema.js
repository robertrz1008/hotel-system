import { hashNumber, hashTxt } from "../../utils/validator.js"

function validateRoom(descripcion, montoDia, observacion){

    var elementosAEliminar = document.getElementsByClassName("error-mesage");
    var elementosArray = Array.from(elementosAEliminar);
    elementosArray.forEach(function(elemento) {
        elemento.remove();
    });
    
    const vDireccion = hashTxt(descripcion, "La descripcion es requerida")
    const vMontoDia = hashNumber(montoDia, {
        void: "El monto es requirido",
        zero: "Ingresa un monto valido"
    })
    const vObservacion = hashTxt(observacion, "La observacion es requerida")

    const items = [vDireccion, vMontoDia, vObservacion]
    const callback = (x) => x == false

    if(items.some(callback)){
        console.log("validacion teminada")
        return false
    }

    return true
}

export default validateRoom