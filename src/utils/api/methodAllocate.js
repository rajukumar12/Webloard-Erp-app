import { del, get, post, put,} from "utils/HttpUtil"
// MethodAllocate 
// Get MethodAllocate
export const getMethodAllocate = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/method_allocate`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getMethodAllocate: ", error);
    }
}
// Create MethodAllocate
export const createMethodAllocate = async (name, detail) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/method_allocate`;
        const json = await post(url, {
            name,
            detail
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createMethodAllocate: ", error);
    }
}
// update MethodAllocate
export const updateMethodAllocate = async (id, name, detail) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/method_allocate/${id}?name=${name}&detail=${detail}`;
        const json = await put(url, {
            name,
            detail
        });

        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateMethodAllocate: ", error);
    }
}

// delete MethodAllocate
export const deleteMethodAllocate = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/method_allocate/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with deleteMethodAllocate: ", error);
    }
}