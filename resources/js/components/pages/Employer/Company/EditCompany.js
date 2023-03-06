import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import DeactivateModal from "./DeactivateModal";
import { useAuth, useAuthUpdate } from "../../../default/Session/SessionProvider";
import { apost } from "../../../shared/query";

export default function EditCompany() {
    const user = useAuth();
    const getUser = useAuthUpdate();
    const navigate = useNavigate();
    const [ShowConfirm, setShowConfirm] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [Image, setImage] = useState(null);

    const [Company, setCompany] = useState({
        id: user?.company?.id,
        companyEmail: user?.company?.companyEmail,
        companyContact: user?.company?.companyContact,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompany((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFile = (file) => {
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleUpdateCompany = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in Company) {
            data.append(key, Company[key]);
        }

        data.append("icon", Image);

        data.append(
            "company",
            JSON.stringify(
                Object.fromEntries(
                    Object.entries(Company).filter(([_, v]) => v != null)
                )
            )
        );

        await apost("/api/employer/editcompany", data);
        navigate("/employer/dashboard");
        getUser();
    };

    return (
        <form
            onSubmit={(e) => handleUpdateCompany(e)}
            className="flex flex-col items-center justify-center gap-12"
        >
            <img
                src={logo}
                className="mr-auto max-w-[120px] max-h-[120px] ml-6"
            ></img>
            <h1 className="text-torange text-[2rem] font-bold">
                Edit Company Profile
            </h1>

            <div className="flex flex-row gap-[5rem] w-full items-center justify-center">
                <div className="flex flex-col gap-4">
                    {previewUrl ? (
                        <img
                            className="rounded-full min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px] object-cover bg-gray-200"
                            src={previewUrl}
                        ></img>
                    ) : user?.company?.icon ? (
                        <img
                            className="rounded-full min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px] object-cover bg-gray-200"
                            src={user?.company?.icon}
                        ></img>
                    ) : (
                        <div className="rounded-full min-h-[300px] min-w-[300px] bg-gray-200 ">
                            <span className="relative top-[8rem] left-[4.6rem]">
                                Upload your icon
                            </span>
                        </div>
                    )}

                    <input
                        type="file"
                        className=" max-w-[300px]"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            handleFile(file);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4 w-[700px]">
                    <label>Company Email</label>
                        <input
                            name="companyEmail"
                            id="companyEmail"
                            value={Company?.companyEmail}
                            className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                            onChange={(e) => handleInputChange(e)}
                        />

                    <label>Contact Number</label>
                        <input
                            name="companyContact"
                            id="companyContact"
                            value={Company?.companyContact}
                            className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                            onChange={(e) => handleInputChange(e)}
                        />

                    <div className="ml-auto flex flex-col gap-2">
                        <button
                            type="submit"
                            className="button px-6 py-1 text-[1.5rem]"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="underline hover:opacity-80 text-[1.5rem] text-blue-400"
            >
                Deactivate company?
            </button>
            {user?.company?.companyStatus == "requested deactivation" ? (
                <span
                    className="hover:opacity-80 text-[1rem] text-red-400"
                >
                    Already Requested for Deactivation
                </span>
            ) : ShowConfirm && (
                <DeactivateModal close={() => setShowConfirm(false)} />
            )}
        </form>
    );
}
