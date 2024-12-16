import mystyle from './MenuAppbar.module.scss'

import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { NavLink, Link} from "react-router-dom"
import { useEffect, useState } from 'react';
import { ServiceFetch } from '~/REST-API-client';
import { Divider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const navLinkStyle = ({ isActive }) => {
    return {
        color: isActive? "red" : '#000',
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
        <Paper sx={{backgroundColor: "#fff"}} className={mystyle.expandService}>
            {
                services?.map((service, index) => {
                    return (
                        <NavLink  to={`/dich-vu/${service?._id}`} key={index}  className={mystyle.expandServiceItem} sx={{padding:'10px'}} >
                            <Box>{service?.name}</Box>
                            {/* <Divider sx={{marginY: "5px"}}/> */}
                        </NavLink>
                    )
                })
            }
        </Paper>
    )
    const pageExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandPage}>
            <button className={mystyle.expandServiceItem}>
            <Link to='/gioi-thieu' style={{
                color: '#000',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textDecoration: 'none'
            }}><Typography>Về chúng tôi</Typography></Link>

            </button>
            <button className={mystyle.expandServiceItem}>

                <Link to='/lien-he' style={{
                     color: '#000',
                     textTransform: 'none',
                     fontSize: '1.1rem',
                     fontWeight: 'bold',
                     textDecoration: 'none'
                }}><Typography>Liên hệ</Typography></Link>
            </button>

            {/* <button className={mystyle.expandServiceItem}>
                <Typography>Team</Typography>
            </button>

            <button className={mystyle.expandServiceItem}>
                <Typography>Trợ giúp</Typography>
            </button> */}
        </Paper>
    )
    return (
        <Box sx={{
            display: 'flex',
            gap: 4,
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
            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NavLink to='/tap-chi' style={navLinkStyle}>Tạp chí</NavLink>

            </Box> */}
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