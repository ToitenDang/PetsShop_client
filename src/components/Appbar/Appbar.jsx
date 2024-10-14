
// CSS
import mystyles from './Appbar.module.scss';

import * as React from 'react';

// Function components
import ShoppingCart from '~/components/ShoppingCard/ShoppingCard';
import Profile from '~/components/Profile/Profile';
import MenuAppbar from '~/components/MenuAppbar/MenuAppbar';
import { ResonsiveMenu, ResonsiveMenuSum } from './responsive'

import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import ModeSelect from '../ModeSelect/ModeSelect';
import SearchIcon from '@mui/icons-material/Search';

import MenuSum from '../MenuSum/MenuSum';



function Appbar() {

  return (


    <Box className={mystyles.container} sx={{
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#062c4f' : '#a0cfe3',
      gap: 2, paddingY: '5px',
    }}>
      {/* Left part */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        {/* MenuSum part */}

        <ResonsiveMenuSum>
          <MenuSum />
        </ResonsiveMenuSum>
        {/* Logo part */}
        <Box sx={{ textAlign: 'center', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
          <PetsIcon />
          <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Bet Shob</Typography>
        </Box>

        {/* Menu part*/}
        <ResonsiveMenu>
          <MenuAppbar />
        </ResonsiveMenu>
        

      </Box>

      {/* Right part */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-around' }}>
        {/* Search path */}
        <div className={mystyles.searchContainer}>
          <input placeholder='Search...' className={mystyles.searchInput} type='text' />
          <button className={mystyles.searchButton}>
            <SearchIcon />
          </button>
        </div>

        {/* shopping cart */}
        <ShoppingCart quantity={5} />
        {/* Avatar */}
        < Profile />
        {/* Select mode */}
        <ModeSelect sx={{ flex: 1 }} />
      </Box>

    </Box>

  );
}
export default Appbar;