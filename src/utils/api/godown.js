import { del, get, post, put, } from "utils/HttpUtil"

//  Godow
// Get Godow
export const getGodown = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/godown`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create Godow
export const createGodow = async (name, city_id, district_id, state_id, country_id, address, pincode) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/godown`;
        const json = await post(url, {
            name,
            city_id,
            district_id,
            state_id,
            country_id,
            address,
            pincode
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createGST: ", error);
    }
}

//update Godow
export const updateGodow = async (id, name, city_id, district_id, state_id, country_id, address, pincode) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/godown/${id}`;
        const json = await put(url, {
            id,
            name,
            city_id,
            district_id,
            state_id,
            country_id,
            address,
            pincode
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateGST: ", error);
    }
}

// delete Godow
export const deleteGodow = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/godown/${id}`;
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