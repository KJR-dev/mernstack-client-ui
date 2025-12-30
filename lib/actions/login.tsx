"use server";
import cookie from "cookie";
import { cookies } from "next/headers";

export default async function login(prevState: any, formdata: FormData) {
  const email = formdata.get("email")?.toString();
  const password = formdata.get("password")?.toString();

  if (!email || !password) {
    return {
      type: "error",
      message: "Email and password are required",
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_AUTH_URL}api/v1/web/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        type: "error",
        message: error.errors?.[0]?.msg ?? "Login failed",
      };
    }

    const c = response.headers.getSetCookie();
    const accessTokenCookie = c.find((cookie) => cookie.includes("accessToken"));
    const refreshTokenCookie = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessTokenCookie || !refreshTokenCookie) {
      return {
        type: "error",
        message: "Auth cookies missing from backend",
      };
    }

    const parsedAccess = cookie.parse(accessTokenCookie);
    const parsedRefresh = cookie.parse(refreshTokenCookie);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "accessToken",
      value: parsedAccess.accessToken as string,
      expires: new Date(String(parsedAccess.expires)),
      httpOnly: (parsedAccess.httpOnly as unknown as boolean) || true,
      secure: true,
      path: parsedAccess.Path,
      domain: parsedAccess.Domain,
      sameSite: parsedAccess.SameSite as "strict",
    });

    cookieStore.set({
      name: "refreshToken",
      value: parsedRefresh.refreshToken as string,
      expires: new Date(parsedRefresh.expires as string),
      httpOnly: (parsedRefresh.httpOnly as unknown as boolean) || true,
      secure: true,
      path: parsedRefresh.Path,
      domain: parsedRefresh.Domain,
      sameSite: parsedRefresh.SameSite as "strict",
    });

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (err: any) {
    return {
      type: "error",
      message: err.message,
    };
  }
}
