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

import { apost } from "../../../shared/query";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../default/Session/SessionProvider";

export default function EditTrainingModal({ close, refetch, training }) {
    const optsCategory = ["General", "Technical Aspect", "Human Aspect", "Commercial Aspect"];
    const optsType = ["Short Term", "Long Term", "Refresher", "Internationally Acknowledge"];
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    const id = urlParams.get("id");
    const user = useAuth();

    const [isTrainingExpire, setisTrainingExpire] = useState(false);
    const [Training, setTraining] = useState(training);

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

        await apost(
            "/api/trainings/update",
            {
                id: training?.id,
                training: Training,
            },
        );
        close();
        refetch();
    };

    return (
        <Modal
            icon={GiTiedScroll}
            title={`Update Training Detail`}
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
                    <div className="flex flex-col mb-5">
                        <span>Does the Training Expires?</span>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-row gap-4">
                                <label htmlFor="yes">Yes</label>
                                <input
                                    type="radio"
                                    className=""
                                    id="yes"
                                    name="yes"
                                    checked={isTrainingExpire}
                                    onChange={(e) => setisTrainingExpire(true)}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <label htmlFor="no">No</label>
                                <input
                                    type="radio"
                                    className=""
                                    id="no"
                                    name="no"
                                    checked={!isTrainingExpire}
                                    onChange={(e) => setisTrainingExpire(false)}
                                />
                            </div>
                        </div>
                    </div>
                    <ModalSelect
                        value={Training.category}
                        id={`category`}
                        label={`Category of Training`}
                        options={optsCategory}
                        setValue={handleInputChange}
                    />

                    <ModalInput
                        value={Training.venueUrl}
                        id={`venue`}
                        label={`Venue`}
                        setValue={handleInputChange}
                    />
                    {/*   <ModalTextArea
                        value={Training.feedback}
                        label={`Feedback`}
                        rows={8}
                        id={`feedback`}
                        setValue={handleInputChange}
                    /> */}
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
                        label={`Date`}
                        type={`datetime-local`}
                        setValue={handleInputChange}
                    />

                    <ModalInput
                        disabled={!isTrainingExpire}
                        value={Training.expiryDate}
                        id={`expiryDate`}
                        label={`Expiry Date`}
                        type={`date`}
                        setValue={handleInputChange}
                    />
                    {/*   <ModalInput
                        label={`Result`}
                        id={`result`}
                        value={Training.result}
                        setValue={handleInputChange}
                    /> */}
                    <ModalSelect
                        value={Training.type}
                        setValue={handleInputChange}
                        id={`type`}
                        label={`Type of Training`}
                        options={optsType}
                    />

                    {/*  <label htmlFor="cert">Certificate / Document</label>
                    <input
                        id="cert"
                        name="cert"
                        type="file"
                        onChange={(e) => {
                            handleFile(e.target.files[0]);
                        }}
                    /> */}
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
