import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PageUrls } from "../../enums/PageUrls";
import NavbarLinks from "./components/navbarLinks";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/useStore";

interface IProfileData {
  firstName: string;
  lastName: string;
  email: string;
}

const NavbarHeader = () => {
  const { pathname } = useLocation();
  const { token, id } = useAppSelector((state) => state.authentication);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleOnClickBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const canShowNavbar = () => {
    return (
      pathname === PageUrls.LOGIN ||
      token === null /* || pathname === PageUrls.PRIVACY_POLICY*/
    );
  };

  if (canShowNavbar()) {
    return <></>;
  }
  return (
    <nav className="navbar-header">
      <section className="app-container">
        <section className="header-container">
          <section className="nav-left-container">
            <Link to={PageUrls.TASKS} className="nav-title">
              <img
                style={{ height: "57px", width: "101px" }}
                src="https://www.svgrepo.com/show/327388/logo-react.svg"
              ></img>
            </Link>

            <NavbarLinks pathname={pathname} itemClass="nav-item" />
          </section>

          <motion.div
            className="nav-mobile-collapse"
            initial={{ x: "+100%", opacity: 0 }}
            animate={
              isMenuOpen
                ? {
                    x: 0,
                    opacity: 1,
                  }
                : {
                    x: "+100%",
                    opacity: 0,
                  }
            }
            transition={{ type: "tween", duration: 0.5 }}
          >
            <NavbarLinks pathname={pathname} itemClass="nav-mobile-item" />
          </motion.div>

          <section className="nav-right-container">
            <section className="nav-burger m-t-1" onClick={handleOnClickBurger}>
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0 }}
                className="line"
              />
              <motion.div
                animate={isMenuOpen ? { rotate: -45 } : { rotate: 0 }}
                className="line"
              />
              <motion.div
                animate={isMenuOpen ? { rotate: 45, y: -8 } : { rotate: 0 }}
                className="line"
              />
            </section>
          </section>
        </section>
      </section>
    </nav>
  );
};

export default NavbarHeader;
