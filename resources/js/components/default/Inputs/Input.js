import React from "react";

function Input({ id, label, type, style, value, setValue }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                className={`input ${style}`}
                value={value}
                id={id}
                name={id}
                onChange={(e) => setValue(e)}
            ></input>
        </div>
    );
}

export default React.memo(Input);
