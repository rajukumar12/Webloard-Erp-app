import { del, get, post, put,} from "utils/HttpUtil"
// UniqueOuqantityCode 
// Get gst
export const getUniqueOuqantityCode = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uqc`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getUniqueOuqantityCode: ", error);
    }
}
// Create gst
export const createUniqueOuqantityCode = async (name, detail) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uqc`;
        const json = await post(url, {
            name,
            detail
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createUniqueOuqantityCode: ", error);
    }
}
// update gst
export const updateUniqueOuqantityCode = async (id, name, detail) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uqc/${id}?name=${name}&detail=${detail}`;
        const json = await put(url, {
            name,
            detail
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateUniqueOuqantityCode: ", error);
    }
}

// delete gst
export const deleteUniqueOuqantityCode = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uqc/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with deleteUniqueOuqantityCode: ", error);
    }
}