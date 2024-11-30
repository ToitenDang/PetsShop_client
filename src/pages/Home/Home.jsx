
import React, { useEffect, useState } from 'react';

import myStyle from './Home.module.scss';
import Slider from './Slider/Slider';
import SaleItem from './SaleItem/SaleItem';
import { ResponsiveSlider, ResponsiveSaleContainer, ResponsiveGroupSales, ResponsiveSliderAndSale } from './responsive';
import QuickShop from './QuickShop/QuickShop';
import TopSaleProducts from './TopSaleProducts/TopSaleProducts';
import ExperienceBlogs from './ExperienceBlogs/ExperienceBlogs';
import { PromotionFetch, UserFetch } from '~/REST-API-client';
import { useAuth } from "~/components/Authentication/Authentication";
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const auth = useAuth();
  const [promotions, setPromotions] = useState([]);
  // console.log("user: ", auth.user);
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  useEffect(() => {
    async function  getPromotions() {
      PromotionFetch.getAllPromotion(1,{outdated: "false"})
        .then((data) => {
          console.log("Promotions data: ", data);
          setPromotions(data.data);
        })
        .catch(err => {
          console.log("Promotions error: ", err);
          toast.error("Lỗi lấy thông tin khuyến mãi")
        })
    }
    getPromotions();
  },[])
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
              {
                promotions.length > 0 ? promotions?.map((promotion, index) => {
                  return <SaleItem key={index} data={promotion}/>
                }) : <Typography sx={{fontWeight:"bold", fontSize:"1.2rem", textAlign:"center"}}>Không có khuyến mãi nào hôm nay😭</Typography>
              }
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
      <ToastContainer />
    </>
  );
}

export default Home;

