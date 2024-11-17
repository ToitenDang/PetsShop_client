import { useState, useEffect } from 'react';
import { useAuth } from "~/components/Authentication/Authentication";
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, List, ListItem, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { OrderFetch } from '~/REST-API-client';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const { user, updateCart } = useAuth();
    const [products, setProducts] = useState([]);
    const [addressShippings, setAddressShippings] = useState([]);
    const [note, setNote] = useState('');
    const [address, setAddress] = useState(''); // Mặc định là chuỗi rỗng
    const navigate = useNavigate(); 

    useEffect(() => {
        if (user) {
            if (user.cart) {
                setProducts(user.cart);
            }

            if (user.shippingAddress) {
                setAddressShippings(user.shippingAddress);
                // Chỉ khi nhận được shippingAddress, hãy gán giá trị mặc định cho address
                setAddress(user.shippingAddress[0]?.address || '');
            }
        }
    }, [user]); // Phụ thuộc vào user, mỗi khi user thay đổi sẽ cập nhật lại

    const totalAmount = products.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingFee = 20000; // Giả sử phí ship
    const grandTotal = totalAmount + shippingFee;

    const [paymentMethod, setPaymentMethod] = useState('cod'); // Mặc định chọn COD

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Cập nhật địa chỉ khi chọn một địa chỉ mới từ danh sách
    const handleAddressChange = (event) => {
        setAddress(event.target.value); // Cập nhật địa chỉ được chọn
    };

    // Hàm gửi yêu cầu tạo đơn hàng khi chọn COD
    const handleSubmit = async (e) => {
        const orderData = {
            customerId: user._id,
            products: products.map(product => ({
                productId: product.productId,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                img: product.img
            })),
            totalAmount,
            grandTotal,
            shippingFee,
            note,
            paymentMethod,
            address // Gửi địa chỉ đã chọn từ Select
        };

        try {
            if (paymentMethod === 'cod') {
                const response = await OrderFetch.createNewOrder(orderData);
                updateCart([]); // Clear the cart
                alert(response.message || "Đơn hàng của bạn đã được tạo thành công!");
                navigate('/'); // Chuyển hướng trang
            } else {
                alert("Vui lòng chọn phương thức thanh toán đúng!");
            }
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
        }
    };

    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
            width: '100%',
            height: '100vh',
            padding: '0 16px 20px',
            display: 'flex',
            alignItems: 'center',
            mt: '60px'
        }}>
            <Box sx={{
                width: '1240px',
                position: 'relative',
                left: '50%',
                transform: 'TranslateX(-50%)',
            }}>
                <Typography variant='h5' sx={{ ml: 4 }}>Thanh toán</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: { xs: 'column', md: 'row' },
                }}>
                    {/* Sản phẩm */}
                    <Box sx={{
                        width: { xs: '100%', md: '45%' },
                        margin: '8px',
                        padding: '32px 16px',
                        borderRadius: '4px',
                        border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000')
                    }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Danh sách sản phẩm</Typography>
                        <Box sx={{
                            mb: 2,
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            height: '400px',
                            overflowY: products.length > 3 ? 'auto' : 'visible', // Hiển thị thanh cuộn khi có > 3 sản phẩm
                        }}>
                            <List sx={{ height: '500px'}}>
                                {products.map(product => (
                                    <ListItem key={product._id}>
                                        <Card sx={{
                                            display: 'flex', width: '100%', alignItems: 'center',
                                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
                                        }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, ml: 1 }}
                                                image={product.image}
                                                alt="Ảnh sản phẩm"
                                            />
                                            <CardContent sx={{
                                                padding: '8px'
                                            }}>
                                                <Typography variant="body1">{product.name}</Typography>
                                                <Typography variant="body2">Giá: {product.price.toLocaleString()} VNĐ</Typography>
                                                <Typography variant="body2">Số lượng: {product.quantity}</Typography>
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
                    <Box sx={{
                        width: { xs: '100%', md: '45%' },
                        margin: '8px',
                        padding: '32px 16px',
                        borderRadius: '4px',
                        border: (theme) => (theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #000')
                    }}>
                        <Typography variant="h5">Thông tin thanh toán</Typography>
                        <hr />
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant='body1'>Tên người đặt:  </Typography>
                                <Typography sx={{ ml: 2 }}>{user?.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant='body1'>Số điện thoại:  </Typography>
                                <Typography sx={{ ml: 2 }}>{user?.phone}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant='body1' sx={{ width: '200px'}}>Địa chỉ giao hàng: </Typography>
                                
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel>Chọn địa chỉ giao hàng</InputLabel>
                                    <Select
                                        value={address}
                                        onChange={handleAddressChange}
                                        label="Chọn địa chỉ giao hàng"
                                    >
                                        {addressShippings.map((shipping, index) => (
                                            <MenuItem key={index} value={shipping.address}>
                                                {shipping.address}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <TextField
                                sx={{
                                    width: '100%',
                                    mt: 1
                                }}
                                label='Chú thích'
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />

                            {/* Hình thức thanh toán */}
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>Hình thức thanh toán</Typography>
                            <Box sx={{ mt: 1 }}>
                                <label>
                                    <Radio
                                        name="payment-method"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={handlePaymentChange}
                                    />
                                    Thanh toán khi nhận hàng
                                </label>
                                <br />
                                <label>
                                    <Radio
                                        name="payment-method"
                                        value="e-wallet"
                                        checked={paymentMethod === 'e-wallet'}
                                        onChange={handlePaymentChange}
                                    />
                                    Trả trước qua ví điện tử momo
                                </label>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button variant="outlined">Quay lại</Button>
                                <Button variant="contained" onClick={handleSubmit}>Thanh toán</Button>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default Payment;
