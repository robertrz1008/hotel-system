import { appendChildList, setIcon, setTd } from "../../../utils/functionsGlobal.js";
import formatDate from "../../../utils/getDate.js";
import { detailServiceReportBuild } from "../../views/reports/stayReportTemplate.js";

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

function stayDitailedReportList(parent, body, list) {
  body.innerHTML = "";

  list.map((data) => {

    const entradaDate = formatDate(data.entrada)
    const salidaDate = formatDate(data.salida)

    const trB = document.createElement("tr");
    const td0 = setTd(data.id);
    const td = setTd(data.nombre + " " + data.apellido);
    const td2 = setTd(data.cedula);
    const td4 = setTd(data.descripcion);
    const td5 = setTd(formatStatus(data.estado));
    const td6 = setTd(data.montoDia);
    const td7 = setTd(entradaDate.fecha);
    const td8 = setTd(salidaDate.fecha);
    const td9 = setTd(data.total); 
    const tdDet = document.createElement("td")
    const iconDel = setIcon(["fa-solid", "fa-file", "btn-upd", "table-icon"])

    trB.className = "trb";
    td0.className = "td0";

    tdDet.appendChild(iconDel)

    iconDel.addEventListener("click", () =>{
      detailServiceReportBuild(data)
    })

    appendChildList(trB, [td0, td, td2, td4, td5, td6, td7, td8, td9, tdDet, tdDet]);
    body.appendChild(trB);
  });

  parent.appendChild(body);
}

export default stayDitailedReportList;
