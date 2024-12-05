import mystyle from './MenuAppbar.module.scss'

import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react';
import { ServiceFetch } from '~/REST-API-client';
import { Divider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
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
    const [services, setServices] = useState();
    useEffect(() => {
        ServiceFetch.get(undefined, {state: true}, undefined)
            .then(data => {
                // console.log("services: ", data.data);
                setServices(data.data)
            })
            .catch(err => {
                console.log(`Lỗi lấy dữ liệu: \n${err}`)
                toast.error("Lỗi lấy dữ liệu dịch vụ")
            })
    }, [])
    const serviceExpand = (
        <Box sx={{backgroundColor: "#fff"}} className={mystyle.expandService}>
            {
                services?.map((service, index) => {
                    return (
                        <Box key={index} >
                            <NavLink  className={mystyle.expandServiceItem} to={`/dich-vu/${service?._id}`} >{service?.name}</NavLink>
                            <Divider sx={{marginY: "5px"}}/>
                        </Box>
                    )
                })
            }
        </Box>
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
                <NavLink to='/do-thu-cung'  style={navLinkStyle} >Thú cưng </NavLink>
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
            <ToastContainer />
        </Box>
    )
}

export default MenuAppbar