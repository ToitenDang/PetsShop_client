import React, { useEffect, useState } from 'react';
import myStyle from './Recommend.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductItem from '~/components/ProductItem/ProductItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductFetch, RecommendFetch } from '~/REST-API-client/index'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "~/components/Authentication/Authentication";
import "react-toastify/dist/ReactToastify.css";
const limit = 30
function Recommend() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const auth = useAuth();
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log("auth: ", auth.user)
  useEffect(() => {
    if (auth.user) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          // Gọi API và lấy dữ liệu

          const data = await RecommendFetch.getRecommendProducts(auth.user._id, 1, limit);
          console.log("get data: ", data);
          setProducts(data.data.data);
          setTotalPages(data.data.total_pages);
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Lỗi lấy danh sản phẩm gợi ý")
        } finally {
          setLoading(false);
        }
      };

      // Gọi hàm fetchProducts
      fetchProducts();
    }

  }, [auth.user]);

  const handlePageChange = async (event, value) => {
    try {
      setIsLoading(true);
      const data = await RecommendFetch.getRecommendProducts(auth.user._id, value, limit);
      setProducts(data.data.data);
      setIsLoading(false);
      const el = document.getElementById("recommend");
      el?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  if (!auth.user) {
    return (
      <div></div>
    )
  }

  return (
    <div>
      <Box id="recommend" sx={{ marginTop: '40px', paddingY: '10px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2a3b52' : '#fff' }}>
        <Box>
          <Typography sx={{ textAlign: 'center', marginY: '10px', fontSize: '2rem', fontWeight: 'bold' }}>
            Gợi ý cho bạn
          </Typography>
        </Box>

        {/* List products */}
        {
          isLoading ? <Box sx={{ display: "flex", justifyContent: "center" }}><CircularProgress /></Box> :
            (
              <Box className={myStyle.productsContainer}>
                <Box className={myStyle.prodRow}>
                  {
                    products.map((product) => (
                      <Box key={product._id} className={myStyle.prodCol}>
                        <ProductItem product={product} />
                      </Box>
                    ))
                  }
                </Box>
              </Box>
            )
        }


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
    </div>
  )
}

export default Recommend