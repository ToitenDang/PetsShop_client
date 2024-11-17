const BookingAPI = (axiosInstance) => {
    const getById = async (id) => {
        try {
            const res = await axiosInstance.get(`/bookings`);
            return res.data
        }catch(error) {
            if (error.response) {
                throw new Error(error.response.data.message.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }
    const createNew = async (data) => {
        try {
            const res = await axiosInstance.post(`/bookings`,data);
            return res.data
        }catch(error) {
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
        createNew
    }
}

export default BookingAPI