import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { ForgotPassword } from '../pages/forGotPassWord/container/ForgotPassword';
import { Login } from '../pages/login/container/Login';
import { NoMatchPath } from '../pages/noMatchPath/container/NoMatchPath';
import ResetPassword from '../pages/resetPassword/container/ResetPassword';

export function NotLoggedInRoutes() {    
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route path='/reset_password/:secret_key' element={<ResetPassword />} />
            <Route path='*' element={<NoMatchPath innerHeight={"100vh"}/>} />
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/irrelevant" element={<Navigate to={"/login"} />} />
        </Routes>
    )
}
