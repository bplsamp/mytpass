import React, { useState, useEffect } from "react";
import EmployerPage from '../../../layouts/EmployerPage'
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthUpdate } 
    from "../../../default/Session/SessionProvider";
import axios from "axios";
import Cookies from "js-cookie";


export default function CreateCompany() {
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();
    const token = Cookies.get("mytpass_session");

    const [Company, setCompany] = useState({
        companyName: "",
        address: "",
        dtiNumber: "",
        companyEmail: "",
        companyContact: "",
        icon: "",
        ownerId: User?.id,
    });
    
    const [Files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFile = (file) => {
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSupportingFilesChange = (e) => {
        const filesArray = [];
        for (let i = 0; i < e.target.files.length; i++) {
            filesArray.push(e.target.files[i]);
        }
        setFiles(filesArray);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompany((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const Submit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (let i = 0; i < Files.length; i++) {
            data.append("files[]", Files[i]);
        }
        data.append("icon", image);

        data.append("company", JSON.stringify(Company));
        const res = await axios.post("http://localhost:8000/api/company/create", data,
        {
            headers: { Authorization: `Bearer ${token}`},
        })
        navigate("/employer/dashboard");
        alert(res?.data?.message)
    };

    useEffect (() => {
        getUser();
    }, [User])
    //console.log(Company)
    //console.log(User)

    return (
        <form
        onSubmit={(e) => Submit(e)}
        className="flex flex-col items-center justify-center gap-12"
    >
        <img
            src={logo}
            className="mr-auto max-w-[120px] max-h-[120px] ml-6"
        ></img>
        <h1 className="text-torange text-[2rem] font-bold">
            Company Registration
        </h1>

        <div className="flex flex-row gap-[5rem]">
            <div className="flex flex-col gap-4">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        className="rounded-full min-h-[300px] min-w-[300px] bg-gray-200 max-w-[300px] max-h-[300px] object-cover"
                    />
                ) : (
                    <div className="rounded-full min-h-[300px] min-w-[300px] bg-gray-200 ">
                        <span className="relative top-[8.5rem] left-[5rem]">
                            Upload your icon
                        </span>
                    </div>
                )}

                <input
                        required
                        type="file"
                        name="icon"
                        id="icon"
                        className="max-w-[300px]"
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files[0])}
                />
            </div>
            <div className="flex flex-col gap-4 w-[770px]">
                <label>Company Name</label>
                    <input
                      name="companyName"
                      id="companyName"
                      value={Company?.companyName}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                />
                <label>Company Address</label>
                    <input
                      name="address"
                      id="address"
                      value={Company?.address}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                />
                <label>DTI Business Name Number</label>
                    <input
                      name="dtiNumber"
                      id="dtiNumber"
                      type="number"
                      value={Company?.dtiNumber}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                />
                <label>Company Email</label>
                    <input
                      name="companyEmail"
                      id="companyEmail"
                      type="email"
                      value={Company?.companyEmail}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                />
                <label>Contact Number</label>
                    <input
                      name="companyContact"
                      id="companycontact"
                      value={Company?.companyContact}
                      maxLength={11}
                      placeholder="09"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                />


                <div className="flex flex-row w-full">
                    <div className="flex flex-col">
                    <label>Supporting Documents</label>
                            <input
                                //required
                                type="file"
                                multiple={true}
                                onChange={(e) => handleSupportingFilesChange(e)}
                            />
                    </div>
                    <div className="ml-auto flex flex-col gap-2">
                        <button type="submit"
                        className='button px-6 py-1 text-[1.5rem]'>
                            Sign Up
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
        </div>
    </form>
);
}