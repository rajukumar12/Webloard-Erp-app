import { getStateDetails, postStateDetails, putStateDetails, delStateDetails } from "utils/HttpUtil"

//  State
// Get State
export const getCountry = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state`;
        const json = await getStateDetails(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create State
export const createCountry = async (name, short_code, state_code, country_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state`;
        const json = await postStateDetails(url, {
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
export const updateCountry = async (id, name, short_code, mobile_no_ext, currency) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state/${id}?name=${name}&short_code=${short_code}&state_code=${state_code}&country_id=${country_id}`;
        const json = await putStateDetails(url, {
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
export const deleteCountry = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/state/${id}`;
        const json = await delStateDetails(url, {
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