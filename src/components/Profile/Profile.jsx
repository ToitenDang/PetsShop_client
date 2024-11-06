import { useEffect, useState, useRef } from 'react';

import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { NavLink } from "react-router-dom"
import { useAuth } from "~/components/Authentication/Authentication";
import { LogoutFetch } from '~/REST-API-client';
const linkStyle = ({ isActive }) => {

    return {

        textTransform: 'none',
        textDecoration: 'none',

    }
}
const Profile = () => {
    const auth = useAuth();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseAccount = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);

    };
    const handleCloseLogout = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        localStorage.removeItem("access_token");
        LogoutFetch.post()
            .then(data => {
                console.log(data)
                auth.authenUser(null);
            })
            .catch(err => {
                console.log("err: ", err);
            })
        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }


    return (
        <>
            <Stack direction="row" spacing={2} sx={{ zIndex: 1 }}>
                <div>
                    <Avatar
                        sx={{ cursor: 'pointer' }}
                        ref={anchorRef}
                        id="avatar-control"
                        aria-controls={open ? 'avatar-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        // alt="Remy Sharp" src="https://doanhnhanphaply.vn/wp-content/uploads/2024/09/tran-ha-linh-5.jpg" 
                        src={auth.user.avatar.preview}
                    />
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseAccount}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="avatar-menu"
                                            aria-labelledby="avatar-control"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <NavLink to='/tai-khoan' style={linkStyle}>
                                                <MenuItem sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black' }}
                                                    onClick={handleCloseAccount}>Tài khoản</MenuItem>
                                            </NavLink>
                                            <NavLink to='/dang-nhap' style={linkStyle}>
                                                <MenuItem sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black' }}
                                                    onClick={handleCloseLogout}>Đăng xuất</MenuItem>
                                            </NavLink>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack>
        </>
    )

}

export default Profile