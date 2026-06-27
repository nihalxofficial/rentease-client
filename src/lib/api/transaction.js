import { serverFetch } from "../core/server"

export const getTransactions = async()=>{
    return serverFetch(`/transactions`)
}
export const getTransactionsByTenant = async(id)=>{
    return serverFetch(`/transactions?userId=${id}`)
}

export const getTransactionsByOwner = async(id)=>{
    return serverFetch(`/transactions?ownerId=${id}`)
}