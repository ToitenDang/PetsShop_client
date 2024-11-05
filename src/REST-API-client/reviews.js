// api/ReviewAPI.js
const ReviewAPI = (axiosInstance) => {

    // Tạo một review mới
    async function createNewReview(reviewData) {
      try {
        const res = await axiosInstance.post(`/review/`, reviewData); 
        return res.data;
      } catch (error) {
        handleApiError(error);
      }
    }
  
    // Lấy các review của sản phẩm theo productId và loại (type)
    async function fetchReviewByEntityId(entityId, type) {
      try {
        const res = await axiosInstance.get(`/review/${entityId}/${type}`);
        return res.data;
      } catch (error) {
        handleApiError(error);
      }
    }
  
    // Hàm xử lý lỗi chung cho các API
    function handleApiError(error) {
      if (error.response) {
        // Lỗi từ server phản hồi (4xx, 5xx)
        throw new Error(error.response.data.message || 'Đã có lỗi xảy ra từ server');
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        throw new Error("Không nhận được phản hồi từ server");
      } else {
        // Lỗi khi thiết lập request
        throw new Error(error.message);
      }
    }
  
    return {
      createNewReview,
      fetchReviewByEntityId,
    };
  };
  
  export default ReviewAPI;
  