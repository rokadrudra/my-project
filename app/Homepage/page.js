// "use client";
// import React from "react";
// import { useState, useEffect } from "react";

// const page = () => {


//   return (
//     <div>
//                <form onSubmit={search} className="flex items-center space-x-2">
//               <input
//                 type="search"
//                 placeholder="Search"
//                 value={name}
//                 onChange={(e)=>setName(e.target.value)}
//                 className="border rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400"
//               />
//               <button
//                 type="submit"
//                 className="border border-green-500 text-green-600 px-3 py-1 rounded hover:bg-green-500 hover:text-white"
//               >
//                 Search
//               </button>
//             </form>

//     </div>
//   )
// }

// export default page


"use client";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import AnalysisChart from "../../componetes/AnalysisChart";

const Page = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [userfound, setUserfound] = useState(true);
  const count = useRef(0);

  const search = (e) => {
    e.preventDefault(); // stop page reload
  };

  useEffect(() => {
    if (!name) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/home", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        count.current += 1;
        console.log("API call count:", count.current);

        if (!res.ok) return;

        const data = await res.json();
        setUsers(Array.isArray(data.users) ? data.users : []);

        if (data.users.length > 0) {
          setUserfound(true);
        } else {
          setUserfound(false);
        }


      } catch (err) {
        console.error(err);
      }
    }, 500);
    
    if(name === "") {
      setUserfound(true);
      console.log("empty");
    }
    return () => clearTimeout(timer);
  }, [name]);
  
  return (
    <>
    <div className="p-4">
      <form onSubmit={search} className="flex items-center space-x-2">
        <input
          type="search"
          placeholder="Search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <button
          type="submit"
          className="border border-green-500 text-green-600 px-3 py-1 rounded"
        >
          Search
        </button>
      </form>


      {userfound === false && <p>Not found</p>}

      {users.map((u) => (
        <div
          key={u._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
        </div>
      ))}

      <h1 className="mt-4">This is Homepage</h1>
    </div>
      <div>
      <AnalysisChart />
      </div>
 
        
</>
   
  );
};

export default Page;
