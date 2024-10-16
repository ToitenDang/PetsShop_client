
import Box from '@mui/material/Box';
import { ResonsiveQuickShopContainer } from '~/pages/Home/responsive'
import myStyle from './QuickShop.module.scss'
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const QuickShop = () => {
    return (
        <Box style={{ width: '100%', marginTop: '10px' }}>
            <Typography sx={{textAlign: 'center',marginY: '10px',fontSize: '1.5rem', fontWeight: 'bold'}}>Mua sắm nhanh</Typography>
            <ResonsiveQuickShopContainer sx={{ display: 'flex', flexWrap: 'wrap', width: '35%', margin: 'auto', gap: 2 }}>
                <Tooltip title="Mua sắm cho Chó">
                    <Box className={myStyle.item} sx={{ borderColor: '#99ce58' }}>
                        <img src={`${publicUrl}/images/quickshop/dog.png`} />
                    </Box>

                </Tooltip>
                <Tooltip title="Mua sắm cho mèo">
                    <Box className={myStyle.item} sx={{ borderColor: '#e22f57' }}>
                        <img src={`${publicUrl}/images/quickshop/cat.png`} />
                    </Box>
                </Tooltip>
                <Tooltip title="Mua sắm phụ kiện">
                    <Box className={myStyle.item} sx={{ borderColor: '#fec619' }}>
                        <img src={`${publicUrl}/images/quickshop/phukien.png`} />
                    </Box>
                </Tooltip>
            </ResonsiveQuickShopContainer>
        </Box>
    )
}
export default QuickShop;