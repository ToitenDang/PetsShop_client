import myStyle from './Promotion.module.scss';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ProductItem from '~/components/ProductItem/ProductItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PromotionFetch } from '~/REST-API-client';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Promotion = () => {
    const [promotion, setPromotion] = useState();
    const { id } = useParams();
    const [isvalid, setIsvalid] = useState(false);
    useEffect(() => {
        PromotionFetch.getById(id)
            .then(data => {
                const promotion = data.data;
                if (promotion.state === true) {
                    const today = new Date();
                    const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
                    const endOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
                    const startDate = new Date(promotion.startDate);
                    const endDate = new Date(promotion.endDate);
                    const isPromotionValidToday =
                        startDate <= endOfToday && endDate >= startOfToday;
                    if (isPromotionValidToday) {
                        setPromotion(data.data);
                        setIsvalid(true)
                    } else {
                        setIsvalid(false);
                    }
                } else {
                    setIsvalid(false);
                }

            })
            .catch(err => {
                toast.error(`Lỗi lấy dữ liệu chương trình khuyến mãi:`)
                console.log(`Lỗi lấy dữ liệu chương trình khuyến mãi: ${err}`)
            })
    }, [id])
    if (!promotion && isvalid) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        isvalid ?
            <Box sx={{ marginTop: '150px', padding: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{promotion?.name}</Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>{promotion?.description}</Typography>
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                    <Typography sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                        Chương trình kéo dài từ ngày <span style={{ color: "#f26843", fontWeight: "bold" }}>{new Date(promotion?.startDate).toLocaleDateString("vi-VN", { timeZone: "UTC" })} </span>
                        cho đến hết ngày <span style={{ color: "#f26843", fontWeight: "bold" }}>{new Date(promotion?.endDate).toLocaleDateString("vi-VN", { timeZone: "UTC" })}</span>
                    </Typography>
                </Box>
                <Divider sx={{ marginY: "20px" }} />
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{ padding: "20px", backgroundColor: "#f26843", width: "200px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "#fff" }}>Sản phẩm</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "40px" }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            {
                                promotion?.applicableProducts.map((prod, index) => {
                                    return (
                                        <Box key={prod._id} className={myStyle.colProds}>
                                            <ProductItem product={prod} />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
                <ToastContainer />
            </Box> :
            <Box sx={{ marginTop: "150px" }}>
                <Typography sx={{ textAlign: "center" }}>Khuyến mãi hết hạn hoặc không tồn tại</Typography>
            </Box>
    )
}

export default Promotion;