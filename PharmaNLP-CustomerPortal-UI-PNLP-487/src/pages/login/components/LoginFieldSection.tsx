import React, { useState } from 'react'
import { QuoteSection } from './QuoteSection'
import { BorderedInput } from './BorderedInput'
import { Button } from '../../../commonComponents/Button'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks'
import { doUserLogin } from '../../../redux/actions/UserActions'

type PostObjProps = {
    endUrl: string,
    credential: {
        phone_no: string,
        password: string
    }
}

type CredentialProps = {
    phone_no: string,
    password: string
}

export function LoginFieldSection() {

    const dispatch = useAppDispatch();
    const userDetailsState = useAppSelector((state) => state.userDetails)
    const [loginState, setloginState] = useState<CredentialProps>({
        phone_no: "",
        password: "",
    });

    const loginClickHandler = () => {
        if (loginState["phone_no"] === "" || loginState["password"] === "") alert("Please Enter the Valid Credentials");
        else {
            let userLoginPostObj: PostObjProps = {
                endUrl: "/login",
                credential: loginState,
            };
            dispatch(doUserLogin(userLoginPostObj))
        }
    };

    const loginInputChangeHandler = (val: string, key: string) => setloginState({
        ...loginState,
        [key]: val,
    });

    return (
        <>
            <QuoteSection
                quote={"Welcome!"}
                action={"Please login to your account"}
            />
            <form>
                <BorderedInput
                    type={"email"}
                    placeholder={"Email"}
                    onChangeHandler={loginInputChangeHandler}
                    onChangeFor={"phone_no"}
                />
                <BorderedInput
                    type={"password"}
                    placeholder={"password"}
                    onChangeHandler={loginInputChangeHandler}
                    onChangeFor={"password"}
                />
                <div className="mar-t-40">
                    <Button
                        hasExtraPad={true}
                        text={"login"}
                        upperCaseText={true}
                        btnHasRadius={true}
                        btnHasImg={false}
                        fontSize={16}
                        btnClickHandler={loginClickHandler}
                        imgUrl={""}
                        loadingCase={true}
                        isLoading={userDetailsState["loading"]}
                        hasMarginLeft={false}
                        textCenter={true}
                    />
                </div>
            </form>
            <Link
                to={"/forgot_password"}
                state={{ enteredEmail: loginState["phone_no"] }}
                className="text-decoration-none"
            >
                <p className="text-dark-gray text-end mar-t-40 cursor-pointer">
                    Forgot password?
                </p>
            </Link>
        </>
    )
}
