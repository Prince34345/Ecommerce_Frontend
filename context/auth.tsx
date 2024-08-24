import React, { useContext, useEffect } from "react";
import { appwrite } from "../lib/appwrite-service";
import { Models } from "appwrite";

interface SignInResponse {
  data: Models.User<Models.Preferences> | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface DeleteAccount {
  data: {} | undefined;
  error: Error | undefined | any
}

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<SignInResponse>;
  signUp: (e: string, p: string, n: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  authUser: Models.User<Models.Preferences> | null;
  authInitialized: boolean;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider(props: ProviderProps) {

  const [authUser, setAuth] =
    React.useState<Models.User<Models.Preferences> | null>(null);
  const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);
  
  useEffect(() => {
    (async () => {
      try {
        const user = await appwrite.account.get();
        const authUser = user
        setAuth(authUser);
        setAuthInitialized(true);
      } catch (error) {
        setAuth(null);
      }
    })();
  }, []);

  const logout = async (): Promise<SignOutResponse> => {
    try {
      const response = await appwrite.account.deleteSession("current");
      return { error: undefined, data: response };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    try {
      const response = await appwrite.account.createEmailPasswordSession(
        email,
        password
      );

      const user = await appwrite.account.get();
      setAuth(user);
      return { data: user, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  const createAcount = async (
    email: string,
    password: string,
    username: string
  ): Promise<SignInResponse> => {
    try {
      await appwrite.account.create(
        appwrite.ID.unique(),
        email,
        password,
        username
      );

      await appwrite.account.createEmailPasswordSession(email, password);

      const user = await appwrite.account.get();
      setAuth(user);
      return { data: user, error: undefined };
    } catch (error) {
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: createAcount,
        authUser,
        authInitialized,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};