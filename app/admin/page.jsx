"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  // const router = useRouter();
  // const isAdmin = false; // get from auth / session

  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.replace("/login");
  //   }
  // }, []);
  
    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.replace("/login");
    };


  return (
    <>

      <h1>Admin Dashboard</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </>
  )
}
