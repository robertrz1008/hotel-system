import { hash, selectRoute } from "../../utils/config.js";
import {
  appendChildList,
  navigation,
  setBoxLink,
  setDiv,
  setTitleOrP,
} from "../../utils/functionsGlobal.js";
import router from "../../router/router.js";
import { getClientsRequest } from "../api/clientRequest.js";
import { getServicesRequest } from "../api/serviceRequest.js";
import { getRoomsRequest } from "../api/roomRequest.js";
import { getProcessRequest } from "../api/processRequest.js";

const div = setDiv("home-table-con");
const titleDiv = setDiv("title-con");
const title = setTitleOrP("h3", "Inicio del Sistema");
const name = setTitleOrP("P", "© 2024 | RoomSys 2.0 - Programador: Roberto Ramirez");
name.className = "copy-text";

const linksDiv = setDiv("links-con");
const roadersLink = setBoxLink(
  "roader-link box-link",
  ["fa-solid", "fa-user", "icon-link-box"],
  "Clientes",
  0
);
const booksLink = setBoxLink(
  "books-link box-link",
  ["fa-solid", "fa-key", "icon-link-box"],
  "Habitaciones",
  0
);
const servicesLink = setBoxLink(
  "loan-link box-link",
  ["fa-solid", "fa-bell-concierge", "icon-link-box"],
  "Consumiciones",
  0
);
const areaLink = setBoxLink(
  "area-link box-link",
  ["fa-solid", "fa-bed", "icon-link-box"],
  "Estadias",
  0
);

const appName = setTitleOrP("h2", "RoomsSys 1.3.0");
const devName = setTitleOrP("h3", "Programador: Roberto Ramirez");
const appTextDiv = setDiv("app-text-con");

export async function tablesCountFromHome() {

   let clientC = await getClientsRequest();
   let serviceC = await getServicesRequest();
   let roomC = await getRoomsRequest();
   let stayC = await getProcessRequest();
 
   roadersLink.firstElementChild.firstElementChild.textContent = clientC.length;
   servicesLink.firstElementChild.firstElementChild.textContent =serviceC.length;
   booksLink.firstElementChild.firstElementChild.textContent = roomC.length;
   areaLink.firstElementChild.firstElementChild.textContent = stayC.length;
 
}

export default function homeTemplate() {
  function events() {
    const navigate = (route) => {
      navigation(route);
      router(window.location.hash);
    };

    booksLink.addEventListener("click", () => {
      navigate(hash.roomTable);
    });
    roadersLink.addEventListener("click", () => {
      navigate(hash.clientsTable);
    });
    servicesLink.addEventListener("click", () => {
      navigate(hash.servicesTable);
    });
    areaLink.addEventListener("click", () => {
      navigate(hash.stayProcess);
    });
  }

  events();
  tablesCountFromHome();

  appendChildList(appTextDiv, [appName, devName]);

  titleDiv.appendChild(title);
  appendChildList(linksDiv, [roadersLink, booksLink, servicesLink, areaLink]);
  appendChildList(div, [titleDiv, linksDiv, name]);

  return div;
}
