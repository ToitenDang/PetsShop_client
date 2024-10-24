import myStyle from './index.module.scss';

import Appbar from "~/components/Appbar/Appbar";
import Box from '@mui/material/Box';
import Profile from "./Profile";
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import KeyIcon from '@mui/icons-material/Key';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Address from './Address';
import Footer from '~/components/Footer/Footer';
import Password from './Password';
import Purchase from './Purchase';
const Account = () => {
    return (
        <>
            <Appbar />
            <Box sx={{ marginTop: '150px', width: '100%' }}>
                {/* Container */}
                <Box className={myStyle.container} >
                    {/* Left part */}
                    <Box sx={{ flex: 1, padding: '4px' }}>
                        <Box sx={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px', padding: '8px', borderRadius: '6px' }}>
                            {/* Name account */}
                            <Box sx={{ padding: '8px 0' }}>
                                <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}><AccountCircleIcon /> tuan241103</Typography>
                            </Box>
                            {/* Link part */}
                            <ul className={myStyle.listContainer}>
                                <li>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBoxIcon /> Hồ sơ</Typography>
                                </li>
                                <li>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><FmdGoodIcon />Địa chỉ</Typography>
                                </li>
                                <li>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><KeyIcon />Mật khẩu</Typography>
                                </li>
                                <li>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><CasesOutlinedIcon />Đơn mua</Typography>
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
                            <Purchase />
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Account;