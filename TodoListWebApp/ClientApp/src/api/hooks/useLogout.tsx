import { useNavigate } from "react-router-dom";
import { PageUrls } from "../../enums/PageUrls";
import { axiosWebApp } from "../Axios";
import { ApiUrls } from "../../enums/ApiUrls";

const useLogout = () => {
  const navigate = useNavigate();

  const logoutAsync = async () => {
    try {
      const deleteTokenResponse = await axiosWebApp.delete(
        `${ApiUrls.AUTHENTICATE}/delete`
      );
      if (deleteTokenResponse.data != null) navigate(PageUrls.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return [logoutAsync] as const;
};

export default useLogout;
