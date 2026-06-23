import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};


export const getToken = async()=>{
  const token = await auth.api.getToken({
    headers: await headers(),
  });
  return token ? token.token : {}
}


export const getRequiredRole = async(role)=> {
  const user = await getUserSession();
  if(!user){
    redirect("/auth/login");
  }
  const currentRole = user?.role;
  if(currentRole!==role){
    redirect("/unauthorized");
  }
}