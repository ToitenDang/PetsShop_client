import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Checkbox from '@mui/material/Checkbox';

const CartContent = ({ product, onRemove, onQuantityChange, onSelect, isSelected }) => {
    const [quantity, setQuantity] = useState(product?.quantity);

    const handleIncreaseQuantity = () => {
        onQuantityChange(product.productId, 'increase'); // Gọi hàm handleQuantityChange với hành động 'increase'
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            onQuantityChange(product.productId, 'decrease'); // Gọi hàm handleQuantityChange với hành động 'decrease'
            setQuantity(quantity - 1);
        }
    };

    const handleRemove = () => {
        onRemove(product.productId); // Gọi hàm xóa sản phẩm
    };

    const handleSelectChange = (event) => {
        onSelect(product, event.target.checked); // Truyền cả đối tượng sản phẩm vào onSelect
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <CardMedia
                sx={{ width: 120, height: 120, objectFit: 'cover' }}
                component="img"
                alt={product.name}
                image={product.img || 'https://via.placeholder.com/120'}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1" gutterBottom>
                    {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">{quantity}</Typography>
                    <Typography variant="body1">x</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {product.price.toLocaleString('vi-VN')}đ
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1">{quantity}</Typography>
                        <IconButton onClick={handleIncreaseQuantity}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        Tổng: {(product.price * quantity).toLocaleString('vi-VN')}đ
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ padding: '16px 8px', display: 'flex', flexDirection: 'column' }}>
                <CardActions>
                    <Button onClick={handleRemove} color="error" size="small">
                        <DeleteIcon />
                    </Button>
                </CardActions>
                <Checkbox
                    checked={isSelected}
                    onChange={handleSelectChange} // Chuyển đối tượng sản phẩm vào
                    inputProps={{ 'aria-label': 'Select product for checkout' }}
                />
            </Box>
        </Card>
    );
};


export default CartContent;
