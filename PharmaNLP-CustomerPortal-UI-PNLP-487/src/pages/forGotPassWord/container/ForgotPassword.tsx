import React from "react";
import { CopyRightSection } from "../../login/components/CopyRightSection";
import { ImageCenteredText } from "../../login/components/ImageCenteredText";
import { LogoSection } from "../../login/components/LogoSection";
import { ForgotPassWordFieldSection } from "../components/ForgotPassWordFieldSection";

export function ForgotPassword() {
  return (
    <div className="w-100 h-100vh d-flex align-items-center white-background position-relative">
      <div className="w-75 m-auto position-relative">
        <LogoSection />
        <div className="row no-margin align-items-center login-box white-background">
          <div className="col-md-8 no-padding position-relative overlay-before">
            <ImageCenteredText />
          </div>
          <div className="col-md-4 login-field-box">
            <ForgotPassWordFieldSection />
          </div>
        </div>
      </div>
      <CopyRightSection />
    </div>
  );
}
