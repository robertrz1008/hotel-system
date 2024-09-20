function formatDate(fecha) {
    // Convertir la cadena de fecha en un objeto Date

    if(fecha == null) return { fecha: "Pendiente", hora: "Pendiente" }

    var fechaObjeto = new Date(fecha);
    
    // Obtener los componentes de la fecha y hora
    var dia = fechaObjeto.getDate();
    var mes = fechaObjeto.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1
    var año = fechaObjeto.getFullYear();
    var hora = fechaObjeto.getHours();
    var minutos = fechaObjeto.getMinutes();
    var segundos = fechaObjeto.getSeconds();

    // Agregar ceros a la izquierda si los números son menores que 10
    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    hora = (hora < 10) ? '0' + hora : hora;
    minutos = (minutos < 10) ? '0' + minutos : minutos;
    segundos = (segundos < 10) ? '0' + segundos : segundos;

    // Crear la cadena de fecha y hora en el formato deseado
    var fechaFormateada = año  + '-' + mes + '-' + dia;
    var horaFormateada = hora + ':' + minutos + ':' + segundos;

    // Devolver la cadena formateada
    return { fecha: fechaFormateada, hora: horaFormateada };
}

// Ejemplo de uso:
// var fechaDB = "Tue Apr 02 2024 17:20:34 GMT-0400 (hora estándar de Paraguay)";
// var fechaYHoraFormateada = formatDate(fechaDB);
// console.log("Fecha formateada:", fechaYHoraFormateada.fecha);
// console.log("Hora formateada:", fechaYHoraFormateada.hora);

export function setDate(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
    const día = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const minuto = fechaActual.getMinutes();
    const segundo = fechaActual.getSeconds();

    const fechaHoraPersonalizadaString = `${año}-${mes}-${día} ${hora}:${minuto}:${segundo}`;

    return fechaHoraPersonalizadaString
}

export function calculateDaysElapsed(startDate, endDate, quantity, total) {
    // Convert the dates to Date objects
    var startDateObj = new Date(startDate);
    var endDateObj = new Date(endDate);
    console.log([startDate, endDate, quantity, quantity])
    // Calculate the difference in milliseconds
    var difference = endDateObj.getTime() - startDateObj.getTime();
    // Convert the difference from milliseconds to days
    var daysElapsed = Math.floor(difference / (1000 * 60 * 60 * 24));
    // Multiply the number of days elapsed by the third parameter

    if(daysElapsed <= 1) return {"costo":quantity, "total": total}
    let days = daysElapsed - 1
    //el costo de estadias por los dias menos el
    var rest = days * quantity;
    let totalCosto= daysElapsed * quantity
    return {"costoDias": rest, "total":totalCosto}
}

export function calcularfechaHora(fecha1, fecha2) {
    // Función para parsear fechas en formato 'yy-mm-dd hh:mm:ss'

    function parseFecha(fecha) {
        const [datePart, timePart] = fecha.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        
        // Ajustar el año para el formato 'yy'
        const fullYear = year + 2000; // Asumir años 2000-2099

        return new Date(fullYear, month - 1, day, hours, minutes, seconds);
    }

    // Parsear las fechas
    const date1 = parseFecha(fecha1);
    const date2 = parseFecha(fecha2);

    // Calcular la diferencia en milisegundos
    const diferenciaMs = Math.abs(date2 - date1);

    // Convertir la diferencia a días, horas y minutos
    const msEnUnMinuto = 60 * 1000;
    const msEnUnaHora = 60 * msEnUnMinuto;
    const msEnUnDia = 24 * msEnUnaHora;

    const dias = Math.floor(diferenciaMs / msEnUnDia);
    const horas = Math.floor((diferenciaMs % msEnUnDia) / msEnUnaHora);
    const minutos = Math.floor((diferenciaMs % msEnUnaHora) / msEnUnMinuto);

    return `${dias} dias, ${horas} horas, ${minutos} minutos`
}


export default formatDate