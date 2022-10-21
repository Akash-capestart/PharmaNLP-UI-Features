import React from "react";
import { LogoSection } from "../components/LogoSection";
import { ImageCenteredText } from "../components/ImageCenteredText";
import { CopyRightSection } from "../components/CopyRightSection";
import { LoginFieldSection } from "../components/LoginFieldSection";

export function Login() {
  return (
    <div className="w-100 h-100vh d-flex align-items-center white-background position-relative">
      <>
        <div className="w-75 m-auto position-relative">
          <LogoSection />
          <div className="row no-margin align-items-center login-box white-background">
            <div className="col-md-8 no-padding position-relative overlay-before">
              <ImageCenteredText />
            </div>
            <div className="col-md-4 login-field-box">
              <LoginFieldSection />
            </div>
          </div>
        </div>
        <CopyRightSection />
      </>
    </div>
  );
}
