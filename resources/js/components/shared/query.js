import axios from "axios";
import { web_url } from "./constants";
import Cookies from "js-cookie";

export const apost = async (
    url, //"/api/register"
    variables, //NewUser
) => {
    const token = Cookies.get("mytpass_session");
    if (token) {
        console.log("WITH TOKEN");
    return axios
        .post(`${web_url}${url}`, variables, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } else {
        console.log("WITHOUT TOKEN");
        return axios
        .post(`${web_url}${url}`, variables)
    }
    
};

