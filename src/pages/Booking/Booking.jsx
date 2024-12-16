import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BookingFetch } from "~/REST-API-client";
import { useAuth } from "~/components/Authentication/Authentication";
const BookingPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState()
    const [booking, setBooking] = useState();
    const handleBackPrevPage = () => {
        navigate(-1);
    }
    const fetchData = () => {
        setIsLoading(true);
        BookingFetch.getById(id)
            .then(data => {
                setBooking(data.data);
                setStatus(data.data.status);
                setIsLoading(false);
            })
            .catch(err => {
                toast.error(`Lỗi lấy thông tin:\n${err}`)
                setIsLoading(false);
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",marginTop:"150px" }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        auth.user !== null ? 
        <Box sx={{marginTop:"150px", width:"900px", marginLeft:"auto", marginRight:"auto"}}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 0, cursor: "pointer" }} onClick={handleBackPrevPage}>
                <ArrowBackIosIcon />
                <Typography>Quay lại</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Đơn hàng</Typography>

                <Typography><strong>{id}</strong></Typography>
                <Divider orientation="vertical" flexItem />
                {
                    status === "dang-xac-nhan" ? <Typography sx={{ fontWeight: "bold", color: "#de5945" }}>Cần xác nhận</Typography> :
                        (status === "da-xac-nhan" ? <Typography sx={{ fontWeight: "bold", color: "#31a24c" }}>Đã xác nhận</Typography> :
                            (status === "hoan-thanh" ? <Typography sx={{ fontWeight: "bold", color: "#31a24c" }}>Hoàn thành</Typography> :
                                status === "da-huy" ? <Typography sx={{ fontWeight: "bold", color: "#606770" }}>Đã hủy</Typography> : null
                            )
                        )
                }

            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Khách đặt:</Typography>
                <Typography>{booking.userId}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Dịch vụ:</Typography>
                <Typography>{booking.serviceId}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Ngày thực hiện:</Typography>
                <Typography>{new Date(booking.bookingDate).toLocaleDateString("vi-VN")}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Thời gian thực hiện:</Typography>
                <Typography>{booking.bookingTime}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Cân nặng thú:</Typography>
                <Typography>{booking.petWeight}kg</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Mô tả thú:</Typography>
                <Typography>{booking.detailPet}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Ghi chú:</Typography>
                <Typography>{booking.note}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2, marginTop: "10px" }}>
                <Typography>Giá trị:</Typography>
                <Typography>{booking.totalPrice.toLocaleString("vi-VN")}đ</Typography>
            </Box>
        
            <ToastContainer />
        </Box>
        :
        <Navigate to={"/"}/>
    )
}

export default BookingPage;