// api/ProductAPI.js
const ProductAPI = (axiosInstance) => {

  async function getAllProduct(page, sort, filters) {
    console.log("filter", filters);
    
    try {
      const filtersString = encodeURIComponent(JSON.stringify(filters));
      const res = await axiosInstance.get(`/product?page=${page}&limit=10&sort_by=${sort}&filters=${filtersString}`);
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
  // Lấy chi tiết sản phẩm theo ID
  async function getById(productId) {
    try {
      const res = await axiosInstance.get(`/product/${productId}`);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // Hàm để gọi API và lấy sản phẩm bán chạy nhất
  async function fetchTopSaleProducts(page) {
    try {
      // Gửi yêu cầu GET đến API để lấy sản phẩm
      const res = await axiosInstance.get(`/product/best-selling-products?page=${page}&limit=10`);
      console.log('Fetched products:', res.data);  // In dữ liệu sản phẩm
      return res.data;
    } catch (error) {
      // Xử lý lỗi khi không thể gọi API
      console.error('API Error:', error.response ? error.response.data : error.message);
      handleApiError(error);  // Hàm xử lý lỗi tùy chỉnh
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
    getAllProduct,
    getById,
    fetchTopSaleProducts,
  };
};

export default ProductAPI;
