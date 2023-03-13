import React from 'react'
import "../../css/app.css"

import * as path from "./shared/constants";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserProvider, { WithSession, WithSessionLogged } from './default/Session/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './default/Loading/Loading';
import toast, { Toaster } from "react-hot-toast";

import GuestHome from './pages/Guest/Home/GuestHome';
import Subscription from './pages/Guest/Subscription/Subscription';
import Contact from './pages/Guest/Contact/Contact';
import About from './pages/Guest/About/About';
import Login from './pages/Guest/Login/Login';
import Register from './pages/Guest/Register/Register';
import ForgotPassword from './pages/Guest/ForgotPassword/ForgotPassword';
import Terms from './pages/Guest/Terms/Terms';
import Privacy from './pages/Guest/Privacy/Privacy'

import Home from './pages/Employee/Home/Home';
import Schedules from './pages/Employee/Schedules/Schedules';
import Trainings from './pages/Employee/Trainings/Trainings';
import Profile, { ProfileBox } from './pages/Employee/Profile/Profile';
import EditProfile from './pages/Employee/Profile/EditProfile';

import Dashboard from './pages/Employer/Dashboard/Dashboard';
import MyEmployers from './pages/Employer/MyEmployers/MyEmployers';
import MyEmployees from './pages/Employer/MyEmployees/MyEmployees';
import MyTrainings from './pages/Employer/MyTrainings/MyTrainings';
import PublicSearch from './pages/Employer/PublicSearch/PublicSearch';
import UserView from './pages/Employer/PublicSearch/UserView';
import Subscribe from './pages/Employer/Company/Subscribe';
import TrainingRecords from './pages/Employer/TrainingRecords/TrainingRecords';
import MyEmployeeTPass from './pages/Employer/MyEmployees/MyEmployeeTPass';
import CreateCompany from './pages/Employer/Company/CreateCompany';
import EditCompany from './pages/Employer/Company/EditCompany';
import ShoppingCart from './pages/Employer/Company/ShoppingCart';
import SuccessCart from './pages/Employer/Company/SuccessCart';
import DeactivatedCompany from './pages/Employer/Company/DeactivatedCompany';
import NotAllowedCompany from './pages/Employer/Company/NotAllowedCompany';

import Users from './pages/Admin/Users/Users';
import Companies from './pages/Admin/Companies/Companies';
import Approval from './pages/Admin/Approval/Approval';
import Announcement from './pages/Admin/Announcement/Announcement';
import Audits from './pages/Admin/Audits/Audits';

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
                            <WithSession>
                                <GuestHome />
                            </WithSession>
                        }
                    />

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
                        path={path.TERMS} 
                        element={<Terms/>}>
                    </Route>

                    <Route 
                        path={path.PRIVACY} 
                        element={<Privacy/>}>
                    </Route>

                    <Route
                        path={path.FORGOT}
                        element={
                            <WithSession>
                                <ForgotPassword />
                            </WithSession>
                        }
                    />

                    <Route
                        path={path.LOGIN}
                        element={
                            <WithSession>
                                <Login />
                            </WithSession>
                        }
                    />

                    <Route 
                        path={path.REGISTER} 
                        element={
                        <WithSession>
                            <Register/>
                        </WithSession>
                        }>
                    </Route>
                </Routes>

            {/* Email Verify Pages */}
                <Routes>
                    <Route
                        path={path.EMAIL_SUCCESS}
                        element={
                            <WithSessionLogged>
                                <EmailSuccess />
                            </WithSessionLogged>
                        }
                    />
                    <Route
                        path={path?.EMAIL_ALREADY_VERIFIED}
                        element={
                            <WithSessionLogged>
                                <AlreadyVerifiedEmail />
                            </WithSessionLogged>
                        }
                    />
                </Routes>

            {/* Employee Pages */}
                <Routes>
                    <Route
                        path={path.EMPLOYEE_HOME}
                        element={
                            <WithSessionLogged>
                                <Home />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.SCHEDULES}
                        element={
                            <WithSessionLogged>
                                <Schedules />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.TRAININGS}
                        element={
                            <WithSessionLogged>
                                <Trainings />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.PROFILE}
                        element={
                            <WithSessionLogged>
                                <Profile />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.EDIT_PROFILE}
                        element={
                            <WithSessionLogged>
                                <EditProfile />
                            </WithSessionLogged>
                        }
                    />
                </Routes>

            {/* Employer Pages */}
                <Routes>
                    <Route
                        path={path.DASHBOARD}
                        element={
                            <WithSessionLogged>
                                <Dashboard />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.MY_EMPLOYERS}
                        element={
                            <WithSessionLogged>
                                <MyEmployers />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.MY_EMPLOYEES}
                        element={
                            <WithSessionLogged>
                                <MyEmployees />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.EMPLOYER_TRAININGS}
                        element={
                            <WithSessionLogged>
                                <MyTrainings />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.SEARCH}
                        element={
                            <WithSessionLogged>
                                <PublicSearch />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.PUBLIC_USER_PROFILE}
                        element={
                            <WithSessionLogged>
                                <UserView />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.SUBSCRIBE}
                        element={
                            <WithSessionLogged>
                                <Subscribe />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.SHOPPING_CART}
                        element={
                            <WithSessionLogged>
                                <ShoppingCart />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.SUCCESS_CART}
                        element={
                            <WithSessionLogged>
                                <SuccessCart />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.TRAINING_RECORDS}
                        element={
                            <WithSessionLogged>
                                <TrainingRecords />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.TPASS}
                        element={
                            <WithSessionLogged>
                                <MyEmployeeTPass />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.CREATE_COMPANY}
                        element={
                            <WithSessionLogged>
                                <CreateCompany />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.EDIT_COMPANY}
                        element={
                            <WithSessionLogged>
                                <EditCompany />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.DEACTIVATED_COMPANY}
                        element={
                            <WithSessionLogged>
                                <DeactivatedCompany />
                            </WithSessionLogged>
                        }
                    />

                    <Route
                        path={path.NOTALLOWED_COMPANY}
                        element={
                            <WithSessionLogged>
                                <NotAllowedCompany />
                            </WithSessionLogged>
                        }
                    />
                </Routes>

            {/* Admin Pages */}
                <Routes>
                    <Route 
                        path={path.ADMIN_USERS} 
                        element={
                            <WithSessionLogged>
                                <Users/>
                            </WithSessionLogged>
                        }
                        />


                    < Route
                        path={path.ADMIN_COMPANIES} 
                        element={
                        <WithSessionLogged>
                            <Companies/>
                        </WithSessionLogged>
                        }
                        />

                    <Route 
                        path={path.ADMIN_APPROVAL} 
                        element={
                        <WithSessionLogged>
                            <Approval/>
                        </WithSessionLogged>}
                    />

                    <Route 
                        path={path.ADMIN_ANNOUNCEMENT} 
                        element={
                        <WithSessionLogged>
                            <Announcement/>
                        </WithSessionLogged>}
                    />

                    <Route 
                        path={path.ADMIN_AUDITS} 
                        element={
                        <WithSessionLogged>
                            <Audits/>
                        </WithSessionLogged>}
                    />
                    
                    <Route 
                        path="/loadingtest"
                        element={<Loading/>}
                    />
                </Routes>
                <Toaster
                    toastOptions={{
                        style: {
                            zIndex: 9999999,
                        },
                    }}
                />
                
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
