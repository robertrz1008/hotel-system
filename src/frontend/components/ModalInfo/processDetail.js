import {
  appendChildList,
  closeConfirmModal,
  setDetailText,
  setDiv,
  setTitleOrP,
} from "../../../utils/functionsGlobal.js";
import formatDate, { calcularfechaHora } from "../../../utils/getDate.js";
import { getDetailsByStayRequest } from "../../api/processRequest.js";
import detailServiceInfoTable from "../tables/ServiceDetailInfoTable.js";

function formatStatus(number) {
  let stat = [
    { value: "0", name: "Ocupado" },
    { value: "1", name: "Reservado" },
    { value: "2", name: "Anulado" },
    { value: "3", name: "Finalizado" },
  ];
  let newS = stat.filter((data) => data.value == number);

  return newS[0].name;
}

function processDetailModal(stay) {
  const div = setDiv("process-detail-con");

  const section1 = setDiv("process-detail-section1");
  const section2 = setDiv("process-detail-section2");
  const tableDiv = setDiv("process-detail-services-table-con");

  const entradaDate = formatDate(stay.entrada);
  const salidaDate = formatDate(stay.salida);
  const tiempo = calcularfechaHora(
    `${entradaDate.fecha} ${entradaDate.hora}`,
    `${salidaDate.fecha} ${salidaDate.hora}`
  );

  const title = setTitleOrP("h4", "Detalles de la estadia");
  const clientT = stay.nombre + " " + stay.apellido;
  const clientName = setDetailText("Cliente", clientT);
  const estado = setDetailText("Estado", formatStatus(stay.estado));
  const habitaicion = setDetailText("Habitacion", stay.descripcion);
  const montoDia = setDetailText("Monto por día", stay.montoDia);
  const entrada = setDetailText("Fecha de Entrada", entradaDate.fecha);
  const salida = setDetailText("Fecha de Salida", salidaDate.fecha);
  const observacion = setDetailText("Observacion", stay.est_observacion);
  const tiempoS = setDetailText("Tiempo de estadia", tiempo);
  const total = setDetailText("Total", stay.total);
  const servicio = setTitleOrP("h4", "Consumiciones");
  const exitModal = setDiv("exit-modal-con");
  exitModal.textContent = "X";

  let servicesFound = [];
  div.innerHTML = "";

  async function rederDetailList(id) {
    servicesFound = await getDetailsByStayRequest(id);

    detailServiceInfoTable(tableDiv, servicesFound);
  }
  rederDetailList(stay.id);

  exitModal.addEventListener("click", () => {
    closeConfirmModal();
  });

  appendChildList(section1, [
    title,
    clientName,
    habitaicion,
    montoDia,
    estado,
    entrada,
    salida,
    tiempoS,
    observacion,
    total,
  ]);
  appendChildList(section2, [servicio, tableDiv]);
  appendChildList(div, [section1, section2, exitModal]);

  return div;
}

export default processDetailModal;
