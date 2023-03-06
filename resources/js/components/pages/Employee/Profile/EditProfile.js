import React, { useState, useEffect } from "react";
import EmployeePage from "../../../layouts/EmployeePage";
import { IoMdQrScanner } from "react-icons/io";
import Input from "../../../default/Inputs/Input";
import Select from "../../../default/Inputs/Select";
import FooterLogged from "../../../footer/FooterLogged";
import { useAuth, useAuthUpdate } from "../../../default/Session/SessionProvider";
import { useNavigate } from "react-router-dom";
import { apost } from "../../../shared/query";
import avatar from "../../../assets/images/user.png";
export default function EditProfile() {
    const user = useAuth();
    const getUser = useAuthUpdate();
    const navigate = useNavigate();
    const [Profile, setProfile] = useState(user);
    const [Image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFile = (file) => {
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name == "isSearchable") {
            setProfile((prev) => ({
                ...prev,
                [name]: e.target.checked,
            }));

            return;
        }
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //send it by for because of image
        const data = new FormData();
        for (let key in Profile) {
            data.append(key, Profile[key]);
        }

        delete Profile.company;
        data.append("avatar", Image);
        data.append(
            "user",
            JSON.stringify(
                Object.fromEntries(
                    Object.entries(Profile).filter(([_, v]) => v != null)
                )
            )
        );

        const res = await apost("/api/updateProfile", data);
        setTimeout(() => {
            getUser();
        }, 1000);

        alert(res?.data?.message);
        
        
        navigate("/profile");
        location.reload();
    };

    console.log(Profile);

    return (
        <EmployeePage>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-row justify-center items-center gap-8 min-h-[68vh] bg-white ">
                    <div className="flex flex-col max-w-[300px] gap-6">
                        <div className="max-w-[150px] max-h-[150px]">
                            <img
                                width="150"
                                className="rounded-full border-4 border-lorange z-10 ml-8 object-scale-down max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px]"
                                src={
                                    previewUrl
                                        ? previewUrl
                                        : user?.avatar
                                        ? user?.avatar
                                        : avatar
                                }
                            />
                        </div>
                        <input
                            type="file"
                            id={`avatar`}
                            name={`avatar`}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                handleFile(file);
                                setProfile((prev) => ({
                                    ...prev,
                                    avatar: file,
                                }));
                            }}
                        />
                        <span className="font-medium text-[1.2rem]">Bio</span>
                        <textarea
                            className="input"
                            rows={5}
                            placeholder={`Bio is empty...`}
                            id={`bio`}
                            name={`bio`}
                            value={Profile?.bio ? Profile?.bio : ""}
                            onChange={(e) => handleInputChange(e)}
                        >
                            {user?.bio}
                        </textarea>

                        <div className="flex flex-row">
                            <input
                                type="checkbox"
                                className="w-[70px] checkbox"
                                checked={Profile?.isSearchable}
                                id={`isSearchable`}
                                name={`isSearchable`}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            />
                            <div className="flex flex-col">
                                <span>Make my profile</span> visible to
                                companies
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row gap-8">
                            <Input
                                label={`Email Address`}
                                type={`email`}
                                id={`email`}
                                value={Profile?.email}
                                setValue={handleInputChange}
                            />
                            <Input
                                label={`Contact No.`}
                                id={`contact`}
                                value={Profile?.contact}
                                setValue={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-row gap-4">
                            <Input
                                label={`First Name`}
                                id={`firstName`}
                                value={Profile?.firstName}
                                setValue={handleInputChange}
                                style={`max-w-[170px]`}
                            />
                            <Input
                                label={`Last Name`}
                                id={`lastName`}
                                value={Profile?.lastName}
                                setValue={handleInputChange}
                                style={`max-w-[170px]`}
                            />
                            <Input
                                label={`M.I`}
                                id={`middleInitial`}
                                value={Profile?.middleInitial}
                                setValue={handleInputChange}
                                style={`max-w-[100px]`}
                            />
                        </div>

                        <div className="flex flex-row gap-8">
                            <Input
                                label={`Old Password`}
                                id={`oldpassword`}
                                type={`password`}
                                value={Profile?.oldpassword}
                                setValue={handleInputChange}
                            />
                            <Input
                                label={`New Password`}
                                id={`newpassword`}
                                type={`password`}
                                value={Profile?.newpassword}
                                setValue={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col ml-auto items-center justify-center mt-6">
                            <button
                                type="submit"
                                className="button px-8 py-1 text-[1.2rem]"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="underline hover:opacity-75 mt-2"
                                onClick={() => navigate("/profile")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <FooterLogged />
        </EmployeePage>
    );
}
