export const createStayRequest = (stay, a) => window.ipcApi.createStay(stay, a)

export const updateStayRequest = (stay) => window.ipcApi.updateStay(stay)

export const stayFinalizedRequest = (stay) => window.ipcApi.setStayFinalized(stay)

export const createDetailRequest = (detail) => window.ipcApi.createDetail(detail)

export const getDetailsByStayRequest = (stayId) => window.ipcApi.getDetailsByStay(stayId)

export const deleteDetailRequest = (id) => window.ipcApi.deleteDetail(id)

export const updateDetailRequest = (stay) => window.ipcApi.updateAmountDetail(stay)

export const getProcessRequest = () => window.ipcApi.getProcess()

export const getProcessByStatusRequest = (status) => window.ipcApi.getProcessByStatus(status)

export const getProcessByFilterRequest = (filter) => window.ipcApi.getProcessByFilter(filter)

export const getStaysListedRequest = (filter) => window.ipcApi.staysListed(filter)

export const getStaysDetailedListedRequest = (filter) => window.ipcApi.staysDetailedListed(filter)

export const updateDateStayReservedRequest = (stay) => window.ipcApi.updateDateStayReserved(stay)

