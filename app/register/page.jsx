"use client"
import React from 'react'
import { useState } from 'react'


const page = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        console.log(res);
        console.log(name);
        console.log(res.status);
        console.log("hello");
        const data = await res.json();

        if (!res.ok) {
            if (data.message) {
                setError(data.message);
            } else if (data.errors) {
                const firstError =
                    // data.errors.name?.[0] ||
                    // data.errors.email?.[0] ||
                    // data.errors.password?.[0] ||
                    Object.values(data.errors)?.[0]?.[0];
                setError(firstError);
            }
        }
        // alert(data.message);
        if (data.success) {
            res.ok && window.location.replace("/login");
        }
    };


    return (
        // action="/register"
        <div>
            <form
                method="post"
                className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Registration
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                    <a href="/login" className="text-blue-600 hover:underline ml-1">
                        Login
                    </a>
                </p>
            </form>

        </div>
    )
}

export default page
