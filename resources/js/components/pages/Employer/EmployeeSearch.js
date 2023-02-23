import React from "react";
import Card from "../../default/Card/Card";
import Select from "../../default/Inputs/Select";
import Slider from "@mui/material/Slider";
import { Search } from "../../default/Inputs/Search";
export default function EmployeeSearch({ handleSearch, refetch, search }) {
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
                        options={["Test1", "Test2", "Test3"]}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col  items-center justify-center">
                        <label>Trainings Taken</label>
                        <div className="flex flex-row min-w-[400px] gap-4 items-center">
                            <span>0</span>

                            <Slider value={[0, 100]} />

                            <span>100</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Select
                        label={`Sort`}
                        labelStyle={`mr-auto ml-auto`}
                        options={["Test1", "Test2", "Test3"]}
                    />
                </div>
            </div>
        </Card>
    );
}
