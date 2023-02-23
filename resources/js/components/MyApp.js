import React from 'react'
import "../../css/app.css"

import * as path from "./shared/constants";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserProvider, { WithSession, WithSessionLogged } from './default/Session/SessionProvider';
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
                    <Route 
                        path={path.HOME} 
                        element={
                            <WithSessionLogged>
                                <GuestHome/>
                            </WithSessionLogged>
                    }>
                    </Route>

                    <Route 
                        path={path.SUBSCRIPTION} 
                        element={<Subscription/>}>
                    </Route>

                    <Route 
                        path={path.CONTACT} 
                        element={<Contact/>}>
                    </Route>

                    <Route 
                        path={path.ABOUT} 
                        element={<About/>}>
                    </Route>

                    <Route 
                        path={path.LOGIN} 
                        element={
                            <WithSessionLogged>
                                <Login/>
                            </WithSessionLogged>}>
                    </Route>

                    <Route 
                        path={path.REGISTER} 
                        element={
                        <WithSessionLogged>
                            <Register/>
                        </WithSessionLogged>
                        }>
                    </Route>

                    <Route 
                        path={path.FORGOT} 
                        element={
                        <WithSessionLogged>
                            <ForgotPassword/>
                        </WithSessionLogged>}>
                    </Route>
                </Routes>

            {/* Email Verify Pages */}
                <Routes>
                        <Route path={path.EMAIL_SUCCESS} element={<WithSession><EmailSuccess/></WithSession>}>
                        </Route>

                        <Route path={path.EMAIL_ALREADY_VERIFIED} element={<WithSession><AlreadyVerifiedEmail/></WithSession>}>
                        </Route>
                </Routes>

            {/* Employee Pages */}
                <Routes>
                    <Route path={path.EMPLOYEE_HOME} element={<WithSession><Home/></WithSession>}>
                    </Route>

                    <Route path={path.SCHEDULES} element={<WithSession><Schedules/></WithSession>}>
                    </Route>

                    <Route path={path.TRAININGS} element={<WithSession><Trainings/></WithSession>}>
                    </Route>

                    <Route path={path.PROFILE} element={<WithSession><Profile/></WithSession>}>
                    </Route>
                </Routes>

            {/* Employer Pages */}
                <Routes>
                    <Route path={path.DASHBOARD} element={<WithSession><Dashboard/></WithSession>}>
                    </Route>

                    <Route path={path.MY_EMPLOYERS} element={<WithSession><MyEmployers/></WithSession>}>
                    </Route>

                    <Route path={path.MY_EMPLOYEES} element={<WithSession><MyEmployees/></WithSession>}>
                    </Route>

                    <Route path={path.EMPLOYER_TRAININGS} element={<WithSession><MyTrainings/></WithSession>}>
                    </Route>

                    <Route path={path.SEARCH} element={<WithSession><PublicSearch/></WithSession>}>
                    </Route>

                    <Route path={path.SUBSCRIBE} element={<WithSession><Subscribe/></WithSession>}>
                    </Route>

                    <Route path={path.TRAINING_RECORDS} element={<WithSession><TrainingRecords/></WithSession>}>
                    </Route>

                    <Route path={path.CREATE_COMPANY} element={<WithSession><CreateCompany/></WithSession>}>
                    </Route>
                </Routes>

            {/* Admin Pages */}
                <Routes>
                    <Route path={path.ADMIN_USERS} element={<WithSession><Users/></WithSession>}>
                    </Route>

                    <Route path={path.ADMIN_COMPANIES} element={<WithSession><Companies/></WithSession>}>
                    </Route>

                    <Route path={path.ADMIN_APPROVAL} element={<WithSession><Approval/></WithSession>}>
                    </Route>

                    <Route path={path.ADMIN_ANNOUNCEMENT} element={<WithSession><Announcement/></WithSession>}>
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
