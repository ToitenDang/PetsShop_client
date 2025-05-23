const Recommend = (axiosInstance) => {
    async function getRecommendProducts(userId, page, limit) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.get(`/recommends/${userId}`, {
                params: {
                    page,
                    limit
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return res
        } catch (error) {
            if (error.response) {
                console.log("err: ", error);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
    }

    async function updateRecommendProducts(userId, productId, type) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/recommends/${userId}`, {
                productId,
                information: type
            }, {

                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return res
        } catch (error) {
            if (error.response) {
                console.log("err: ", error);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
    }
    async function checkLiked(userId, productId) {
        const access_token = localStorage.getItem("access_token");
        try {
            const res = await axiosInstance.patch(`/recommends/${userId}/check-like`, {
                productId
            }, {

                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return res
        } catch (error) {
            if (error.response) {
                console.log("err: ", error);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message);
            }
        }
    }
    return {
        getRecommendProducts,
        updateRecommendProducts,
        checkLiked
    }
}

export default Recommend