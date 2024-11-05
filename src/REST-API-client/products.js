// api/ProductAPI.js
const ProductAPI = (axiosInstance) => {

    // Lấy tất cả sản phẩm
    async function getAll() {
      try {
        const res = await axiosInstance.get(`/product`);
        return res.data;
      } catch (error) {
        handleApiError(error);
      }
    }
  
    // Lấy chi tiết sản phẩm theo ID
    async function getById(productId) {
      try {
        const res = await axiosInstance.get(`/product/${productId}`);
        return res.data;
      } catch (error) {
        handleApiError(error);
      }
    }
  
    // Lấy sản phẩm bán chạy nhất
    async function fetchTopSaleProducts(page) {
      try {
        const res = await axiosInstance.get(`/product/best-selling-products?page=${page}&limit=10`);
        return res.data;
      } catch (error) {
        handleApiError(error);
      }
    }

    // Hàm xử lý lỗi chung
    function handleApiError(error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Đã có lỗi xảy ra từ server');
      } else if (error.request) {
        throw new Error("Không nhận được phản hồi từ server");
      } else {
        throw new Error(error.message);
      }
    }
  
    return {
      getAll,
      getById,
      fetchTopSaleProducts,
    };
  };
  
  export default ProductAPI;
  