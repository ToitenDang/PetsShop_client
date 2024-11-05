
const UserAPI = (axiosInstance) => {

    async function get() {
        const accessToken = localStorage.getItem("access_token")
        console.log("fetch user token: ", accessToken);
        try {
            const res = await axiosInstance.get(`/users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            return res.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }
    async function getById(id) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.get(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            // console.log(res)
            return res.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }
    async function updateInfo(id,data) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/${id}`,data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            // console.log(res)
            return res.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }
    return {
        get,
        getById,
        updateInfo
    }
}

export default UserAPI