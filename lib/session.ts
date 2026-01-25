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
  try {
    const backendUrl = process.env.BACKEND_AUTH_URL;

    if (!backendUrl) {
      console.error("BACKEND_AUTH_URL not configured");
      return null;
    }

    const url = `${backendUrl}/api/v1/web/auth/self`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
      cache: "no-store", // SSR ke liye important
    });

    // HTML response check
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error("Non-JSON response:", await response.text());
      return null;
    }

    if (!response.ok) {
      console.error("Auth failed:", response.status);
      return null;
    }

    const data = await response.json();
    return { user: data as User };
  } catch (error) {
    console.error("getSelf error:", error);
    return null;
  }
};
