import { del, get, post, put,} from "utils/HttpUtil"
// AccountUnderGroup 
// Get gst
export const getAccountUnderGroup = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_under_group`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
    }
}
// Create gst
export const createAccountUnderGroup = async (name, detail) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_under_group`;
        const json = await post(url, {
            name,
            detail
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createAccountUnderGroup: ", error);
    }
}
// update gst
export const updateAccountUnderGroup = async (id, name, detail) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_under_group/${id}?name=${name}&detail=${detail}`;
        const json = await put(url, {
            name,
            detail
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateAccountUnderGroup: ", error);
    }
}

// delete gst
export const deleteAccountUnderGroup = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_under_group/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with deleteAccountUnderGroup: ", error);
    }
}