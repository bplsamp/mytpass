import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import ModalSelect from "../../../modal/ModalSelect";
import ModalTextArea from "../../../modal/ModalTextArea";
import { GiTiedScroll } from "react-icons/gi";
import Trainings from "./Trainings";
import { apost } from "../../../shared/query";
import { useLocation } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../../../default/Session/SessionProvider";

export default function AddTrainingModal({ close, refetch }) {
    const location = useLocation();
    const User = useAuth();
    const getUser = useAuthUpdate();
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");

    const [isLoading, setisLoading] = useState(false);
        const [Image, setImage] = useState(null);
        const [previewUrl, setPreviewUrl] = useState("");
        const [isTrainingExpiring, setisTrainingExpiring] = useState(false);
        const [Training, setTraining] = useState({
            title: "a",
            speaker: "b",
            provider: "c",
            completionDate: "2000-10-12",
            category: "General",
            expiryDate: null?null:"",
            feedback: "a",
            result: "completed",
            type: "Short Term",
            userId: id ? id : User?.id,
            venueUrl: "url",
        });

        const handleFile = (file) => {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
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

            const data = new FormData();
            data.append("certificate", Image);
            data.append(
                "training",
                JSON.stringify(
                    Object.fromEntries(
                        Object.entries(Training).filter(([_, v]) => v != null)
                    )
                )
            );

            const res = await apost(
                "/api/trainings/create",
                data,
            );
            alert(res?.data?.message)
            close();
            refetch();
        };

        console.log(Training);
        return (
            <Modal
                icon={GiTiedScroll}
                title={`Enter Training Detail`}
                onOutsideclick={close}
                close={close}
            >
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-row gap-4 p-4"
                >
                    <div className="flex flex-col gap-4 w-[300px]">
                        <ModalInput
                            value={Training.title}
                            id={`title`}
                            label={`Training Title`}
                            setValue={handleInputChange}
                        />
                        <ModalInput
                            value={Training.provider}
                            id={`provider`}
                            label={`Training Provider`}
                            setValue={handleInputChange}
                        />
                        <div className="flex flex-col mt-[3rem]">
                        </div>
                        <ModalSelect
                            value={Training.category}
                            id={`category`}
                            label={`Category of Training`}
                            options={["General", "Technical Aspect", "Human Aspect", "Commercial Aspect"]}
                            setValue={handleInputChange}
                        />
                        <ModalTextArea
                            value={Training.feedback}
                            label={`Feedback`}
                            rows={8}
                            id={`feedback`}
                            setValue={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <ModalInput
                            value={Training.speaker}
                            id={`speaker`}
                            label={`Speaker`}
                            setValue={handleInputChange}
                        />
                        <ModalInput
                            value={Training.completionDate}
                            id={`completionDate`}
                            label={`Completion Date`}
                            type={`date`}
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
                            value={Training.expiryDate}
                            id={`expiryDate`}
                            label={`Expiry Date`}
                            type={`date`}
                            setValue={handleInputChange}
                        />
                        <ModalInput
                            label={`Result`}
                            id={`result`}
                            value={Training.result}
                            setValue={handleInputChange}
                        />
                        <ModalSelect
                            value={Training.type}
                            setValue={handleInputChange}
                            id={`type`}
                            label={`Type of Training`}
                            options={["Short Term", "Long Term", "Refresher", "Internationally Acknowledge"]}
                        />

                        <label htmlFor="cert">Certificate (Image)</label>
                        <input
                            id="certificate"
                            name="certificate"
                            type="file"
                            onChange={(e) => {
                                handleFile(e.target.files[0]);
                            }}
                        />
                        <button
                            type="submit"
                            className="button ml-auto px-8 py-1"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => close()}
                            className="hover:opacity-80 hover:underline ml-auto text-[0.8rem] mr-[30px] -mt-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        );
}
