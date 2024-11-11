// Styles
import styles from './ShoppingCart.module.scss'

import { useEffect, useState } from 'react';
import { useAuth } from '../Authentication/Authentication';
// component
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CartContent from './CartContent/CartContent';
import Divider from '@mui/material/Divider';

const ShoppingCart = ({ quantity }) => {
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState([]);
    // console.log("user auth: ", auth.user);

    useEffect(() => {
        if(auth?.user) {
            setCart(auth?.user?.cart);
        }
    },[auth.user])
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 450, overflow: 'hidden' }} role="presentation" >
            {/* Heading list cart items */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Giỏ của bạn</Typography>
                <Tooltip title="Close shopping cart">
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </Button>
                </Tooltip>
            </Box>
            <Divider />
            {/* Content cart item */}

            <Box sx={{ overflowY: 'auto', padding: '5px', flex: 1 }}>
                {
                    cart && cart.map((item, index) => {
                        return <CartContent key={index} data={item} />
                    })
                }
                
            </Box>

            <Divider />
            {/* Pay for cart */}
            <Box sx={{paddingX: '20px', textAlign: 'center',paddingY: '10px'}}>
                <Box sx={{paddingX: '10px',display: 'flex', justifyContent: 'space-around'}}>
                    <Typography variant='h5' sx={{fontWeight:"bold"}}>Tổng tiền: </Typography>
                    <Typography sx={{fontWeight:"bold", color:"#ec6b41"}}>
                        {
                            cart.reduce((prev, curr, index) => {
                                return prev + curr?.quantity * curr?.price
                            },0).toLocaleString('vi-VN')
                        } đ
                    </Typography>
                </Box>
                <Button variant='contained' href='/thanh-toan' sx={{backgroundColor: '', width:"100%"}}>Thanh toán</Button>
            </Box>
        </Box>
    );

    return (
        <>
            <Box
                onClick={toggleDrawer(true)}
                className={styles.cartContainer}>

                <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                {/* Number of items */}
                <Box className={styles.cartQuantityContainer}>
                    <p className={styles.cartQuantity}>
                        {quantity}
                    </p>
                </Box>
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default ShoppingCart