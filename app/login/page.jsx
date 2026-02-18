"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
const page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        console.log(res);
        console.log(email);
        console.log(res.status);
        console.log("hello");
        const data = await res.json();
        console.log(data);
        console.log(data.user.role);

        if (!res.ok) {
            if (data.message) {
                setError(data.message);
            } else if (data.errors) {
                const firstError =
                    data.errors.name?.[0] ||
                    data.errors.email?.[0] ||
                    data.errors.password?.[0];

                setError(firstError);
            }
        }
        alert(data.message+" status code: "+data.user.role);

        if(data.user.role === "admin"){
            window.location.replace("/admin")
            return;
        }
        if (res.ok) {
            // localStorage.setItem("user", JSON.stringify(data.user));
            window.location.replace("/dashboard");
        }

    };

    // action="/login"
    return (
        // <div>
        //     <form
        //         method="post"
        //         className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow-md"
        //         onSubmit={handleSubmit}
        //     >
        //         <h2 className="text-2xl font-bold text-center mb-6">
        //             Login
        //         </h2>

        //         <div className="mb-4">
        //             <label
        //                 htmlFor="email"
        //                 className="block text-gray-700 font-medium mb-1"
        //             >
        //                 Email
        //             </label>
        //             <input
        //                 type="email"
        //                 id="email"
        //                 name="email"
        //                 required
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //         </div>

        //         <div className="mb-6">
        //             <label
        //                 htmlFor="password"
        //                 className="block text-gray-700 font-medium mb-1"
        //             >
        //                 Password
        //             </label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 name="password"
        //                 required
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //         </div>
        //         {error && (
        //             <div className="mb-4 text-red-600 font-medium">{error}</div>
        //         )}

        //         <button
        //             type="submit"
        //             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        //         >
        //             Login
        //         </button>
        //     </form>

        //     <h5 className="text-center mt-4">
        //         Don't have an account?{" "}
        //         <Link href="/register" className="text-gray-700 hover:text-blue-600">
        //             Register
        //         </Link>
        //     </h5>
        // </div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm sm:max-w-md">
                <form
                    method="post"
                    onSubmit={handleSubmit}
                    className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
                        Login
                    </h2>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="mb-4 text-sm text-red-600 font-medium text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                   hover:bg-blue-700 transition font-medium"
                    >
                        Login
                    </button>
                </form>

                <h5 className="text-center mt-4 text-sm text-gray-700">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </h5>
            </div>
        </div>
    )
}

export default page
