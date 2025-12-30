import { cookies } from "next/headers";

interface Session {
  user: User;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "manager" | "user";
  tenantId: number | null;
}

export const getSession = async () => {
  return await getSelf();
};

const getSelf = async (): Promise<Session | null> => {
  const response = await fetch(`${process.env.BACKEND_AUTH_URL}api/v1/web/auth/self`, {
    headers: {
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return null;
  }
  return {
    user: (await response.json()) as User,
  };
};
