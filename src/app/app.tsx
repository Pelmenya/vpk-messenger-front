import { AuthProvider } from "./auth-provider";
import { AuthRouter } from "./auth-router";

export const App = () => (
  <AuthProvider>
    {(isAuthLoading: boolean) => <AuthRouter isAuthLoading={isAuthLoading} />}
  </AuthProvider>
);
