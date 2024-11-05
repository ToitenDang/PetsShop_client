import myStyle from './ProductItem.module.scss'

import Rating from '@mui/material/Rating';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const ProductItem = ({product}) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/product/${product?._id}`); 
    };


    return (
        <Box className={myStyle.detailProdContainer}
            sx={{ border: '1px solid #fff', padding: '8px', overflow: 'hidden', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;' }}>
            {/* Image */}
            <Box sx={{ height: '250px' }}>
                <img className={myStyle.prodImage} 
                src= 'https://th.bing.com/th/id/OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8?w=302&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                //{product?.img} 
                />
            </Box>
            {/* Content */}
            <Box>
                <Typography className={myStyle.prodContent} sx={{

                }}>
                    {product?.name}
                </Typography>
            </Box>
            {/* Star and price */}
            <Box>
                <Rating name="read-only" value={product?.rating} precision={0.1} readOnly />
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <Typography>Giá: <span style={{ color: '#c72c2c' }}>{product?.price.toLocaleString('vi-VN')}đ</span></Typography>
                    <Typography>Đã bán: <span>{product?.sold}</span></Typography>

                </Box>
            </Box>
            <Box className={myStyle.buyOrAdd}>

                <Button sx={{ minWidth: '65%', maxWidth: '65%' }} variant='contained' >Thêm vào giỏ</Button>


                <Button sx={{ minWidth: '65%', maxWidth: '65%' }} variant='contained' onClick={handleViewDetails}>Xem chi tiết</Button>

            </Box>
        </Box>
    )
}

export default ProductItem