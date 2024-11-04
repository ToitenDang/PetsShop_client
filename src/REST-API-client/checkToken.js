
const CheckTokenAPI = (axiosInstance) => {
    
    async function post() {
        const access_token = localStorage.getItem("access_token");
        try {   
            const res = await axiosInstance.post(`/check-token`,  {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            return res.data;
        } catch (error) {
            if (error.response) {
                // Lỗi từ server phản hồi (4xx, 5xx)
                // console.log('Status Code:', error.response.status); // Mã trạng thái
                // console.log('Error Message:', error.response.data.message.message); // Nội dung lỗi
                throw new Error(error.response.data.message.message);
              } else if (error.request) {
                // Không nhận được phản hồi từ server
                // console.log('No response received', error.request);
                throw new Error("Server không phản hồi"); 
              } else {
                // Lỗi khi thiết lập request
                // console.log('Error:', error.message);
                throw new Error(error.message) 
              }
        }
    }
    return {
        post
    }
}

export default CheckTokenAPI