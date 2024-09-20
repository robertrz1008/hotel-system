function getDate(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
    const día = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const minuto = fechaActual.getMinutes();
    const segundo = fechaActual.getSeconds();

    if(mes.length == 1){
        mes = "0"+mes
    }

    const fechaHoraPersonalizadaString = `${día}-${mes}-${año} `;

    return fechaHoraPersonalizadaString
}

function nextLetter(letra) {
    letra = letra.toLowerCase();
    if (letra === 'z') {
        return 'z';
    }
    var codigo = letra.charCodeAt(0);
    codigo++;
    return String.fromCharCode(codigo);
  }
  function obtenerFechaSiguiente(fechaStr) {
    // Convertir la cadena de entrada en un objeto Date
    const [yy, mm, dd] = fechaStr.split('-').map(Number);
    const year = 2000 + yy;  // Asumiendo que los años son 20xx
    const date = new Date(year, mm - 1, dd);

    // Sumar un día a la fecha
    date.setDate(date.getDate() + 1);

    // Obtener los componentes de la nueva fecha
    const newYy = String(date.getFullYear()).slice(-2);
    const newMm = String(date.getMonth() + 1).padStart(2, '0');
    const newDd = String(date.getDate()).padStart(2, '0');

    // Formatear la nueva fecha como 'yy-mm-dd'
    return `${newYy}-${newMm}-${newDd}`;
}

  
  // Ejemplo de uso
//   let fechaActual = new Date('2024-05-13');
//   let fechaSiguiente = obtenerDiaSiguiente(fechaActual);
  
//   console.log(fechaSiguiente);
  

module.exports = {
    getDate,
    nextLetter,
    obtenerFechaSiguiente
}