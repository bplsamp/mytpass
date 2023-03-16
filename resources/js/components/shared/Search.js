import React from "react";

export default function Search({ handleSearch }) {
    return (
        <input
            onChange={(e) => handleSearch(e)}
            className="outline-0 border border-gray-400 px-2 py-2 rounded-md text-black w-full max-w-[500px]"
            placeholder="🔍︎ Search Record..."
        ></input>
    );
}
