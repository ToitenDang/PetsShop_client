import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Rating } from '@mui/material';
//import { createNewReview, feachReviewByProductId } from "~/apis";
import {ReviewFetch} from '~/REST-API-client/index'


const Review = ({ entityId, type }) => {
    const [reviews, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    //Gọi api lấy danh sách đánh giá
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                
                const review = await ReviewFetch.fetchReviewByEntityId(entityId, type);
                setReview(review); 
            } catch (error) {
                
                console.error('Error fetching review details:', error);
            }
        };
    
        
        fetchReviews();
    }, [entityId, type]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
    
        const userId = "672890544296af5f67384a54"; // Thay thế bằng id thực tế trong localstorage
        const user = "Dang The Kyy"; // Thay thế bằng tên người dùng thực tế trong localstorage
    
        if (!userId || !user) {
            console.error("Người dùng chưa đăng nhập");
            return; // Không cho phép gửi đánh giá nếu người dùng chưa đăng nhập
        }
    
        const newReview = {
            entityId,
            type,
            userId: userId,
            user: user,
            rating,
            comment,
            createdAt: new Date().toISOString()
        };
    
        try {
            // Gọi API để tạo đánh giá mới
            const response = await ReviewFetch.createNewReview(newReview);
    
            // Cập nhật danh sách đánh giá sau khi tạo thành công, sử dụng dữ liệu trả về từ API
            setReview((prev) => [...prev, response.data]); 
    
            // Đặt lại giá trị rating và comment sau khi tạo đánh giá mới
            setRating(0);
            setComment('');

        } catch (error) {
            console.error('Error creating review:', error);
        }
    };    
    

    return (
        <Box 
            sx={{
                marginTop: 4,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}>
            <Box 
                sx={{
                    width: { xs: '100%', md: '80%' },
                    border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000'),
                    borderRadius: '4px',
                    padding: 2
                }}
            >
                <Typography variant="h5">Đánh giá sản phẩm</Typography>
                <form onSubmit={handleSubmitReview}>
                    <Rating
                        name="rating"
                        value={rating}
                        precision={0.1}
                        onChange={(event, newValue) => setRating(newValue)}
                        size="medium"
                    />
                    <TextField
                        label="Nhận xét của bạn"
                        multiline
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: 1 }}
                    />
                    <Button type="submit" variant="contained" onClick={handleSubmitReview} sx={{ marginTop: 2 }}>Gửi đánh giá</Button>
                </form>
            </Box>

            {/* Danh sách đánh giá */}
            <Box
                sx={{
                    width: { xs: '100%', md: '80%' },
                    border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000'),
                    borderRadius: '4px',
                    padding: 2,
                    mt: 2
                }}
            >
                <Typography variant="h5">Đánh giá của người tiêu dùng</Typography>
                {reviews && reviews.length === 0 
                ? 
                    <Typography>Sản phẩm hiện chưa có đánh giá nào!</Typography>
                : reviews.map(review => (
                    <Box key={review?._id} sx={{ padding: 2, marginTop: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body1"><strong>{review.user}</strong></Typography>
                            <Rating
                                name="rating"
                                value={review?.rating}
                                precision={0.5}
                                size="small"
                            />
                        </Box>
                        <Typography variant="body2"><strong>Bình luận:</strong> {review?.comment}</Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{new Date(review.createdAt).toLocaleString()}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Review;
