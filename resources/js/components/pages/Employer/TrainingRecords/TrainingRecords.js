import React from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import { GiTiedScroll } from "react-icons/gi";
import Card from "../../../default/Card/Card";
import Search from "../../../shared/Search";
import Select from "../../../default/Inputs/Select";

export default function TrainingRecords() {
    return (
        <EmployerPage>
            <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <GiTiedScroll className="text-[1.8rem] text-torange" />
                All Training Records
            </Card>

            <Card className={`mx-4 p-4 flex flex-row gap-14 items-center`}>
                <Search
                    placeholder={`Search Training`}
                    style={`max-w-[500px]`}
                    disableButton={true}
                />
                <div className="flex items-center gap-4">
                    <h1>Sort By:</h1>
                    <Select label={``} options={["Test1", "Test2", "Test3"]} />
                </div>
            </Card>
        </EmployerPage>
    );
}
