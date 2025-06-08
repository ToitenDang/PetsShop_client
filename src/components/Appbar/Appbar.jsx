// CSS
import mystyles from './Appbar.module.scss';

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Function components
import ShoppingCart from '~/components/ShoppingCard/ShoppingCard';
import Profile from '~/components/Profile/Profile';
import MenuAppbar from '~/components/MenuAppbar/MenuAppbar';
import { ResponsiveContainer, ResponsiveLogo } from '../responsive';
// import Category from '~/components/Category/Category';

import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ModeSelect from '~/components/ModeSelect/ModeSelect';

import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useAuth } from '~/components/Authentication/Authentication';
import Search from './Search';
import Notify from './Notify';
import { useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Appbar() {
  const auth = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  console.log('rerender appbar');

  return (
    <Box
      className={mystyles.mainContainer}
      sx={ { backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#062c4f' : null) }}
    >
      <ResponsiveContainer
        className={mystyles.container}
        sx={{
          width: '90%',
          gap: 2,
          paddingY: '5px',
        }}
      >
        {/* Higher part */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            justifyContent: 'space-between',
            zIndex: 1,
            padding: {xs : '0 10px', md : '0'}
          }}
        >
          {/* Logo part */}
          <Box
            sx={{
              textAlign: 'center',
              color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PetsIcon sx={{ fontSize: '2rem', color: '#ed6b40' }} />
            <ResponsiveLogo sx={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
              Bet Shob
            </ResponsiveLogo>
          </Box>

          {/* Search path */}
          <Search />

          {/* Right part */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 1, sm: 3} }}>
            {auth.user ? (
              isMobile ? (
                <>
                  {/* Nút gom Notify + Cart bên trái Profile */}
                  <ShoppingCart quantity={auth.user.cart?.length || 0} />
                  <IconButton sx={{padding: "0px"}}  color="inherit" onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                  
                  {/* Profile */}
                  <Profile />


                  {/* Menu popup */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate('/thong-bao');
                      }}
                      sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
                    >
                      <Notify />
                    </MenuItem>
                    {/* <Divider />
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        //navigate('/gio-hang');
                      }}
                       //sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                    </MenuItem> */}
                  </Menu>
                </>
              ) : (
                <>
                  {/* Desktop hiển thị riêng */}
                  <Link to="/thong-bao">
                    <Notify />
                  </Link>
                  <ShoppingCart quantity={auth.user.cart?.length || 0} />
                  <Profile />
                </>
              )
            ) : (
              <>
                {/* Chưa đăng nhập */}
                {/* <ShoppingCart quantity={auth.user?.cart?.length || 0} /> */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link to="/dang-nhap" style={{ textDecoration: 'none' }}>
                    Đăng nhập
                  </Link>
                  <Divider orientation="vertical" flexItem />
                  <Link to="/dang-ky" style={{ textDecoration: 'none' }}>
                    Đăng ký
                  </Link>
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Divider sx={{ marginY: '5px' }} />

        {/* Lower part */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box>
            <MenuAppbar />
          </Box>
        </Box>
      </ResponsiveContainer>
    </Box>
  );
}

export default Appbar;
