import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Rating } from '@mui/material';

const Review = ({ product }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi đánh giá
        console.log('Rating:', rating);
        console.log('Comment:', comment);
    };

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Đánh giá và nhận xét {product.name}</Typography>
            <Typography>{product.desc}</Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 2 }}>
                    <Rating
                        name="rating"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        size="large"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="Nhận xét của bạn"
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Gửi đánh giá
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Review;
