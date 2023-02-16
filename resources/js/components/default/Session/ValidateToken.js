import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { web_url } from "../../shared/constants";
export default async function ValidateToken() {
    try {
        const token = Cookies.get("mytpass_session");
        if (token) {
            //validate in our backend
            const res = await axios.post(
                `${web_url}/api/validateToken`,
                {
                    token: token,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res?.data?.status === "success" && res?.data?.user) {
                return {
                    ...res?.data.user,
                    company: res?.data?.company,
                };
            }
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}
