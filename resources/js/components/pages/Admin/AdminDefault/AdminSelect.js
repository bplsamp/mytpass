import React from "react";
export function AdminSelect({ options, label, value, setValue }) {
    return (
        <>
            {" "}
            <label htmlFor="expertise">{label}</label>
            <select
                id={label}
                name={label} 
                className="border 
                border-gray-400 outline-0 px-2 py-1"
                placeholder="Select..."
                onChange={(e) => setValue(e)}
            >
                {options.map((opt) => (
                    <option>{opt}</option>
                ))}
            </select>
        </>
    );
}
