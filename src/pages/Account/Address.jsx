import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
const Address = () => {
    return (
        <>
            <Box sx={{ padding: '10px' }}>

                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant='h6'>Địa chỉ của tôi</Typography>
                    <Button sx={{ textTransform: 'none ', fontWeight: 'bold' }} variant='contained' startIcon={<AddIcon />} >Thêm địa chỉ mới</Button>
                </Box>
                <Divider sx={{ marginY: '20px' }} />
                <Box>
                    {/* 1 thông tin địa chỉ */}
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography>Pham Huu Tuan</Typography>
                                <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                                <Typography>0928895717</Typography>
                            </Box>
                            <Box>
                                <Typography>437, Lê Văn Việt</Typography>
                                <Typography>Phường Tăng Nhơn Phú A, Quận 9, TP.Hồ Chí Minh</Typography>
                                <Box sx={{border:'solid 2px #ef6a41',maxWidth:'100px', display:'flex', alignItems:'center',justifyContent:'center',borderRadius:'4px'}}>
                                    <Typography sx={{color:'#ef6a41'}}>Mặc định</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{display:'flex', gap:1}}>
                                <Button sx={{textTransform:'none'}}>Cập nhật</Button>
                                <Button sx={{textTransform:'none'}}>Xóa</Button>
                            </Box>
                            <Box>
                                <Button disabled={true} variant='contained' sx={{textTransform:'none'}}>Thiết lập mặc định</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ marginY: '20px' }} />
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography>Pham Huu Tuan</Typography>
                                <Divider sx={{ margin: '0 10px' }} orientation="vertical" flexItem variant="middle" />
                                <Typography>0928895717</Typography>
                            </Box>
                            <Box>
                                <Typography>437, Lê Văn Việt</Typography>
                                <Typography>Phường Tăng Nhơn Phú A, Quận 9, TP.Hồ Chí Minh</Typography>
                               
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{display:'flex', gap:1}}>
                                <Button sx={{textTransform:'none'}}>Cập nhật</Button>
                                <Button sx={{textTransform:'none'}}>Xóa</Button>
                            </Box>
                            <Box>
                                <Button variant='contained' sx={{textTransform:'none'}}>Thiết lập mặc định</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ marginY: '20px' }} />
                </Box>
            </Box>
        </>
    )
}

export default Address;