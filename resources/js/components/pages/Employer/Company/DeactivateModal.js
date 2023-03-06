import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import ModalTextArea from "../../../modal/ModalTextArea";
import { apost } from "../../../shared/query";
import { toast } from "react-hot-toast";
import { useAuth, useAuthUpdate } from "../../../default/Session/SessionProvider";
import { useNavigate } from "react-router-dom";
export default function DeactivateModal({ close }) {
    const User = useAuth();
    const getUser = useAuthUpdate();
    const navigate = useNavigate();
    const [isRequested, setisRequested] = useState(false);
    const [Reason, setReason] = useState({
        confirmation: "",
        reason: "",
    });

    const Submit = async (e) => {
        e.preventDefault();

        if (Reason.confirmation != "YES") {
            toast.error("Please make sure your confirmation is exactly 'YES' ");
            return;
        }

        const res = await apost(
            "/api/company/requestDeactivate",
            { reason: Reason.reason },
        );
        getUser();
        close();
        navigate("/employer/dashboard");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setReason((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Modal title={`Deactivate Company?`} close={close}>
            <form className="flex flex-col gap-4">
                <ModalInput
                    id={`confirmation`}
                    value={Reason.confirmation}
                    setValue={handleInputChange}
                    label={`Are you sure? (Type "YES")`}
                />
                <ModalTextArea
                    id={`reason`}
                    value={Reason.reason}
                    setValue={handleInputChange}
                    label={`Reason for Deactivation:`}
                    rows={4}
                />
                <div className="flex flex-row">
                    <button
                        onClick={Submit}
                        type="button"
                        setValue={handleInputChange}
                        className="button mr-auto px-6 py-1"
                    >
                    </button>
                    <button
                        type="button"
                        onClick={() => close()}
                        className="button ml-auto px-6 py-1"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}
