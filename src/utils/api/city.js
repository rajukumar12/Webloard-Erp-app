import { del, get, post, put,} from "utils/HttpUtil"

//  City
// Get City
export const getCity = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/city`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create City
export const createCity= async (name, short_code, state_code, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/city`;
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

//update City
export const updateCity= async (id, name, short_code, state_code, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/city/${id}?name=${name}&short_code=${short_code}&state_code=${state_code}&country_id=${country_id}`;
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

// delete City
export const deleteCity= async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/city/${id}`;
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