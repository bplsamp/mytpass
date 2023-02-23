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
    /*
    let { q } = useParams();

    const handleURLSearch = (e) => {
        const url = new URL(window.location);
        url.searchParams.set("q", e.target.value);
        window.history.pushState({}, "", url);
    };
    */

    const [Search, setSearch] = useState("");

    /*
 const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
     `${currentPath.replace("/employer/", "")}`,
     `/api${currentPath}`,
     { page: Page, query: Search }
 );
 */

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
