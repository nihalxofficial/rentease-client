import { serverMutation } from "../core/server"

export const addBooking = async(data)=>{
    return serverMutation(`/bookings`, data)
}