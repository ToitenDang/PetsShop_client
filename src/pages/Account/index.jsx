import myStyle from './index.module.scss';
import Box from '@mui/material/Box';
import { NavLink, Outlet } from "react-router-dom"
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import KeyIcon from '@mui/icons-material/Key';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';
import { useAuth } from "~/components/Authentication/Authentication";
const navlinkStyle = ({ isActive }) => {
    return {
        color: isActive ? '#ef6a41' : '#000'
    }
}
const Account = () => {
    const auth = useAuth();
    if(auth.user !== null) {
        return (
            <>
                <Box sx={{ marginTop: '150px', width: '100%' }}>
                    {/* Container */}
                    <Box className={myStyle.container} >
                        {/* Left part */}
                        <Box sx={{ flex: 1, padding: '4px' }}>
                            <Box sx={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', padding: '8px', borderRadius: '6px' }}>
                                {/* Name account */}
                                <Box sx={{ padding: '8px 0' }}>
                                    <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}><AccountCircleIcon />Thông tin cá nhân</Typography>
                                </Box>
                                {/* Link part */}
                                <ul className={myStyle.listContainer}>
                                    <li>
                                        <NavLink style={navlinkStyle} to='ho-so' className={myStyle.linkNav}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBoxIcon /> Hồ sơ</Typography>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={navlinkStyle} to='dia-chi' className={myStyle.linkNav}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><FmdGoodIcon />Địa chỉ</Typography>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={navlinkStyle} to='mat-khau' className={myStyle.linkNav}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><KeyIcon />Mật khẩu</Typography>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={navlinkStyle} to='don-mua' className={myStyle.linkNav} >
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><CasesOutlinedIcon />Đơn mua</Typography>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={navlinkStyle} to='lich-dat' className={myStyle.linkNav} >
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><CalendarTodayIcon />Lịch đặt</Typography>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={navlinkStyle} to='hoat-dong' className={myStyle.linkNav} >
                                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><BarChartIcon />Hoạt động</Typography>
                                        </NavLink>
                                    </li>
                                </ul>
                            </Box>
    
                        </Box>
    
                        {/* Right part */}
                        <Box sx={{ flex: 4, padding: '0 4px' }}>
                            <Box sx={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', padding: '8px', borderRadius: '6px' }}>
                                {/* <Profile /> */}
                                {/* <Profile /> */}
    
                                {/* Address */}
                                {/* <Address /> */}
    
                                {/* Password */}
                                {/* <Password /> */}
    
                                {/* Don mua */}
                                {/* <Purchase /> */}
                                <Outlet />
                            </Box>
    
                        </Box>
                    </Box>
                </Box>
            </>
        )
    } else {
        return (
            <Box sx={{marginTop:"150px", display:'flex', justifyContent:'center', fontSize:'1.3rem', fontWeight:'bold'}}>
                <p>Bạn cần có tài khoản để xem thông tin</p>
            </Box>
        )
    }
}

export default Account;