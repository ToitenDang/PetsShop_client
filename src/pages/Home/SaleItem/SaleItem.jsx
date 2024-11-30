import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import myStyle from '~/pages/Home/Home.module.scss';
import { ResponsiveSaleItem } from '~/pages/Home/responsive';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const SaleItem = ({ data }) => {
    const navigate = useNavigate();
    return (
        <ResponsiveSaleItem className={myStyle.saleContainer}>
            <Box className={myStyle.contentContainer}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.3rem",color:"#fff" }}>Khuyến mãi hôm nay </Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                    <Box sx={{ color: '#fff', padding: '10px', flex:3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                        <Box sx={{ overflow: "hidden", padding: "10px" }}>
                            <span>Giảm lên đến:</span>
                            <span style={{ backgroundColor: '#d66c15', borderRadius: '10px', padding: "10px", marginLeft: "10px" }}>
                                {
                                    data?.type === "percent" ? data?.value + "%" : data?.value.toLocaleString("vi-VN") + "đ"
                                }
                            </span>

                        </Box>
                        <p style={{ margin: 0, paddingX: "10px", fontWeight: "bold", fontSize: "1.2rem" }}>{data?.name}</p>
                        <p style={{ margin: 0, paddingX: "10px" }}>{data?.description}</p>
                    </Box>
                    <Box sx={{flex:2, padding:"10px", marginTop:"50px"}}>
                        <Button onClick={() =>{
                            navigate(`/khuyen-mai/${data._id}`)
                        }}  variant='contained'>Xem ngay</Button>
                    </Box>
                </Box>
                {/* <Box sx={{width:"150px", position:"absolute", right:"0", top:"-15px"}}>
                    <img className={myStyle.icon} src={`${publicUrl}/images/promotion/icon.png`}/>
                </Box> */}
            </Box>
        </ResponsiveSaleItem>
    )
}

export default SaleItem;