import React from 'react'
import "../../css/app.css"

import * as path from "./shared/constants";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserProvider from './default/Session/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
import MyEmployers from './pages/Employer/MyEmployers/MyEmployers';
import MyEmployees from './pages/Employer/MyEmployees/MyEmployees';
import MyTrainings from './pages/Employer/MyTrainings/MyTrainings';
import PublicSearch from './pages/Employer/PublicSearch/PublicSearch';
import Subscribe from './pages/Employer/Company/Subscribe';
import TrainingRecords from './pages/Employer/TrainingRecords/TrainingRecords';
import CreateCompany from './pages/Employer/Company/CreateCompany';

import Users from './pages/Admin/Users/Users';
import Companies from './pages/Admin/Companies/Companies';
import Approval from './pages/Admin/Approval/Approval';
import Announcement from './pages/Admin/Announcement/Announcement';

import EmailSuccess from './pages/EmailVerification/EmailSuccess';
import AlreadyVerifiedEmail from './pages/EmailVerification/AlreadyVerifiedEmail';

const queryClient = new QueryClient();

export default function MyApp() {
  return (
    <QueryClientProvider client={queryClient}>
        <UserProvider>

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

            {/* Email Verify Pages */}
                <Routes>
                        <Route path={path.EMAIL_SUCCESS} element={<EmailSuccess/>}>
                        </Route>

                        <Route path={path.EMAIL_ALREADY_VERIFIED} element={<AlreadyVerifiedEmail/>}>
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

                    <Route path={path.MY_EMPLOYERS} element={<MyEmployers/>}>
                    </Route>

                    <Route path={path.MY_EMPLOYEES} element={<MyEmployees/>}>
                    </Route>

                    <Route path={path.EMPLOYER_TRAININGS} element={<MyTrainings/>}>
                    </Route>

                    <Route path={path.SEARCH} element={<PublicSearch/>}>
                    </Route>

                    <Route path={path.SUBSCRIBE} element={<Subscribe/>}>
                    </Route>

                    <Route path={path.TRAINING_RECORDS} element={<TrainingRecords/>}>
                    </Route>

                    <Route path={path.CREATE_COMPANY} element={<CreateCompany/>}>
                    </Route>
                </Routes>

            {/* Admin Pages */}
                <Routes>
                    <Route path={path.ADMIN_USERS} element={<Users/>}>
                    </Route>

                    <Route path={path.ADMIN_COMPANIES} element={<Companies/>}>
                    </Route>

                    <Route path={path.ADMIN_APPROVAL} element={<Approval/>}>
                    </Route>

                    <Route path={path.ADMIN_ANNOUNCEMENT} element={<Announcement/>}>
                    </Route>
                </Routes>

            </UserProvider>
        </QueryClientProvider>
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
