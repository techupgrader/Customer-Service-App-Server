import { getGlobal } from "reactn";
import { useMutation } from "react-query";
import axios from "axios";
import Swal from "sweetalert2";

export const getTokenHeader = () => {
    const token = getGlobal().token;

    if (!token) {
        return {};
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    return headers;
}

const makeRequest = async (useMethod, url, payload = null) => {
    try {
        const method = useMethod.toLowerCase();
        const config = {
            method,
            url: `${url}`,
            // url: `http://localhost:3001${url}`,
            headers: getTokenHeader(),
        }

        if (method !== "get" && payload) {
            config.data = payload;
        }
        
        const response = await axios(config);
        return response;

    } catch (err) {
        console.log(err)
    }
}

export const useApiPost = (url, callback, opts = {}) => {
    return useMutation(async (payload) => {
        const response = await makeRequest("post", url, payload);
        if (typeof callback === "function") callback(response);
        return response;
    }, opts);
}

export const login = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload

    // const response = await axios(config);
    console.log(payload)
    const response = await makeRequest(useMethod, url, payload);

    if (response) {
        if (!response.data.error) {
            localStorage.setItem("usertoken", response.data);
            if(payload && payload.isAdmin) {
                localStorage.setItem("user_role", "admin");
            }
            else if(payload && !payload.isAdmin) {
                localStorage.setItem("user_role", "customer");
            }

            localStorage.setItem("name", payload.username);
            return response;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${response.data.error}`,
            })
        }
    }
    else console.log("error");
}

export const addCustomService = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload
    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if (!response.data.error) {
        Swal.fire("Successfully Registered!");
        return response
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}

export const getCustomerService = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload
    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if (response) return response
    else Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${response.data.error}`,
    })
}

export const deleteCustomService = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload
    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);
    
    if (response && response.data.message) {
        Swal.fire("Successfully Removed!");
        return response;
    } else if (response && response.error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}

export const addAdmin = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload

    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if (!response.data.error) {
        Swal.fire("Successfully Registered!");
        return response
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}

export const getAdmin = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload
    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if (response) return response
    else Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${response.data.error}`,
    })
}

export const deleteAdmin = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload
    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if (response && response.data.message) {
        Swal.fire("Successfully Removed!");
        return response;
    } else if (response && response.error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}