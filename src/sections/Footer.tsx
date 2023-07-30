import { signOut } from "firebase/auth";
import React from "react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setToast, setUserStatus } from "../app/slices/AppSlice";
import { resetListUser } from "../app/slices/PokemonSlice";
const Footer = () => {
  const dispatch = useAppDispatch();
  const { userInfor } = useAppSelector(({ app }) => app);
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setToast("Loged out successfully"));
    dispatch(setUserStatus(undefined));
    dispatch(resetListUser());
  };
  return (
    <footer>
      <div className="block"></div>
      <div className="data"></div>
      <div className="block svg">
        <MdOutlinePowerSettingsNew
          onClick={() => {
            userInfor ? handleLogout() : dispatch(setToast("You must login !"));
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
