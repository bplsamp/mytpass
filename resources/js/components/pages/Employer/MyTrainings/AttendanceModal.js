import React, {
    useState,
    useEffect,
} from "react";
import Modal from "../../../modal/Modal";
import { RiFileList3Fill } from "react-icons/ri";
import Search from "../../../shared/Search";
import ModalInput from "../../../modal/ModalInput";
import ModalSelect from "../../../modal/ModalSelect";
import QueryApi from "../../../Query/QueryApi";
import { QueryApiPost } from "../../../Query/QueryApi";
import { apost } from "../../../shared/query";

export default function AttendanceModal({ close, training, refetch }) {
    const [Training, setTraining] = useState({
        id: training?.id,
        feedback: "",
        result: "",
    });

    const [Users, setUsers] = useState([]);

    const UserCard = ({ user, idx }) => {
        return (
            <div className="flex flex-row  border-b border-gray-400 p-2 items-center gap-[12rem]">
                <span>{user?.userFullname} [{user?.contact}]</span>

                <select
                    disabled={training?.status == "completed"}
                    value={user.isPresent ? "present" : "absent"}
                    className="ml-auto px-4 py-1 border border-gray-400 rounded-md outline-0 focus:ring-2 focus:ring-orange-400"
                    onChange={(e) => handleUserState(e, idx, e.target.value)}
                >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
            </div>
        );
    };

    const { data } = QueryApiPost(
        ["getUsersByTraining"],
        "/api/trainings/getUsersByTraining",
        {
            trainingId: training?.id,
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apost("/api/trainings/completeTraining", {
            users: Users,
            training: Training,
        });
        close();
        refetch();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTraining((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUserState = (e, index) => {
        let array = [...Users];
        array[index].isPresent = e.target.value == "present" ? true : false;
        setUsers(array);
    };

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    return (
        <Modal
            icon={RiFileList3Fill}
            title={`Attendance Sheet / Generate Training Certificate`}
            close={close}
        >
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col gap-6 items-center pb-4"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        {Users &&
                            Users?.map((user, idx) => (
                                <UserCard
                                    key={user?.id}
                                    user={user}
                                    idx={idx}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex flex-row w-full gap-4 items-center justify-center">
                    <ModalInput
                        id={`feedback`}
                        value={Training.feedback}
                        label={`Feedback`}
                        required
                        setValue={handleInputChange}
                        disabled={training?.status == "completed"}
                    />
                    <ModalInput
                        id={`result`}
                        value={Training.result}
                        label={`Result`}
                        required
                        setValue={handleInputChange}
                        disabled={training?.status == "completed"}
                    />
                </div>

                <div className="items-center flex flex-col">
                    {training?.status == "pending" && (
                        <button
                            className="button px-8 py-1 ml-auto mb-2"
                        >
                            Generate
                        </button>
                    )}
                    <button
                        onClick={() => close()}
                        type="button"
                        className="underline text-[12px]"
                    >
                        cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}
