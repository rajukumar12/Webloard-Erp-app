import { del, get, post, put,} from "utils/HttpUtil"

//  State
// Get State
export const getState= async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create State
export const createState= async (name, short_code, state_code, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state`;
        const json = await post(url, {
            name,
            short_code,
            state_code,
            country_id
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createGST: ", error);
    }
}

//update State
export const updateState= async (id, name, short_code, state_code, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state/${id}?name=${name}&short_code=${short_code}&state_code=${state_code}&country_id=${country_id}`;
        const json = await put(url, {
            name,
            short_code,
            state_code,
            country_id
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateGST: ", error);
    }
}

// delete State
export const deleteState= async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with deleteGst: ", error);
    }
}