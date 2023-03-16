import React from "react";
import Card from "../../default/Card/Card";
import Select from "../../default/Inputs/Select";
import Slider from "@mui/material/Slider";
import { Search } from "../../default/Inputs/Search";
export default function EmployeeSearch({
    handleSearch,
    refetch,
    search,
    sortBy,
    expertise,
    handleSortBy,
    handleExpertise,
}) {
    return (
        <Card className={`mx-4 p-8 flex flex-col gap-4`}>
            <Search
                onClick={refetch}
                handleSearch={handleSearch}
                placeholder={`Search Employee...`}
                search={search}
            />

            <div className="flex flex-row justify-around">
                <div className="flex flex-col">
                    <Select
                        labelStyle={`mr-auto ml-auto`}
                        label={`Expertise`}
                        setValue={handleExpertise}
                        options={[
                            "Default",
                            "Commercial Aspect",
                            "Human Aspect",
                            "Technical Aspect",
                        ]}
                    />
                </div>
                <div className="flex flex-col">
                    <Select
                        setValue={handleSortBy}
                        label={`Sort`}
                        labelStyle={`mr-auto ml-auto`}
                        options={[
                            "Default",
                            "Highest Trainings Taken",
                            "Lowest Trainings Taken",
                        ]}
                    />
                </div>
            </div>
        </Card>
    );
}
