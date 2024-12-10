import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Rating } from '@mui/material';
//import { createNewReview, feachReviewByProductId } from "~/apis";
import { ReviewFetch } from '~/REST-API-client/index'
import { useAuth } from "~/components/Authentication/Authentication";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Review = ({ entityId, type }) => {
    const {user} = useAuth();
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
                toast.error(`Lỗi lấy dữ liệu đánh giá:\n${error}`)
                console.error('Error fetching review details:', error);
            }
        };


        fetchReviews();
    }, [entityId, type]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
    
        if (!user) {
            console.error("Người dùng chưa đăng nhập");
            // alert("Bạn cần đăng nhập để viết đánh giá.");
            toast.error("Bạn cần đăng nhập để viết đánh giá.")
            return; // Không cho phép gửi đánh giá nếu người dùng chưa đăng nhập
        }
    
        if (!rating || !comment) {
            // alert("Bạn chưa nhập đánh giá!");
            toast.error("Bạn chưa nhập đánh giá!")
            return;
        }
    
        const newReview = {
            entityId,
            type,
            userId: user._id,
            user: user.name,
            rating,
            comment,
            createdAt: new Date().toISOString()
        };

        console.log("new review", newReview);
        
    
        try {
            // Gọi API để tạo đánh giá mới
            const response = await ReviewFetch.createNewReview(newReview);
    
            // Kiểm tra nếu server trả về lỗi, hiển thị thông báo lỗi cho người dùng
            if (response.status === "ERROR") {
                // alert(response.message);  // Hiển thị thông báo lỗi từ server
                toast.error(response.message);
                return;
            }
    
            // Cập nhật danh sách đánh giá sau khi tạo thành công
            // alert(response.message); // Hiển thị thông báo thành công
            toast.success(response.message);
            setReview((prev) => [...prev, response.data]);
    
            // Đặt lại giá trị rating và comment sau khi tạo đánh giá mới
            setRating(0);
            setComment('');
    
        } catch (error) {
            console.error('Error creating review:', error);
            // alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại.");
            toast.error(`Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại.\n${error}`)
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
                    <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Gửi đánh giá</Button>
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
// <<<<<<< HEAD
//                 : reviews.map(review => (
//                     <Box key={review?._id} sx={{ padding: 2, marginTop: 1 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                             <Typography variant="body1"><strong>{review.user}</strong></Typography>
//                             <Rating
//                                 name="rating"
//                                 value={review?.rating}
//                                 precision={0.5}
//                                 size="small"
//                                 readOnly
//                             />
// =======
                    : reviews.map(review => (
                        <Box key={review?._id} sx={{ padding: 2, marginTop: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="body1"><strong>{review.user}</strong></Typography>
                                <Rating
                                    name="rating"
                                    value={review?.rating}
                                    precision={0.5}
                                    size="small"
                                    readOnly  
                                />
                            </Box>
                            <Typography variant="body2"><strong>Bình luận:</strong> {review?.comment}</Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{new Date(review.createdAt).toLocaleString()}</Typography>

                        </Box>
                    ))}
            </Box>
            {/* <ToastContainer /> */}
        </Box>
    );
};

export default Review;
