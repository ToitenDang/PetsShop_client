// Styles
import styles from './ShoppingCart.module.scss'

import { useState } from 'react';
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
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 450, overflow: 'hidden' }} role="presentation" >
            {/* Heading list cart items */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 10px' }}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Your cart</Typography>
                <Tooltip title="Close shopping cart">
                    <Button onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </Button>
                </Tooltip>
            </Box>
            <Divider />
            {/* Content cart item */}

            <Box sx={{ overflowY: 'auto', padding: '5px', flex: 1 }}>
                <CartContent />
                <CartContent />
                <CartContent />
                <CartContent />
                <CartContent />
                <CartContent />
                <CartContent />
            </Box>

            <Divider />
            {/* Pay for cart */}
            <Box sx={{paddingX: '20px', textAlign: 'center',paddingY: '10px'}}>
                <Box sx={{paddingX: '10px',display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5'>Totals: </Typography>
                    <Typography>5.000.000</Typography>
                </Box>
                <Button sx={{backgroundColor: ''}}>Pay cart</Button>
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