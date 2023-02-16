import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import Card from "../../../default/Card/Card";
import { RiUserSearchFill } from "react-icons/ri";
import employees from "../users.json";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function PublicSearch() {
    
    const location = useLocation();
    const currentPath = location?.pathname;

    return (
        <EmployerPage>
            <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <RiUserSearchFill className="text-[1.8rem] text-torange" />
                Find Employees
            </Card>

            {/* SHOW LIST OF EMPLOYERS HERE */}

        </EmployerPage>
    );
}
