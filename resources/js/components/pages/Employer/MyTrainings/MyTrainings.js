import React, { useState } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import { GiTiedScroll } from "react-icons/gi";
import Card from "../../../default/Card/Card";


export default function MyTrainings() {
    const [ShowSchedule, setShowSchedule] = useState(false);

    return (
        <EmployerPage>
            <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <GiTiedScroll className="text-[1.8rem] text-torange" />
                My Trainings
            </Card>

        </EmployerPage>
    );
}
