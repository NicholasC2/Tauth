"use client";

import { useState } from "react";
import { TButton, TCode, TInput } from "@t-apps/ui";
import "../../assets/css/form.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [generatingKeys, setGeneratingKeys] = useState(false);
    const [generatedKeys, setGeneratedKeys] = useState(false);

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

    async function updateStatus(value: string) {
        setUsername(value);

        const trimmed = value.trim();

        if (!trimmed) {
            setStatus("Account name must not be empty!");
            setDisabled(true);
            return;
        }

        if (await checkUsername(trimmed)) {
            setStatus("Account already exists");
            setDisabled(true);
            return;
        }

        setStatus("Account name valid!");
        setDisabled(false);
    }

    function createAccount() {
        if (disabled) return;

        setGeneratingKeys(true);

        setTimeout(()=>{
            setGeneratedKeys(true);
        }, 1000)
    }

    if(generatedKeys) {
        return (
            <div className="keys form">
                <label>Keys</label>
                <div>This is your private key:</div>
                <TCode>key...</TCode>
                <TButton>Download</TButton>
                <div>Download it and store it in a safe place.</div>
            </div>
        )
    }

    if (generatingKeys) {
        return (
            <div className="keys form">
                <label>Generating Keys...</label>
            </div>
        );
    }

    return (
        <div className="login form">
            <label>Username</label>

            <TInput
                className="username"
                placeholder="Enter username here..."
                value={username}
                onInput={(e) =>
                    updateStatus((e.target as HTMLInputElement).value)
                }
            />

            <div className="status">{status}</div>

            <TButton
                as="button"
                onClick={createAccount}
                disabled={disabled}
            >
                Register
            </TButton>
        </div>
    );
}