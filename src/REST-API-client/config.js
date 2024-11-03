function configAxios(axiosInstance) {
    axiosInstance.interceptors.response.use(
        response => response, // Để nguyên phản hồi nếu không có lỗi
        async error => {
            const originalRequest = error.config;
            // console.log("Refreshing token ")
            // Nếu gặp lỗi 401 và chưa có yêu cầu làm mới nào trước đó
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Đánh dấu để tránh lặp lại vô hạn

                try {
                    // Gửi yêu cầu tới endpoint làm mới token
                    const { data } = await axiosInstance.post('/refresh-token');
                    console.log("Refresh token valid")
                    // Cập nhật accessToken mới vào instance của Axios
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.data}`;
                    localStorage.setItem("access_token", data.data);
                    console.log("refresed_Token", data.data);
                    // Thử lại yêu cầu ban đầu với accessToken mới
                    originalRequest.headers['Authorization'] = `Bearer ${data.data}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.log("Refresh token not valid")
                    // Nếu làm mới token thất bại, chuyển hướng người dùng đến trang đăng nhập
                    return Promise.reject(refreshError);
                }
            }
            console.log("Refresh token fail")
            return Promise.reject(error);
        }
    );
}

export default configAxios;