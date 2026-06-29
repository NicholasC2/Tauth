"use client";

import { useState } from "react";
import { TInput, TButton } from "@t-apps/ui"
import "../../assets/css/form.css"

export default function Register() {
    const [disabled, setDisabled] = useState(true);

    function login() {
        if(disabled) return;

        const usernameInput = document.querySelector(".t-input.username");
        const passwordInput = document.querySelector(".t-input.password");
    }

    async function checkUsername(username: string) {
        const res = await fetch("/api/accounts/check-username", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
      
        if (!res.ok) {
          throw new Error("Request failed");
        }
      
        const data = await res.json();
        return data.exists;
      }

    async function updateStatus() {
        const status = document.querySelector(".status");
        const usernameInput = document.querySelector(".t-input.username");

        if(!status) return;

        if(!usernameInput) return;
        if(!(usernameInput instanceof HTMLInputElement)) return;

        if(usernameInput.value.trim().length === 0) {
            status.innerHTML = "Account name must not be empty!";
            
            setDisabled(true);

            return;
        }

        if(await checkUsername(usernameInput.value)) {
            status.innerHTML = "Account already exists";
            
            setDisabled(true);

            return;
        }

        status.innerHTML = "Account name valid!";
        setDisabled(false);
    }

    return (
        <>
            <div className="login form">
                <label>Username</label>
                <TInput onInput={updateStatus} placeholder="Enter username here..." className="username"></TInput>
                <div className="status"></div>
                <TButton as="button" onClick={login} disabled={disabled}>Register</TButton>
            </div>
        </>
    )
}