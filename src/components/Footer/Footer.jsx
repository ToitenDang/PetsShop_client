import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
const Footer = () => {
    console.log("Render footer")
    return (
        <>
            <Divider sx={{marginTop: '40px'}}/>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5', marginY: '10px' }}>Liên hệ với chúng tôi</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LocalPhoneIcon /> 0928895717</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EmailIcon /> phamhuutuan20031@gmail.com</Typography>

                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5', marginY: '10px' }}>Theo dõi chúng tôi trên</Typography>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <InstagramIcon sx={{ color: '#e32d52' }} /> <Button sx={{ color: '#e32d52' }}>Instagram</Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FacebookOutlinedIcon sx={{ color: '#2d5ee3' }} /> <Button sx={{ color: '#2d5ee3' }}>Facebook</Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <YouTubeIcon sx={{ color: '#e32d2d' }} /><Button sx={{ color: '#e32d2d' }}>Youtube</Button>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <XIcon sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#0a0a0a' }} />
                                <Button sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#0a0a0a' }}>X</Button>
                            </Box>

                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5', marginY: '10px' }}>Địa chỉ </Typography>
                        <Typography>437, Lê Văn Việt, Tăng Nhơn Phú A, Thủ Đức, TP.Hồ Chí Minh</Typography>
                        <Typography>58, Tân Lập, Đông Hòa, Dĩ An, Bình Dương</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Footer;