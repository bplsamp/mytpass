import React from 'react'
import "../../css/app.css"

import * as path from "./shared/constants";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GuestHome from './pages/Guest/Home/GuestHome';
import Subscription from './pages/Guest/Subscription/Subscription';
import Contact from './pages/Guest/Contact/Contact';
import About from './pages/Guest/About/About';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';
import ForgotPassword from './pages/Guest/ForgotPassword/ForgotPassword';

import Home from './pages/Employee/Home/Home';
import Schedules from './pages/Employee/Schedules/Schedules';
import Trainings from './pages/Employee/Trainings/Trainings';
import Profile, { ProfileBox } from './pages/Employee/Profile/Profile';

import Dashboard from './pages/Employer/Dashboard/Dashboard';

export default function MyApp() {
  return (
    <>
        {/* Guest Pages */}
            <Routes>
                <Route path={path.HOME} element={<GuestHome/>}>
                </Route>

                <Route path={path.SUBSCRIPTION} element={<Subscription/>}>
                </Route>

                <Route path={path.CONTACT} element={<Contact/>}>
                </Route>

                <Route path={path.ABOUT} element={<About/>}>
                </Route>

                <Route path={path.LOGIN} element={<Login/>}>
                </Route>

                <Route path={path.REGISTER} element={<Register/>}>
                </Route>

                <Route path={path.FORGOT} element={<ForgotPassword/>}>
                </Route>
            </Routes>
            
        {/* Employee Pages */}
            <Routes>
                <Route path={path.EMPLOYEE_HOME} element={<Home/>}>
                </Route>

                <Route path={path.SCHEDULES} element={<Schedules/>}>
                </Route>

                <Route path={path.TRAININGS} element={<Trainings/>}>
                </Route>

                <Route path={path.PROFILE} element={<Profile/>}>
                </Route>
            </Routes>

        {/* Employer Pages */}
            <Routes>
                <Route path={path.DASHBOARD} element={<Dashboard/>}>
                </Route>
            </Routes>

        {/* Admin Pages */}

    </>
  )
}

if (document.getElementById("app")) {
    const container = document.getElementById("app");
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <MyApp />
        </BrowserRouter>
    );
}
