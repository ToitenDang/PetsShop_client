import myStyle from './ListProducts.module.scss';

import Box from '@mui/material/Box';
import Filter from '~/components/Filter/Filter';

import DetailCategory from '~/components/DetailCategory/DetailCategory';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';
import BlogItem from '~/components/BlogItem/BlogItem';
import Footer from '~/components/Footer/Footer';
import { Outlet } from 'react-router-dom';
const ListProduct = () => {
    return (
        <>
            <Box className={myStyle.listContainer}>
                <Box className={myStyle.listRow}>
                    {/* Left side --Danh mucj chi tiet + Filter + relative blog*/}
                    <Box className={`${myStyle.lisColLeft} ${myStyle.lisCol}`} sx={{minWidth:'200px'}}
                    >
                        <Box sx={{
                            height: 'calc(100vh + 100px)',
                            minWidth: '200px',
                            maxHeight: 'calc(100vh + 100px)',
                            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                            borderRadius: '4px', border: '1px solid #fff',
                            paddingX: '10px'
                        }}>
                            {/* Danh muc */}
                            <Box sx={{ height: '50%', maxHeight: '50%' }}>

                                <DetailCategory />

                            </Box>
                            <Divider />
                            {/* Filter */}
                            <Box sx={{ height: '50%', maxHeight: '50%' }}>
                                <Filter />
                            </Box>
                        </Box>
                        {/* Relative blog */}
                        <Box sx={{marginTop:'10px'}}>
                            <Typography variant='h6' sx={{fontWeight: 'bold'}}>Các bài viết liên quan</Typography>
                            <Box sx={{height: '550px', maxHeight: '550px', overflowY: 'auto'}}>
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                                <BlogItem  />
                            </Box>
                        </Box>
                    </Box>
                    {/* Right side -- Danh sach + Sap xep + Mo ta*/}
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}

export default ListProduct