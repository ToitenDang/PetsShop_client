const PromotionAPI = (axiosInstance) => {
    const get = async (condition = {}) => {
        const params = new URLSearchParams(condition);
        try {
            console.log("searchParams: ", params);
            const res = await axiosInstance.get(`/promotions?${params}`)
            return res.data
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

    const getById = async (id) => {
        try {
            const res = await axiosInstance.get(`/promotions/${id}`);
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
        getById
    }
}

export default PromotionAPI