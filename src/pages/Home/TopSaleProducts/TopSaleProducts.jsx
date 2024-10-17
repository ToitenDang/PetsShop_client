import myStyle from './TopSaleProducts.module.scss'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductItem from '~/components/ProductItem/ProductItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TopSaleProducts = () => {
    return (
        <Box sx={{ marginTop: '40px',paddingY: '10px',backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#062c4f' : '#fff' }}>
            <Box >
                <Typography sx={{ textAlign: 'center', marginY: '10px', fontSize: '2rem', fontWeight: 'bold' }}>Sản phẩm bán chạy</Typography>
            </Box>
            {/* List products */}
            <Box className={myStyle.productsContainer}>
                <Box className={myStyle.prodRow}>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                    {/* List product in 1 row*/}
                    <Box sx={{}} className={myStyle.prodCol}>
                        {/* Detail product */}
                        <ProductItem />
                    </Box>
                </Box>
            </Box>

            {/* Paging */}
            <Box sx={{marginTop: '10px',display: 'flex', justifyContent: 'center'}}>
                <Stack spacing={2}>
                    {/* Có thuộc tính onchange. nhận vào 2 đối số là event và value, value là số trang hiện tại */}
                    <Pagination count={10} variant="outlined" color="primary" />
                </Stack>
            </Box>
        </Box>

    )
}

export default TopSaleProducts;