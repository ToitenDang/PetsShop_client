const PromotionAPI = (axiosInstance) => {
    const getAllPromotion = async (page, filters) => {

        const accessToken = localStorage.getItem("access_token");


        try {
            const filtersString = encodeURIComponent(JSON.stringify(filters));
            const res = await axiosInstance.get(`/promotions/?page=${page}&limit=10&filters=${filtersString}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Accept": "application/json",
                }
            });
            return res.data; // Trả về dữ liệu từ API
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
        getById,
        getAllPromotion
    }
}

export default PromotionAPI