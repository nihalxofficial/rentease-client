import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session ? session?.user : {}
};
