import { del, get, post, put } from "utils/HttpUtil"

export const getGST = async() => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent`;
        const json = await get(url);
        if(json?.data) {
            return json.data
        }
    } catch (error) {
        console.log("Error with getGST: ",error);   
    }
}

export const createGST = async(name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent`;
        const json = await post(url, {
            name,
            percent
        });
        if(json?.data) {
            return json.data
        }
    } catch (error) {
        console.log("Error with createGST: ",error);   
    }
}

export const updateGST = async(id, name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent/${id}?name=${name}&percent=${percent}`;
        const json = await put(url, {
            name,
            percent
        });
        console.log(json,'update json')
        if(json?.data) {
            return json.data
        }
    } catch (error) {
        console.log("Error with updateGST: ",error);   
    }
}

export const deleteGst = async(id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json,"delete json")
        if(json?.data) {
            return json.data
        }
    } catch (error) {
        console.log("Error with deleteGst: ",error);   
    }
}