// components/ProductCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Rating, Box } from '@mui/material';

const ProductCard = ({ title, description, price, image, ratingValue }) => {
  const [hovered, setHovered] = useState(false); // State để kiểm tra khi hover

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
        '&:hover': {
          boxShadow: 3, // Thêm hiệu ứng shadow khi hover
        }
      }}
      onMouseEnter={() => setHovered(true)}  // Khi hover
      onMouseLeave={() => setHovered(false)}  // Khi bỏ hover
    >
      {/* Ảnh sản phẩm */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{
          transition: '0.3s',
          filter: hovered ? 'brightness(80%)' : 'none',
          position: 'relative',
        }}
      />

      {/* Lớp phủ chỉ chứa nút, sẽ hiển thị khi hover */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '200px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Lớp nền tối
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: hovered ? 1 : 0,  // Lớp phủ chỉ xuất hiện khi hover
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 2,
          gap: 2,  // Khoảng cách giữa các nút
        }}
      >
        <Button
          variant="contained"
          sx={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          Xem Chi Tiết
        </Button>
        <Button
          variant="contained"
          sx={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          Mua Ngay
        </Button>
      </Box>

      {/* Thông tin sản phẩm: tên, mô tả, giá */}
      <CardContent>
        <Typography sx={{ fontSize: '16px'}}>{title}</Typography>

        <Typography color="text.secondary" sx={{ height: '60px', overflow: 'hidden', fontSize: '14px' }}>
          {description}
        </Typography>
        <Typography sx={{ marginTop: 2, fontWeight: 'bold', fontSize: '18px', color: '#e84118'}}>{price}</Typography>
        {/* Hiển thị Rating trong CardContent, bên dưới tên và mô tả */}
        <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', marginTop: 1 }}>
          <Typography>Đánh giá</Typography>
            <Rating
              name="read-only"
              value={ratingValue}
              readOnly
              precision={0.5}
            />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
