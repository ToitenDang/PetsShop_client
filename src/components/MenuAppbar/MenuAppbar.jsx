import mystyle from './MenuAppbar.module.scss'

import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const MenuAppbar = ({ styleProps= null}) => {

    const serviceExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandService}>
            <button
                className={mystyle.expandServiceItem}>
                <Typography>Chăm sóc</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Y tế</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Tạm giữ</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Massage</Typography>
            </button>
            <button className={mystyle.expandServiceItem}>
                <Typography>Thực phẩm</Typography>
            </button>
        </Paper>
    )
    const pageExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandPage}>
            <button className={mystyle.expandServiceItem}>
                <Typography>Về chúng tôi</Typography>
            </button>
            <button className={mystyle.expandServiceItem}>
                <Typography>Liên hệ</Typography>
            </button>
            <button className={mystyle.expandServiceItem}>
                <Typography> Blog</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Team</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Trợ giúp</Typography>
            </button>
        </Paper>
    )
    return (
        <Box  sx= {{
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-start'
        }}>
            <Button sx={{
                textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                fontSize: '1.1rem',fontWeight: 'bold'
            }}>Trang chủ</Button>
            <Button

                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem',fontWeight: 'bold'
                }} >Thú cưng

            </Button>
            <Box
                className={mystyle.service}
                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem', justifyContent: 'center'
                }}

            >Dịch vụ <ExpandMoreIcon />
                {serviceExpand}

            </Box>
            <Button sx={{
                textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem',fontWeight: 'bold'
            }} >Phụ kiện</Button>
            <Box
                className={mystyle.page}
                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem', justifyContent: 'center'
                }}>
                Tham khảo <ExpandMoreIcon />
                {pageExpand}
            </Box>
        </Box>
    )
}

export default MenuAppbar