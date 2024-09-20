
export const getRoomsRequest = () => window.ipcApi.getRooms()

export const getRoomsByFilterRequest = (filter) => window.ipcApi.getRoomsByFilter(filter)

export const createRoomRequest = (room) => window.ipcApi.createRoom(room)

export const deleteRoomRequest = (id) => window.ipcApi.deleteRoom(id)

export const updateRoomRequest = (room) => window.ipcApi.updateRoom(room)

export const getRoomsListedRequest = (filter) => window.ipcApi.roomsListed(filter)