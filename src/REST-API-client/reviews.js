// api/ReviewAPI.js
const ReviewAPI = (axiosInstance) => {

  // Tạo một review mới
  async function createNewReview(reviewData) {
    try {
      const res = await axiosInstance.post(`/review/`, reviewData);
      return res.data;

    }
    catch (error) {
      // Xử lý khi xảy ra lỗi API
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

  // Hàm xử lý lỗi API
  function handleApiError(error) {
    if (error.response) {
      // Lỗi trả về từ server
      console.error("Lỗi từ server:", error.response.data.message);

      // Hiển thị thông báo lỗi cho người dùng
      alert("Lỗi: " + error.response.data.message);  // Bạn có thể thay thế bằng thông báo khác
    } else if (error.request) {
      // Lỗi khi gửi yêu cầu (không nhận được phản hồi)
      console.error("Lỗi khi gửi yêu cầu:", error.request);
      alert("Không thể kết nối tới server. Vui lòng thử lại sau.");
    } else {
      // Lỗi bất ngờ khác (ví dụ: cấu hình sai trong request)
      console.error("Lỗi không xác định:", error.message);
      alert("Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.");
    }
  }

  return {
    createNewReview,
    fetchReviewByEntityId,
  };
};

export default ReviewAPI;
