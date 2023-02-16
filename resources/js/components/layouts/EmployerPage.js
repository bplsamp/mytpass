import React, { useEffect } from "react";
import SideNav from "../default/SideNav/SideNav";

import { useLocation, useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NoCompany from "../pages/Employer/Dashboard/NoCompany";
import WaitingApproval from "../pages/Employer/Company/WaitingApproval";
import { useAuth, useAuthUpdate } from "../default/Session/SessionProvider";

export default function EmployerPage ({ children }) {

    const location = useLocation();
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

    useEffect (() => {
    getUser()
    console.log(User)
    }, [User])
        
    const path = location?.pathname.replace("/employer/", "");
    
    const withCompany = User?.companyId ? true : false;
    const isActiveCompany =
        (User?.company?.companyStatus == "Active") ||
        User?.company?.companyStatus == "Requested Deactivation";

    return (
        <div className="min-h-screen flex flex-col bg-[#ECF0F4]">
            <div className="flex flex-row">
                <SideNav
                    withCompany={withCompany}
                    isActiveCompany={isActiveCompany}
                />
                <div className="flex flex-col w-full ">
                    <div className="px-4 bg-white">
                        <div className="flex flex-row">
                            <h1 className="font-medium text-[1.5rem]">
                                Employers Side
                            </h1>

                            <div className="font-medium ml-auto flex flex-row gap-4 items-center relative top-3 mr-6">
                                {User?.companyId ? (
                                <div
                                    className="flex items-center gap-4 hover:opacity-60 cursor-pointer"
                                    onClick={() =>
                                        navigate("/employer/editcompany")
                                    }
                                >
                                    <LazyLoadImage
                                        effect="blur"
                                        src={User?.company?.icon}
                                        className={`max-w-[49px] max-h-[49px] object-scale-down rounded-full`}
                                    ></LazyLoadImage>
                                    <span className="text-[1.3rem]">
                                        {User?.company?.companyName}
                                    </span>
                                </div>
                                ) : (
                                    <>
                                        <FaBuilding />
                                        <span
                                            onClick={() =>
                                                navigate(
                                                    "/employer/createcompany"
                                                )
                                            }
                                            className="underline text-blue-500 hover:opacity-80 cursor-pointer font-normal"
                                        >
                                            Create company
                                        </span>
                                    </>
                                )}
                                    
                                
                                        
                                    
                                
                            </div>
                        </div>

                        <div className="text-[1.2rem] flex flex-row gap-1 ">
                            <span>-</span>
                            <span className="capitalize">{path}</span>
                        </div>
                    </div>
                    {withCompany ? (
                        isActiveCompany ? (
                            children
                        ) : (
                            <WaitingApproval />
                        )
                    ) : (
                        <NoCompany />
                    )}
                </div>
            </div>
        </div>
    );
}
