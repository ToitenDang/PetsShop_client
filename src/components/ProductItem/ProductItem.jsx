import myStyle from './ProductItem.module.scss'

import Rating from '@mui/material/Rating';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const ProductItem = () => {
    return (
        <Box className={myStyle.detailProdContainer}
            sx={{border: '1px solid #fff', padding: '8px', overflow: 'hidden', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;' }}>
            {/* Image */}
            <Box sx={{ height: '250px' }}>
                <img className={myStyle.prodImage} src={`${publicUrl}/images/products/thucan.png`} />
            </Box>
            {/* Content */}
            <Box>
                <Typography className={myStyle.prodContent} sx={{

                }}>
                    Thức ăn hạt cho chó cute phôm mai que hột me xà le bà sá calf dfafsfdfaf dfsfsfsfsfsdf
                </Typography>
            </Box>
            {/* Star and price */}
            <Box>
                <Rating name="read-only" value={2.6} precision={0.1} readOnly />
                <Typography>Giá: <span style={{ color: '#c72c2c' }}>30.000đ</span></Typography>
            </Box>
            <Box className={myStyle.buyOrAdd}>

                <Button sx={{minWidth: '65%', maxWidth: '65%'}} variant='contained' >Thêm vào giỏ</Button>


                <Button sx={{minWidth: '65%', maxWidth: '65%'}} variant='contained'>Xem chi tiết</Button>

            </Box>
        </Box>
    )
}

export default ProductItem