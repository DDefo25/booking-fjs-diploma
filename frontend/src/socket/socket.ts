import { io } from 'socket.io-client'
import { SERVER_URL } from '../config/config'

export const socket = io(SERVER_URL, {
    autoConnect: false
})