import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function Search({
    placeholder,
    style,
    disableButton,
    onClick,
    handleSearch,
    search,
}) {

    const [Search, setSearch] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <div className={`flex flex-row w-full gap-12 ${style}`}>
                <input
                    id="search_users"
                    name="search_users"
                    value={search}
                    onChange={(e) => {
                        handleSearch(e);
                    }}
                    className="outline-0 px-4 py-2 border border-gray-200 w-full rounded-md"
                    placeholder={placeholder}
                />
                {disableButton ? (
                    <></>
                ) : (
                    <button
                        type="submit"
                        onClick={() => onClick()}
                        className="button px-4 py-2"
                    >
                        Search
                    </button>
                )}
            </div>
        </form>
    );
}
