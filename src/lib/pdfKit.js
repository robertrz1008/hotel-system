const PDFDocument = require('pdfkit-table');
const fs = require("fs");
const {getDate} = require("./date");
const path = require('path');
const { PDFWindowBuild } = require('../main');

function setArray(data) {
    let array = []
  for (const i of data) {
    const arr = Object.values(i)
    array.push(arr)
  }
    return array
  }

  function orderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])
      iArr.push(i[1])
      iArr.push(i[3])
      iArr.push(i[2])

      newArr.push(iArr)
    }
    return newArr
}
function formatStatus(number){
  let stat = [
  {value: "0", name: "Ocupado"},
  { value: "1", name: "Reservado"},
  { value: "2", name: "Anulado"},
  { value: "3", name: "Finalizado"}
  ]
  let newS = stat.filter(data => data.value == number)

  return newS[0].name
}

async function clientReport( credential, clients){
   try {
     const doc = new PDFDocument();
     console.log("generando pdf")
     doc.margin = 10
 
     const writeStream = fs.createWriteStream(path.join(__dirname, './report.pdf'));
 
    doc.pipe(writeStream);
 
   doc.moveDown().fontSize(15).text('Listado de Clientes',34, 30,{align: "center"});
 
   doc.fontSize(15).text(credential.empresa)
   doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
   doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
   doc.roundedRect(26, 24, 524, 40, 3).stroke();
 
    const table = {
     headers: ["Id","Cedula" ,"Nombre", "Apellido","Direccion", "Telefeono"],
     rows: setArray(clients),
   };
   doc.fontSize(12).moveDown().table(table, { 
     width: 500,
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(10);
        indexColumn === 9;
      },
   });
   let pages = doc.bufferedPageRange();
 
 for (let i = 0; i < pages.count; i++) {
   doc.switchToPage(i);
   let oldBottomMargin = doc.page.margins.bottom;
   doc.page.margins.bottom = 0 
   doc.fontSize(10)
     .text(
       `fecha: 10-08-2024                                                                                           Pag.: ${i + 1} de ${pages.count}`,
       0,
        doc.page.height - (oldBottomMargin/2),
       { align: 'center' }
     );
   
   doc.page.margins.bottom = oldBottomMargin; 
 }
 doc.end();

 console.log("reporte de clientes generado con exito")
 return PDFWindowBuild()
 
   } catch (error) {
    console.error('Error al generar el reporte:', err);
    return false
   }

}

