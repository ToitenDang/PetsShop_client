
import React from 'react';
import Appbar from '~/components/Appbar/Appbar';
import myStyle from './Home.module.scss';
import Box from '@mui/material/Box';
function Home() {
  return (
    <>
      <Appbar />
      <div className={myStyle.homeContainer}>
        {/* Slider */}
        {/* https://www.youtube.com/watch?v=og3wCO98HkQ */}
        <Box className= {myStyle.slider}>
          
        </Box>
      </div>
    </>
  );
}

export default Home;

