import homeTemplate from "../frontend/views/home.js"
import clientListedTemplate from "../frontend/views/listed/ClientListed.js"
import roomsListedTemplate from "../frontend/views/listed/roomListed.js"
import servicesListedTemplate from "../frontend/views/listed/servicesListed.js"
import stayProcessTemplate from "../frontend/views/processes/stayTemplate.js"
import stayReportTemplate from "../frontend/views/reports/stayReportTemplate.js"
import dbTemplate from "../frontend/views/system/databaseTemplate.js"
import settingTemplate from "../frontend/views/system/settingTemplate.js"
import clientTableTemplate from "../frontend/views/tables/clientTemplate.js"
import roomTemplate from "../frontend/views/tables/roomTemplate.js"
import servicesTemplate from "../frontend/views/tables/servicesTemplate.js"
import { hash, itensList } from "../utils/config.js"
import { itemSelect } from "../utils/functionsGlobal.js"

let appContent = document.getElementById("root")

let selectRoute;

// diccionario de rutas 
const routes = [
    {
        route:hash.home,
        li: itensList.home,
        template: homeTemplate()
    },
    {
        route:hash.stayProcess,
        li: itensList.processes,
        template: stayProcessTemplate()
    },
    {
        route:hash.clientsTable,
        li: itensList.tables,
        template: clientTableTemplate()
    },
    {
        route:hash.servicesTable,
        li: itensList.tables,
         template: servicesTemplate()
    },
    {
        route:hash.roomTable,
        li: itensList.tables,
        template: roomTemplate()
    },
    {
        route:hash.setting,
        li: itensList.sistem,
        template: settingTemplate()
    },
    {
        route:hash.dataInit,
        li: itensList.sistem,
        template: dbTemplate()
    },
    {
        route:hash.clientsList,
        li: itensList.listed,
        template: clientListedTemplate()
    },
    {
        route:hash.roomsList,
        li: itensList.listed,
        template: roomsListedTemplate()
    },
    {
        route:hash.servicesList,
        li: itensList.listed,
        template: servicesListedTemplate()
    },
    {
        route:hash.stayReport,
        li: itensList.reports,
        template: stayReportTemplate()
    },
]

function router(hash){
    appContent.innerHTML = ""
    const findtemplate = routes.filter((routeObj) => routeObj.route == hash)
    selectRoute = findtemplate[0].li
    appContent.appendChild(findtemplate[0].template)
    itemSelect(selectRoute)
}

export default router