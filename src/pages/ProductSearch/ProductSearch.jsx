import React, { useEffect, useState } from 'react';
import myStyle from '../Home/TopSaleProducts/TopSaleProducts.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductItem from '~/components/ProductItem/ProductItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import { ProductFetch } from '~/REST-API-client/index'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function ProductSearch() {

    const location = useLocation(); // Hook để lấy thông tin URL hiện tại
    const searchParams = new URLSearchParams(location.search); // Lấy các tham số query
    const query = searchParams.get('query'); // Truyền giá trị từ query string trong URL
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]); // State lưu sản phẩm tìm được
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("sold");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        minStar: 0,
        maxStar: 5,
        name: query || "", // Đảm bảo khi query thay đổi, filters sẽ được cập nhật
        onlyPromotion: false
    });
    const [noResults, setNoResults] = useState(false); // Trạng thái kiểm tra khi không có sản phẩm

    // useEffect theo dõi thay đổi của query và filters
    useEffect(() => {
        // Cập nhật lại filters khi query thay đổi
        setFilters(prevFilters => ({
            ...prevFilters,
            name: query || "" // Cập nhật lại tên sản phẩm tìm kiếm
        }));
    }, [query]);

    // useEffect để gọi API khi filters, page, hoặc sort thay đổi
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await ProductFetch.getAllProduct(page, sort, filters);
                console.log("Products fetched:", data);

                // Kiểm tra nếu không có sản phẩm, cập nhật trạng thái noResults
                if (data.data.products.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                    setProducts(data.data.products); // Cập nhật danh sách sản phẩm
                    setTotalPages(data.data.totalPage); // Cập nhật tổng số trang
                }

            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Lỗi tìm sản phẩm")
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(); // Gọi hàm fetchProducts trong useEffect

    }, [filters, page, sort, query]); // Chú ý có thêm `query` vào dependencies của useEffect

    const handlePageChange = async (event, value) => {
        setPage(value); // Cập nhật lại số trang
        try {
            const data = await ProductFetch.getAllProduct(value, sort, filters);
            setProducts(data.products);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ marginTop: '40px', paddingY: '10px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2a3b52' : '#fff' }}>
            <Box>
                <Typography sx={{ textAlign: 'center', marginY: '10px', fontSize: '2rem', fontWeight: 'bold' }}>
                    Kết quả tìm kiếm
                </Typography>
            </Box>

            {/* Kiểm tra nếu không có sản phẩm */}
            {noResults ? (
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'red' }}>
                        Sản phẩm không tồn tại
                    </Typography>
                </Box>
            ) : (
                <Box className={myStyle.productsContainer}>
                    <Box className={myStyle.prodRow}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            products?.map((product) => (
                                <Box key={product._id} className={myStyle.prodCol}>
                                    <ProductItem product={product} />
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
            )}

            {/* Paging */}
            {totalPages > 1 && (
                <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </Box>
            )}
            <ToastContainer />
        </Box>
    );
}

export default ProductSearch;
