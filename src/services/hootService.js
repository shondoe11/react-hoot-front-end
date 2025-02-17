const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

async function index() {
    const url = BASE_URL;
    try {
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json.hoots;
    } catch (error) {
        console.error(error.message);
    }
}

async function show(hootId) {
    const url = `${BASE_URL}/${hootId}`;
    // try {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const response = await fetch(url, options);
    console.log("response", response.ok);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("json", json);
    return json.hoot;
    // } catch (error) {
    //   console.log("error by simon");
    //   console.error(error.message);
    // }
}

const create = async (hootFormData) => {
    const url = `${BASE_URL}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(hootFormData),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.hoot;
};

const createComment = async (hootId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// src/services/hootService.js

const deleteHoot = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

async function update(hootId, hootFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(hootFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export { create, createComment, deleteHoot, index, show, update };