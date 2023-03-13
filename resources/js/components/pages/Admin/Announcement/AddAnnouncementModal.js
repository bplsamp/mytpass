import React, { useState, useRef, useEffect } from "react";
import Modal from "../../../modal/Modal";
import ModalInput from "../../../modal/ModalInput";
import { BsImageAlt } from "react-icons/bs";
import { apost } from "../../../shared/query";

export default function AddAnnouncementModal({ close, refetch }) {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInput = useRef(null);
    const [content, setContent] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const handleFile = (file) => {
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", image);
        data.append("content", content);
        await apost("/api/announcements/create", data, setisLoading, null);
        refetch();
        close();
    };

    return (
        <Modal close={close} title={`Add Announcement`}>
            <form onSubmit={(e) => handleAdd(e)} className="flex flex-col">
                <div
                    onClick={() => fileInput?.current?.click()}
                    className="cursor-pointer hover:opacity-80 h-[400px] w-[400px] flex flex-col items-center justify-center border border-gray-400 text-gray-400"
                >
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInput}
                        hidden
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                    {previewUrl != null && previewUrl ? (
                        <img 
                            src={previewUrl}
                            className="max-h-[400px] max-w-[400px]" 
                        />
                    ) : (
                        <>
                            <BsImageAlt className="text-[10rem] p-12" />
                            <span>Upload your image here</span>
                        </>
                    )}
                </div>
                
                <ModalInput
                    value={content}
                    id={`content`}
                    label={`Input Training Details URL`}
                    setValue={handleInputChange}
                />

                <button type="submit" className="button px-6 py-1 ml-auto m-2">
                    Upload
                </button>
            </form>
        </Modal>
    );
}
