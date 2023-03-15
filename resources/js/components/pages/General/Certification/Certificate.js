import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import Modal from "../../../modal/Modal";
import { toPng } from "html-to-image";
import { AiOutlineDownload } from "react-icons/ai";
import QueryApi from "../../../Query/QueryApi";
import { useAuth } from "../../../default/Session/SessionProvider";

export default function Certificate({ training, user, close }) {
    const ref = useRef(null);
    const [isDownloading, setisDownloading] = useState(false);
        
    const { data } = QueryApi(
        ["company"],
        "/api/employer/getCompany",
        null,
        {
            id: training?.companyId,
        }
    );
    
    const download = async (title) => {
        if (ref.current === null) {
            toast.error("Unexpected error, please try again later");
            return;
        }

        const dataUrl = await toPng(ref.current, { cacheBust: true });
        const link = document.createElement("a");
        link.download = `${title}_e-certificate.png`;
        link.href = dataUrl;
        link.click();
    };

    if (training == null) {
        return <Modal close={close}>No certificate found</Modal>;
    }

    if(user && user != null) {
        console.log(user);
    } else {
        const User = useAuth();
        user = User?.firstName + " " + User?.middleInitial + " " + User?.lastName
    }

    return (
        <Modal close={close}>
            {isDownloading ? (
                <div className="cursor-pointer hover:opacity-80 transition text-[1.5rem] ml-auto">
                    Loading...
                </div>
            ) : (
                <AiOutlineDownload
                    className="cursor-pointer hover:opacity-80 transition text-[1.5rem] ml-auto relative bottom-[43px] right-[90px]"
                    onClick={async () => {
                        setisDownloading(true);
                        await download(training?.title);
                        setisDownloading(false);
                    }}
                />
            )}
            <div
                className="flex flex-col pt-[3.1rem] items-center w-full h-full min-h-[680px] min-w-[968px] gap-[1.8rem] overflow-hidden max-h-[680px] max-w-[968px]"
                ref={ref}
                style={{
                    backgroundSize: "968px",
                    backgroundImage:
                        "url('https://mytpasscsb.s3.ap-southeast-1.amazonaws.com/certbg.png')",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="relative w-[1400px]">
                    <div className="absolute z-10 overflow-hidden ">
                        <img
                            className="opacity-50"
                            src={`https://mytpass.s3.ap-southeast-1.amazonaws.com/cert.png`}
                        />
                    </div>
                </div>
                <div>
                    <b className="text-[42px]">Certificate of Achievement</b>
                </div>
                <span class="text-[16px]">
                    This certificate is proudly awarded to
                </span>

                <div
                    class="text-[69px] capitalize"
                    style={{
                        borderBottom: "solid 1px black",
                        paddingLeft: "2rem",
                        paddingRight: "2rem",
                        fontFamily: "Great Vibes",
                    }}
                >
                    {user}

                </div>

                <div class="flex flex-row">
                    <span class="text-[15px]">
                        Congratulations on Completing
                    </span>
                    <div class="line-clamp underline2">{training?.title}</div>
                </div>

                <div class="rowDetails">
                    <div class="colDetails">
                        <div class="underline2">
                            {moment(training?.completionDate).format(
                                "MMM DD, YYYY"
                            )}
                        </div>
                        <span class="text">DATE</span>
                    </div>
                    <img
                        src="https://mytpass.s3.ap-southeast-1.amazonaws.com/cropped.png"
                        width="170px"
                    />
                    <div class="col">
                        <div class="underline2">
                            {data?.companyName}
                        </div>
                        <span class="text-center">COMPANY</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
