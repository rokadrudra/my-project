"use client";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [newname, setnewname] = useState("");
    const [password, setpassword] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const res = await fetch("/api/dashbord", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: user.name, email: user.email, password: password })
        });
        res.ok && alert("Password updated successfully, please login again.");
    };



    // useEffect(() => {
    //     // Temporary: get user from localStorage
    //     const storedUser = localStorage.getItem("user");
    //     if (!storedUser) {
    //         window.location.replace("/login");
    //     } else {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);
    // 


    // replace witj

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/dashbord", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            // console.log(data);
            // console.log(data.user);
            // console.log(data.user.name);
            alert("Welcome to the dashboard, " + data.user.name);

            // console.log("vbhdsvsdjvbhbj nihsdjcv njdk iuvsn nn");
            if (!data.success) {
                window.location.replace("/login"); // redirect if token invalid
            } else {
                setUser(data.user); // set user data
            }
        }
        fetchUser();
    }, []);


    // useEffect(() => {
    //     if (!user) return;
    //     localStorage.setItem("user", JSON.stringify(user));
    // }, [user]);


    const handleNameChange = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const res = await fetch("/api/dashbord", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newname, email: user.email })
        });
        console.log(res);
        console.log(newname);
        console.log(res.status);
        const data = await res.json();
        res.ok && alert("Name updated successfully, please login again.");
        if (res.ok) {
            setUser(data.user);                 // ✅ UI update
            localStorage.setItem("user", JSON.stringify(data.user));
            setnewname("");                     // optional: input clear
        }
    };

    if (!user) return null;

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.replace("/login");
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="mb-2"><b>Name:</b> {user.name}</p>
                <p className="mb-4"><b>Email:</b> {user.email}</p>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Logout
                </button>
                <form onSubmit={handleNameChange} className="mt-4">
                    <input type="text" placeholder="Enter your name" className="mt-4 w-full p-2 border rounded" value={newname} onChange={(e) => setnewname(e.target.value)} />
                    <button type="submit" className="mt-2 bg-blue-500 text-black px-4 py-2 rounded" >Change Name</button>
                </form>
                <form onSubmit={handlePasswordChange} className="mt-4">
                    <input type="password" placeholder="Enter your password" className="mt-4 w-full p-2 border rounded" onChange={(e) => setpassword(e.target.value)} />
                    <button type="submit" className="mt-2 bg-blue-500 text-black px-4 py-2 rounded" >Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
