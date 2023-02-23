import React from "react";
import { useMemo } from "react";
function ModalSelect({ label, id, value, setValue, options }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={(e) => setValue(e)} className="input min-h-[44.39px]">
                {options?.map((o, idx) => (
                    <option value={o} key={idx}>{o}</option>
                ))}
            </select>
        </div>
    );
}

export default React.memo(ModalSelect);