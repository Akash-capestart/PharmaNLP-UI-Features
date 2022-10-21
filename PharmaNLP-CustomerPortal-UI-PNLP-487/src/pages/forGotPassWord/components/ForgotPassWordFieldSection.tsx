import React from 'react'
import { QuoteSection } from '../../login/components/QuoteSection'
import { BorderedInput } from '../../login/components/BorderedInput'
import { Button } from '../../../commonComponents/Button'
import { Link } from "react-router-dom";

export function ForgotPassWordFieldSection() {

    const forGetPassClickHandler = () => alert("forget Password clicked");

    const onChangeHandler = (e: string) => {
        console.log(e);
    }

    return (
        <>
            <QuoteSection quote={"Forgot"} action={"Your password?"} />
            <form>
                <BorderedInput
                    type={"email"}
                    placeholder={"Email"}
                    // value={state ? state.enteredEmail : ""}
                    // value={""}
                    onChangeHandler={onChangeHandler}
                    onChangeFor={"phone_no"}
                />
                <div className="mar-t-40">
                    <Button
                        hasExtraPad={true}
                        text={"Send Link to Email"}
                        fontSize={16}
                        upperCaseText={true}
                        btnHasRadius={true}
                        btnHasImg={false}
                        btnClickHandler={forGetPassClickHandler}
                        imgUrl={""}
                        loadingCase={true}
                        isLoading={false}
                        hasMarginLeft={false}
                        textCenter={true}
                    />
                    <Link to={"/login"} className="text-decoration-none">
                        <p className="text-dark-gray text-end mar-t-40 cursor-pointer">
                            Back to login page!
                        </p>
                    </Link>
                </div>
            </form>
        </>
    )
}
