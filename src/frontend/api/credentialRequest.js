export const createCredentialRequest = (crendential) => window.ipcApi.createCredential(crendential)

export const getCredentialRequest = () => window.ipcApi.getCredential()

export const updateCredentialRequest = (crendential) => window.ipcApi.updateCredential(crendential)

export const clearDbRequest = () => window.ipcApi.clearDB()
