import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "~/components/Authentication/Authentication";
import { OrderFetch } from "~/REST-API-client";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const PurchaseDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const auth = useAuth();
    const [order, setOrder] = useState();
    const fetchData = () => {
        if (auth.user !== null) {
            setIsLoading(true);
            OrderFetch.getOrderByUserId(auth.user._id, { _id: id }, undefined)
                .then(data => {
                    console.log("geted data: ", data);
                    setOrder(data.data[0]);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    toast.error(`Lỗi lấy dữ liệu:\n${err}`)
                })
        } else {
            setIsLoading(false);
        }

    }
    useEffect(() => {
        fetchData()
    }, [])
    if (isLoading) {
        return (
            <Box sx={{ marginTop: "150px", padding: "20px", display: "flex", justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        auth.user !== null ?
            <Box sx={{ marginTop: "150px", padding: "20px", display: "flex", justifyContent: 'center' }}>
                <Box sx={{ width: "900px" }}>
                    <Box
                        onClick={() => navigate(-1)}
                        sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", cursor: "pointer" }}>
                        <ArrowBackIosIcon /><Typography>Quay lại</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>Chi tiết đơn hàng</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "20px" }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Mã đơn: </Typography>
                            <Typography>{id}</Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography><strong>{order?.status === "dxl" ? "Đang xử lý" : (order?.status === "dg" ? "Đang giao" : (order?.status === "tc" ? "Hoàn thành" : (order?.status === "hbb" ? "Hủy bởi bạn" : "Hủy bởi shop")))}</strong></Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Ngày giao dự kiến: </Typography>
                            <Typography>{new Date(order.deliveryDate).toLocaleDateString("vi-VN")}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Ngày đặt: </Typography>
                            <Typography>{new Date(order.orderDate).toLocaleDateString("vi-VN")}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Phí ship: </Typography>
                            <Typography>{order.shippingFee.toLocaleString("vi-VN")}đ</Typography>
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Sản phẩm: </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {
                                    order.products.map((product, index) => {
                                        return (
                                            <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 3 }}>
                                                <Box sx={{ width: "50px", height: "50px" }}>
                                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={`${product.details.img}`} />
                                                </Box>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography>{product.details.name}</Typography>
                                                    <Typography>{product.quantity} x {product.price}</Typography>
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }

                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Phương thức thanh toán: </Typography>
                            <Typography>{order.paymentMethod}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Số điện thoại: </Typography>
                            <Typography>{order.phone}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Tổng giá trị: </Typography>
                            <Typography>{order.totalPrice.toLocaleString("vi-VN")}đ</Typography>
                        </Box>
                    </Box>
                </Box>
                <ToastContainer />
            </Box>
            :
            <Navigate to={"/"}/>
    )
}
export default PurchaseDetail;