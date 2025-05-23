const BlogAPI = (axiosInstance) => {
    const getAll = async (page, limit) => {
       
        try {
            const res = await axiosInstance.get(`/blogs`, {
                params: {
                    page,
                    limit
                }
            });
            return res
        } catch (error) {
            if (error.response) {
                // console.log("err: ",error);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                throw new Error("Server không phản hồi");
            } else {
                throw new Error(error.message)
            }
        }
    }
    const getById = async (id) => {
        try {
            const res = await axiosInstance.get(`/blogs/${id}`);
            return res.data
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
    return {
        getById,
        getAll
    }
}

export default BlogAPI