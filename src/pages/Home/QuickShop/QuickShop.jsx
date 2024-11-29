
import Box from '@mui/material/Box';
import { ResonsiveQuickShopContainer } from '~/pages/Home/responsive'
import myStyle from './QuickShop.module.scss'
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const QuickShop = () => {
    const navigate = useNavigate();
    console.log("render quick-shop")
    return (
        <Box sx={{ width: '100%', marginTop: '40px', backgroundColor: (theme) => theme.palette.mode === "dark" ? '#000' : '#fff'}}>
            <Typography sx={{textAlign: 'center',marginY: '10px',fontSize: '2rem', fontWeight: 'bold'}}>Mua sắm nhanh</Typography>
            <ResonsiveQuickShopContainer sx={{ display: 'flex', flexWrap: 'wrap', width: '35%', margin: 'auto', gap: 2 }}>
                <Tooltip title="Mua sắm cho Chó">
                    <Box onClick={() => navigate("/do-thu-cung/do-cho-cho")} className={myStyle.item} sx={{ backgroundColor: '#99ce58' }}>
                        <img src={`${publicUrl}/images/quickshop/dog.png`} />
                    </Box>

                </Tooltip>
                <Tooltip title="Mua sắm cho mèo">
                    <Box onClick={() => navigate("/do-thu-cung/do-cho-meo")} className={myStyle.item} sx={{ backgroundColor: '#e22f57' }}>
                        <img src={`${publicUrl}/images/quickshop/cat.png`} />
                    </Box>
                </Tooltip>
                <Tooltip title="Sử dụng dịch vụ">
                    <Box onClick={() => navigate("/do-thu-cung/do-cho-cho")} className={myStyle.item} sx={{ backgroundColor: '#fec619' }}>
                        <img src={`${publicUrl}/images/quickshop/phukien.png`} />
                    </Box>
                </Tooltip>
            </ResonsiveQuickShopContainer>
        </Box>
    )
}
export default QuickShop;