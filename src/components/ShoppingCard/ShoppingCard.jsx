import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShoppingCart.module.scss';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CartContent from './CartContent/CartContent';
import Divider from '@mui/material/Divider';
import { useAuth } from "~/components/Authentication/Authentication";
import { UserFetch } from '~/REST-API-client';

const ShoppingCart = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // Lưu các sản phẩm được chọn

    useEffect(() => {
        if (user && user.cart) {
            setCartItems(user.cart);
        }
    }, [user]);

    // Toggle Drawer (mở hoặc đóng giỏ hàng)
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const handleQuantityChange = async (productId, action) => {
        let updatedCart = [...cartItems];
        const index = updatedCart.findIndex(item => item.productId === productId);

        if (index !== -1) {
            // Cập nhật số lượng trong giỏ hàng (tăng hoặc giảm)
            if (action === 'increase') {
                updatedCart[index].quantity += 1;
            } else if (action === 'decrease' && updatedCart[index].quantity > 1) {
                updatedCart[index].quantity -= 1;
            }

            const newData = { productId, quantity: updatedCart[index].quantity };

            try {
                // Gọi API để cập nhật giỏ hàng trên server
                const updatedCartFromAPI = await UserFetch.updateCart(user._id, newData);
                setCartItems(updatedCartFromAPI.data.data); // Cập nhật giỏ hàng từ API
            } catch (error) {
                console.error('Lỗi khi cập nhật giỏ hàng:', error);
            }
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveFromCart = async (productId) => {
        try {
            const updatedCart = await UserFetch.removeFromCart(user._id, productId);
            setCartItems(updatedCart.data); // Cập nhật giỏ hàng sau khi xóa sản phẩm
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        }
    };

    const handleSelectItem = (product, isSelected) => {
        let updatedSelectedItems = [...selectedItems];
        if (isSelected) {
            updatedSelectedItems.push(product); // Thêm đối tượng sản phẩm vào mảng selectedItems
        } else {
            updatedSelectedItems = updatedSelectedItems.filter(item => item.productId !== product.productId); // Loại bỏ sản phẩm khi bỏ chọn
        }
        setSelectedItems(updatedSelectedItems);
    };

    // Tính tổng tiền của các sản phẩm được chọn
    const calculateTotal = () => {
        let total = 0;
        if (selectedItems.length > 0) {
            total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        } else {
            total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
        return total.toLocaleString('vi-VN');
    };

    // Điều hướng đến trang thanh toán và truyền giỏ hàng
    const handleCheckout = () => {
        setOpen(false);
        navigate('/thanh-toan', { state: { productsToPay: selectedItems, cartItems: cartItems } }); // Truyền selectedItems và cartItems qua state
    };

    const DrawerList = (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 450, overflow: 'hidden' }} role="presentation">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Giỏ hàng của bạn</Typography>
                <Tooltip title="Đóng giỏ hàng">
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </Button>
                </Tooltip>
            </Box>
            <Divider />
            <Box sx={{ overflowY: 'auto', padding: '5px', flex: 1 }}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartContent
                            key={item.productId}
                            product={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveFromCart}
                            onSelect={handleSelectItem} // Truyền hàm onSelect
                            isSelected={selectedItems.some(selected => selected.productId === item.productId)} // Kiểm tra nếu sản phẩm đã được chọn
                        />
                    ))
                ) : (
                    <Typography variant="body1" sx={{ padding: 2, fontWeight:"bold", fontSize:"1.2rem" }}>Chưa có đồ trong giỏ, thú cưng của bạn sẽ buồn, mua sắm nhanh nào😒</Typography>
                )}
            </Box>
            <Divider />
            {
                cartItems.length === 0 ?
                    (null) :
                    (
                        <Box sx={{ paddingX: '20px', textAlign: 'center', paddingY: '10px' }}>
                            <Box sx={{ paddingX: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5">Tổng tiền: </Typography>
                                <Typography>{calculateTotal()}đ</Typography>
                            </Box>
                            <Button onClick={handleCheckout}>Thanh toán</Button>
                        </Box>
                    ) 
            }

        </Box>
    );

    return (
        <>
            <Box onClick={toggleDrawer(true)} className={styles.cartContainer}>
                <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                <Box className={styles.cartQuantityContainer}>
                    <p className={styles.cartQuantity}>{cartItems.length}</p>
                </Box>
            </Box>

            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default ShoppingCart;
