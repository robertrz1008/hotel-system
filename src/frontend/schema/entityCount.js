import { getClientsRequest } from "../api/clientRequest.js";

export async function clientsLength(){
    let clientes = 0
    clientes = await getClientsRequest()
    console.log(clientes.length)
    return clientes.length
}