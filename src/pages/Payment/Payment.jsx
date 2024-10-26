import { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    Radio
} from '@mui/material';

const products = [
    { id: 1, name: 'Sản phẩm 1', image: 'https://cdn.dribbble.com/users/2126879/screenshots/4209178/desktop_copycreditcard.png', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', image: 'link_to_image2', price: 200000 },
    { id: 3, name: 'Sản phẩm 3', image: 'link_to_image3', price: 150000 },
    { id: 4, name: 'Sản phẩm 4', image: 'link_to_image4', price: 300000 },
    { id: 5, name: 'Sản phẩm 5', image: 'link_to_image5', price: 250000 },
];

const Payment = () => {
    const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
    const shippingFee = 20000; // Giả sử phí ship
    const grandTotal = totalAmount + shippingFee;

    const [paymentMethod, setPaymentMethod] = useState('cod'); // Mặc định chọn COD

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
           
            width: '100%',
            height: '100vh',
            padding: '0 16px 20px',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Box
                sx={{
                    width: '1240px',

                    position: 'relative',
                    left: '50%',
                    transform: 'TranslateX(-50%)',
                }}
            >
                <Typography variant='h5' sx={{ml:4}}>Thanh toán</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >

                    {/* Sản phẩm */}

                    <Box
                        sx={{
                            width: { xs: '100%', md: '45%' },
                            margin: '8px',
                            padding: '32px 16px',
                            borderRadius: '4px',
                            border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000')
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>Danh sách sản phẩm</Typography>
                        <Box
                            sx={{
                                maxHeight: '400px',
                                overflowY: 'auto',
                                mb: 2,
                                border: '1px solid #ccc',
                                borderRadius: 1,
                            }}
                        >
                            <List>
                                {products.map(product => (
                                    <ListItem key={product.id}>
                                        <Card sx={{ display: 'flex', width: '100%', alignItems: 'center',
                                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff')
                                         }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, ml: 1 }}
                                                image={product.image}
                                                alt={product.name}
                                            />
                                            <CardContent >
                                                <Typography variant="h6">{product.name}</Typography>
                                                <Typography>Giá: {product.price.toLocaleString()} VNĐ</Typography>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box sx={{ borderTop: '1px solid #ccc', mt: 4 }}>
                            <Typography variant="body1">Tiền ship: {shippingFee.toLocaleString()} VNĐ</Typography>
                            <Typography variant="h6">Tổng tiền thanh toán: {grandTotal.toLocaleString()} VNĐ</Typography>
                        </Box>
                    </Box>

                    {/* Thông tin */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: '45%' },
                            margin: '8px',
                            padding: '32px 16px',
                            borderRadius: '4px',
                            border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000')
                            
                        }}
                    >
                        <Typography variant="h6">Thông tin thanh toán</Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Tên"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Địa chỉ"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Số điện thoại"
                                type="tel"
                            />

                            {/* Hình thức thanh toán */}
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>Hình thức thanh toán</Typography>
                            <Box sx={{ mt: 1 }}>
                                <label>
                                    <Radio
                                        name="payment-method"
                                        value="e-wallet"
                                        checked={paymentMethod === 'e-wallet'}
                                        onChange={handlePaymentChange}
                                    />
                                    Trả trước qua ví điện tử
                                </label>
                                <br />
                                <label>
                                    <Radio
                                        name="payment-method"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentChange}
                                    />
                                    Thanh toán khi nhận hàng
                                </label>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button variant="outlined">Quay lại</Button>
                                <Button variant="contained" type="submit">Xác nhận</Button>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default Payment;
