import React from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import ModalTextArea from "../../../modal/ModalTextArea";

export default function RejectModal({ close, company }) {
    return (
        <Modal
            title={`Reject ${company}?`}
            close={close}
            onOutsideclick={close}
        >
            <form className="flex flex-col gap-4 p-4 w-[350px]">
                <ModalInput label={`Email Address`} type={`email`} />
                <ModalTextArea
                    label={`Reason for rejection`}
                    id={`reason`}
                    rows={8}
                />
                <button className="button px-4 py-1 ml-auto">Send</button>
            </form>
        </Modal>
    );
}
