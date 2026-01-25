// lib/session.ts
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
      console.error('BACKEND_AUTH_URL not configured');
      return null;
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Build time pe token nahi hoga
    if (!accessToken) {
      return null;
    }

    const url = `${backendUrl}/api/v1/web/auth/self`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('Non-JSON response');
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return { user: data as User };
    
  } catch (error) {
    console.error('getSelf error:', error);
    return null;
  }
};