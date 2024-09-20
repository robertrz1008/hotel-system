export const clientReportRequest = (route, credential, clients) => window.ipcApi.clientReport(route, credential, clients)

export const roomsReportRequest = (route, credential, clients) => window.ipcApi.roomsReport(route, credential, clients)

export const servicesReportRequest = (route, credential, clients) => window.ipcApi.servicesReport(route, credential, clients)

export const staysDetailedReportRequest = (route, credential, stays) => window.ipcApi.staysDetailedReport(route, credential, stays)

export const staysSummarizedReportRequest = (route, credential, stays) => window.ipcApi.staysSummarizedReport(route, credential, stays)

export const detailservicesReportRequest = (route, credential, stay, detailServices) => window.ipcApi.detailservicesReport(route, credential, stay, detailServices)
