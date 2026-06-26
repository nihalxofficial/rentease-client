"use server"

import { redirect } from "next/navigation";
import { getToken } from "./session";

const Api = process.env.NEXT_PUBLIC_API_URL

const handleResponse = async (res) => {
    if (res.status === 401) redirect("/auth/login");
    if (res.status === 403) redirect("/unauthorized");
    const data = await res.json();
    return data;
};

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

    return handleResponse(res);
};

export const serverMutation = async (path, data="", method = "POST") => {
    const token = await getToken()
    try {
        const res = await fetch(`${Api}${path}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: data ? JSON.stringify(data) : undefined,
        })
        return handleResponse(res);
    } catch(err) {
        console.error("fetch failed:", err.message)
    }
}