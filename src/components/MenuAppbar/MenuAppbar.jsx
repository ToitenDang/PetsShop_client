import mystyle from './MenuAppbar.module.scss'

import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const MenuAppbar = ({ styleProps }) => {

    const serviceExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandService}>
            <Box className={mystyle.expandServiceItem}>
                <Typography> Take care</Typography>
            </Box>

            <Box className={mystyle.expandServiceItem}>
                <Typography> Medicine</Typography>
            </Box>

            <Box className={mystyle.expandServiceItem}>
                <Typography>Place</Typography>
            </Box>

            <Box className={mystyle.expandServiceItem}>
                <Typography>Massage</Typography>
            </Box>
        </Paper>
    )
    const pageExpand = (
        <Paper sx={{ width: '150px' }} className={mystyle.expandPage}>
            <Box className={mystyle.expandPageItem}>
                <Typography> About us</Typography>
            </Box>

            <Box className={mystyle.expandServiceItem}>
                <Typography> Blog</Typography>
            </Box>

            <Box className={mystyle.expandServiceItem}>
                <Typography>Team</Typography>
            </Box>

            <Box className={mystyle.expandServiceItem}>
                <Typography>Help center</Typography>
            </Box>
        </Paper>
    )
    return (
        <Box style={styleProps} sx={{ gap: 3 }}>
            <Button sx={{
                textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                fontSize: '1.1rem'
            }}>Home</Button>
            <Button

                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem'
                }} >Shop

            </Button>
            <Button
                className={mystyle.service}
                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem'
                }} endIcon={<ExpandMoreIcon />}

            >Services
                {serviceExpand}

            </Button>
            <Button sx={{
                textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem'
            }} >Contact us</Button>
            <Button
                className={mystyle.page}
                sx={{
                    textTransform: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', fontSize: '1.1rem'
                }} endIcon={<ExpandMoreIcon />}>
                Pages
                {pageExpand}
            </Button>
        </Box>
    )
}

export default MenuAppbar