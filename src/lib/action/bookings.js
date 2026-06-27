import { serverMutation } from "../core/server"

export const addBooking = async(data)=>{
    return serverMutation(`/bookings`, data)
}

export const approveBooking = async(id, data)=>{
    return
    // return serverMutation(`/bookings/${id}`, data)
}

export const rejectBooking = async(id, data)=>{
    return
    // return serverMutation(`/bookings/${id}`, data)
}

