import { message } from "antd";

// gst
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
// Cess
export const getCessdetails = async (url) => {
    return await http(url, "get");
}

export const postCessdetails = async (url, body) => {
    return await http(url, "post", body);
}

export const putCessdetails = async (url, body) => {
    return await http(url, "put", body);
}

export const delCessdetails = async (url, body) => {
    return await http(url, "delete", body);
}

//HSN
export const getHsnDetails = async (url) => {
    return await http(url, "get");
}

export const postHsnDetails = async (url, body) => {
    return await http(url, "post", body);
}

export const putHsnDetails= async (url, body) => {
    return await http(url, "put", body);
}

export const delHsnDetails = async (url, body) => {
    return await http(url, "delete", body);
}

// Country

export const getCountryDetails = async (url) => {
    return await http(url, "get");
}

export const postCountryDetails = async (url, body) => {
    return await http(url, "post", body);
}

export const putCountryDetails= async (url, body) => {
    return await http(url, "put", body);
}

export const delCountryDetails = async (url, body) => {
    return await http(url, "delete", body);
}


// State

export const getStateDetails = async (url) => {
    return await http(url, "get");
}

export const postStateDetails = async (url, body) => {
    return await http(url, "post", body);
}

export const putStateDetails= async (url, body) => {
    return await http(url, "put", body);
}

export const delStateDetails = async (url, body) => {
    return await http(url, "delete", body);
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