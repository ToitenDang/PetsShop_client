import myStyle from './ProductItem.module.scss'

import Rating from '@mui/material/Rating';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

// const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
//import { PUBLIC_URL } from '~/constants';
const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    console.log("img anh: ", product);
    

    const handleViewDetails = () => {
        navigate(`/product/${product?._id}`);
    };
    return (
        <Box className={myStyle.detailProdContainer}
            sx={{ border: '1px solid #fff', padding: '8px', overflow: 'hidden', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;' }}>
            {/* Image */}
            <Box sx={{ height: '250px' }}>
                <img className={myStyle.prodImage}
                    src= {product?.img || 'https://th.bing.com/th/id/OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8?w=302&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
                //{product?.img} 
                />
            </Box>
            {/* Content */}
            <Box>
                <Typography className={myStyle.prodContent} sx={{
                    minHeight: "48px"
                }}>
                    {product?.name}
                </Typography>
            </Box>
            {/* Star and price */}
            <Box>
                <Rating name="read-only" value={product?.rating} precision={0.1} readOnly />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Giá: <span style={{ color: '#c72c2c' }}>{product?.price?.toLocaleString('vi-VN')}đ</span></Typography>
                    <Typography>Đã bán: <span>{product?.sold}</span></Typography>

                </Box>
            </Box>
            <Box className={myStyle.buyOrAdd}>
                <button className={myStyle.detailButton} onClick={handleViewDetails}>Xem chi tiết</button>
            </Box>
            {/* <Button   variant='contained' >Xem chi tiết</Button> */}
            {
                product?.promotions && product?.promotions[0]?.type ? (<Box className={myStyle.promotionContainer}>
                    <Typography sx={{ fontWeight: "bold", color: "#fff" }}>Giảm:</Typography>
                    {
                        product?.promotions[0]?.type === "percent" ?
                            <Typography sx={{ fontWeight: "bold", color: "#fff" }}>{product?.promotions[0]?.value}%</Typography>
                            :
                            <Typography sx={{ fontWeight: "bold", color: "#fff" }}>{product?.promotions[0]?.value / 1000}k</Typography>
                    }

                </Box>) : null
            }

        </Box>
    )
}

export default ProductItem