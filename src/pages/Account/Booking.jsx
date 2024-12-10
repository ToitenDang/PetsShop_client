import myStyle from './index.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { useState, useRef, useEffect } from 'react';
import { BookingFetch } from '~/REST-API-client';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '~/components/Authentication/Authentication';
const Booking = () => {
    const firstEl = useRef();
    const [lineWidth, setLineWidth] = useState(0);
    const [lineLeft, setLineLeft] = useState(0);
    const [orders, setOrders] = useState();
    const [filter, setFilter] = useState("all");
    const [find, setFind] = useState("");
    const auth = useAuth();
    const fetchData = (myFilter, myFind) => {
       
        let condition;
        if (myFilter === "all") {
            condition = { ...condition }
        } else if (myFilter === "dang-xac-nhan") {
            condition = { ...condition, status: "dang-xac-nhan" }
        } else if (myFilter === "da-xac-nhan") {
            condition = { ...condition, status: "da-xac-nhan" }
        } else if (myFilter === "hoan-thanh") {
            condition = { ...condition, status: "hoan-thanh" }
        } else if (myFilter === "da-huy") {
            condition = { ...condition, status: "da-huy" }
        } else {
            window.alert("Bộ lọc không hợp lệ hoặc không còn hỗ trợ");
        }
        BookingFetch.getAll(auth.user._id, condition, myFind,undefined,undefined,undefined)
            .then((data) => {
                console.log(`bookings: ${auth.user._id}`, data);
                if (orders === null) {
                    originalOrders.current = data.data;
                }
                setOrders(data.data);

            })
            .catch(err => {
                toast.error("Lấy dữ liệu đơn hàng thất bại")
            })
    }
    useEffect(() => {
        setLineWidth(firstEl.current.offsetWidth);
        setLineLeft(firstEl.current.offsetLeft);
    }, [])
    useEffect(() => {
        fetchData(filter, find);
    }, [filter])
    const handleClickTab = (e, type) => {
        // console.log(e);
        const rect = e.target.getBoundingClientRect();
        setLineLeft(e.target.offsetLeft);
        setLineWidth(rect.width);
        setFilter(type);
    }
    const handleSearch = () => {
        fetchData(filter, find);
    }

    return (
        <Box >
            <Box sx={{ padding: '10px' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant='h5'>Đơn dịch vụ</Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            {/* Filter */}
            <Box >
                <Box sx={{ display: 'flex', paddingY: '10px', gap: 2, boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px', position: 'relative' }}>
                    <Box sx={{ height: '5px', position: 'absolute', bottom: '0', left: `${lineLeft}px`, width: `${lineWidth}px`, bgcolor: 'red', transition: 'all 0.4s ease', borderRadius: '10px' }}></Box>
                    <Box ref={firstEl} className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "all"))}>
                        <Typography >Tất cả</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "dang-xac-nhan"))}>
                        <Typography >Đang xác nhận</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "da-xac-nhan"))}>
                        <Typography >Đã xác nhận</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "hoan-thanh"))}>
                        <Typography >Thành công</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "da-huy"))}>
                        <Typography >Đã hủy</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2 }}>

                            <TextField value={find} onChange={(e) => setFind(e.target.value)} sx={{ flex: 1 }} label="Tìm kiếm" variant="standard" />
                            <button onClick={handleSearch} style={{ border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor:"#de5945", color:"#fff" }}><SearchIcon /></button>
                            <Tooltip title="Bạn có thể tìm theo mã đơn">
                                <HelpIcon />
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>


                {/* Danh sahcs đơn hàng */}

                <Box sx={{ padding: '10px', overflowY: 'auto', height: '740px', maxHeight: '740px' }}>
                    {/* 1 don hang */}
                    {
                        orders &&
                        (
                            orders.map((order, index) => {
                                return (
                                    <Box key={index} sx={{ border: 'solid 2px #f2693c', padding: '10px', marginY: '5px' }}>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: "center" }}>
                                            <Typography>Mã đơn: {order._id}</Typography>
                                            <Divider orientation="vertical" flexItem />
                                            <Typography>Trạng thái:</Typography>
                                            <Typography sx={{ color: '#72a492' }}>
                                                {order?.status === "dang-xac-nhan" ? "Đang xử lý" : (order?.status === "da-xac-nhan" ? "Đã xác nhận" : (order?.status === "hoan-thanh" ? "Hoàn thành" : (order?.status === "da-huy" ? "Đã hủy" : null)))}
                                            </Typography>
                                          
                                        </Box>
                                        <Divider sx={{ marginY: '10px' }} />
                                        <Box sx={{display:"flex", flexWrap:"wrap", justifyContent:"flex-start", gap:4}}>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Dịch vụ: </strong></Typography>
                                                <Typography>{order?.serviceDetails?.name}</Typography>
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Ngày thực hiện: </strong></Typography>
                                                <Typography>{new Date(order?.bookingDate).toLocaleDateString("vi-VN")}</Typography>
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Thời gian thực hiện: </strong></Typography>
                                                <Typography>{order?.bookingTime}</Typography>
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Chi nhánh: </strong></Typography>
                                                <Typography>{order?.address}</Typography>
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Cân nặng thú cưng: </strong></Typography>
                                                <Typography>{order?.petWeight}kg</Typography>
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Chi tiết về thú cưng: </strong></Typography>
                                                <Typography>{order?.detailPet}</Typography>
                                            </Box>
                                            <Box sx={{display:"flex", justifyContent:"flex-start"}}>
                                                <Typography><strong>Ghi chú của bạn: </strong></Typography>
                                                <Typography>{order?.note}</Typography>
                                            </Box>
                                        </Box>
                                        <Divider sx={{ marginY: '10px' }} />
                                        {/* Action */}
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Typography>Thành tiền: {order.totalPrice.toLocaleString("vi-VN")}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        )
                    }


                </Box>

            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Booking;