import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, RadioGroup, FormControlLabel, Radio, IconButton, Rating, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function Product() {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const product = {
        id: '1',
        name: 'Máng ăn cho chó Dang02 2in1',
        description: 'Máng ăn cho chó Dang02 2in1 là một sản phẩm mang tính đột phá.',
        img: 'https://via.placeholder.com/300',
        price_before_discount: '1.000.000 đ',
        price: '800.000 ₫',
        reviews: [
            { id: 1, userId: '123', username: 'Nguyễn Văn A', rating: 5, comment: "Sản phẩm tuyệt vời!", date: "2024-10-20" },
            { id: 2, userId: '124', username: 'Trần Thị B', rating: 4, comment: "Chó của tôi rất thích!", date: "2024-10-21" },
        ]
    };

    const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
    const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

    const handleAddToCart = () => {
        navigate('/cart');
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        const newReview = {
            id: product.reviews.length + 1,
            userId: 'user_id',
            username: 'ten_tk', // Tên tài khoản sẽ được lấy từ thông tin người dùng đã đăng nhập
            rating,
            comment,
            date: new Date().toISOString()
        };
        product.reviews.push(newReview);  // Thêm đánh giá mới vào sản phẩm
        setRating(0);
        setComment('');
    };

    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
                width: '100%',
                height: 'auto',
            }}>
            <Box
                sx={{
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
                    <Box display="flex"  sx={{width: {xs: '100%', md: '45%'}, height: 'auto', flexDirection: 'column', alignItems: 'center' }}>
                        <Box>
                            <img src={product.img} alt={product.name} style={{ maxWidth: '100%', height: 'auto', cursor: 'zoom-in' }} />
                        </Box>

                        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                            <img
                                //key={index}
                                src={product.img}
                                alt={product.name}
                                style={{ width: '60px', height: '60px', margin: '0 5px', cursor: 'pointer' }}
                            //onClick={() => handleImageClick(thumb.url)} // Hàm để hiển thị ảnh lớn
                            />
                            {/* {product.thumbnail.map((thumb, index) => (
                                <img
                                    key={index}
                                    src={thumb.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{ width: '50px', height: '50px', margin: '0 5px', cursor: 'pointer' }}
                                    onClick={() => handleImageClick(thumb.url)} // Hàm để hiển thị ảnh lớn
                                />
                            ))} */}
                        </Box>
                    </Box>


                    <Box 
                        sx={{
                            width: {xs: '100%', md: '55%'},
                            
                        }}
                    >
                        <Typography variant="h4">{product.name}</Typography>
                        <hr />
                        <Typography variant="body2">{product.description}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {product.price_before_discount && (
                                <>
                                    <Typography variant="h6" sx={{ textDecoration: 'line-through' }}>
                                        {product.price_before_discount}
                                    </Typography>
                                    <Typography variant="h4" sx={{ color: '#e84118' }}>{product.price}</Typography>
                                </>
                            )}
                            {!product.price_before_discount && (
                                <Typography variant="h5" sx={{ color: '#e84118' }}>
                                    {product.price}
                                </Typography>
                            )}
                        </Box>

                        <Typography variant="body1">Kích thước:</Typography>
                        <RadioGroup row value={size} sx={{ gap: 1.5 }} onChange={(e) => setSize(e.target.value)}>
                            {['S', 'M', 'L', 'XL'].map((s) => (
                                <FormControlLabel
                                    key={s}
                                    value={s}
                                    control={<Radio />}
                                    label={<Typography>{s}</Typography>}
                                />
                            ))}
                        </RadioGroup>

                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <IconButton onClick={decreaseQuantity}><Remove /></IconButton>
                            <Typography variant="body1">{quantity}</Typography>
                            <IconButton onClick={increaseQuantity}><Add /></IconButton>
                        </Box>

                        <Button variant="contained" onClick={handleAddToCart} sx={{ marginTop: 2 }}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button variant="contained" onClick={handleAddToCart} sx={{ margin: '16px 0 0 16px' }}>
                            Mua ngay
                        </Button>
                    </Box>
                </Box>

                {/* Phần Đánh giá */}
                <Box 
                sx={{
                    marginTop: 4,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap:2}}>
                    <Box 
                        sx={{
                            width: {xs: '100%', md: '80%'},
                            border: (theme) => (theme.palette.mode ==='dark' ? '1px solid #fff' : '1px solid #000'),
                            borderRadius: '4px',
                            padding: 2
                        }}
                    >
                        <Typography variant="h5">Đánh giá sản phẩm</Typography>
                        <form onSubmit={handleSubmitReview}>
                            <Rating
                                name="rating"
                                value={rating}
                                precision={0.5}
                                onChange={(event, newValue) => setRating(newValue)}
                                size="large"
                            />
                            <TextField
                                label="Nhận xét của bạn"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            />
                            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Gửi đánh giá</Button>
                        </form>
                    </Box>

                    {/* Danh sách đánh giá */}
                    <Box
                        sx={{
                            width: {xs: '100%', md: '80%'},
                            border: (theme) => (theme.palette.mode ==='dark' ? '1px solid #fff' : '1px solid #000'),
                            borderRadius: '4px',
                            padding: 2,
                            mt: 2
                        }}
                    >
                        <Typography variant="h5">Đánh giá của người tiêu dùng</Typography>
                        {product.reviews.map(review => (
                            <Box key={review.id} sx={{  padding: 2, marginTop: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography variant="body1"><strong>{review.username}</strong></Typography>
                                    <Rating
                                        name="rating"
                                        value={review.rating}
                                        precision={0.5}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2"><strong>Bình luận:</strong> {review.comment}</Typography>
                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{new Date(review.date).toLocaleDateString()}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
