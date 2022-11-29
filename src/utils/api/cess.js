import { del, get, post, put,} from "utils/HttpUtil"
// CESS
// Get Cess
export const getCess = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/cess_percent`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create Cess
export const createCess = async (name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/cess_percent`;
        const json = await post(url, {
            name,
            percent
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createGST: ", error);
    }
}

//update Cess
export const updateCess = async (id, name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/cess_percent/${id}?name=${name}&percent=${percent}`;
        const json = await put(url, {
            name,
            percent
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateGST: ", error);
    }
}

// delete Cess
export const deleteCess = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/cess_percent/${id}`;
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