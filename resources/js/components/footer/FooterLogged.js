import React from 'react'
import questions from "../assets/images/questions.png";

const socials = {
    "https://www.facebook.com/mytpass": "Facebook",
    "https://www.instagram.com/mytpassph/": "Instagram",
};

export default function FooterLogged() {
  return (
    <footer className="mt-auto bg-torange flex flex-col text-white px-16 py-2 pt-5">
            <div className="flex flex-row gap-[7.5rem] justify-center mb-5 mr-[10rem]">
                {/* 1 */}
                <div className="flex flex-col gap-8">
                    <span className="font-black text-[2rem]">MyT-Pass</span>
                    <span className="font-medium text-[18px]">
                        Start Tracking Your Training <br />
                        and Certification Records Now!
                    </span>
                </div>
                {/* 2 */}
                <div className="h-[130px]">
                    <img src={questions} width={190} className="h-full" />
                </div>
                {/* 4 */}
                <div className="flex flex-col">
                    <span className="font-medium text-[2rem]">Socials</span>
                    <div className="flex text-[13px] flex-col gap-1">
                        {Object.keys(socials).map((route, idx) => (
                            <a
                                key={idx}
                                href={route}
                                className="text-white hover:opacity-80"
                            >
                                {socials[route]}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
                <div className="bg-white w-full min-h-[1px]"></div>
                <span>@2022 My T-Pass</span>
            </div>
        </footer>
  )
}
