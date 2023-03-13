import React from "react";
import { Carousel } from "3d-react-carousal";



export default function Events({ data }) {
    let slides = data?.map((slide) => (
        <a
            href={slide?.content}
        >
            <img
                className="max-w-[400px] max-h-[400px]"
                src={slide?.imageUrl}
                alt="4"
            />
        </a>
    ));
    return (
        <div className="max-h-[95vh] pt-[50px] flex flex-col bg-gray-200 p-12 text-[1.5rem] items-center justify-center">
            <span className="mb-8 text-center font-black text-torange text-[1.5rem] uppercase">
                Upcoming Training events for manufacturing industries
            </span>

            <div className="justify-center items-stretch flex flex-col w-[100%] h-full overflow-x-hidden pb-[150px]">
                <Carousel slides={slides} autoplay={true} interval={5000} />
            </div>
        </div>
    );
}