function roomsReport( credential, rooms){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  const writeStream = fs.createWriteStream(path.join(__dirname, './report.pdf'));

  doc.pipe(writeStream);

  doc.moveDown().fontSize(15).text('Listado de Habitaciones',34, 30,{align: "center",});

  doc.fontSize(15).text(credential.empresa)
  doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
  doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
  doc.roundedRect(26, 24, 524, 40, 3).stroke();

  const table = {
  headers: ["Id","Descripcion", "Observacion", "MontoDia"],
  rows: orderArray(setArray(rooms))
};
doc.fontSize(12).moveDown().table(table, { 
  width: 500,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(10);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: 10-08-2024                                                                                           Pag.: ${i + 1} de ${pages.count}`,
    0,
     doc.page.height - (oldBottomMargin/2),
    { align: 'center' }
  );

doc.page.margins.bottom = oldBottomMargin; 
}
doc.end();


writeStream.on('finish', function() {
  console.log('PDF generado con éxito.');
  return PDFWindowBuild()
});

writeStream.on('error', function(err) {
  console.error('Error al generar el PDF:', err);
});
}

function servicesReport(credential, rooms){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  const writeStream = fs.createWriteStream(path.join(__dirname, './report.pdf'));

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Listado de Consumisiones',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id","Descripcion" , "Observacion", "Monto"],
  rows: orderArray(setArray(rooms)),
};
doc.fontSize(20).moveDown().table(table, { 
  width: 500,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(10);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
    0,
     doc.page.height - (oldBottomMargin/2),
    { align: 'center' }
  );

doc.page.margins.bottom = oldBottomMargin; 
}
doc.end();


writeStream.on('finish', function() {
  console.log('PDF generado con éxito.');
  return PDFWindowBuild()
});

writeStream.on('error', function(err) {
  console.error('Error al generar el PDF:', err);
});
}

function staysDetailedReport(credential, list){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  function stay0rderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])//id
      iArr.push(i[1])//nombre
      iArr.push(i[2])//apellido
      iArr.push(i[3])//habitacion
      iArr.push(i[4])//estado
      iArr.push(i[5])//entrada
      iArr.push(i[6])//salida
      iArr.push(i[7])//servicio
      iArr.push(i[8])//cantidad
      iArr.push(i[9])//subtotal
      iArr.push(i[10])//total

      newArr.push(iArr)
    }
    return newArr
}

  const writeStream = fs.createWriteStream(path.join(__dirname, './report.pdf'));

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Informe detallado de Estadias',30, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id", "Nombre", "Apellido","Habitacion", "Estado", "Entrada", "Salida", "Servicio", "Cantidad","Subtotal", "Total"],
  rows: stay0rderArray(setArray(list)),
};
doc.fontSize(20).moveDown().table(table, { 
  width: 540,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(8);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
    0,
     doc.page.height - (oldBottomMargin/2),
    { align: 'center' }
  );

doc.page.margins.bottom = oldBottomMargin; 
}
doc.end();


writeStream.on('finish', function() {
  console.log('PDF generado con éxito.');
  return PDFWindowBuild()
});

writeStream.on('error', function(err) {
  console.error('Error al generar el PDF:', err);
});
}
function staysSummarizedReport(credential, list){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  function stay0rderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])//id
      iArr.push(i[2]+" "+i[3])//cliente
      iArr.push(i[5])//habitacion
      iArr.push(i[8])//estado
      iArr.push(i[6])//montoDia
      iArr.push(i[9])//entrada
      iArr.push(i[10])//salida
      iArr.push(i[12])//habitacion

      newArr.push(iArr)
    }
    return newArr
}
  const writeStream = fs.createWriteStream(path.join(__dirname, './report.pdf'));

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Informe resumido de Estadias',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id", "Cliente", "Habitacion", "Estado", "MontoDia", "Entrada", "Salida", "Total"],
  rows: stay0rderArray(setArray(list)),
};
doc.fontSize(20).moveDown().table(table, { 
  width: 520,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(8);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange()

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
    0,
     doc.page.height - (oldBottomMargin/2),
    { align: 'center' }
  );

doc.page.margins.bottom = oldBottomMargin; 
}
doc.end();


writeStream.on('finish', function() {
  console.log('PDF generado con éxito.');
  return PDFWindowBuild()
});

writeStream.on('error', function(err) {
  console.error('Error al generar el PDF:', err);
});
}
function detailservicesReport( credential, stay, list){

  const doc = new PDFDocument();
  console.log("generando reporte de detalles servicios")
  doc.margin = 10

  function stay0rderDetail(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])//id
      iArr.push(i[3])//descripcion
      iArr.push(i[5])//monto
      iArr.push(i[4])//cantidad
      iArr.push(i[6])//subtotal

      newArr.push(iArr)
    }
    newArr.push(["Total", "", "", "",stay.total])
    return newArr
}

  const writeStream = fs.createWriteStream(route+"/consDetalles-reporte.pdf");

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Detalles de consumision del cliente',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();
doc.fontSize(10).moveDown().text("Cliente: "+stay.nombre+" "+stay.apellido)
doc.fontSize(10).text("Habitacion: "+stay.descripcion)
doc.fontSize(10).text("Estado: "+formatStatus(stay.estado))

 const table = {
  headers: ["Id", "Cliente", "Habitacion", "Estado", "MontoDia", "Entrada", "Salida", "Total"],
  rows: stay0rderDetail(setArray(list)),
};

doc.fontSize(20).moveDown().table(table, { 
  width: 500,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(10);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
    0,
     doc.page.height - (oldBottomMargin/2),
    { align: 'center' }
  );

doc.page.margins.bottom = oldBottomMargin; 
}
doc.end();


writeStream.on('finish', function() {
  console.log('PDF generado con éxito.');
});

writeStream.on('error', function(err) {
  console.error('Error al generar el PDF:', err);
});
}
module.exports = {
  clientReport,
  roomsReport,
  servicesReport,
  staysDetailedReport,
  staysSummarizedReport,
  detailservicesReport
}