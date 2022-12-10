import { del, get, post, put,} from "utils/HttpUtil"
// TypeOfVoucher 
// Get TypeOfVoucher
export const getTypeOfVoucher = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/TypeOfVoucher_percent`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with get TypeOfVoucher: ", error);
    }
}
// Create TypeOfVoucher
export const createTypeOfVoucher = async (name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/TypeOfVoucher_percent`;
        const json = await post(url, {
            name,
            percent
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with create TypeOfVoucher: ", error);
    }
}
// update TypeOfVoucher
export const updateTypeOfVoucher = async (id, name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/TypeOfVoucher_percent/${id}?name=${name}&percent=${percent}`;
        const json = await put(url, {
            name,
            percent
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with update TypeOfVoucher: ", error);
    }
}

// delete TypeOfVoucher
export const deleteTypeOfVoucher = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/TypeOfVoucher_percent/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with delete TypeOfVoucher: ", error);
    }
}