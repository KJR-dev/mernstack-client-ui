"use client";
import * as jose from "jose";
import { ReactNode, useCallback, useEffect, useRef } from "react";

const Refresher = ({ children }: { children: ReactNode }) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const getAccessToken = async () => {
    try {
      const res = await fetch("/api/v1/web/auth/accessToken");
      if (!res.ok) {
        return;
      }
      const accessToken = await res.json();
      return accessToken.token;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/web/auth/refresh", {
        method: "POST",
      });
      if (!res.ok) {
        console.error("Failed to refresh token");
        return;
      }
      console.log("✅ Access token refreshed successfully");
      startRefresh();
    } catch (error) {
      console.error("Error while refreshing the token:", error);
    }
  }, []);

  const startRefresh = useCallback(async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        console.warn("No access token available");
        return;
      }

      const token = jose.decodeJwt(accessToken);

      if (!token.exp) {
        console.error("Token has no expiration");
        return;
      }

      const exp = token.exp * 1000;
      const currentTime = Date.now();
      const refreshTime = exp - currentTime - 5000;

      if (refreshTime <= 0) {
        console.log("Token already expired or about to expire, refreshing immediately");
        refreshAccessToken();
        return;
      }

    //   console.log(`Current time: ${new Date(currentTime).toISOString()}`);
    //   console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
    //   console.log(
    //     `Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`
    //   );

      timeoutId.current = setTimeout(() => {
        console.log("Access token is refreshing....");
        refreshAccessToken();
      }, refreshTime);
    } catch (error) {
      console.error("Error scheduling token refresh:", error);
    }
  }, [refreshAccessToken]);

  useEffect(() => {
    startRefresh();
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [timeoutId, startRefresh]);

  return <div>{children}</div>;
};

export default Refresher;
