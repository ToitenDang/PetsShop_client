
const CategoryAPI = (axiosInstance) => {

  async function get() {
    try {
      const res = await axiosInstance.get(`/categories/`)
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

  async function getById(id,condition) {
    try {
      const res = await axiosInstance.get(`/categories/${id}?page=${condition?.page}&limit=${condition?.limit}`)
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

export default CategoryAPI