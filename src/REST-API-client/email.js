const EmailSenderAPI = (axiosInstance) => {
    const sendPIN = async (receiveEmail,userId) => {
        try {
            const accessToken = localStorage.getItem("access_token")
            const res = await axiosInstance.post(`/send-pin/${userId}`, { receiveEmail }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
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
    const checkPIN = async (receiveEmail,userId, pin) => {
        try {
            const accessToken = localStorage.getItem("access_token")
            const res = await axiosInstance.post(`/check-pin/${userId}`, { receiveEmail,pin }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return res.data;
        }catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }
    const sendPINNoUser = async (receiveEmail) => {
        try {
            const accessToken = localStorage.getItem("access_token")
            const res = await axiosInstance.post(`/send-pin`, { receiveEmail }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
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
    const checkPINNoUser = async (receiveEmail, pin) => {
        try {
            const accessToken = localStorage.getItem("access_token")
            const res = await axiosInstance.post(`/check-pin`, { receiveEmail,pin }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return res.data;
        }catch (error) {
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
        sendPIN,
        checkPIN,
        sendPINNoUser,
        checkPINNoUser
    }
}

export default EmailSenderAPI;