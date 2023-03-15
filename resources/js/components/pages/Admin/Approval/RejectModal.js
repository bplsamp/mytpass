import React, { useState } from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import ModalTextArea from "../../../modal/ModalTextArea";
import { apost } from "../../../shared/query";

export default function RejectModal({ companyId, close, company, refetch, ownerEmail, ownerId }) {
    const [Reason, setReason] = useState("");
    const rejectCompany = async (e) => {
        e.preventDefault();

        console.log("ownerEmail", ownerEmail);
        await apost(
            "/api/admin/rejectCompany",
            { ownerId, ownerId, companyId: companyId, ownerEmail: ownerEmail, reason: Reason }
        );
        refetch();
        close();
    };

    const handleInputChange = (e) => {
        setReason(e.target.value);
    };
    return (
        <Modal
            title={`Reject ${company}?`}
            close={close}
        >
            <form className="flex flex-col gap-4 p-4 w-[350px]">
                {/*<ModalInput label={`Email Address`} type={`email`} />*/}
                <ModalTextArea
                    value={Reason}
                    setValue={handleInputChange}
                    label={`Reason for rejection`}
                    id={`reason`}
                    rows={8}
                />
                <button
                    type="button"
                    onClick={(e) => rejectCompany(e)}
                    className="button px-4 py-1 ml-auto"
                >
                    Send
                </button>
            </form>
        </Modal>
    );
}
