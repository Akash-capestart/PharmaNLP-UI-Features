import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../commonComponents/Loader";
import { CopyRightSection } from "../../login/components/CopyRightSection";
import { ImageCenteredText } from "../../login/components/ImageCenteredText";
import { LogoSection } from "../../login/components/LogoSection";
import { FetchPost } from "../../../dataFetchingHelpers/fetchActions";
import ResetPasswordFieldSection from "../component/ResetPasswordFieldSection";

export default function ResetPassword() {
  
  const [hasAccess, sethasAccess] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { secret_key } = useParams();

  useEffect(() => {
    const dataFetchHandler = async () => {
      const { status } = await FetchPost("/login", {
        phone_no: secret_key,
        password: "Qwerty",
      })
      if (status === "success") sethasAccess(true);
      else {
        alert("Try to do wrong access!!!");
        navigate("/login");
      }
    };
    dataFetchHandler();
  }, [navigate, secret_key]);

  return (
    <div className="w-100 h-100vh d-flex align-items-center white-background position-relative">
      {hasAccess ? (
        <>
          <div className="w-75 m-auto position-relative">
            <LogoSection />
            <div className="row no-margin align-items-center login-box white-background">
              <div className="col-md-8 no-padding position-relative overlay-before">
                <ImageCenteredText />
              </div>
              <div className="col-md-4 login-field-box">
                <ResetPasswordFieldSection />                
              </div>
            </div>
          </div>
          <CopyRightSection />
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center w-100">
          <Loader
            size={60}
            activeColor={"#2BB24C"}
            inActiveColor={"#FFFFFF"}
            loaderBarWidth={"5px"}
          />
        </div>
      )}
    </div>
  );
}
