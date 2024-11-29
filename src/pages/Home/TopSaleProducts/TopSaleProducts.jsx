import React, { useEffect, useState } from 'react';
import myStyle from './TopSaleProducts.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductItem from '~/components/ProductItem/ProductItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductFetch } from '~/REST-API-client/index'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TopSaleProducts = () => {
    const [products, setProducts] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Gọi API và lấy dữ liệu

                const data = await ProductFetch.fetchTopSaleProducts(1);
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Lỗi lấy danh sách sản phẩm")
            } finally {
                setLoading(false);
            }
        };

        // Gọi hàm fetchProducts
        fetchProducts();

    }, []);

    const handlePageChange = async (event, value) => {
        try {
            const data = await ProductFetch.fetchTopSaleProducts(value);
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
                    Sản phẩm bán chạy
                </Typography>
            </Box>

            {/* List products */}
            <Box className={myStyle.productsContainer}>
                <Box className={myStyle.prodRow}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        products.map((product) => (
                            <Box key={product._id} className={myStyle.prodCol}>
                                <ProductItem product={product} />
                            </Box>
                        ))
                    )}
                </Box>
            </Box>

            {/* Paging */}
            <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        // page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default TopSaleProducts;
