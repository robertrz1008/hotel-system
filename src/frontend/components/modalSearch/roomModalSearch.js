import {
  appendChildList,
  closeConfirmModal,
  replaceClass,
  setButton,
  setDiv,
  setInputForm,
  setTitleOrP,
} from "../../../utils/functionsGlobal.js";
import { getProcessRequest } from "../../api/processRequest.js";
import { getRoomsByFilterRequest } from "../../api/roomRequest.js";
import roomList from "../list/roomModalSearchList.js";

function roomModalSearch({ roomNameSelect }) {
  const div = setDiv("modal-search-con");
  const title = setTitleOrP("h4", "Seleccionar habitaciones");
  const tfSearch = setInputForm("", "text", "buscar...");
  const listCon = setDiv("list-con");
  const nameDiv = setDiv("name-con");
  const nameP = setTitleOrP("p", `Seleccionado: `);
  const button = setButton("Agregar", "modal-search-btn-disable");
  let roomFound;
  let roomName = "";
  let roomId;
  let monto = 0;
  div.innerHTML = "";
  button.disabled = true;

  function buttonEnabled(roomFound) {
    button.disabled = false;
    replaceClass(button, "modal-search-btn-disable", "modal-search-btn");
    roomName = roomFound.name;
    nameP.textContent = "Seleccionado: " + roomFound.name; 
    roomId = roomFound.id;
    monto = roomFound.montoDia;
  }

  const renderList = async (filter) => {
    let roomsOcuppedId = []
    let roomsReservedId = []
    roomFound = await getRoomsByFilterRequest(filter);

    const stays = await getProcessRequest();
    let staysOcupped = stays.filter((data) => data.estado == 0);
    let staysReserved = stays.filter((data) => data.estado == 1);

    for (const stay of staysOcupped) {
      roomsOcuppedId.push(stay.habitacion_id);
    }
    for (const stay of staysReserved) {
      roomsReservedId.push(stay.habitacion_id);
    }
    //para excuir habitaciones que estan reservados u ocupados
    roomFound = roomFound.filter(data => roomsOcuppedId.includes(data.id) == false)
    roomFound = roomFound.filter(data => roomsReservedId.includes(data.id) == false)


    roomList({
      listCon,
      roomFound,
      buttonEnabled,
    });
  };
  function handleSearch(value) {
    listCon.innerHTML = "";
    if (value.trim() == "") {
      return;
    }
    renderList(value);
  }

  // events
  tfSearch.addEventListener("keyup", (e) => {
    const searchValue = tfSearch.lastElementChild.firstElementChild.value;
    handleSearch(searchValue);
  });
  //
  button.addEventListener("click", () => {
    closeConfirmModal();
    roomNameSelect({
      id: roomId,
      name: roomName,
      montoDia: monto,
    });
  });

  //dom
  nameDiv.appendChild(nameP);
  appendChildList(div, [title, tfSearch, listCon, nameDiv, button]);
  return div;
}

export default roomModalSearch;
