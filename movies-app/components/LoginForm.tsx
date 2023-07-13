"use client";

import { removeAuthToken, storeAuthToken } from "@/lib/auth";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [data, setData] = useState({ identifier: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      { identifier: data.identifier, password: data.password }
    );
    storeAuthToken(response);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const logout = () => {
    removeAuthToken();
  }

  return (
    <>
      <li>
        <form onSubmit={handleSubmit} className="form-inline">
          <input
            type="text"
            name="identifier"
            onChange={handleChange}
            placeholder="Username"
            className="md:p-2 form-input py-2 rounded mx-2"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="md:p-2 form-input py-2 rounded mx-2"
            required
          />

          <button
            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </li>
      <li>
        <Link href="/register">Register</Link>
      </li>
    </>
  );
}
