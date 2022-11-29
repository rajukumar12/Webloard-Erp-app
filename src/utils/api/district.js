import { del, get, post, put,} from "utils/HttpUtil"

//  District
// Get District
export const getDistrict = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/district`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create District
export const createDistrict= async (name, short_code, state_id, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/district`;
        const json = await post(url, {
            name,
            short_code,
            state_id,
            country_id
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createGST: ", error);
    }
}

//update District
export const updateDistrict= async (id, name, short_code, state_id, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/district/${id}?name=${name}&short_code=${short_code}&state_id=${state_id}&country_id=${country_id}`;
        const json = await put(url, {
            name,
            short_code,
            state_id,
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

// delete District
export const deleteDistrict= async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/district/${id}`;
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