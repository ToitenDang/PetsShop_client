// api/ReviewAPI.js
const OrderAPI = (axiosInstance) => {
  async function createNewOrder(orderData) {
    const access_token = localStorage.getItem("access_token");
    console.log("Access Token:", access_token);  // Log access token để đảm bảo token được lấy đúng

    if (!access_token) {
      console.error("No access token found!");
      throw new Error("Access token is missing");
    }

    try {
      const res = await axiosInstance.post(`/order/create/`, orderData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      });
      console.log("Response from server:", res.data);  // Log dữ liệu trả về từ server
      return res.data;
    } catch (error) {
      // Xử lý lỗi nếu có
      if (error.response) {
        console.log("Error response from server:", error.response);  // Log chi tiết lỗi từ server
        throw new Error(error.response.data.message || "Lỗi từ server");
      } else if (error.request) {
        console.log("No response received:", error.request);  // Log request để kiểm tra vấn đề kết nối
        throw new Error("Không nhận được phản hồi từ server");
      } else {
        console.log("Error message:", error.message);  // Log thông báo lỗi chung
        throw new Error(error.message);
      }
    }
  }



  return {
    createNewOrder
  };
};

export default OrderAPI;
