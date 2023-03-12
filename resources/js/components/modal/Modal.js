import React from "react";
import BaseModal from "./BackDrop";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

function Modal({ close, children, title, icon }) {
    const Icon = icon;
    return (
        <BaseModal close={close}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-4 overflow-y-auto max-h-full text-gray-600"
            >
                <div className="mr-auto ml-auto flex flex-row justify-center items-center gap-4 p-4">
                    <span className="flex gap-4 items-center text-purple text-[1.2rem] sm:text-[1rem]">
                        {Icon ? <Icon className="text-torange" /> : <></>}
                        <span className="font-medium">{title}</span>
                    </span>

                    <IoMdClose
                        className="ml-auto hover:text-red-400 cursor-pointer text-[1.5rem]"
                        onClick={close}
                    />
                </div>
                {children}
            </div>
        </BaseModal>
    );
}

export default React.memo(Modal);
