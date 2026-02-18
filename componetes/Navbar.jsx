"use client";
import React from 'react'
import Link from 'next/link'
import { useState ,useEffect} from 'react'


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  // const search = async (e) => {
  //   setName(e.target.value);
  //   e.preventDefault();
  //   console.log("Searching...");
  //   const res = await fetch("/api/navbar", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name: name })
  //   });
  //   const data = await res.json();
  //   console.log(data.user);
  //   console.log(data.user.name);
  // }




  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Navbar
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-gray-600 text-2xl"
          >
            ☰
          </button>

          {/* Menu */}
          <div
            className={`${open ? "block" : "hidden"
              } lg:flex lg:items-center lg:space-x-6`}
          >
            <Link href="/Homepage" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            <Link href="/product" className="text-gray-700 hover:text-blue-600">
              products
           </Link>
           <Link href="/card" className="text-gray-700 hover:text-blue-600">
              card
           </Link>

            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>


            {/* Dropdown */}
            {/* <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600">
                Dropdown
              </button>

              <div className="absolute hidden group-hover:block mt-2 w-44 bg-white border rounded shadow-lg">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Action
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Another action
                </Link>
                <div className="border-t" />
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Something else here
                </Link>
              </div>
            </div> */}

            {/* <span className="text-gray-400 cursor-not-allowed">
              Disabled
            </span> */}

            {/* Search */}
            <form  className="flex items-center space-x-2">
              <input
                type="search"
                placeholder="Search"
                className="border rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400"
              />
              <button
                type="submit"
                className="border border-green-500 text-green-600 px-3 py-1 rounded hover:bg-green-500 hover:text-white"
              >
                Search
              </button>
            </form>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
