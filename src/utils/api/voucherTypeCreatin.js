import { del, get, post, put, } from "utils/HttpUtil"

//  VoucherTpeCreation
// Get VoucherTpeCreation
export const getVoucherTpeCreation = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/VoucherTpeCreationn`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getVoucherTpeCreation: ", error);
    }
}
// Create VoucherTpeCreation
export const createVoucherTpeCreationn = async (name, city_id, district_id, state_id, country_id, address, pincode) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/VoucherTpeCreationn`;
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
        console.log("Error with createVoucherTpeCreation: ", error);
    }
}

//update VoucherTpeCreation
export const updateVoucherTpeCreation = async (id, name, city_id, district_id, state_id, country_id, address, pincode) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/VoucherTpeCreationn/${id}`;
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
        console.log("Error with updateVoucherTpeCreation: ", error);
    }
}

// delete VoucherTpeCreation
export const deleteVoucherTpeCreation = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/VoucherTpeCreationn/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with deleteVoucherTpeCreation: ", error);
    }
}