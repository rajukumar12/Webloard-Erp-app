import { del, get, post, put,} from "utils/HttpUtil"
//  Country
// Get Country
export const getCountry= async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/country`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create country
export const createCountry = async (name, short_code,mobile_no_ext,currency) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/country`;
        const json = await post(url, {
            name,
            short_code,
            mobile_no_ext,
            currency
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createGST: ", error);
    }
}

//update Country
export const updateCountry = async (id, name, short_code,mobile_no_ext,currency) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/country/${id}?name=${name}&short_code=${short_code}&mobile_no_ext=${mobile_no_ext}&currency=${currency}`;
        const json = await put(url, {
            name,
            short_code,
            mobile_no_ext,
            currency
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateGST: ", error);
    }
}

// delete Country
export const deleteCountry = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/country/${id}`;
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
