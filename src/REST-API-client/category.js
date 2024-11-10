
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

  async function getById(id,condition, query) {
    const params = new URLSearchParams({});
    try {
      if(condition?.page !== undefined) params.append("page",condition.page);
      if(condition?.limit !== undefined) params.append("limit", condition.limit);
      if(query?.minPrice !== undefined && query?.minPrice.trim() !== "" ) params.append("minPrice", query.minPrice);
      if(query?.maxPrice !== undefined && query?.maxPrice.trim() !== "") params.append("maxPrice", query.maxPrice);
      if(query?.minStar !== undefined) params.append("minStar", query.minStar);
      if(query?.maxStar !== undefined) params.append("maxStar", query.maxStar);
      // const res = await axiosInstance.get(`/categories/${id}?page=${condition?.page}&limit=${condition?.limit}`)
      const res = await axiosInstance.get(`/categories/${id}?${params}`)
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