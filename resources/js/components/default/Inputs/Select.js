import React from "react";

function Select({ id, label, options, value, setValue, labelStyle }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className={`${labelStyle}`}>
                {label}
            </label>
            <select
                onChange={(e) => setValue(e)}
                id={id}
                name={id}
                className="input min-w-[220px]"
            >
                {options?.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

export default React.memo(Select);