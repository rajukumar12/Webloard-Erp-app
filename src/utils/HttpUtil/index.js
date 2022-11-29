import { message } from "antd";


const { default: axios } = require("axios")

export const post = async (url, body) => {
    return await http(url, "post", body);
}

export const put = async (url, body) => {
    return await http(url, "put", body);
}

export const del = async (url, body) => {
    return await http(url, "delete", body);
}

export const get = async (url) => {
    return await http(url, "get");
}



const http = async (url, method, body) => {
    try {
        const token = localStorage.getItem("auth_token")
        if(method === "post" || method === "delete" || method === "put") {
            const res = await axios({
                method,
                url,
                headers: { 
                    Authorization: `Bearer ${token ?? ""}`
                },
                data: body
            })
            if(res?.data) {
                console.log(res.data ,'res===')
                return res.data
            }
        } else {
            const res = await axios({
                method,
                url,
                headers: { 
                    Authorization: `Bearer ${token ?? ""}`
                }
            })
            if(res?.data) {
                console.log(res.data ,'res===')
                return res.data
            }
        }
    } catch (error) {
        console.log("Error with http: ", error)
        message.error(error.message)
    }
}