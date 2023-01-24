import React from "react";  
import { Carousel } from "3d-react-carousal";

const slides = [
    <img
        style={{ minHeight: "700px" }}
        src="https://picsum.photos/800/300/?random"
        height={700}
        width={1000}
        alt="1"
    />,
    <img
        style={{ minHeight: "700px" }}
        src="https://picsum.photos/800/301/?random"
        height={700}
        width={1000}
        alt="2"
    />,
    <img
        style={{ minHeight: "700px" }}
        src="https://picsum.photos/800/302/?random"
        height={700}
        width={1000}
        alt="3"
    />,
    <img
        style={{ minHeight: "700px" }}
        src="https://picsum.photos/800/303/?random"
        height={700}
        width={1000}
        alt="4"
    />,
    <img
        style={{ minHeight: "700px" }}
        src="https://picsum.photos/800/304/?random"
        height={700}
        width={1000}
        alt="5"
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
