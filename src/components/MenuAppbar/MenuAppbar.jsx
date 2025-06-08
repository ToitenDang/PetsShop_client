import mystyle from './MenuAppbar.module.scss';

import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ServiceFetch } from '~/REST-API-client';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? "red" : '#000',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textDecoration: 'none'
});

const MenuAppbar = () => {
  const [services, setServices] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openPage, setOpenPage] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    ServiceFetch.get(undefined, { state: true }, undefined)
      .then(data => setServices(data.data))
      .catch(err => {
        console.error(`Lỗi lấy dữ liệu: \n${err}`);
        toast.error("Lỗi lấy dữ liệu dịch vụ");
      });
  }, []);

  // Khóa cuộn khi mở drawer
  // useEffect(() => {
  //   if (openDrawer) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   // Cleanup khi component bị hủy
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [openDrawer]);


  const renderMobileMenu = () => (
    <>
      <IconButton sx={{padding: "0px"}} onClick={() => setOpenDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 200 }} role="presentation">
          <List>
            <ListItemButton component={Link} to="/">Trang chủ</ListItemButton>
            <ListItemButton component={Link} to="/do-thu-cung">Thú cưng</ListItemButton>

            <ListItemButton onClick={() => setOpenService(!openService)}>
              <ListItemText primary="Dịch vụ" />
              {openService ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openService} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {services?.map(service => (
                  <ListItemButton
                    key={service._id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/dich-vu/${service._id}`}
                  >
                    {service.name}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton component={Link} to="/tap-chi">Tạp chí</ListItemButton>

            <ListItemButton onClick={() => setOpenPage(!openPage)}>
              <ListItemText primary="Tham khảo" />
              {openPage ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPage} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/gioi-thieu">
                  Về chúng tôi
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/lien-he">
                  Liên hệ
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NavLink to='/' style={navLinkStyle}>Trang chủ</NavLink>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NavLink to='/do-thu-cung' style={navLinkStyle}>Thú cưng</NavLink>
      </Box>

      <Box className={mystyle.service} sx={{ textTransform: 'none', color: '#000', fontSize: '1.1rem', justifyContent: 'center' }}>
        Dịch vụ <ExpandMoreIcon />
        <Paper sx={{ backgroundColor: "#fff" }} className={mystyle.expandService}>
          {services?.map((service, index) => (
            <NavLink to={`/dich-vu/${service?._id}`} key={index} className={mystyle.expandServiceItem}>
              <Box>{service?.name}</Box>
            </NavLink>
          ))}
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NavLink to='/tap-chi' style={navLinkStyle}>Tạp chí</NavLink>
      </Box>

      <Box className={mystyle.page} sx={{ textTransform: 'none', color: '#000', fontSize: '1.1rem', justifyContent: 'center' }}>
        Tham khảo <ExpandMoreIcon />
        <Paper sx={{ width: '150px' }} className={mystyle.expandPage}>
          <button className={mystyle.expandServiceItem}>
            <Link to='/gioi-thieu' style={{ color: '#000', textDecoration: 'none' }}>
              <Typography>Về chúng tôi</Typography>
            </Link>
          </button>
          <button className={mystyle.expandServiceItem}>
            <Link to='/lien-he' style={{ color: '#000', textDecoration: 'none' }}>
              <Typography>Liên hệ</Typography>
            </Link>
          </button>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      <ToastContainer />
    </>
  );
};

export default MenuAppbar;
