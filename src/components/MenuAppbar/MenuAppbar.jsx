import mystyle from './MenuAppbar.module.scss'

import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { NavLink } from "react-router-dom"

const navLinkStyle = ({ isActive }) => {
    return {
        color: isActive ? '#ef6a41' : '#000',
        textTransform: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        textDecoration: 'none'
    }
}

const MenuAppbar = () => {

    const serviceExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandService}>
            <button
                className={mystyle.expandServiceItem}>
                <Typography>Cắt tỉa</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Y tế</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Khách sạn</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Massage</Typography>
            </button>
        </Paper>
    )
    const pageExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandPage}>
            <button className={mystyle.expandServiceItem}>
                <Typography>Về chúng tôi</Typography>
            </button>
            <button className={mystyle.expandServiceItem}>
                
                <NavLink to='/lien-he' style={navLinkStyle}><Typography>Liên hệ</Typography></NavLink>
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
        <Box sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-start'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NavLink to='/' style={navLinkStyle} >Trang chủ</NavLink>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NavLink to='/do-thu-cung' style={navLinkStyle}>Thú cưng </NavLink>
            </Box>

            <Box
                className={mystyle.service}
                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem', justifyContent: 'center'
                }}

            >Dịch vụ <ExpandMoreIcon />
                {serviceExpand}

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NavLink to='/tap-chi' style={navLinkStyle}>Tạp chí</NavLink>

            </Box>
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