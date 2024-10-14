import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import MenuAppbar from '~/components/MenuAppbar/MenuAppbar';
import CloseIcon from '@mui/icons-material/Close';
const MenuSum = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }}  onClick={toggleDrawer(false)}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button>
                    <CloseIcon />
                </Button>
            </Box>
            <MenuAppbar styleProps={{
                display: 'flex',
                flexDirection: 'column'
            }} />
        </Box>
    );

    return (
        <>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon />
            </Button>
            <Drawer  sx={{ 
                overflow: 'visible',
                '& .MuiPaper-root': {
                    overflow:'visible'
                }
             }} open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default MenuSum