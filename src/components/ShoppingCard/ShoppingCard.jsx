import { useState, useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CartContent from './CartContent/CartContent';
import Divider from '@mui/material/Divider';
import styles from './ShoppingCart.module.scss';
import { useAuth } from "~/components/Authentication/Authentication";
import { UserFetch } from '~/REST-API-client';


const ShoppingCart = () => {
    const {user} = useAuth();
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // Lưu các sản phẩm được chọn

    useEffect(() => {
        if (user && user.cart) {
            setCartItems(user.cart);
        }
    }, [user]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

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
            const newData = {
                productId,
                quantity: updatedCart[index].quantity

            }
            console.log("productId", newData);
            // Gọi API để cập nhật giỏ hàng trên server
            try {
                const updatedCartFromAPI = await UserFetch.updateCart(user._id, newData);
                // Sau khi API trả về giỏ hàng đã cập nhật, cập nhật giỏ hàng trong state
                console.log("Quai dan that a: ", updatedCartFromAPI.data);
                
                //setCartItems(updatedCartFromAPI.data.data);
                setCartItems(updatedCartFromAPI.data.data);
            } catch (error) {
                console.error('Lỗi khi cập nhật giỏ hàng:', error);
            }
        }
    };
    

    const handleRemoveFromCart = async (productId) => {
        console.log("Quai that", productId);
        
        try {
            const updatedCart = await UserFetch.removeFromCart(user._id, productId);
            console.log("Giỏ hàng sau khi xóa sản phẩm: ", updatedCart);
            // Cập nhật giỏ hàng trong state hoặc context sau khi xóa thành công
            setCartItems(updatedCart.data)
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng: ", error);
        }
    };

    const handleSelectItem = (productId, isSelected) => {
        let updatedSelectedItems = [...selectedItems];
        if (isSelected) {
            updatedSelectedItems.push(productId);
        } else {
            updatedSelectedItems = updatedSelectedItems.filter(id => id !== productId);
        }
        setSelectedItems(updatedSelectedItems);
    };

    const calculateTotal = () => {
        console.log("cartItem", cartItems);
        
        if (selectedItems.length === 0) {
            // Nếu không có sản phẩm nào được chọn, tính tổng tất cả sản phẩm
            return cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString('vi-VN');
        } else {
            // Nếu có sản phẩm được chọn, tính tổng của những sản phẩm đó
            return cartItems
                .filter(item => selectedItems.includes(item.productId)) // Lọc sản phẩm được chọn
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString('vi-VN');
        }
    };

    const DrawerList = (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 450, overflow: 'hidden' }} role="presentation">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Giỏ hàng của bạn</Typography>
                <Tooltip title="Close shopping cart">
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
                            onToggleSelect={handleSelectItem}
                            onRemove={handleRemoveFromCart}
                            isSelected={selectedItems.includes(item.productId)}
                        />
                    ))
                ) : (
                    <Typography variant="body1" sx={{ padding: 2 }}>Giỏ hàng của bạn trống</Typography>
                )}
            </Box>

            <Divider />
            <Box sx={{ paddingX: '20px', textAlign: 'center', paddingY: '10px' }}>
                <Box sx={{ paddingX: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5">Tổng tiền: </Typography>
                    <Typography>{calculateTotal()}đ</Typography>
                </Box>
                <Button href='/thanh-toan'>Thanh toán</Button>
            </Box>
        </Box>
    );

    return (
        <>
            <Box onClick={toggleDrawer(true)} className={styles.cartContainer}>
                <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                <Box className={styles.cartQuantityContainer}>
                    <p className={styles.cartQuantity}>
                        {cartItems.length}
                    </p>
                </Box>
            </Box>

            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default ShoppingCart;
