import myStyle from './ListProducts.module.scss';
import Box from '@mui/material/Box';
import Filter from '~/components/Filter/Filter';
import DetailCategory from '~/components/DetailCategory/DetailCategory';
import Divider from '@mui/material/Divider';;
import BlogItem from '~/components/BlogItem/BlogItem';
import ProductItem from '~/components/ProductItem/ProductItem';
import SortPart from '~/components/SortPart/SortPart';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { CategoryFetch } from '~/REST-API-client';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const ListProduct = () => {
    // console.log("re-render list")
    // const { tag } = useParams();
    // console.log("tag: ", tag);
    const [value, setValue] = useState();
    const [cateData, setCateData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(0);
    const [pageValue, setPageValue] = useState(1);
    const [sort, setSort] = useState("sold")
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        minStar: 0,
        maxStar: 5,
        onlyPromotion: false
    })
    // console.log(filters)
    const fetchData = (parValue, condition, page, sorting) => {
        CategoryFetch.getById(parValue, condition, filters, sorting)
            .then(data => {
                // console.log(data.data)
                setCateData(data.data);
                let totalPages = 0;
                if (data?.data?.total > 0) {
                    totalPages = Math.ceil(data?.data?.total / data?.data.limit);
                }
                setNumberPage(totalPages)
                setIsLoading(true);
                setPageValue(page);
            })
            .catch(err => {
                console.log("Lỗi lấy chi tiết danh mục: ", err)
                toast.error(`Lỗi lấy chi tiết danh mục`);
            })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    useEffect(() => {
        // console.log("useEffect")
        if (value) {
            // console.log("cahnge")

            const condition = { page: 1, limit: 8 }
            // const condition = { page: 1 }
            fetchData(value, condition, 1, sort);
        }
    }, [value])
    const handleChangeTag = (thing) => {
        if (thing === value) {
            return
        }
        setValue(thing);
        setIsLoading(false);
    }
    const handleChangePage = (event, valuePage) => {
        setIsLoading(false);
        setPageValue(valuePage);
        const condition = { page: valuePage, limit: 8 };
        fetchData(value, condition, parseInt(valuePage), sort);
    }
    const handleChangeFilters = (another) => {
        setFilters(another);
    }
    const handleRegetData = () => {
        setIsLoading(false);
        const condition = { page: 1, limit: 8 };
        fetchData(value, condition, 1, sort)
    }
    const handleChangeSort = (valueSort) => {
        setIsLoading(false);
        setSort(valueSort);
        const condition = { page: 1, limit: 8 };
        fetchData(value, condition, 1, valueSort)
    }
    // console.log("value list: ", value)
    return (
        <>
            <Box className={myStyle.listContainer}>
                <Box className={myStyle.listRow}>
                    {/* Left side --Danh mucj chi tiet + Filter + relative blog*/}
                    <Box className={`${myStyle.lisColLeft} ${myStyle.lisCol}`} sx={{ minWidth: '200px' }}>
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

                                <DetailCategory value={value} onChange={handleChangeTag} />

                            </Box>
                            <Divider />
                            {/* Filter */}
                            <Box sx={{ height: '50%', maxHeight: '50%' }}>
                                <Filter valueFilters={filters} onChange={handleChangeFilters} getData={handleRegetData} />
                            </Box>
                        </Box>
                        {/* Relative blog */}
                        {/* <Box sx={{ marginTop: '10px' }}>
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Các bài viết liên quan</Typography>
                            <Box sx={{ height: '550px', maxHeight: '550px', overflowY: 'auto' }}>
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                            </Box>
                        </Box> */}
                    </Box>
                    {/* Right side -- Danh sach + Sap xep + Mo ta*/}
                    {/* <Outlet /> */}
                    {
                        isLoading ? <Box className={`${myStyle.lisColRight} ${myStyle.lisCol}`}>
                            <Box sx={{ padding: '10px' }}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Typography >
                                        Đồ thú cưng
                                    </Typography>
                                    <Typography >
                                        {cateData.name}
                                    </Typography>

                                </Breadcrumbs>
                            </Box>

                            <Box sx={{ padding: '10px ' }}>
                                {/* Sap xep */}
                                <Box sx={{ width: '100%', padding: '10px' }}>
                                    <SortPart value={sort} onChange={handleChangeSort} />
                                </Box>
                                {/* Danh sach */}
                                <Box sx={{ border: 'solid 2px #fff', width: '100%', padding: '20px', borderRadius: '5px', boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
                                    <Box className={myStyle.prodsRow}>
                                        {
                                            cateData?.products?.map((prod, index) => {
                                                return (

                                                    prod?.name ? (<Box key={index} className={myStyle.prodCol}>
                                                        <ProductItem product={prod} />
                                                    </Box>) : null

                                                )
                                            })
                                        }
                                    </Box>
                                    {/* Paging */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Pagination page={pageValue} count={numberPage} color="primary" onChange={handleChangePage} />
                                    </Box>
                                </Box>
                            </Box>
                            {/* Detail Category */}
                            <Box sx={{ padding: '10px' }}>
                                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{cateData?.name}</Typography>
                                <Typography sx={{ lineHeight: 2 }}>
                                    {cateData?.description}
                                </Typography>
                            </Box>
                        </Box>
                            :
                            <Box className={`${myStyle.lisColRight} ${myStyle.lisCol}`} >
                                <CircularProgress sx={{ marginLeft: "50%", marginTop: "20px" }} />
                            </Box>
                    }

                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}

export default ListProduct