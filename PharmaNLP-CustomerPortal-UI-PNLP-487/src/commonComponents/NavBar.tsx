import React from "react";
import { FontSlider } from "./FontSlider";
import { useAppSelector } from "../redux/Hooks";
import { LogOutSection } from "./LogOutSection";
import { NavLink } from "react-router-dom";
import {UserProfile} from "./UserProfile"
import { useLocation } from "react-router-dom";


export function NavBar() {

  const {highFont,lowFont} = useAppSelector((state) => state.globalFontResizer);
  const location=useLocation()
  return (
    <>
    {
      location.pathname !="/user"?
            <div className="row no-margin h-50px light-green-background">
            <div className="col-md-7 no-padding nav-box d-flex">
              <NavLink
                className="d-flex align-items-center justify-content-center font-change-animation w-50 text-decoration-none"
                style={{ fontSize: highFont }}
                to={"/"}
              >
                RELEVANT
              </NavLink>
              <NavLink
                className="d-flex align-items-center justify-content-center font-change-animation w-50 text-decoration-none"
                style={{ fontSize: highFont }}
                to={"/irrelevant"}
              >
                IRRELEVANT
              </NavLink>          
            </div>
            <div className="col-md-5 no-padding">
              <div className="d-flex align-items-center justify-content-around h-50px">
                <FontSlider />
                <div className="d-flex position-relative cursor-pointer">
                  <img
                    src="/images/bell-image.png"
                    className="w-20 has-gray-scale"
                    alt="Notification..."
                  />
                  <img
                    src="/images/msg-notify-image.png"
                    className="position-absolute w-10 has-gray-scale"
                    style={{ right: -3 }}
                    alt="!."
                  />
                </div>
                <span
                  className="text-center has-font-weight pad-5 font-change-animation"
                  style={{ fontSize: lowFont }}
                >
                  Karthika Balasubramoniam
                </span>
    
                <LogOutSection />
              </div>
            </div>
          </div>:""

    }

    </>
  );
}
