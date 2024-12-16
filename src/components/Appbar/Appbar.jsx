
// CSS
import mystyles from './Appbar.module.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Function components
import ShoppingCart from '~/components/ShoppingCard/ShoppingCard';
import Profile from '~/components/Profile/Profile';
import MenuAppbar from '~/components/MenuAppbar/MenuAppbar';
import { ResponsiveContainer, ResponsiveLogo } from '../responsive'
import Category from '~/components/Category/Category';

import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import ModeSelect from '~/components/ModeSelect/ModeSelect';

import { Divider } from '@mui/material';
import { useAuth } from "~/components/Authentication/Authentication";
import { Link } from 'react-router-dom';
import Search from './Search';
import Notify from './Notify';
function Appbar() {
  const auth = useAuth();


  console.log('rerender appbar');

  return (
    <Box className={mystyles.mainContainer}
      sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#062c4f' : null }}
    >
      <ResponsiveContainer className={mystyles.container} sx={{
        width: '90%', gap: 2, paddingY: '5px'
      }}>
        {/* Higher part */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'space-between', zIndex: 1 }}>
          {/* Logo part */}
          <Box sx={{ textAlign: 'center', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}>
            <PetsIcon sx={{ fontSize: '2rem', color: '#ed6b40' }} />
            <ResponsiveLogo sx={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Bet Shob</ResponsiveLogo>
          </Box>
          {/* Search path */}
          <Search />

          {/* Right part */}
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 3
          }}>
            {/* Notify Parrt */}
            <Link to={"/thong-bao"}>
              <Notify />
            </Link>
            {/* shopping cart */}
            <ShoppingCart quantity={auth?.user?.cart?.length || 0} />
            {/* Avatar */}
            {
              !auth.user ?
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link to="/dang-nhap" style={{ textDecoration: 'none' }}>Đăng nhập</Link>
                  <Divider orientation="vertical" flexItem />
                  <Link to="/dang-ky" style={{ textDecoration: 'none' }}>Đăng ký</Link>
                </Box> :
                <Profile />
            }

            {/* Select mode */}
            {/* <ModeSelect sx={{ flex: 1 }} /> */}
          </Box>
        </Box>

        <Divider sx={{ marginY: '5px' }} />

        {/* Upper part */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
          <Box sx={{ flex: 2 }}>
            <Category />
          </Box>
          <Box sx={{ flex: 4 }}>
            <MenuAppbar />
          </Box>
        </Box>

      </ResponsiveContainer>
    </Box>
  );
}

export default Appbar;