import React from "react";

function ModalInput({ label, type, setValue, id, value, disabled }) {
    return (
        <div className="flex flex-col">
            <label className="font-medium">{label}</label>
            <input
                value={value}
                id={id}
                name={id}
                onChange={(e) => setValue(e)}
                type={type}
                disabled={disabled}
                className="input text-[1.1rem] max-h-[44.29px]"
            />
        </div>
    );
}

export default React.memo(ModalInput);