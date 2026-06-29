"use client";

import { TInput, TButton } from "@t-apps/ui"
import "../../assets/css/form.css"

export default function Login() {
    function login() {
        const usernameInput = document.querySelector(".t-input.username");
        const passwordInput = document.querySelector(".t-input.password");
    }

    return (
        <>
            <div className="login form">
                <label>Username</label>
                <TInput placeholder="Enter username here..." className="username"></TInput>
                <label>Private key</label>
                <TInput type="file" accept=".pem" className="key"></TInput>
                <TButton onClick={login}>Login</TButton>
            </div>
        </>
    )
}