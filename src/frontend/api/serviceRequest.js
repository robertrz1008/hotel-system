
export const getServicesRequest = () => window.ipcApi.getServices()

export const getServicesByFilterRequest = (filter) => window.ipcApi.getServicesbyFilter(filter)

export const createServiceRequest = (service) => window.ipcApi.createService(service)

export const deleteServiceRequest = (id) => window.ipcApi.deleteService(id)

export const updateServiceRequest = (service) => window.ipcApi.updateService(service)

export const getServicesListedRequest = (filter) => window.ipcApi.servicesListed(filter)