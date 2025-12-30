import { cookies } from "next/headers";
import cookie from "cookie";

export async function POST() {
  const response = await fetch(`${process.env.BACKEND_AUTH_URL}api/v1/web/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      Cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
    },
  });
  if (!response.ok) {
    return Response.json({ success: false });
  }

  const c = response.headers.getSetCookie();
  const accessTokenCookie = c.find((cookie) => cookie.includes("accessToken"));
  const refreshTokenCookie = c.find((cookie) => cookie.includes("refreshToken"));

  if (!accessTokenCookie || !refreshTokenCookie) {
    return Response.json({ success: false });
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
    
    return Response.json({ success: true });
}
