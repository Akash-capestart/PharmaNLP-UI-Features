import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../../../commonComponents/Button';
import { BorderedInput } from '../../login/components/BorderedInput';
import { QuoteSection } from '../../login/components/QuoteSection';

export default function ResetPasswordFieldSection() {

    const [showPassword, setshowPassword] = useState<boolean>(false);

    const passWordShowHandler = () => setshowPassword((prevVal) => !prevVal);

    const resetPasswordFieldChangeHandler = (val: string) => console.log(val);

    const resetPasswordClickHandler = () => console.log("clicked...");

    return (
        <>
            <QuoteSection quote={"Change the password"} action={""} />
            <form>
                <BorderedInput
                    type={showPassword ? "text" : "password"}
                    placeholder={"New Password"}
                    onChangeHandler={resetPasswordFieldChangeHandler}
                    onChangeFor={"new_password"}
                />
                <BorderedInput
                    type={showPassword ? "text" : "password"}
                    placeholder={"Confirm Password"}
                    onChangeHandler={resetPasswordFieldChangeHandler}
                    onChangeFor={"password_confirm"}
                />
                <div className="d-flex align-items-cener mar-t-10">
                    <input
                        type="checkbox"
                        onChange={() => passWordShowHandler()}
                    />
                    <span className="pad-l-10">Show password</span>
                </div>
                <div className="mar-t-15">
                    <Button
                        hasExtraPad={true}
                        fontSize={16}
                        text={"Change Password"}
                        upperCaseText={true}
                        btnHasRadius={true}
                        btnHasImg={false}
                        btnClickHandler={resetPasswordClickHandler}
                        imgUrl={""}
                        loadingCase={true}
                        isLoading={false}
                        hasMarginLeft={false}
                        textCenter={true}
                    />
                    <Link to={"/login"} className="text-decoration-none">
                        <p className="text-dark-gray text-end mar-t-15 cursor-pointer">
                            Back to login page!
                        </p>
                    </Link>
                </div>
            </form>
        </>
    )
}
