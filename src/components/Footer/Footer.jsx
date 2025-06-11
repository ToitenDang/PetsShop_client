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
import Grid from "@mui/material/Grid";

const Footer = () => {
    return (
        <>
            <Divider sx={{ marginTop: '40px' }} />
            <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', paddingBottom: 8 }}>
                <Grid container spacing={4} justifyContent="center">
                    {/* Cột 1 - Liên hệ */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Liên hệ với chúng tôi
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocalPhoneIcon /> 0928895717
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon /> phamhuutuan20031@gmail.com
                        </Typography>
                    </Grid>

                    {/* Cột 2 - Mạng xã hội */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Theo dõi chúng tôi trên
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <InstagramIcon sx={{ color: '#e32d52' }} />
                            <Button sx={{ color: '#e32d52' }}>Instagram</Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <FacebookOutlinedIcon sx={{ color: '#2d5ee3' }} />
                            <Button sx={{ color: '#2d5ee3' }}>Facebook</Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <YouTubeIcon sx={{ color: '#e32d2d' }} />
                            <Button sx={{ color: '#e32d2d' }}>YouTube</Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <XIcon sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#0a0a0a' }} />
                            <Button sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#0a0a0a' }}>X</Button>
                        </Box>
                    </Grid>

                    {/* Cột 3 - Địa chỉ */}
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Địa chỉ
                        </Typography>
                        <Typography>437, Lê Văn Việt, Tăng Nhơn Phú A, Thủ Đức, TP.Hồ Chí Minh</Typography>
                        <Typography>58, Tân Lập, Đông Hòa, Dĩ An, Bình Dương</Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Footer;
