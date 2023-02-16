import React, { useState, useEffect } from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import ModalSelect from "../../../modal/ModalSelect";
import UserList from "../UserList";
import users from "../users.json";
import { IoMdClose } from "react-icons/io";

import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

const opts = ["Test1", "Test2"];
export default function ScheduleTraining({ close }) {
    const [Users, setUsers] = useState(users);

    const handleChangeInvited = (index) => {
        console.log("CLICKED");
        let newArr = [...Users];
        if (newArr[index].invited != true) {
            newArr[index].invited = true;
        } else {
            newArr[index].invited = false;
        }
        setUsers(newArr);
    };

    useEffect(() => {
        console.log(Users);
    }, [Users]);

    const ListUsers = ({ users }) => {
        return users?.map((user, i) => {
            return (
                <div
                    key={`LIST${i}`}
                    className="border border-gray-300  flex flex-row items-center p-2"
                >
                    <motion.div
                        initial={false}
                        key={`LIST${i}`}
                        className={`flex flex-row w-full ${
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
                    </motion.div>
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
                        className="border border-gray-300  flex flex-row items-center p-2"
                    >
                        <motion.div
                            key={`INVITED${i}`}
                            initial={false}
                            animate={
                                user?.invited != true
                                    ? { opacity: 0 }
                                    : { opacity: 1 }
                            }
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
                        </motion.div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
        w
        </>
    )
}
