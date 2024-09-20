function calcularDiferencia(fecha1, fecha2) {
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

// Ejemplo de uso
const fecha1 = "24-05-15 08:00:00";
const fecha2 = "24-05-15 10:30:00";

const resultado = calcularDiferencia(fecha1, fecha2);
console.log(resultado);