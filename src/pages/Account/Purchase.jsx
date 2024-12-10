import myStyle from './index.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { useState, useRef, useEffect } from 'react';
import { OrderFetch } from '~/REST-API-client';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '~/components/Authentication/Authentication';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
const Purchase = () => {
    const firstEl = useRef();
    const toastId = useRef(null);
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
        } else if (myFilter === "dxl") {
            condition = { ...condition, status: "dxl" }
        } else if (myFilter === "dg") {
            condition = { ...condition, status: "dg" }
        } else if (myFilter === "tc") {
            condition = { ...condition, status: "tc" }
        } else if (myFilter === "huy") {
            condition = { ...condition, $or: [{ status: "hbb" }, { status: "hbs" }] }
        } else {
            window.alert("Bộ lọc không hợp lệ hoặc không còn hỗ trợ");
        }
        OrderFetch.getOrderByUserId(auth.user._id, condition, myFind.trim())
            .then((data) => {
                console.log(`orders: ${auth.user._id}`, data);
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
    const handleCanle = (id) => {
        toastId.current = toast.loading("Đang cập nhật dữ liệu!")

        OrderFetch.updateOrderByUser(auth.user._id, {
            orderId: id,
            status: "hbb"
        })
            .then((data) => {
                toast.success("Cập nhật thành công!")
                toast.dismiss(toastId.current);
                fetchData(filter, find)
            })
            .catch((err) => {
                toast.error("Cập nhật thất bại")
                toast.dismiss(toastId.current);
            })
    }
    return (
        <Box >
            <Box sx={{ padding: '10px' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant='h5'>Đơn đã mua</Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            {/* Filter */}
            <Box >
                <Box sx={{ display: 'flex', paddingY: '10px', gap: 2, boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px', position: 'relative' }}>
                    <Box sx={{ height: '5px', position: 'absolute', bottom: '0', left: `${lineLeft}px`, width: `${lineWidth}px`, bgcolor: 'red', transition: 'all 0.4s ease', borderRadius: '10px' }}></Box>
                    <Box ref={firstEl} className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "all"))}>
                        <Typography >Tất cả</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "tc"))}>
                        <Typography >Thành công</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "dxl"))}>
                        <Typography >Đang xử lý</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "dg"))}>
                        <Typography >Chờ giao hàng</Typography>
                    </Box>
                    <Box className={myStyle.cateFilterContainer} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '20px' }} onClick={(e) => (handleClickTab(e, "huy"))}>
                        <Typography >Đã hủy</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2 }}>

                            <TextField value={find} onChange={(e) => setFind(e.target.value)} sx={{ flex: 1 }} label="Tìm kiếm" variant="standard" />
                            <button onClick={handleSearch} style={{ border: "none", borderRadius: "4px", cursor: "pointer", backgroundColor:"#de5945", color:"#fff" }}><SearchIcon /></button>
                            <Tooltip title="Bạn có thể tìm theo Tên sản phẩm">
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
                                            <Typography>Mã đơn hàng: <Link to={`/don-hang/${order._id}`}>{order._id}</Link></Typography>
                                            <Divider orientation="vertical" flexItem />
                                            <Typography>Trạng thái:</Typography>
                                            <Typography sx={{ color: '#72a492' }}>
                                                {order?.status === "dxl" ? "Đang xử lý" : (order?.status === "dg" ? "Đang giao" : (order?.status === "tc" ? "Hoàn thành" : (order?.status === "hbb" ? "Hủy bởi bạn" : "Hủy bởi shop")))}
                                            </Typography>
                                            {
                                                order.status === "dxl" && <Button onClick={() => handleCanle(order._id)} variant='contained' color='warning' sx={{ textTransform: "none" }}>Hủy đơn</Button>
                                            }

                                        </Box>
                                        <Divider sx={{ marginY: '10px' }} />
                                        {/* Danh sach san pham */}
                                        {
                                            order.products.map((product, idx) => {
                                                return (
                                                    <Box key={idx}>
                                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', alignItems: 'center', marginY: '4px' }}>
                                                            <Box sx={{ width: '100px', height: '100px' }}>
                                                                <img className={myStyle.imagePurchase} src={`${product.details.img}`} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ fontWeight: "bold", fontSize: '1.2rem' }} >{product.details.name}</Typography>
                                                                <Typography> Số lượng: x{product.quantity}</Typography>
                                                                <Typography>Đơn giá: {product.price.toLocaleString("vi-VN")}</Typography>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                )
                                            })
                                        }

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

export default Purchase;