import React from "react";
import useAuth from "../../api/hooks/useAuth";
import { PageUrls } from "../../enums/PageUrls";

interface IAuthenticatePageProps {
  pageComponent: JSX.Element;
}

const NoAuthenticatePage = ({ pageComponent }: IAuthenticatePageProps) => {
  const [isAuth] = useAuth({ redirectTo: PageUrls.TASKS, isLoginPage: true });
  return <>{isAuth && pageComponent}</>;
};

export default NoAuthenticatePage;
