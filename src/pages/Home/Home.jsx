import React from 'react';
import { Box, Typography, Grid, ImageList, ImageListItem } from '@mui/material';
import ProductCard from '../../components/Card/ProductCard';

// Dữ liệu giả lập cho sản phẩm
const products = [
  { id: 1, title: 'Sản phẩm 1', description: 'Mô tả sản phẩm 1', price: '$100', image: 'https://via.placeholder.com/200x200?text=Product+1', ratingValue: 4 },
  { id: 2, title: 'Sản phẩm 2', description: 'Mô tả sản phẩm 2', price: '$150', image: 'https://via.placeholder.com/200x200?text=Product+2', ratingValue: 3.5 },
  { id: 3, title: 'Sản phẩm 3', description: 'Mô tả sản phẩm 3', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+3', ratingValue: 5 },
  { id: 4, title: 'Sản phẩm 4', description: 'Mô tả sản phẩm 4', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+4', ratingValue: 5 },
  { id: 5, title: 'Sản phẩm 5', description: 'Mô tả sản phẩm 5', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+5', ratingValue: 5 },
  { id: 6, title: 'Sản phẩm 6', description: 'Mô tả sản phẩm 6', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+6', ratingValue: 5 },
  { id: 7, title: 'Sản phẩm 7', description: 'Mô tả sản phẩm 7', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+7', ratingValue: 5 },
  { id: 8, title: 'Sản phẩm 8', description: 'Mô tả sản phẩm 8', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+8', ratingValue: 5 },
  { id: 9, title: 'Sản phẩm 9', description: 'Mô tả sản phẩm 9', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+9', ratingValue: 5 },
  { id: 10, title: 'Sản phẩm 10', description: 'Mô tả sản phẩm 10', price: '$200', image: 'https://via.placeholder.com/200x200?text=Product+10', ratingValue: 5 },
];

// Dữ liệu ảnh banner
const bannerImages = [
  'https://via.placeholder.com/800x300?text=Banner+1',
  'https://via.placeholder.com/800x300?text=Banner+2',
  'https://via.placeholder.com/800x300?text=Banner+3'
];

function Home() {
  return (
    <Box sx={{ 
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      padding: '0 60px',
      display: 'flex',
      flexDirection: 'column',  // Chuyển Box cha thành flex container
      // alignItems: 'stretch',   // Các phần tử con sẽ căn chỉnh đúng với chiều rộng Box cha
      gap: 0, // Xóa khoảng cách dư
    }}>
      {/* Banner */}
      <Box sx={{ marginBottom: 4 }}>
        <ImageList sx={{ width: '100%', height: 300 }} variant="standard" cols={1}>
          {bannerImages.map((img, index) => (
            <ImageListItem key={index}>
              <img src={img} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100%' }} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Danh sách sản phẩm */}
      <Box sx={{ paddingX: 2, paddingBottom: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, color:'white' }}>Danh sách sản phẩm</Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
