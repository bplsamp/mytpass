import React from "react";
import SideNav from "../default/SideNav/SideNav";

import { useLocation, useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NoCompany from "../pages/Employer/Dashboard/NoCompany";
import WaitingApproval from "../pages/Employer/Company/WaitingApproval";

export default function EmployerPage ({ children }) {

    const location = useLocation();
    const navigate = useNavigate();

    const withCompany = user?.companyId ? true : false;
    const isActiveCompany =
        (user?.companyId && user?.company?.companyStatus == "Active") ||
        user?.company?.companyStatus == "Requested Deactivation";
        
    const path = location?.pathname.replace("/employer/", "");

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
                                {user?.companyId ? (
                                    <div
                                        className="flex items-center gap-4 hover:opacity-60 cursor-pointer"
                                        onClick={() =>
                                            navigate("/employer/editcompany")
                                        }
                                    >
                                        <LazyLoadImage
                                            effect="blur"
                                            src={user?.company?.icon}
                                            className={`max-w-[49px] max-h-[49px] object-scale-down rounded-full`}
                                        ></LazyLoadImage>
                                        <span className="text-[1.3rem]">
                                            {user?.company?.companyName}
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
                            <div>
                                <TextLogo textShadow={`1px 1px gray`} />
                            </div>
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
