import React from 'react'
import SideNav from '../../../default/SideNav/SideNav'
import EmployerPage from '../../../layouts/EmployerPage'

import { DiGoogleAnalytics } from "react-icons/di";
import Card from "../../../default/Card/Card";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
    const location = useLocation();
    const currentPath = location?.pathname;

  return (
    <>
        <EmployerPage>
            Testing
        </EmployerPage>
    </>
  )
}
