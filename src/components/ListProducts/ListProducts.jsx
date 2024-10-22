import myStyle from './ListProducts.module.scss';

import Appbar from "~/components/Appbar/Appbar";
import Box from '@mui/material/Box';
import Filter from '~/components/Filter/Filter';
import ProductItem from '~/components/ProductItem/ProductItem';
import DetailCategory from '~/components/DetailCategory/DetailCategory';
import Divider from '@mui/material/Divider';
import SortPart from '~/components/SortPart/SortPart';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import BlogItem from '~/components/BlogItem/BlogItem';
import Footer from '~/components/Footer/Footer';
const ListProduct = () => {
    return (
        <>
            <Box className={myStyle.listContainer}>
                <Box className={myStyle.listRow}>
                    {/* Left side --Danh mucj chi tiet + Filter + relative blog*/}
                    <Box className={`${myStyle.lisColLeft} ${myStyle.lisCol}`}
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
                    <Box className={`${myStyle.lisColRight} ${myStyle.lisCol}`}>
                        <Box sx={{ padding: '10px ' }}>
                            {/* Sap xep */}
                            <Box sx={{ width: '100%', padding: '10px' }}>
                                <SortPart />
                            </Box>
                            {/* Danh sach */}
                            <Box sx={{ border: 'solid 2px #fff', width: '100%', padding: '20px', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
                                <Box className={myStyle.prodsRow}>
                                    <Box className={myStyle.prodCol}>
                                        <ProductItem />
                                    </Box>
                                    <Box className={myStyle.prodCol}>
                                        <ProductItem />
                                    </Box>
                                    <Box className={myStyle.prodCol}>
                                        <ProductItem />
                                    </Box>
                                    <Box className={myStyle.prodCol}>
                                        <ProductItem />
                                    </Box>
                                    <Box className={myStyle.prodCol}>
                                        <ProductItem />
                                    </Box>
                                </Box>
                                {/* Paging */}
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Pagination count={10} color="primary" />
                                </Box>
                            </Box>
                        </Box>
                        {/* Detail Category */}
                        <Box sx={{ padding: '10px' }}>
                            <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Bát ăn cho chó, Bình nước cho chó | Dog Bowls & Feeding</Typography>
                            <Typography sx={{ lineHeight: 2 }}>
                                Cung cấp đầy đủ và đúng cách thức ăn và nước uống cho chó là một trong những yếu tố quan trọng nhất để đảm bảo sức khỏe tốt cho thú cưng của bạn. Tại Pet Mart, chúng tôi cung cấp đa dạng các loại bát ăn cho chó và bình nước cho chó, được thiết kế để phù hợp với mọi nhu cầu và kích thước của thú cưng.

                                Tại sao chọn bát và bình nước cho chó tại Pet Mart? Sản phẩm được làm từ chất liệu an toàn, bền bỉ và dễ dàng vệ sinh. Tối ưu hóa việc ăn uống của thú cưng, giúp chúng cảm thấy thoải mái hơn khi ăn uống. Có sẵn nhiều kích cỡ và mẫu mã, phù hợp với mọi giống chó từ nhỏ đến lớn.

                                Bát ăn đôi: Tiện lợi cho việc kết hợp thức ăn khô và ướt, hoặc thức ăn và nước uống.
                                Bát ăn chống gù: Giúp chó ăn chậm và tiêu hóa tốt hơn, phù hợp với những chú chó có xu hướng ăn vội vàng.
                                Bát ăn inox: Dễ dàng vệ sinh, chống gỉ sét, an toàn cho sức khỏe của thú cưng.
                                Bát ăn tự động: Lý tưởng cho chủ nhân bận rộn, đảm bảo thú cưng luôn có đủ thức ăn.
                                Bình nước tự động: Cung cấp nước liên tục, đảm bảo chó luôn được uống đủ nước.
                                Bình nước du lịch: Thuận tiện cho những chuyến đi, dễ dàng mang theo và sử dụng.
                                Bình nước gắn chuồng: Phù hợp cho chó sống trong chuồng hoặc khu vực hạn chế di chuyển.
                                Chúng tôi tin rằng, với đa dạng sản phẩm và dịch vụ chất lượng tại Pet Mart, bạn sẽ tìm được những sản phẩm phù hợp nhất cho thú cưng yêu quý của mình. Ghé thăm chúng tôi để chăm sóc tốt nhất cho người bạn bốn chân của bạn!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default ListProduct