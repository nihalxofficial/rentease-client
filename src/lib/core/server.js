import { getToken } from "./session";

const Api = process.env.NEXT_PUBLIC_API_URL

export const serverFetch = async (path, requireAuth = false) => {
    const headers = {};
    
    if (requireAuth) {
        const token = await getToken();
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${Api}${path}`, {
        cache: 'no-store',
        headers
    });
    const data = await res.json();
    return data;
};

export const serverMutation = async(path, data, method="POST")=>{
    const token = await getToken()
    const res = await fetch(`${Api}${path}`,{
        method: method,
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;
}