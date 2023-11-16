import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "../App";
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "ALL",
      payload: { id: "", name: "", password: "", email: "", address: "" },
    });
    persistor.purge();
    window.location.href = "/login";
  }, []);
};
export default Logout;
