"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import initializeFirebase from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Check if the input fields are already populated on page load
    const emailField = document.querySelector("#emailInput");
    const passwordField = document.querySelector("#passInput");

    if (emailField && emailField.value) {
      setEmail(emailField.value.toLowerCase().replace(/\s+$/, ""));
    }

    if (passwordField && passwordField.value) {
      setPassword(passwordField.value);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setLoading(false);
        setError("Incorrect credentials");
        return;
      }
      signInWithEmailAndPassword((await initializeFirebase()).auth, email, password);

      router.replace("dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen login-main">
      <div className="shadow-lg p-10 rounded-lg border-y-4 border-gray-800">
        <h1 className="text-xl font-bold pb-10 AdminLogin">Dashboard login:</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input
            id="emailInput"
            onChange={e => {
              setEmail(e.target.value.toLowerCase().replace(/\s+$/, ""));
              setError("");
            }}
            type="text"
            placeholder="Email"
            className="md:w-96"
            value={email}
          />
          <input
            id="passInput"
            onChange={e => {
              setPassword(e.target.value);
              setError("");
            }}
            type="password"
            placeholder="Password"
            className="md:w-96"
          />

          <button className="bg-gray-800 text-white font-bold cursor-pointer px-6 py-3 mt-0"> Login</button>
          {error && <div className="bg-red-500 text-white w-auto text-sm py-3 px-3 rounded-md mt-0 text-center">{error}</div>}
        </form>
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
}
