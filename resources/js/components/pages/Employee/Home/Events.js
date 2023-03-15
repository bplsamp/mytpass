import React from "react";
import { Carousel } from "3d-react-carousal";
import { LazyLoadImage } from "react-lazy-load-image-component";



export default function Events({ data }) {
    let slides = data?.map((slide) => (
        <a
            href={slide?.content}
        >
            <LazyLoadImage
                className="max-w-[500px] max-h-[500px]"
                src={slide?.imageUrl}
                alt="announcement"
            />
        </a>
    ));
    return (
        <div className="max-h-[95vh] pt-[50px] flex flex-col p-12 text-[1.5rem] items-center justify-center">
            <span className="mb-8 text-center font-black text-torange text-[1.5rem] uppercase">
                Upcoming Training events for manufacturing industries
            </span>

            <div className="justify-center items-stretch flex flex-col w-[100%] pb-[150px]">
                <Carousel slides={slides} autoplay={true} interval={2500} />
            </div>
        </div>
    );
}
