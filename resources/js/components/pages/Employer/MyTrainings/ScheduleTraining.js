import React, { useState, useEffect } from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import ModalSelect from "../../../modal/ModalSelect";
import UserList from "../UserList";
import users from "../users.json";
import QueryApi from "../../../Query/QueryApi";
import { apost } from "../../../shared/query";
import { useAuth } from "../../../default/Session/SessionProvider";
import { IoMdClose } from "react-icons/io";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";
const opts = ["Test1", "Test2"];

export default function ScheduleTraining({ close, refetch }) {
    const { data } = QueryApi("myCompanyUsers", "/api/employer/myCompanyUsers");
    const user = useAuth();
    
    const [isTrainingExpiring, setisTrainingExpiring] = useState(true);
    const [Users, setUsers] = useState(data);
    const [Training, setTraining] = useState({
        title: "a",
        speaker: "b",
        provider: "c",
        completionDate: "2025-02-20",
        category: "test1",
        expiryDate: null?null:"",
        feedback: "",
        result: "PENDING",
        status: "pending",
        type: "test1",
        inputtedBy: user?.id,
        inputtedName: user?.firstName + " " + user?.lastName,
        venueUrl: "TESTVENUEURL",
        certificate: '',
        isScheduled: true,
        companyId: user?.companyId,
    });

    const handleChangeInvited = (e) => {
        let newArr = [...Users];
        if (newArr[e].invited != true) {
            newArr[e].invited = true;
        } else {
            newArr[e].invited = false;
        }
        setUsers(newArr);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setTraining((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let users = Users.map((user) => {
            if (user.invited) {
                return {
                    id: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    contact: user?.contact
                };
            }
        
        }).filter((f) => f != undefined);


        if (users.length <= 0) {
            alert("No invited users");
            return;
        }
        await apost("/api/trainings/bulkInsert", {
            training: Training,
            users: users,
        });
        close();
        refetch();
    };

    const handleSearchUsers = (e) => {
        console.log(String(e.target.value).length > 0);

        if (String(e.target.value).length > 0 === true) {
            console.log("called");
            setUsers(
                data.filter(
                    (user) =>
                        user?.firstName
                            ?.toLowerCase()
                            .includes(e.target.value.toLowerCase()) ||
                        user?.lastName
                            ?.toLowerCase()
                            .includes(e.target.value.toLowerCase)
                )
            );
        } else {
            setUsers(data);
        }
    };

    useEffect(() => {
        console.log(data);
        data && setUsers(data);
    }, [data]);

    const ListUsers = ({ users }) => {
        return users?.map((user, i) => {
            return (
                <div
                    key={`LIST${i}`}
                    className="border border-gray-300  flex flex-row items-center p-2"
                >
                    <div
                        key={`LIST${i}`}
                        className={`flex flex-row w-full capitalize ${
                            user?.invited == true ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        {user?.firstName} {user?.lastName}{" "}
                        {user?.invited != true ? (
                            <BsFillArrowRightCircleFill
                                onClick={() => handleChangeInvited(i)}
                                className="ml-auto text-green-500 text-[1.6rem] cursor-pointer"
                            />
                        ) : (
                            <BsFillArrowLeftCircleFill
                                onClick={() => handleChangeInvited(i)}
                                className="ml-auto text-red-500 text-[1.6rem] cursor-pointer"
                            />
                        )}
                    </div>
                </div>
            );
        });
    };

    const InvitedUsers = ({ users }) => {
        return (
            <div>
                {users?.map((user, i) => (
                    <div
                        key={`INVITED${i}`}
                        className="border border-gray-300  flex flex-row items-center p-2 capitalize"
                    >
                        <div
                            key={`INVITED${i}`}
                            className={`flex flex-row  w-full ${
                                user?.invited != true
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                        >
                            {user?.firstName} {user?.lastName}{" "}
                            {user?.invited != true ? (
                                <BsFillArrowRightCircleFill
                                    onClick={() => handleChangeInvited(i)}
                                    className="ml-auto text-green-500 text-[1.6rem] cursor-pointer"
                                />
                            ) : (
                                <BsFillArrowLeftCircleFill
                                    onClick={() => handleChangeInvited(i)}
                                    className="ml-auto text-red-500 text-[1.6rem] cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Modal
            title={`Enter Training Details`}
            close={close}
            onOutsideclick={close}
        >
            <div className="flex flex-col">
                <form className="flex flex-row gap-6 p-4">
                    <div className="flex flex-col gap-4">
                        <ModalInput
                            id={`title`}
                            label={`Training Title`}
                            value={Training.title}
                            setValue={handleInputChange}
                        />
                        <ModalInput
                            id={`provider`}
                            label={`Training Provider`}
                            value={Training.provider}
                            setValue={handleInputChange}
                        />
                        {/* <div className="flex flex-col">
                        <span>Does the Training Expires?</span>
                        <div className="flex flex-row gap-4">
                            <label>Yes</label>
                            <input type={`radio`} />
                            <label>No</label>
                            <input type={`radio`} />
                        </div>
                    </div>*/}
                        <div className="flex flex-col mt-[3rem]"></div>
                        <ModalSelect
                            id={`category`}
                            label={`Category of Training`}
                            options={opts}
                            value={Training.category}
                            setValue={handleInputChange}
                        />
                        <ModalInput
                            label={`Venue`}
                            id={`venueUrl`}
                            value={Training.venueUrl}
                            setValue={handleInputChange}
                        />

                        <div className="">
                            <span>Invite</span>
                            <input
                                onChange={(e) => handleSearchUsers(e)}
                                placeholder="🔍︎ Search"
                                className="input min-h-[44.29px] text-[0.8rem]"
                            />
                            <ListUsers users={Users} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ModalInput
                            id={`speaker`}
                            label={`Speaker`}
                            value={Training.speaker}
                            setValue={handleInputChange}
                        />
                        <ModalInput
                            id={`date`}
                            label={`Date`}
                            type={`date`}
                            value={Training.date}
                            setValue={handleInputChange}
                        />
                        <div className="flex flex-col">
                            <span>Does the Training Expires?</span>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-row gap-4">
                                    <label htmlFor="yes">Yes</label>
                                    <input
                                        type="radio"
                                        className=""
                                        id="yes"
                                        name="yes"
                                        checked={isTrainingExpiring}
                                        onChange={(e) =>
                                            setisTrainingExpiring(true)
                                        }
                                    />
                                </div>

                                <div className="flex flex-row gap-4">
                                    <label htmlFor="no">No</label>
                                    <input
                                        type="radio"
                                        className=""
                                        id="no"
                                        name="no"
                                        checked={!isTrainingExpiring}
                                        onChange={(e) =>
                                            setisTrainingExpiring(false)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <ModalInput
                            disabled={!isTrainingExpiring}
                            id={`expiryDate`}
                            label={`Expiry Date`}
                            type={`date`}
                            value={Training.expiryDate}
                            setValue={handleInputChange}
                        />

                        <ModalSelect
                            id={`type`}
                            label={`Type of Training`}
                            options={opts}
                            value={Training.type}
                            setValue={handleInputChange}
                        />
                        <div>
                            <span className="opacity-0">Invite</span>
                            <input
                                className="input min-h-[44.29px] opacity-0"
                                disabled
                            />
                            <InvitedUsers users={Users} />
                        </div>
                    </div>
                </form>
                <div className="flex flex-row ml-auto gap-4">
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="button px-4 py-2"
                    >
                        Send
                    </button>
                    <button
                        onClick={() => {
                            close();
                        }}
                        className="underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    )
}
