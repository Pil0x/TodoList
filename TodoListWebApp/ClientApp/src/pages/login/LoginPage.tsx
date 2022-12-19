import { Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWebAPi, axiosWebApp } from "../../api/Axios";
import { ITokenResponse } from "../../api/token/ITokenResponse";
import { ApiUrls } from "../../enums/ApiUrls";
import { PageUrls } from "../../enums/PageUrls";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { changeAuthenticationState } from "../../store/authentication/authenticationSlice";

interface ILoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoginError, setIsLoginError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const spinnerContainerAniamtion = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const hanldeOnSubmit = async (value: ILoginData) => {
    try {
      setIsLoading(true);
      const response = await axiosWebAPi.post(ApiUrls.AUTH + "/login", value, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });

      const currentAuthentication = response;
      if (!response) {
        setIsLoginError(true);
        setIsLoading(false);
        return;
      }

      const {
        token,
        user: { id },
      } = currentAuthentication.data;

      const authenticationData: ITokenResponse = { token: token, id: id };

      setIsLoginError(false);
      saveTokenToCookie(authenticationData);
    } catch (err) {
      setIsLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const saveTokenToCookie = async (authenticationData: ITokenResponse) => {
    try {
      const saveTokenResponse = await axiosWebApp.post(
        `${ApiUrls.AUTHENTICATE}/set`,
        authenticationData
      );

      if (!saveTokenResponse) return;
      dispatch(
        changeAuthenticationState({
          token: authenticationData.token,
          id: authenticationData.id,
        })
      );

      navigate(PageUrls.TASKS);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-panel">
        <div className="login-panel-header">
          <div className="login-panel-header-logos"></div>
          <div className="login-panel-header-app-name">
            <h3>LOGOWANIE </h3>
          </div>
        </div>

        <>
          <div className="login-panel-body">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={hanldeOnSubmit}
            >
              {({ errors, touched, setValues, values }) => (
                <Form>
                  <label>Email &nbsp;</label>
                  <Field
                    name="email"
                    onChange={(e: FormEvent<HTMLInputElement>) => {
                      setValues({
                        ...values,
                        email: e.currentTarget.value.trim(),
                      });
                    }}
                    className="form-control"
                    placeholder="Wpisz email"
                  />
                  {errors.email && touched.email && (
                    <div className="fieldValidation">{errors.email}</div>
                  )}
                  <label>Hasło &nbsp;</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Wpisz hasło"
                  />
                  {errors.password && touched.password && (
                    <div className="fieldValidation">{errors.password}</div>
                  )}
                  {isLoginError && (
                    <div className="fieldValidation">
                      Nieprawidłowe dane logowania
                    </div>
                  )}
                  <div className="login-panel-footer">
                    <button type="submit" className="login-button-blue">
                      Zaloguj
                    </button>
                  </div>
                  <div className="login-panel-footer"></div>
                </Form>
              )}
            </Formik>
          </div>
          {isLoading && (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                variants={spinnerContainerAniamtion}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{ position: "absolute" }}
                className="spinner-container-login"
                transition={{ duration: 0.4 }}
              ></motion.div>
            </AnimatePresence>
          )}
        </>
      </div>
      <div className="login-container-footer"></div>
    </div>
  );
};

export default LoginPage;
