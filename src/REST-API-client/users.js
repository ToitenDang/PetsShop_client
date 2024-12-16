
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

    async function getByEmail(email) {
        try {
            const accessToken = localStorage.getItem("access_token")
            const res = await axiosInstance.get(`/users/get-by-email/${email}`)

            return res.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
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

    async function updateInfo(id, data) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            // console.log(res)
            return res.data;
        } catch (error) {
            if (error.response) {
                console.log("err update: ", error)
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }

    async function updateShippingAddress(id, data) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/shipping-address/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
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

    function resetPassword(id) {
        async function checkOldPass(password) {
            const access_token = localStorage.getItem("access_token");
            try {
                const res = await axiosInstance.post(`/users/check-password/${id}`, { password }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                })
                // console.log(res)
                return res.data;
            } catch (error) {
                if (error.response) {
                    throw new Error(error);
                } else if (error.request) {
                    throw new Error("Server không phản hồi");
                } else {
                    throw new Error(error.message)
                }
            }
        }

        async function reset(password, confirmPassword) {
            const access_token = localStorage.getItem("access_token");
            try {
                const res = await axiosInstance.patch(`/users/reset-password/${id}`, { password, confirmPassword }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                })
                // console.log(res)
                return res.data;
            } catch (error) {
                if (error.response) {
                    throw new Error(error);
                } else if (error.request) {
                    throw new Error("Server không phản hồi");
                } else {
                    throw new Error(error.message)
                }
            }
        }


        return {
            checkOldPass,
            reset
        }
    }

    async function addToCart(id, data) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/add-to-cart/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
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

    async function updateCart(id, data) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/update-cart/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
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

    // Thêm phương thức removeFromCart
    async function removeFromCart(id, productId) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/remove-from-cart/${id}`,  {productId} , {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return res.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
    }

    async function clearCart(id) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/users/clear-cart/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return res.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
    }

    async function sendMessage(data) {
        try{
            const res = await axiosInstance.post("/users/send-message", data)
            return res.data
        }
        catch(error) {
            if(error.response){
                throw new Error(error.response.data.message.message)
            }else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
        
    }
    
    async function forgetPassword(userId, password) {
        try {
            try {
                const res = await axiosInstance.post(`/users/forget-password/${userId}`, {password} );
                return res.data;
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message.message);
                } else if (error.request) {
                    throw new Error("Server không phản hồi");
                } else {
                    throw new Error(error.message);
                }
            }
        }catch(error) {
            if(error.response){
                throw new Error(error.response.data.message)
            }else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
    }
    
    return {
        get,
        getById,
        updateInfo,
        updateShippingAddress,
        resetPassword,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        sendMessage,
        getByEmail,
        forgetPassword
    }
}

export default UserAPI