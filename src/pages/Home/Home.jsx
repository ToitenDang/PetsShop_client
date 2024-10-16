
import React from 'react';
import Appbar from '~/components/Appbar/Appbar';
import myStyle from './Home.module.scss';
import Box from '@mui/material/Box';
import Slider from './Slider/Slider';
import SaleItem from './SaleItem/SaleItem';
import { ResponsiveSlider } from './responsive';
function Home() {
  // console.log("Re-render: Home")
  return (
    <>
      <Appbar />
      <div className={myStyle.homeContainer}>

        {/* Slider and news*/}
        {/* https://www.youtube.com/watch?v=og3wCO98HkQ */}
        <Box sx={{ height: '500px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {/* slider part */}
          <ResponsiveSlider sx={{ width: '60%' }}>
            <Slider />
          </ResponsiveSlider>

          {/* sale part */}
          <Box sx={{ width: '40%', height: '100%', maxHeight: '100%', padding: '10px' }}>
            <Box sx={{ width: '100%', height: '100%', maxHeight: '100%', overflowY: 'auto' }}>
              {/* sale 1 */}
              <SaleItem />
              {/* sale 1 */}
              <SaleItem />
              {/* sale 1 */}
              <SaleItem />
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Home;

