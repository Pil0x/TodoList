import React from "react";
import { Link } from "react-router-dom";
import { ApiUrls } from "../../../enums/ApiUrls";
import { PageUrls } from "../../../enums/PageUrls";
import { useAppSelector } from "../../../hooks/useStore";

interface INavbarLinksProps {
  pathname: string;
  itemClass: string;
}

const NavbarLinks = ({ pathname, itemClass }: INavbarLinksProps) => {
  return (
    <>
      <Link
        className={
          pathname === PageUrls.TASKS ? `${itemClass}-active` : itemClass
        }
        to={PageUrls.TASKS}
      >
        Lista zadań
      </Link>
    </>
  );
};

export default NavbarLinks;
