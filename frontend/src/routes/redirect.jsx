import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useEffect } from "react";

export function Redirect() {
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      await authService.currentUser().then((response) => {
        navigate("/dashboard");
      });
    } catch (error) {
      navigate("/signup");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return <></>;
}
