import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageUrls } from "../../enums/PageUrls";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { changeAuthenticationState } from "../../store/authentication/authenticationSlice";
import { axiosWebApp } from "../Axios";
import { ApiUrls } from "../../enums/ApiUrls";
import { ITokenResponse } from "../token/ITokenResponse";

interface IUseAuth {
  redirectTo: PageUrls;
  isLoginPage: boolean;
}

const useAuth = ({ redirectTo, isLoginPage }: IUseAuth) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const token = useAppSelector((state) => state.authentication.token);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        setIsAuth(true);
        return;
      }

      try {
        const getTokenResponse = await axiosWebApp.get(
          `${ApiUrls.AUTHENTICATE}/get`
        );

        if (getTokenResponse.data !== null) {
          const { token, id } = getTokenResponse.data as ITokenResponse;

          dispatch(changeAuthenticationState({ token: token, id: id }));
          setIsAuth(true);

          if (isLoginPage) navigate(redirectTo);
        }
      } catch (err) {
        if (!isLoginPage) {
          setIsAuth(false);
          navigate(redirectTo);
        } else {
          setIsAuth(true);
        }
      }
    })();
  }, []);

  return [isAuth] as const;
};

export default useAuth;
