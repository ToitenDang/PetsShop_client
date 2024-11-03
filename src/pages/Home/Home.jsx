
import React, { useEffect } from 'react';

import myStyle from './Home.module.scss';

import Slider from './Slider/Slider';
import SaleItem from './SaleItem/SaleItem';
import { ResponsiveSlider, ResponsiveSaleContainer, ResponsiveGroupSales, ResponsiveSliderAndSale } from './responsive';
import QuickShop from './QuickShop/QuickShop';
import TopSaleProducts from './TopSaleProducts/TopSaleProducts';
import ExperienceBlogs from './ExperienceBlogs/ExperienceBlogs';
import { UserFetch } from '~/REST-API-client';

function Home() {
  useEffect(() => {
    // const access_token = localStorage.getItem("access_token");
    // console.log(access_token);
    const getUsers = async () => {
      // console.log("accessToken-Home: ", localStorage.getItem("access_token"))
      const users = await UserFetch.get();
      console.log(users);
    }
    getUsers();
  })
  return (
    <>

      <div className={myStyle.homeContainer}>

        {/* Slider and news*/}
        {/* https://www.youtube.com/watch?v=og3wCO98HkQ */}
        <ResponsiveSliderAndSale sx={{ height: '500px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {/* slider part */}
          <ResponsiveSlider sx={{ width: '60%' }}>
            <Slider />
          </ResponsiveSlider>

          {/* sale part */}
          <ResponsiveSaleContainer sx={{ width: '40%', height: '100%', maxHeight: '100%', padding: '10px' }}>
            <ResponsiveGroupSales sx={{ width: '100%', height: '100%', maxHeight: '100%', overflowY: 'auto' }}>
              {/* sale 1 */}
              <SaleItem />
              {/* sale 1 */}
              <SaleItem />
              {/* sale 1 */}
              <SaleItem />
            </ResponsiveGroupSales>
          </ResponsiveSaleContainer>
        </ResponsiveSliderAndSale>

        {/* <Divider sx={{marginTop: '20px'}}/> */}
        {/* Quick shop part */}
        <QuickShop />

        {/* Sản phẩm bán chạy */}
        <TopSaleProducts />

        {/* Blog chia sẻ kinh nghiệm */}
        <ExperienceBlogs />
      </div>
    </>
  );
}

export default Home;

