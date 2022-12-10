import { del, get, post, put, } from "utils/HttpUtil"
// GroupCreation 
// Get GroupCreation
export const getMethodAllocate = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/method_allocate`;
        const json = await get(url); 
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with get method_allocate: ", error);
    }
}
export const getGroupCreation = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_group`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with get GroupCreation: ", error);
    }
}
// Create GroupCreation
export const createGroupCreation = async (name, account_under_group_id, group_behaves, net_cr_cr, used_for_calculation, method_allocate_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_group`;
        const json = await post(url, {
            name,
            account_under_group_id,
            group_behaves,
            net_cr_cr,
            used_for_calculation,
            method_allocate_id
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with create GroupCreation: ", error);
    }
}
// update GroupCreation
export const updateGroupCreation = async (id, name, account_under_group_id, group_behaves, net_cr_cr, used_for_calculation, method_allocate_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_group/${id}`;
        const json = await put(url, {
            name,
            account_under_group_id,
            group_behaves,
            net_cr_cr,
            used_for_calculation,
            method_allocate_id
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with update GroupCreation: ", error);
    }
}

// delete GroupCreation
export const deleteGroupCreation = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/account_group/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with delete GroupCreation: ", error);
    }
}