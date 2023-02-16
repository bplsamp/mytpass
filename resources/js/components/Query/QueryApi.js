import React from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { web_url } from "../shared/constants";

export default function QueryApi(key, url, interval = null) {
    const token = Cookies.get("mytpass_session");
    return useQuery({
        queryKey: [key],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`${web_url}${url}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                return data;
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        refetchInterval: interval,
    });
}

export function QueryApiPost(key, url, variables) {
    const token = Cookies.get("mytpass_session");
    return useQuery({
        queryKey: [key],
        queryFn: async () => {
            try {
                const { data } = await axios.post(
                    `${web_url}${url}`,
                    variables,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("DATA", data);
                return data;
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
    });
}
