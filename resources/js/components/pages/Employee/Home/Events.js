import React from "react";  
import { Carousel } from "3d-react-carousal";

const slides = [
    <img
        style={{ minHeight: "700px" }}
        src="https://www.dozuki.com/hubfs/Imported_Blog_Media/Main%20manufacturing%20training%20image.png"
        height={700}
        width={1000}
        alt="1"
    />,
    <img
        style={{ minHeight: "700px" }}
        src="https://pttc.gov.ph/wp-content/uploads/2020/06/Food.png"
        height={700}
        width={1000}
        alt="2"
    />,
    <img
        style={{ minHeight: "700px" }}
        src="https://www.dualtech.org.ph/wp-content/uploads/2022/02/MACHINING-1-800x600.jpg"
        height={700}
        width={1000}
        alt="3"
    />,
];

export default function Events() {
    return (
        <div className="min-h-[95vh] flex flex-col bg-gray-200 p-12 text-[1.5rem] items-center justify-center">
            <span className="mb-8 text-center font-black text-torange text-[1.5rem] uppercase">
                Upcoming Training events for manufacturing industries
            </span>

            <div className="justify-center items-stretch flex flex-col w-[100%] h-full overflow-x-hidden pb-[150px]">
                <Carousel slides={slides} autoplay={true} interval={5000} />
            </div>
        </div>
    );
}