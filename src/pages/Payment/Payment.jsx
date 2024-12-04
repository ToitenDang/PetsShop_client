import { useState, useEffect } from 'react';
import { useAuth } from "~/components/Authentication/Authentication";
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, List, ListItem, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { OrderFetch, UserFetch } from '~/REST-API-client';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
    const { user, updateCart } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Dùng để nhận dữ liệu truyền xuống nếu có

    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [addressShippings, setAddressShippings] = useState([]); // Địa chỉ giao hàng
    const [note, setNote] = useState(''); // Ghi chú
    const [address, setAddress] = useState(''); // Địa chỉ giao hàng hiện tại
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Phương thức thanh toán (mặc định là COD)
    
    useEffect(() => {
        console.log("Location state:", location.state.cartItems);
        console.log("User cart:", user?.cart);
    
        // Kiểm tra nếu có dữ liệu từ location.state
        if (location.state) {
            // Nếu có sản phẩm cần thanh toán trong location.state
            if (Array.isArray(location.state.productsToPay) && location.state.productsToPay.length > 0) {
                console.log("Setting products from state:", location.state.productsToPay);
                setProducts(location.state.productsToPay);
            } else {
                console.log("No productsToPay in location state, using cart instead.");
                // Nếu không có sản phẩm cần thanh toán, sử dụng giỏ hàng từ user
                setProducts(user.cart || []);  // Sử dụng cartItems nếu có, nếu không thì trả về mảng rỗng
            }
    
            // Kiểm tra và cập nhật địa chỉ giao hàng
            if (location.state.shippingAddress) {
                console.log("Setting address from location state:", location.state.shippingAddress);
                setAddress(location.state.shippingAddress);
            } else if (user?.shippingAddress) {
                console.log("Setting address from user shippingAddress:", user.shippingAddress);
                setAddressShippings(user.shippingAddress);
                setAddress(user.shippingAddress[0]?.address || ''); // Lấy địa chỉ đầu tiên nếu có
            }
        } else {
            // Nếu không có location.state, lấy dữ liệu từ user
            console.log("No location state, using cart and address from user.");
            setProducts(user?.cart || []); // Đảm bảo user.cart là mảng
            if (user?.shippingAddress) {
                setAddressShippings(user.shippingAddress);
                setAddress(user.shippingAddress[0]?.address || ''); // Lấy địa chỉ đầu tiên nếu có
            }
        }
    }, [user, location.state]);  // Lắng nghe sự thay đổi của user.cart và location.state
    
    
    
    
    const totalAmount = products.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingFee = 20000; // Phí ship giả định
    const grandTotal = totalAmount + shippingFee;

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Cập nhật địa chỉ khi chọn từ danh sách địa chỉ
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    // Hàm gửi yêu cầu tạo đơn hàng
    // const handleSubmit = async () => {
    //     const orderData = {
    //         customerId: user._id,
    //         name: user.name,
    //         phone: user.phone,
    //         address: address,
    //         products: products.map(product => ({
    //             productId: product.productId,
    //             quantity: product.quantity,
    //             price: product.price,
    //         })),
    //         totalAmount,
    //         shippingFee,
    //         note,
    //         paymentMethod,
    //         address,
    //     };

    //     console.log("data tao order", orderData);
        

    //     try {
    //         if (paymentMethod === 'cod') {
    //             const response = await OrderFetch.createNewOrder(orderData);

    //             // Xóa từng sản phẩm đã thanh toán trong giỏ hàng
    //             for (const product of products) {

    //                 await UserFetch.removeFromCart(user._id, product.productId);
    //             }

    //             /////////////////////

    //             //const productIdsToDelete = selectedItems.map(item => item.productId);
                
    //             // Gọi API xóa những sản phẩm đã thanh toán
    //             // productIdsToDelete.forEach(async (productId) => {
    //             //     try {
    //             //         await UserFetch.removeFromCart(user._id, productId); // Xóa sản phẩm khỏi giỏ hàng của người dùng
    //             //     } catch (error) {
    //             //         console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    //             //     }
    //             // });

    //             console.log("KKKKKKKKKKKKK:", products);
    //             // Cập nhật lại giỏ hàng trong context (hoặc local state) sau khi thanh toán
    //             updateCart(user.cart.filter(item => !products.some(product => product.productId === item.productId)));

    //             // const updatedCart = await UserFetch.removeFromCart(user._id, productId);
    //             // updateCart([]); // Xóa giỏ hàng sau khi thanh toán thành công
    //             alert(response.message || "Đơn hàng của bạn đã được tạo thành công!");
    //             navigate('/'); // Chuyển hướng về trang chủ
    //         } else {
    //             const response = await OrderFetch.createNewOrderandPayment(orderData);

    //             // Xóa từng sản phẩm đã thanh toán trong giỏ hàng
    //             for (const product of products) {

    //                 await UserFetch.removeFromCart(user._id, product.productId);
    //             }

    //             /////////////////////

    //             //const productIdsToDelete = selectedItems.map(item => item.productId);
                
    //             // Gọi API xóa những sản phẩm đã thanh toán
    //             // productIdsToDelete.forEach(async (productId) => {
    //             //     try {
    //             //         await UserFetch.removeFromCart(user._id, productId); // Xóa sản phẩm khỏi giỏ hàng của người dùng
    //             //     } catch (error) {
    //             //         console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    //             //     }
    //             // });

    //             console.log("KKKKKKKKKKKKK:", products);
    //             // Cập nhật lại giỏ hàng trong context (hoặc local state) sau khi thanh toán
    //             updateCart(user.cart.filter(item => !products.some(product => product.productId === item.productId)));

    //             // const updatedCart = await UserFetch.removeFromCart(user._id, productId);
    //             // updateCart([]); // Xóa giỏ hàng sau khi thanh toán thành công
    //             alert(response.message || "Đơn hàng của bạn đã được tạo thành công!");
    //             navigate('/'); // Chuyển hướng về trang chủ
    //         }
    //     } catch (error) {
    //         console.error('Lỗi khi tạo đơn hàng:', error);
    //         alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    //     }
    // };

    const handleSubmit = async () => {
        const orderData = {
            customerId: user._id,
            name: user.name,
            phone: user.phone,
            products: products.map(product => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
            })),
            totalAmount,
            shippingFee,
            note,
            paymentMethod,
            address,
        };
    
        console.log("data tao order", orderData);
    
        try {
            if (paymentMethod === 'cod') {

                const response = await OrderFetch.createNewOrder(orderData);
    
                // Xóa từng sản phẩm đã thanh toán trong giỏ hàng
                for (const product of products) {
                    await UserFetch.removeFromCart(user._id, product.productId);
                }
    
                console.log("KKKKKKKKKKKKK:", products);
                updateCart(user.cart.filter(item => !products.some(product => product.productId === item.productId)));
    
                alert(response.message || "Đơn hàng của bạn đã được tạo thành công!");
                navigate('/'); // Chuyển hướng về trang chủ
            } else if (paymentMethod === 'vnpay') {
                // Tạo đơn hàng và lấy URL thanh toán từ VNPay
                const response = await OrderFetch.createNewOrderandPayment(orderData);
    
                if (response.success && response.data) {
                    // Chuyển hướng người dùng tới trang thanh toán VNPay
                    window.location.href = response.data; // Đây là URL thanh toán từ VNPay
                } else {
                    alert("Lỗi khi tạo đơn hàng với VNPay. Vui lòng thử lại.");
                }
    
                // Xóa sản phẩm khỏi giỏ hàng sau khi thanh toán
                for (const product of products) {
                    await UserFetch.removeFromCart(user._id, product.productId);
                }
    
                updateCart(user.cart.filter(item => !products.some(product => product.productId === item.productId)));
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
            height: '100%',
            padding: '0 16px 20px',
            display: 'flex',
            alignItems: 'center',
            mt: '150px'
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
                            <List sx={{ height: '500px' }}>
                                {products.map(product => (
                                    <ListItem key={product._id}>
                                        <Card sx={{
                                            display: 'flex', width: '100%', alignItems: 'center',
                                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : '#fff'),
                                        }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, ml: 1 }}
                                                image={product.img}
                                                alt="Ảnh sản phẩm"
                                            />
                                            <CardContent sx={{ padding: '8px' }}>
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

                    {/* Thông tin thanh toán */}
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
                                <Typography variant='body1'>Tên người đặt: </Typography>
                                <Typography sx={{ ml: 2 }}>{user?.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant='body1'>Số điện thoại: </Typography>
                                <Typography sx={{ ml: 2 }}>{user?.phone}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant='body1' sx={{ width: '200px' }}>Địa chỉ giao hàng: </Typography>
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
                                        value="vnpay"
                                        checked={paymentMethod === 'vnpay'}
                                        onChange={handlePaymentChange}
                                    />
                                    Trả trước qua ví điện tử vnPay
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
