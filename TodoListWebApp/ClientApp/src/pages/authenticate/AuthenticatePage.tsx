import React from "react";
import useAuth from "../../api/hooks/useAuth";
import { PageUrls } from "../../enums/PageUrls";

interface IAuthenticatePageProps {
  pageComponent: JSX.Element;
}

const AuthenticatePage = ({ pageComponent }: IAuthenticatePageProps) => {
  const [isAuth] = useAuth({ redirectTo: PageUrls.LOGIN, isLoginPage: false });
  return <>{isAuth && pageComponent}</>;
};

export default AuthenticatePage;
