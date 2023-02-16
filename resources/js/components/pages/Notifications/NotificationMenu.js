import React, { useState } from "react";
import { CardShadow } from "../../default/Card/Card";
import Card from "../../default/Card/Card";

export default function NotificationMenu() {
    return (
        <CardShadow
            className={`absolute top-14 right-[12rem] text-gray-600 py-4 px-2 gap-2 flex flex-col shadow-lg`}
        >
            <h1 className="text-[1.5rem] font-medium">Notifications</h1>
            <span className="text-torange rounded-full underline pl-4">
                All Notifications
            </span>
        </CardShadow>
    );
}
