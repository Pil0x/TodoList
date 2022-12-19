import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoAuthenticatePage from "./pages/authenticate/NoAuthenticatePage";
import NavbarHeader from "./components/navbar/NavbarHeader";
import { PageUrls } from "./enums/PageUrls";
import LoginPage from "./pages/login/LoginPage";
import AuthenticatePage from "./pages/authenticate/AuthenticatePage";
import TaskPage from "./pages/tasks/TaskPage";

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  return (
    <BrowserRouter>
      <header>
        <NavbarHeader />
      </header>

      <main>
        <Routes>
          <Route
            path={PageUrls.LOGIN}
            element={<NoAuthenticatePage pageComponent={<LoginPage />} />}
          />
          <Route
            path={PageUrls.TASKS}
            element={<AuthenticatePage pageComponent={<TaskPage />} />}
          />
        </Routes>
      </main>

      <footer></footer>
    </BrowserRouter>
  );
};

export default App;
