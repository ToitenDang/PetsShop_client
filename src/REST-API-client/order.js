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
          'Content-Type': 'application/json' // Đảm bảo gửi multipart/form-data
      },
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

  async function createNewOrderandPayment(orderData) {
    const access_token = localStorage.getItem("access_token");
    console.log("Access Token:", access_token);  // Log access token để đảm bảo token được lấy đúng

    if (!access_token) {
      console.error("No access token found!");
      throw new Error("Access token is missing");
    }

    try {
      const res = await axiosInstance.post(`/order/payment/`, orderData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json' // Đảm bảo gửi multipart/form-data
      },
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

  const getOrderByUserId = async (userId, condition, find) => {
    const params = new URLSearchParams({});
    const accessToken = localStorage.getItem("access_token");
    try {
        if (condition) {
            params.append("filter", JSON.stringify(condition));
        }
        if (find) {
            params.append("finding", find)
        }
        const res = await axiosInstance.get(`/order/get-by-user/${userId}?${params}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Accept": "application/json",
            }
        })
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log("err: ", error);
            throw new Error(error.response.data.message);
        } else if (error.request) {
            throw new Error("Server không phản hồi");
        } else {
            throw new Error(error.message)
        }
    }
  }

  const updateOrderByUser = async (userId, data) => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.error("No access token found!");
      throw new Error("Access token is missing");
    }

    try {
      const res = await axiosInstance.patch(`/order/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json' // Đảm bảo gửi multipart/form-data
      },
      });
      // console.log("Response from server:", res.data);  // Log dữ liệu trả về từ server
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

  const getOrderById = async (id) => {

  }
  return {
    createNewOrder,
    createNewOrderandPayment,
    getOrderByUserId,
    updateOrderByUser
  };
};

export default OrderAPI;
