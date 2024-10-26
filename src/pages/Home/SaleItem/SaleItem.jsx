import Box from '@mui/material/Box';
import myStyle from '~/pages/Home/Home.module.scss';
import {ResponsiveSaleItem} from '~/pages/Home/responsive';
const SaleItem = () => {
    return (
        <ResponsiveSaleItem className={myStyle.saleContainer}>
            <Box className={myStyle.contentContainer}>
                <Box sx={{ color: '#fff', padding: '10px', width: '60%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box>
                        <span>Áp dụng cho giá từ: </span>
                        <span style={{ padding: '10px', backgroundColor: '#d66c15', borderRadius: '10px' }}>30.000</span>
                    </Box>
                    <h2 style={{ margin: 0 }}>Mua 1 tặng 1</h2>
                    <p style={{ margin: 0 }}>Chương trình ưu đãi với các sản phẩm phụ kiện đeo cho thú cưng</p>
                </Box>
            </Box>
        </ResponsiveSaleItem>
    )
}

export default SaleItem;