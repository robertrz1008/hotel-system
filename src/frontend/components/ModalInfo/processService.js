import { appendChildList, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js";
import { getDetailsByStayRequest } from "../../api/processRequest.js";
import detailServiceInfoTable from "../tables/ServiceDetailInfoTable.js";

function processServiceInfo( stayId){
    const div = setDiv("process-service-info-con")
    const title = setTitleOrP("h4", "Consumiciones realizados")
    const tablediv = setDiv("process-table-con")

    let servicesFound = []

    div.innerHTML = ""

    async function rederList(id){
        servicesFound = await getDetailsByStayRequest(id)

        detailServiceInfoTable(tablediv, servicesFound)
    }
    rederList(stayId)

    appendChildList(div, [
        title,
        tablediv
    ])

    return div
}

export default processServiceInfo 