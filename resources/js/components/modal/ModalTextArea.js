import React from 'react'
function ModalTextArea({ label, id, rows, setValue, value }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <textarea value={value} id={id} name={id} rows={rows} className="input" onChange={(e) => setValue(e)} />
        </div>
    );
}

export default React.memo(ModalTextArea);