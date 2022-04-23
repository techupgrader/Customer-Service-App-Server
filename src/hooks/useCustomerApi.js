import { getGlobal } from "reactn";
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

export const addNewCompany = async (useMethod, url, payload = null) => {
    const method = useMethod.toLowerCase();
    const config = {
        method,
        url: `${url}`,
        // url: `http://localhost:3001${url}`,
        headers: getTokenHeader()
    }
    if (method !== "get" && payload) config.data = payload

    const response = await axios(config);
    if (!response.data.error) {
        Swal.fire("Successfully Registered!");
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
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

export const getAllCompany = async (useMethod, url, payload = null) => {
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
        return response.data;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}

export const getOneCompany = async (useMethod, url, payload = null) => {
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
        return response.data;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}

export const editCompany = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload

    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if(!response.data.error) {
        Swal.fire({
            title: "Information",
            text: `${response.data.message}`,
            timer: 3000,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}

export const changePassword = async (useMethod, url, payload = null) => {
    // const method = useMethod.toLowerCase();
    // const config = {
    //     method,
    //     url: `http://localhost:3001${url}`,
    //     headers: getTokenHeader()
    // }
    // if (method !== "get" && payload) config.data = payload

    // const response = await axios(config);
    const response = await makeRequest(useMethod, url, payload);

    if(!response.data.error) {
        Swal.fire({
            title: "Information",
            text: `${response.data.message}`,
            timer: 3000,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data.error}`,
        })
    }
}