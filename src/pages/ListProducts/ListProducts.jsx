import myStyle from './ListProducts.module.scss';
import Box from '@mui/material/Box';
import Filter from '~/components/Filter/Filter';
import DetailCategory from '~/components/DetailCategory/DetailCategory';
import Divider from '@mui/material/Divider';
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
import { IconButton, Tooltip } from '@mui/material';
import { FilterList } from '@mui/icons-material';

const ListProduct = () => {
    const [value, setValue] = useState();
    const [cateData, setCateData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(0);
    const [pageValue, setPageValue] = useState(1);
    const [sort, setSort] = useState("sold");
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        minStar: 0,
        maxStar: 5,
        onlyPromotion: false
    });
    const [showFilter, setShowFilter] = useState(false); // 👈 để toggle filter trên mobile

    const fetchData = (parValue, condition, page, sorting) => {
        CategoryFetch.getById(parValue, condition, filters, sorting)
            .then(data => {
                setCateData(data.data);
                let totalPages = 0;
                if (data?.data?.total > 0) {
                    totalPages = Math.ceil(data?.data?.total / data?.data.limit);
                }
                setNumberPage(totalPages);
                setIsLoading(true);
                setPageValue(page);
            })
            .catch(err => {
                console.log("Lỗi lấy chi tiết danh mục: ", err);
                toast.error(`Lỗi lấy chi tiết danh mục`);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (value) {
            const condition = { page: 1, limit: 8 };
            fetchData(value, condition, 1, sort);
        }
    }, [value]);

    const handleChangeTag = (thing) => {
        if (thing === value) return;
        setValue(thing);
        setIsLoading(false);
    };

    const handleChangePage = (event, valuePage) => {
        setIsLoading(false);
        setPageValue(valuePage);
        const condition = { page: valuePage, limit: 8 };
        fetchData(value, condition, parseInt(valuePage), sort);
    };

    const handleChangeFilters = (another) => {
        setFilters(another);
    };

    const handleRegetData = () => {
        setIsLoading(false);
        const condition = { page: 1, limit: 8 };
        fetchData(value, condition, 1, sort);
    };

    const handleChangeSort = (valueSort) => {
        setIsLoading(false);
        setSort(valueSort);
        const condition = { page: 1, limit: 8 };
        fetchData(value, condition, 1, valueSort);
    };

    return (
        <>
            <Box className={myStyle.listContainer}>
                <Box className={myStyle.listRow}>
                    {/* Nút hiện/ẩn filter trong mobile */}
                    <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', padding: '2px 10px', textAlign: 'right' }}>
                        <Tooltip title={showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}>
                            <IconButton
                                onClick={() => setShowFilter(!showFilter)}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#115293'
                                    }
                                }}
                            >
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                    </Box>


                    {/* Filter + Category */}
                    <Box
                        sx={{
                            display: { xs: showFilter ? 'flex' : 'none', md: 'block' },
                            flexDirection: { xs: 'row', md: 'column' },
                            flexWrap: { xs: 'wrap', md: 'nowrap' },
                            gap: { xs: 6, md: 0 },
                            minWidth: { md: '200px' },
                            maxWidth: { md: '16.667%' },
                            padding: '10px',
                            boxShadow: {
                                md: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
                            },
                            borderRadius: '4px',
                            border: '1px solid #fff',
                            marginBottom: { xs: '20px', md: 0 }

                        }}
                    >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <DetailCategory value={value} onChange={handleChangeTag} />
                        </Box>
                        <Divider sx={{ display: { xs: 'none', md: 'block' } }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Filter valueFilters={filters} onChange={handleChangeFilters} getData={handleRegetData} />
                        </Box>
                    </Box>


                    {/* Danh sách + Breadcrumb + Sort + Phân trang */}
                    {
                        isLoading ? (
                            <Box className={`${myStyle.lisColRight} ${myStyle.lisCol}`}>
                                <Box sx={{ padding: '4px 10px 6px' }}>
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <Typography>Đồ thú cưng</Typography>
                                        <Typography>{cateData.name}</Typography>
                                    </Breadcrumbs>
                                </Box>

                                {/* SortPart */}
                                <Box sx={{  display: 'flex', justifyContent: 'start' }}>
                                    <Box sx={{ width: { xs: '100%', sm: '100%'} }}>
                                        <SortPart value={sort} onChange={handleChangeSort} />
                                    </Box>
                                </Box>

                                {/* Danh sách sản phẩm */}
                                <Box sx={{
                                    border: 'solid 2px #fff',
                                    padding: '10px',
                                    mt: '10px',
                                    borderRadius: '5px',
                                    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
                                }}>
                                    <Box className={myStyle.prodsRow}>
                                        {
                                            cateData?.products?.map((prod, index) => (
                                                prod?.name && (
                                                    <Box key={index} className={myStyle.prodCol} >
                                                        <ProductItem product={prod} />
                                                    </Box>
                                                )
                                            ))
                                        }
                                    </Box>
                                    {/* Phân trang */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Pagination page={pageValue} count={numberPage} color="primary" onChange={handleChangePage} />
                                    </Box>
                                </Box>

                                {/* Mô tả danh mục */}
                                <Box sx={{ padding: '10px' }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{cateData?.name}</Typography>
                                    <Typography sx={{ lineHeight: 2 }}>{cateData?.description}</Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box className={`${myStyle.lisColRight} ${myStyle.lisCol}`}>
                                <CircularProgress sx={{ marginLeft: "50%", marginTop: "20px" }} />
                            </Box>
                        )
                    }
                </Box>
            </Box>
            <ToastContainer />
        </>
    );
};

export default ListProduct;
