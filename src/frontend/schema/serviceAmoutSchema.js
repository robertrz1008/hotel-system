import { hashNumber } from "../../utils/validator.js";

function serviceAmoutSchema(cantidad){
    var elementosAEliminar = document.getElementsByClassName("error-mesage");
    var elementosArray = Array.from(elementosAEliminar);
    elementosArray.forEach(function(elemento) {
        elemento.remove();
    });
    const vCantidad = hashNumber(cantidad, {
        void: "La cantidad es requirida",
        zero: "Ingresa una cantidad valida"
    })
    return !vCantidad? false : true
}

export default serviceAmoutSchema