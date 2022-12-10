import { del, get, post, put,} from "utils/HttpUtil"
//  HSN
// Get hns
export const getHsn = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with get hsn: ", error);
    }
}
// Create hsn
export const createHsn = async (name, detail,code) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn`;
        const json = await post(url, {
            name,
            detail,
            code
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with create hsn: ", error);
    }
}

//update hsn
export const updateHsn = async (id, name, detail,code) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn/${id}?name=${name}&detail=${detail}&code=${code}`;
        const json = await put(url, {
            name,
            detail,
            code
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with update hsn: ", error);
    }
}

// delete hsn
export const deleteHsn = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with delete hsn: ", error);
    }
}
