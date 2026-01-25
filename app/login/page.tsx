import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
