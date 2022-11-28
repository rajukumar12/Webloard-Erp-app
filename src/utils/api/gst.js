import {
    del,
    get,
    post,
    put,
    getCessdetails,
    postCessdetails,
    putCessdetails,
    delCessdetails,
    getHsnDetails,
    putHsnDetails,
    postHsnDetails,
    delHsnDetails,
    getCountryDetails,
    postCountryDetails,
    putCountryDetails,
    delCountryDetails
} from "utils/HttpUtil"
// GST 
// Get gst
export const getGST = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create gst
export const createGST = async (name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent`;
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
// update gst
export const updateGST = async (id, name, percent) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent/${id}?name=${name}&percent=${percent}`;
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

// delete gst
export const deleteGst = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/gst_percent/${id}`;
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
        const json = await postCessdetails(url, {
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
        const json = await putCessdetails(url, {
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
        const json = await delCessdetails(url, {
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

//  HSN
// Get hns
export const getHsn = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn`;
        const json = await getHsnDetails(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getGST: ", error);
    }
}
// Create hsn
export const createHsn = async (name, detail,code) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn`;
        const json = await postHsnDetails(url, {
            name,
            detail,
            code
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createGST: ", error);
    }
}

//update hsn
export const updateHsn = async (id, name, detail,code) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn/${id}?name=${name}&detail=${detail}&code=${code}`;
        const json = await putHsnDetails(url, {
            name,
            detail,
            code
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateGST: ", error);
    }
}

// delete hsn
export const deleteHsn = async (id) => {
    console.log(id, 'delete')
    try {
        const url = `${process.env.REACT_APP_BASEURL}/hsn/${id}`;
        const json = await delHsnDetails(url, {
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


//  Country
// Get Country
export const getCountry= async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/country`;
        const json = await getCountryDetails(url);
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
        const json = await postCountryDetails(url, {
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
        const json = await putCountryDetails(url, {
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
        const json = await delCountryDetails(url, {
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
