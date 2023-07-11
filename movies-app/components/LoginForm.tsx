import axios from "axios";
import { useState } from "react";

export const LoginForm = () => {
    const [data, setData] = useState({ identifier: "", password: "" });

    const handleSubmit  = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}auth/local`, {identifier: data.identifier, password: data.password})
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <h1>Login Form</h1>
        </div>
    )
}