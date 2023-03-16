import React, { useState } from 'react';
import GuestPage from "../../../layouts/GuestPage";
import Footer from "../../../footer/Footer";
import contact from "../../../assets/images/contact.png";
import { apost } from '../../../shared/query';

export default function Contact() {
    const [Message, setMessage] = useState({
        email: "",
        message: "",
    });
    const [isLoading, setisLoading] = useState("");

    const handleContactUs = async (e) => {
        e.preventDefault();
        const res = await apost("/api/sendEmail", Message);
        alert(res?.data?.message)
        setMessage({
            email: "",
            message: "",
        })
    };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <GuestPage>
            <div className="flex flex-col mt-[2rem]">
                <h1 className="ml-auto mr-auto text-torange font-bold text-[2rem]">
                    Contact Us
                </h1>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col bg-white rounded-md p-12 gap-2 w-[600px]">
                        <label htmlFor="email">Email Address</label>
                        <input
                            onChange={handleInputChange}
                            value={Message.email}
                            name="email"
                            id="email"
                            className="outline-0 border-gray-400 border px-4 py-2"
                        />
                        <label htmlFor="message">Message</label>
                        <textarea
                            onChange={handleInputChange}
                            value={Message.message}
                            name="message"
                            id="message"
                            rows={10}
                            className="outline-0 border-gray-400 border px-4 py-2"
                        />
                        <button
                            onClick={(e) => {
                                handleContactUs(e);
                            }}
                            className="ml-auto button px-6 py-2 mt-4"
                        >
                            Send
                        </button>
                    </div>

                    <div className="p-12">
                        <img
                            alt="contact"
                            src={contact}
                            width={700}
                        ></img>
                    </div>
                </div>
            </div>

            <Footer />
        </GuestPage>
    );
}
