import { del, get, post, put,} from "utils/HttpUtil"
// UnitMeasure 
// Get gst
export const getUnitMeasure = async () => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uom`;
        const json = await get(url);
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with getUnitMeasure: ", error);
    }
}
// Create gst
export const createUnitMeasure = async (type_of_unit_id, symbol, formal_name,No_of_decimal_places, u_q_c_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uom`;
        const json = await post(url, {
            type_of_unit_id,
            symbol,
            formal_name,
            No_of_decimal_places,
            u_q_c_id            
        });
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with createUnitMeasure: ", error);
    }
}
// update gst
export const updateUnitMeasure = async (id, type_of_unit_id, symbol, formal_name,No_of_decimal_places, u_q_c_id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uom/${id}`;
        const json = await put(url, {
            type_of_unit_id,
            symbol,
            formal_name,
            No_of_decimal_places,
            u_q_c_id
            
        });
        console.log(json, 'update json')
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with updateUnitMeasure: ", error);
    }
}

// delete gst
export const deleteUnitMeasure = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BASEURL}/uom/${id}`;
        const json = await del(url, {
            id
        });
        console.log(json, "delete json")
        if (json) {
            return json
        }
    } catch (error) {
        console.log("Error with deleteUnitMeasure: ", error);
    }
}