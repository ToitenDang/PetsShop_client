import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography, Box, RadioGroup, FormControlLabel, Radio, IconButton, Rating, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Review from '~/components/Review/Review';
import {ProductFetch, UserFetch} from '~/REST-API-client/index'
import { useAuth } from "~/components/Authentication/Authentication";
import { ToastContainer } from 'react-toastify';





//import { feachProductDetailsAPI } from "~/apis"

export default function Product() {
    const {user, updateCart} = useAuth();
    const {id} = useParams();
    const [product, setProduct] = useState(null)
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState('');
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0)

    useEffect(() => {
        
        window.scrollTo(0, 0);
        const fetchProductDetails = async () => {
            try {
                
                const product = await ProductFetch.getById(id);
                console.log(product);

                if(product.data.hasPromotion){
                    if(product.data.promotions[0].type === "percent"){
                        const discountAmount = (product.data.price / 100) * product.data.promotions[0].value;
                        const beforeDiscount = product.data.price  // Tính toán giá gốc từ giá giảm
                        product.data.price_before_discount = beforeDiscount;  // Gán vào trường beforediscount
                        product.data.price -= discountAmount;  // Cập nhật giá sau khuyến mãi
                    }
                    if(product.data.promotions[0].type === "price"){
                        const discountAmount =  product.data.promotions[0].value;
                        const beforeDiscount = product.data.price  // Tính toán giá gốc từ giá giảm
                        product.data.price_before_discount = beforeDiscount;  // Gán vào trường beforediscount
                        product.data.price -= discountAmount;  // Cập nhật giá sau khuyến mãi
                    }
                }

                setProduct(product.data); 
                setImage(product.data.img)
            } catch (error) {
                
                console.error('Error fetching product details:', error);
            }
        };
    
        fetchProductDetails();
    }, [id]); 


    const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
    const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

    const handleAddToCart = async () => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!user) {
            alert("Vui lòng đăng nhập để mua sản phẩm!");
            navigate('/'); // Điều hướng người dùng tới trang đăng nhập
            return;
        }
    
        const productToAdd = {
            productId: product._id,
            name: product.name,
            //size: size,
            img: product.img ||'https://th.bing.com/th/id/OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8?w=302&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            quantity: quantity,
            price: product.price
        };
    
        if(productToAdd.quantity > product.quantity){
            alert(`Số lượng sản phẩm này chỉ còn số lượng là: ${product.quantity}`);
            return;
        }
    
        try {
            console.log("user", user);
            
            // Gọi API để thêm sản phẩm vào giỏ hàng trên server
            const updatedCart = await UserFetch.addToCart(user._id, productToAdd);
    
            // Sau khi thêm vào giỏ hàng thành công, cập nhật lại giỏ hàng trong state của ứng dụng
            updateCart(updatedCart.data);
    
            console.log('Giỏ hàng sau khi thêm sản phẩm: ', updatedCart.data);
        } catch (error) {
            console.error('Không thể thêm sản phẩm vào giỏ hàng:', error);
        }
    };

    console.log("Sanr pham xey", product);
    

    const handleBuyNow = () => {
        // Kiểm tra nếu người dùng chưa đăng nhập
        if (!user) {
            alert("Vui lòng đăng nhập để mua sản phẩm!");
            navigate('/'); // Điều hướng người dùng tới trang đăng nhập
            return;
        }
    
        // Tạo đối tượng sản phẩm cần mua
        const productToBuy = {
            productId: product._id,
            name: product.name,
            img: image,
            quantity: quantity,
            price: product.price,
        };
        if(productToBuy.quantity > product.quantity){
            alert(`Số lượng sản phẩm này chỉ còn số lượng là: ${product.quantity}`);
            return;
        }
    
        // Điều hướng sang trang thanh toán và truyền thông tin sản phẩm
        navigate('/thanh-toan', { state: { productsToPay: [productToBuy] } });
    };

    const handleImageClick = (thumb, index) => {
        setImage(thumb)
        setSelectedThumbnailIndex(index)
    }
    

    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
                width: '100%',
                minHeight: '100vh',
            }}>
            <Box
                sx={{
                    mt: '120px',
                    maxWidth: '1240px',
                    padding: '32px 16px 32px',
                    position: 'relative',
                    left: '50%',
                    transform: 'TranslateX(-50%)',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: "flex",
                        flexDirection: { xs: 'column', md: 'row' },
                        color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000')
                    }}
                >
                    <Box display="flex" sx={{ width: { xs: '100%', md: '45%' }, height: 'auto', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{display: 'flex', justifyContent: 'center', maxWidth: '70%'}}>
                            <img 
                            src= {image||'https://th.bing.com/th/id/OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8?w=302&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
                            //src={product?.img}
                            alt={product?.name} style={{ with: "70%",maxWidth: '70%', height: 'auto', cursor: 'zoom-in' ,objectFit: "fit", border: "1px solid #333"}} />
                        </Box>

                        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                            {/* <img
                                //key={index}
                                src={product?.img}
                                //alt={product?.name}
                                style={{ width: '60px', height: '60px', margin: '0 5px', cursor: 'pointer' }}
                            //onClick={() => handleImageClick(thumb.url)} // Hàm để hiển thị ảnh lớn
                            /> */}
                            {product?.thumbnail.map((thumb, index) => (
                                <img
                                    key={index}
                                    src={thumb.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{ width: '50px', height: '50px', margin: '0 5px', cursor: 'pointer' ,
                                        border: selectedThumbnailIndex === index ? '2px solid #e96c48' : 'none' // Thêm border khi được
                                    }}
                                    
                                    onClick={() => handleImageClick(thumb.url, index)} // Hàm để hiển thị ảnh lớn
                                />
                            ))}
                        </Box>
                    </Box>


                    <Box
                        sx={{
                            width: { xs: '100%', md: '55%' },

                        }}
                    >


                        <Typography variant='h4'>
                            {product?.name}
                        </Typography>
                        <hr />
                        <Typography variant="subtitle1">{product?.desc}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {product?.price_before_discount && (
                                <>
                                    <Typography variant="h6" sx={{ textDecoration: 'line-through' }}>
                                        {product?.price_before_discount.toLocaleString('vi-VN')}đ
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#e84118' }}>{product?.price.toLocaleString('vi-VN')}đ</Typography>
                                </>
                            )}
                            {!product?.price_before_discount && (
                                <Typography variant="h5" sx={{ color: '#e84118' }}>
                                    {product?.price.toLocaleString('vi-VN')}đ
                                </Typography>
                            )}
                        </Box>

                        <Typography variant="body1">Kích thước:</Typography>
                        {/* <RadioGroup row value={size} sx={{ gap: 1.5 }} onChange={(e) => setSize(e.target.value)}>
                            {product?.size?.map((s) => (
                                <FormControlLabel
                                    key={s}
                                    value={s}
                                    control={<Radio />}
                                    label={<Typography>{s}</Typography>}
                                />
                            ))}
                        </RadioGroup> */}

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={decreaseQuantity}><Remove /></IconButton>
                            <Typography variant="body1" sx={{padding: '0 16px'}}>{quantity} </Typography>
                            <IconButton onClick={increaseQuantity}><Add /></IconButton>
                        </Box>

                        <Button variant="contained" onClick={handleAddToCart} sx={{ marginTop: 2 }}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button variant="outlined" onClick={handleBuyNow} sx={{ margin: '16px 0 0 16px' }}>
                            Mua ngay
                        </Button>
                    </Box>
                </Box>

                {/* Phần Đánh giá */}
                {product && <Review entityId={product._id} type='product' />}
                
            </Box>
            <ToastContainer />
        </Box>
    );
}
